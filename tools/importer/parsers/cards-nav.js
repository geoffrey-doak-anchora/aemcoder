/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-nav. Base: cards (no images variant).
 * Source: https://www.latrobe.edu.au/
 * Generated: 2026-03-29
 *
 * Source DOM structure (from #content_container_1318486 .ds-link-list):
 *   ul.ds-link-list.ds-link-list--2-cols > li.ds-link-list__item (×10+)
 *     each li has: a.ds-link-list__link with discipline name and href
 *
 * Target table (from Block Collection cards no-images example):
 *   1 column, each row = 1 card with text content (link)
 */
export default function parse(element, { document }) {
  // Extract discipline link items
  const items = Array.from(element.querySelectorAll('.ds-link-list__item'));

  const cells = [];

  for (const item of items) {
    const link = item.querySelector('a.ds-link-list__link, a');
    if (link) {
      // Create a paragraph with the link for each card
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.textContent.trim();
      p.appendChild(a);
      cells.push([p]);
    }
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-nav', cells });
  element.replaceWith(block);
}
