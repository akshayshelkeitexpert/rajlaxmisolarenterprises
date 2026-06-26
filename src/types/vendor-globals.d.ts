/* Global libraries loaded via angular.json scripts */
declare const AOS: {
  init: (options: Record<string, unknown>) => void;
  refresh: () => void;
  refreshHard: () => void;
};

declare const Swiper: new (el: HTMLElement | string, options: Record<string, unknown>) => {
  destroy: (deleteListeners?: boolean, cleanStyles?: boolean) => void;
};

declare const GLightbox: (options: { selector: string }) => { destroy: () => void };

declare const Isotope: new (
  el: HTMLElement,
  options: Record<string, unknown>
) => {
  destroy: () => void;
  arrange: (opts: { filter?: string }) => void;
};

declare function imagesLoaded(el: Element | string, callback: () => void): void;

declare class PureCounter {
  constructor(options?: Record<string, unknown>);
}
