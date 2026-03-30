import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  const fragmentPath = '/search';
  const fragment = await loadFragment(fragmentPath);

  if (fragment) {
    block.textContent = '';
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';

    while (fragment.firstElementChild) {
      const child = fragment.firstElementChild;
      child.querySelectorAll('h2, p').forEach((el) => searchContainer.append(el));
      child.remove();
    }

    // Find the search link and convert to input + button
    const searchLink = searchContainer.querySelector('a[href*="search"]');
    const placeholderP = searchContainer.querySelector('p:not(:has(a))');

    if (searchLink && placeholderP) {
      const form = document.createElement('div');
      form.className = 'search-form';

      const inputWrapper = document.createElement('div');
      inputWrapper.className = 'search-input-wrapper';

      const icon = document.createElement('span');
      icon.className = 'search-icon';
      icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>';

      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = placeholderP.textContent;
      input.className = 'search-input';

      const button = document.createElement('a');
      button.href = searchLink.href;
      button.className = 'search-button';
      button.textContent = 'Search';

      inputWrapper.append(icon, input);
      form.append(inputWrapper, button);

      // Remove the placeholder text and link paragraphs
      placeholderP.remove();
      searchLink.closest('p').remove();

      searchContainer.append(form);
    }

    block.append(searchContainer);
  }
}
