/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-stats. Base: cards.
 * Source: https://www.latrobe.edu.au/
 * Generated: 2026-03-29
 *
 * Source DOM structure (from #1155751 .ds-proofpoint-set):
 *   .ds-proofpoint-set > .ds-proofpoint (×4)
 *     each has: img.ds-proofpont__icon + .ds-proofpoint__body
 *       body has: h3.ds-proofpoint__title + p.ds-proofpoint__text + p.ds-proofpoint__footnote > a
 *
 * Target table (from Block Collection cards example):
 *   2 columns, each row = 1 card: col1=icon image, col2=heading+paragraph+link
 */
export default function parse(element, { document }) {
  // Extract proof-point items
  const proofpoints = Array.from(element.querySelectorAll('.ds-proofpoint'));

  const cells = [];

  for (const pp of proofpoints) {
    // Col 1: icon image (found: img.ds-proofpont__icon - note typo in source)
    const icon = pp.querySelector('img.ds-proofpont__icon, img[class*="proofpo"]');
    const imageCell = [];
    if (icon) {
      imageCell.push(icon);
    }

    // Col 2: title + text + link
    const contentCell = [];

    // Title (found: h3.ds-proofpoint__title)
    const title = pp.querySelector('h3.ds-proofpoint__title, .ds-proofpoint__title');
    if (title) {
      contentCell.push(title);
    }

    // Description text (found: p.ds-proofpoint__text)
    const text = pp.querySelector('p.ds-proofpoint__text, .ds-proofpoint__text');
    if (text) {
      contentCell.push(text);
    }

    // CTA link (found: p.ds-proofpoint__footnote > a)
    const footnote = pp.querySelector('.ds-proofpoint__footnote');
    if (footnote) {
      const link = footnote.querySelector('a');
      if (link) {
        const p = document.createElement('p');
        const a = document.createElement('a');
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

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-stats', cells });
  element.replaceWith(block);
}
