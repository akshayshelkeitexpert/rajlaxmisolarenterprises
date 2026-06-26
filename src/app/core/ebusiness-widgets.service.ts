import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

/**
 * Re-runs template widget inits after Angular renders a route (Swiper, AOS, etc.).
 * The stock main.js runs only on `window.load`, which breaks SPA navigation.
 */
@Injectable({ providedIn: 'root' })
export class EbusinessWidgetsService {
  private readonly router = inject(Router);
  private glightboxInstance: { destroy: () => void } | null = null;
  private readonly isotopeFiltersBound = new WeakSet<Element>();
  /** Coalesce NavigationEnd + ngAfterViewInit so PureCounter is not constructed twice on the same view. */
  private refreshCoalesceTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe(() => {
      this.scheduleRefresh();
    });
  }

  /** Invoke once after bootstrap (covers initial navigation) */
  initAfterBootstrap(): void {
    this.scheduleRefresh();
  }

  private scheduleRefresh(): void {
    if (this.refreshCoalesceTimer !== null) {
      clearTimeout(this.refreshCoalesceTimer);
    }
    this.refreshCoalesceTimer = setTimeout(() => {
      this.refreshCoalesceTimer = null;
      this.refresh();
    }, 150);
  }

  refresh(): void {
    this.destroySwipers();
    this.initAOS();
    this.resetPureCounterElements();
    try {
      new PureCounter();
    } catch {
      /* ignore */
    }
    this.initSwipers();
    this.initGLightbox();
    this.initIsotopeLayouts();
    this.bindFaqToggles();
    window.scrollTo(0, 0);
  }

  /**
   * PureCounter sets data-purecounter-duration="0" after a run; a second new PureCounter() on the same
   * nodes then skips animation. Reset text and duration so re-inits and SPA revisits work.
   */
  private resetPureCounterElements(): void {
    document.querySelectorAll('.purecounter').forEach((el) => {
      const node = el as HTMLElement;
      const start = node.getAttribute('data-purecounter-start') ?? '0';
      node.textContent = start;
      if (node.getAttribute('data-purecounter-duration') === '0') {
        node.removeAttribute('data-purecounter-duration');
      }
    });
  }

  private bindFaqToggles(): void {
    document.querySelectorAll('.faq-item:not([data-ebusiness-faq])').forEach((item) => {
      item.setAttribute('data-ebusiness-faq', '1');
      item.querySelectorAll('h3, .faq-toggle, .faq-header').forEach((el) => {
        el.addEventListener('click', () => {
          item.classList.toggle('faq-active');
        });
      });
    });
  }

  private initAOS(): void {
    if (typeof AOS === 'undefined') return;
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
    AOS.refresh();
  }

  private destroySwipers(): void {
    if (typeof Swiper === 'undefined') return;
    document.querySelectorAll('.swiper').forEach((el) => {
      const inst = (el as unknown as { swiper?: { destroy: (a?: boolean, b?: boolean) => void } }).swiper;
      if (inst) inst.destroy(true, true);
    });
  }

  private initSwipers(): void {
    if (typeof Swiper === 'undefined') return;
    document.querySelectorAll('.init-swiper').forEach((swiperElement) => {
      let config: Record<string, unknown> | null = null;
      const cfgEl = swiperElement.querySelector('.swiper-config');
      if (cfgEl) {
        try {
          config = JSON.parse(cfgEl.textContent?.trim() || (cfgEl as HTMLElement).innerHTML.trim()) as Record<string, unknown>;
        } catch {
          config = null;
        }
      }
      if (!config && swiperElement.hasAttribute('data-swiper-config')) {
        try {
          const raw = swiperElement.getAttribute('data-swiper-config');
          if (raw) config = JSON.parse(raw) as Record<string, unknown>;
        } catch {
          config = null;
        }
      }
      if (!config) return;
      try {
        new Swiper(swiperElement as HTMLElement, config);
      } catch {
        /* ignore */
      }
    });
  }

  private initGLightbox(): void {
    if (typeof GLightbox === 'undefined') return;
    this.glightboxInstance?.destroy();
    this.glightboxInstance = GLightbox({ selector: '.glightbox' });
  }

  private initIsotopeLayouts(): void {
    if (typeof Isotope === 'undefined' || typeof imagesLoaded === 'undefined') return;

    document.querySelectorAll('.isotope-layout').forEach((isotopeItem) => {
      const container = isotopeItem.querySelector('.isotope-container') as HTMLElement | null;
      if (!container) return;

      const prev = (container as unknown as { _iso?: { destroy: () => void } })._iso;
      prev?.destroy();

      const layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
      const filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      const sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

      imagesLoaded(container, () => {
        const iso = new Isotope(container, {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter,
          sortBy: sort,
        });
        (container as unknown as { _iso: typeof iso })._iso = iso;
      });

      if (this.isotopeFiltersBound.has(isotopeItem)) return;
      this.isotopeFiltersBound.add(isotopeItem);

      isotopeItem.querySelectorAll('.isotope-filters li').forEach((li) => {
        li.addEventListener(
          'click',
          function (this: HTMLLIElement) {
            const iso = (container as unknown as { _iso?: InstanceType<typeof Isotope> })._iso;
            if (!iso) return;
            isotopeItem.querySelector('.isotope-filters .filter-active')?.classList.remove('filter-active');
            this.classList.add('filter-active');
            iso.arrange({ filter: this.getAttribute('data-filter') ?? '*' });
            if (typeof AOS !== 'undefined') AOS.refresh();
          },
          { passive: true }
        );
      });
    });
  }
}
