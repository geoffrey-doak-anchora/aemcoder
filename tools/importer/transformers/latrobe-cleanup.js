/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: La Trobe University cleanup.
 * Removes non-authorable content from the DOM.
 * Selectors from captured DOM of https://www.latrobe.edu.au/
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove cookie consent banner (found: <p id="gdpr"> with #gdpr-button)
    WebImporter.DOMUtils.remove(element, ['#gdpr']);

    // Remove carousel UI controls (dots and pause button - non-authorable)
    WebImporter.DOMUtils.remove(element, ['.carousel-dots', '.pause-button']);

    // Remove autocomplete widget inside course finder form
    WebImporter.DOMUtils.remove(element, ['.awesomplete']);

    // Remove video elements and overlays from hero (import images only)
    WebImporter.DOMUtils.remove(element, ['.hpherocontainer video', '.video-overlay']);

    // Remove <meta> tags inside media items (non-content)
    element.querySelectorAll('.ds-media-item > meta').forEach((el) => el.remove());
  }

  if (hookName === H.after) {
    // Remove non-authorable site chrome
    // Found: <a id="skip">, <header id="header">, <footer id="footer">
    WebImporter.DOMUtils.remove(element, [
      '#skip',
      'header#header',
      'footer#footer',
    ]);

    // Remove form elements (course search is dynamic, not authorable)
    // Found: <form class="ds-form ds-form--full-width"> inside #content_container_1318486
    WebImporter.DOMUtils.remove(element, ['form.ds-form']);

    // Remove safe non-content elements
    WebImporter.DOMUtils.remove(element, ['iframe', 'link', 'noscript']);
  }
}
