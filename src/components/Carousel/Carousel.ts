import embla, { type EmblaCarouselType } from "embla-carousel";

/**
 * Custom element that wraps an Embla carousel instance.
 *
 * Initializes the carousel when connected to the DOM and destroys
 * it on disconnection to prevent memory leaks.
 *
 * @element ares-carousel
 * @see https://www.embla-carousel.com
 */
export class Carousel extends HTMLElement {
  private emblaApi: EmblaCarouselType | null = null;

  connectedCallback() {
    this.emblaApi = embla(this, {
      align: "center",
      loop: true,
      dragFree: true,
      breakpoints: { "(prefers-reduced-motion)": { duration: 0 } },
    });
  }

  disconnectedCallback() {
    this.emblaApi?.destroy();
    this.emblaApi = null;
  }

  /**
   * Scrolls the carousel to the previous or next slide.
   * Intended to be called by external nav button elements.
   */
  public nav = (direction: "prev" | "next") => {
    if (direction === "next") this.emblaApi?.scrollNext();
    else this.emblaApi?.scrollPrev();
  };
}