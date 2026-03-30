/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-media. Base: columns.
 * Source: https://www.latrobe.edu.au/
 * Generated: 2026-03-29
 *
 * Source DOM structure (from .ds-page-content > .ds-block > .ds-column-layout):
 *   .ds-column-layout > .ds-column-layout__column (×2)
 *     Left column: h2 "What's on at La Trobe" + ul.ds-media-list (4 events) + "More events" link
 *     Right column: h2 "Breaking news" + ul.ds-media-list (4 news items) + "More news" link
 *     Each media item: .ds-media-item with img, h4>a (title), p (date or description)
 *
 * Target table (from Block Collection columns example):
 *   1 row with 2 columns of mixed content
 */
export default function parse(element, { document }) {
  // Get the two columns
  const columns = Array.from(element.querySelectorAll(':scope > .ds-column-layout__column'));

  const row = [];

  for (const col of columns) {
    const cellContent = [];

    // Column heading (found: h2 inside column)
    const heading = col.querySelector('h2');
    if (heading) {
      cellContent.push(heading);
    }

    // Media list items (found: ul.ds-media-list > li.ds-media-item)
    const mediaItems = Array.from(col.querySelectorAll('.ds-media-item'));
    for (const item of mediaItems) {
      // Image thumbnail
      const img = item.querySelector('img.ds-media-item__img, img');
      if (img) {
        cellContent.push(img);
      }

      // Title with link (found: h4 > a or .ds-media-item__body h4)
      const titleLink = item.querySelector('.ds-media-item__body h4 a, .ds-media-item__body h4');
      if (titleLink) {
        if (titleLink.tagName === 'A') {
          const h4 = document.createElement('h4');
          const a = document.createElement('a');
          a.href = titleLink.href;
          a.textContent = titleLink.textContent.trim();
          h4.appendChild(a);
          cellContent.push(h4);
        } else {
          cellContent.push(titleLink);
        }
      }

      // Description/date (found: .ds-media-item__body > p)
      const desc = item.querySelector('.ds-media-item__body > p');
      if (desc) {
        cellContent.push(desc);
      }
    }

    // CTA link at bottom (found: a.ds-btn-secondary)
    const ctaContainer = col.querySelector('.ds-block__wrapper + p, .ds-block > p');
    if (!ctaContainer) {
      // Try finding the CTA link directly
      const ctaLink = col.querySelector('a.ds-btn-secondary, a.ds-icon-chevron-right');
      if (ctaLink) {
        const p = document.createElement('p');
        const a = document.createElement('a');
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
  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-media', cells });
  element.replaceWith(block);
}
