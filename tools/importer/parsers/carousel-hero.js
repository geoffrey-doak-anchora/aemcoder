/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-hero. Base: carousel.
 * Source: https://www.latrobe.edu.au/
 * Generated: 2026-03-29
 *
 * Source DOM structure (from .hpherocontainer):
 *   .carousel-slides > .slide (×3) — each has <img> (poster/image)
 *   .innerhpherocontainer > .ds-hero-promo__text (×3) — each has headline, copy, CTA
 *
 * Target table (from Block Collection carousel example):
 *   Each row = 1 slide: col1=image, col2=heading+paragraph+link
 */
export default function parse(element, { document }) {
  // Extract slides (images) from .carousel-slides
  const slides = Array.from(element.querySelectorAll('.carousel-slides > .slide'));

  // Extract text overlays from .innerhpherocontainer
  const textOverlays = Array.from(element.querySelectorAll('.innerhpherocontainer > .ds-hero-promo__text'));

  const cells = [];
  const slideCount = Math.min(slides.length, textOverlays.length);

  for (let i = 0; i < slideCount; i++) {
    const slide = slides[i];
    const overlay = textOverlays[i];

    // Col 1: slide image (poster frame <img> inside .slide)
    const img = slide.querySelector('img');
    const imageCell = [];
    if (img) {
      imageCell.push(img);
    }

    // Col 2: heading + description + CTA link
    const contentCell = [];

    // Heading (found: <p class="reg-headline-l">)
    const heading = overlay.querySelector('.reg-headline-l');
    if (heading) {
      const h2 = document.createElement('h2');
      h2.textContent = heading.textContent.trim();
      contentCell.push(h2);
    }

    // Description (found: <p class="reg-support-copy">)
    const description = overlay.querySelector('.reg-support-copy');
    if (description) {
      contentCell.push(description);
    }

    // CTA link (found: <a class="ds-hero-promo__CTA-tablet-up">)
    const cta = overlay.querySelector('a.ds-hero-promo__CTA-tablet-up, a.ds-btn-primary');
    if (cta) {
      const link = document.createElement('a');
      link.href = cta.href;
      link.textContent = cta.textContent.trim();
      const p = document.createElement('p');
      p.appendChild(link);
      contentCell.push(p);
    }

    cells.push([imageCell, contentCell]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-hero', cells });
  element.replaceWith(block);
}
