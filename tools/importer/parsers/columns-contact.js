/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-contact. Base: columns.
 * Source: https://www.latrobe.edu.au/
 * Generated: 2026-03-29
 *
 * Source DOM structure (from #content_container_1156069 ~ .ds-block .ds-column-layout):
 *   .ds-column-layout > .ds-column-layout__column (×3)
 *     Each column: p.h4 with category label + <br> + a.h3 with phone number
 *     Col1: "Current students" / 1300 528 762
 *     Col2: "Future International students" / (+61 3) 9479 1993
 *     Col3: "Future students" / 1300 135 045
 *
 * Target table (from Block Collection columns example):
 *   1 row with 3 columns of mixed content
 */
export default function parse(element, { document }) {
  // Get the three columns
  const columns = Array.from(element.querySelectorAll(':scope > .ds-column-layout__column'));

  const row = [];

  for (const col of columns) {
    const cellContent = [];

    // Each column has a paragraph with category label and phone link
    // Found: <p class="h4">Category<br><a href="tel:..." class="h3">number</a></p>
    const paragraph = col.querySelector('p.h4, p');
    if (paragraph) {
      cellContent.push(paragraph);
    }

    row.push(cellContent);
  }

  const cells = [row];
  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-contact', cells });
  element.replaceWith(block);
}
