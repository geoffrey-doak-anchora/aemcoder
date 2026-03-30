var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/carousel-hero.js
  function parse(element, { document }) {
    const slides = Array.from(element.querySelectorAll(".carousel-slides > .slide"));
    const textOverlays = Array.from(element.querySelectorAll(".innerhpherocontainer > .ds-hero-promo__text"));
    const cells = [];
    const slideCount = Math.min(slides.length, textOverlays.length);
    for (let i = 0; i < slideCount; i++) {
      const slide = slides[i];
      const overlay = textOverlays[i];
      const img = slide.querySelector("img");
      const imageCell = [];
      if (img) {
        imageCell.push(img);
      }
      const contentCell = [];
      const heading = overlay.querySelector(".reg-headline-l");
      if (heading) {
        const h2 = document.createElement("h2");
        h2.textContent = heading.textContent.trim();
        contentCell.push(h2);
      }
      const description = overlay.querySelector(".reg-support-copy");
      if (description) {
        contentCell.push(description);
      }
      const cta = overlay.querySelector("a.ds-hero-promo__CTA-tablet-up, a.ds-btn-primary");
      if (cta) {
        const link = document.createElement("a");
        link.href = cta.href;
        link.textContent = cta.textContent.trim();
        const p = document.createElement("p");
        p.appendChild(link);
        contentCell.push(p);
      }
      cells.push([imageCell, contentCell]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-nav.js
  function parse2(element, { document }) {
    const items = Array.from(element.querySelectorAll(".ds-link-list__item"));
    const cells = [];
    for (const item of items) {
      const link = item.querySelector("a.ds-link-list__link, a");
      if (link) {
        const p = document.createElement("p");
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = link.textContent.trim();
        p.appendChild(a);
        cells.push([p]);
      }
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-nav", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-stats.js
  function parse3(element, { document }) {
    const proofpoints = Array.from(element.querySelectorAll(".ds-proofpoint"));
    const cells = [];
    for (const pp of proofpoints) {
      const icon = pp.querySelector('img.ds-proofpont__icon, img[class*="proofpo"]');
      const imageCell = [];
      if (icon) {
        imageCell.push(icon);
      }
      const contentCell = [];
      const title = pp.querySelector("h3.ds-proofpoint__title, .ds-proofpoint__title");
      if (title) {
        contentCell.push(title);
      }
      const text = pp.querySelector("p.ds-proofpoint__text, .ds-proofpoint__text");
      if (text) {
        contentCell.push(text);
      }
      const footnote = pp.querySelector(".ds-proofpoint__footnote");
      if (footnote) {
        const link = footnote.querySelector("a");
        if (link) {
          const p = document.createElement("p");
          const a = document.createElement("a");
          a.href = link.href;
          a.textContent = link.textContent.trim();
          p.appendChild(a);
          contentCell.push(p);
        }
      }
      if (imageCell.length > 0 || contentCell.length > 0) {
        cells.push([imageCell, contentCell]);
      }
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-stats", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-media.js
  function parse4(element, { document }) {
    const columns = Array.from(element.querySelectorAll(":scope > .ds-column-layout__column"));
    const row = [];
    for (const col of columns) {
      const cellContent = [];
      const heading = col.querySelector("h2");
      if (heading) {
        cellContent.push(heading);
      }
      const mediaItems = Array.from(col.querySelectorAll(".ds-media-item"));
      for (const item of mediaItems) {
        const img = item.querySelector("img.ds-media-item__img, img");
        if (img) {
          cellContent.push(img);
        }
        const titleLink = item.querySelector(".ds-media-item__body h4 a, .ds-media-item__body h4");
        if (titleLink) {
          if (titleLink.tagName === "A") {
            const h4 = document.createElement("h4");
            const a = document.createElement("a");
            a.href = titleLink.href;
            a.textContent = titleLink.textContent.trim();
            h4.appendChild(a);
            cellContent.push(h4);
          } else {
            cellContent.push(titleLink);
          }
        }
        const desc = item.querySelector(".ds-media-item__body > p");
        if (desc) {
          cellContent.push(desc);
        }
      }
      const ctaContainer = col.querySelector(".ds-block__wrapper + p, .ds-block > p");
      if (!ctaContainer) {
        const ctaLink = col.querySelector("a.ds-btn-secondary, a.ds-icon-chevron-right");
        if (ctaLink) {
          const p = document.createElement("p");
          const a = document.createElement("a");
          a.href = ctaLink.href;
          a.textContent = ctaLink.textContent.trim();
          p.appendChild(a);
          cellContent.push(p);
        }
      } else {
        cellContent.push(ctaContainer);
      }
      row.push(cellContent);
    }
    const cells = [row];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-media", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-contact.js
  function parse5(element, { document }) {
    const columns = Array.from(element.querySelectorAll(":scope > .ds-column-layout__column"));
    const row = [];
    for (const col of columns) {
      const cellContent = [];
      const paragraph = col.querySelector("p.h4, p");
      if (paragraph) {
        cellContent.push(paragraph);
      }
      row.push(cellContent);
    }
    const cells = [row];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-contact", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/latrobe-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, ["#gdpr"]);
      WebImporter.DOMUtils.remove(element, [".carousel-dots", ".pause-button"]);
      WebImporter.DOMUtils.remove(element, [".awesomplete"]);
      WebImporter.DOMUtils.remove(element, [".hpherocontainer video", ".video-overlay"]);
      element.querySelectorAll(".ds-media-item > meta").forEach((el) => el.remove());
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        "#skip",
        "header#header",
        "footer#footer"
      ]);
      WebImporter.DOMUtils.remove(element, ["form.ds-form"]);
      WebImporter.DOMUtils.remove(element, ["iframe", "link", "noscript"]);
    }
  }

  // tools/importer/transformers/latrobe-sections.js
  var H2 = { before: "beforeTransform", after: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === H2.after) {
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document: element.getRootNode() };
      const sections = payload && payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const reversedSections = [...sections].reverse();
      for (const section of reversedSections) {
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetadataBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetadataBlock);
        }
        if (section !== sections[0]) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "carousel-hero": parse,
    "cards-nav": parse2,
    "cards-stats": parse3,
    "columns-media": parse4,
    "columns-contact": parse5
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "University homepage with hero carousel, course finder, impact stats, study pathways, events and news listings, contact information, and indigenous acknowledgement",
    urls: [
      "https://www.latrobe.edu.au/"
    ],
    blocks: [
      {
        name: "carousel-hero",
        instances: [".hpherocontainer"]
      },
      {
        name: "cards-nav",
        instances: ["#content_container_1318486 .ds-link-list"]
      },
      {
        name: "cards-stats",
        instances: ['[id="1155751"] .ds-proofpoint-set']
      },
      {
        name: "columns-media",
        instances: [".ds-page-content > .ds-block > .ds-column-layout"]
      },
      {
        name: "columns-contact",
        instances: ["#content_container_1156069 ~ .ds-block .ds-column-layout"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Carousel",
        selector: ".hpherocontainer",
        style: null,
        blocks: ["carousel-hero"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Course Finder",
        selector: "#content_container_1318486",
        style: null,
        blocks: ["cards-nav"],
        defaultContent: ["#content_container_1318486 .ds-form .ds-label"]
      },
      {
        id: "section-3",
        name: "Impact Stats",
        selector: ["#content_container_1155755", '[id="1155751"]'],
        style: null,
        blocks: ["cards-stats"],
        defaultContent: ["#content_container_1155755 h2"]
      },
      {
        id: "section-4",
        name: "Start Your Journey",
        selector: "#content_container_1156234",
        style: null,
        blocks: [],
        defaultContent: ["#content_container_1156234 h2", ".ds-link-list--image-left"]
      },
      {
        id: "section-5",
        name: "Events and News",
        selector: ".ds-page-content > .ds-block:has(.ds-column-layout .ds-media-list)",
        style: null,
        blocks: ["columns-media"],
        defaultContent: []
      },
      {
        id: "section-6",
        name: "Contact La Trobe",
        selector: "#content_container_1156069",
        style: null,
        blocks: ["columns-contact"],
        defaultContent: ["#content_container_1156069 h2"]
      },
      {
        id: "section-7",
        name: "Indigenous Acknowledgement",
        selector: ".ds-section--bg-grey",
        style: "dark",
        blocks: [],
        defaultContent: [".ds-section--bg-grey h2", ".ds-section--bg-grey p"]
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
              section: blockDef.section || null
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
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
