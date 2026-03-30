import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);

  // Wrap link columns: group each h2 + following ul into a column div
  const linkSection = footer.children[1]; // second div = link columns
  if (linkSection) {
    const wrapper = linkSection.querySelector('.default-content-wrapper');
    if (wrapper) {
      const headings = [...wrapper.querySelectorAll('h2')];
      headings.forEach((h2) => {
        const column = document.createElement('div');
        column.className = 'footer-column';
        const ul = h2.nextElementSibling;
        h2.before(column);
        column.append(h2);
        if (ul && ul.tagName === 'UL') {
          column.append(ul);
        }

        // Mobile accordion
        h2.classList.add('footer-accordion-heading');
        h2.setAttribute('aria-expanded', 'false');
        h2.addEventListener('click', () => {
          const isExpanded = h2.getAttribute('aria-expanded') === 'true';
          h2.setAttribute('aria-expanded', String(!isExpanded));
        });
      });
    }
  }
}
