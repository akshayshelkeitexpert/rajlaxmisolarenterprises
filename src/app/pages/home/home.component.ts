import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  /** Serialized for Swiper on the host element (no script tag in Angular templates). */
  readonly heroSwiperConfig = JSON.stringify({
    loop: true,
    speed: 700,
    autoplay: {
      delay: 5500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.hero-banner-swiper .swiper-pagination',
      clickable: true,
    },
    slidesPerView: 1,
    spaceBetween: 0,
    effect: 'fade',
    fadeEffect: { crossFade: true },
  });
}
