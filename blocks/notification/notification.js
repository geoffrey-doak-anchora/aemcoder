import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  const fragmentPath = '/notification';
  const fragment = await loadFragment(fragmentPath);

  if (fragment) {
    const banner = document.createElement('div');
    banner.className = 'notification-banner';

    while (fragment.firstElementChild) {
      const child = fragment.firstElementChild;
      // Extract text and button from the fragment paragraphs
      const paragraphs = child.querySelectorAll('p');
      paragraphs.forEach((p) => {
        banner.append(p);
      });
      child.remove();
    }

    // Style the allow cookies link as a button
    const allowLink = banner.querySelector('a[href="#allow-cookies"]');
    if (allowLink) {
      allowLink.className = 'notification-allow-btn';
      allowLink.addEventListener('click', (e) => {
        e.preventDefault();
        block.closest('.section').remove();
      });
    }

    block.textContent = '';
    block.append(banner);
  }
}
