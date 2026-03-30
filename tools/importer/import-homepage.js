/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import carouselHeroParser from './parsers/carousel-hero.js';
import cardsNavParser from './parsers/cards-nav.js';
import cardsStatsParser from './parsers/cards-stats.js';
import columnsMediaParser from './parsers/columns-media.js';
import columnsContactParser from './parsers/columns-contact.js';

// TRANSFORMER IMPORTS
import latrobeCleanupTransformer from './transformers/latrobe-cleanup.js';
import latrobeSectionsTransformer from './transformers/latrobe-sections.js';

// PARSER REGISTRY
const parsers = {
  'carousel-hero': carouselHeroParser,
  'cards-nav': cardsNavParser,
  'cards-stats': cardsStatsParser,
  'columns-media': columnsMediaParser,
  'columns-contact': columnsContactParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'University homepage with hero carousel, course finder, impact stats, study pathways, events and news listings, contact information, and indigenous acknowledgement',
  urls: [
    'https://www.latrobe.edu.au/'
  ],
  blocks: [
    {
      name: 'carousel-hero',
      instances: ['.hpherocontainer']
    },
    {
      name: 'cards-nav',
      instances: ['#content_container_1318486 .ds-link-list']
    },
    {
      name: 'cards-stats',
      instances: ['[id="1155751"] .ds-proofpoint-set']
    },
    {
      name: 'columns-media',
      instances: ['.ds-page-content > .ds-block > .ds-column-layout']
    },
    {
      name: 'columns-contact',
      instances: ['#content_container_1156069 ~ .ds-block .ds-column-layout']
    }
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero Carousel',
      selector: '.hpherocontainer',
      style: null,
      blocks: ['carousel-hero'],
      defaultContent: []
    },
    {
      id: 'section-2',
      name: 'Course Finder',
      selector: '#content_container_1318486',
      style: null,
      blocks: ['cards-nav'],
      defaultContent: ['#content_container_1318486 .ds-form .ds-label']
    },
    {
      id: 'section-3',
      name: 'Impact Stats',
      selector: ['#content_container_1155755', '[id="1155751"]'],
      style: null,
      blocks: ['cards-stats'],
      defaultContent: ['#content_container_1155755 h2']
    },
    {
      id: 'section-4',
      name: 'Start Your Journey',
      selector: '#content_container_1156234',
      style: null,
      blocks: [],
      defaultContent: ['#content_container_1156234 h2', '.ds-link-list--image-left']
    },
    {
      id: 'section-5',
      name: 'Events and News',
      selector: '.ds-page-content > .ds-block:has(.ds-column-layout .ds-media-list)',
      style: null,
      blocks: ['columns-media'],
      defaultContent: []
    },
    {
      id: 'section-6',
      name: 'Contact La Trobe',
      selector: '#content_container_1156069',
      style: null,
      blocks: ['columns-contact'],
      defaultContent: ['#content_container_1156069 h2']
    },
    {
      id: 'section-7',
      name: 'Indigenous Acknowledgement',
      selector: '.ds-section--bg-grey',
      style: 'dark',
      blocks: [],
      defaultContent: ['.ds-section--bg-grey h2', '.ds-section--bg-grey p']
    }
  ]
};

// TRANSFORMER REGISTRY
const transformers = [
  latrobeCleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [latrobeSectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      try {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null,
          });
        });
      } catch (e) {
        console.error(`Invalid selector for block "${blockDef.name}": ${selector}`, e);
      }
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
