import { defaultLocale } from "../../i18n/config";
import type { AresSwitchEvent } from "../../scripts/types";
import type { Carousel } from "../Carousel/Carousel.ts";
import type { Modal } from "../Modal/Modal.ts";
import type { Switch } from "../Switch/Switch.ts";

export class ProjectsList extends HTMLElement {
  private carousel: Carousel;
  private switch: Switch;
  private modal: Modal;
  private wrapper: HTMLElement;
  private nextBtn: HTMLButtonElement;
  private prevBtn: HTMLButtonElement;
  private initialized = false;

  /**
   * Custom element that manages a list of projects with carousel navigation,
   * a desktop/mobile layout switch, and a modal for viewing project details.
   *
   * Project detail content is fetched on demand when a project button is clicked.
   *
   * @element ares-projects-list
   */
  constructor() {
    super();
    const id = this.dataset["id"];
    this.carousel = this.querySelector(`#${id}-carousel`) as Carousel;
    this.wrapper = this.querySelector("[data-js=wrapper]") as HTMLElement;
    this.switch = this.querySelector(`#${id}-switch`) as Switch;
    this.modal = this.querySelector(`#${id}-modal`) as Modal;
    this.prevBtn = this.querySelector("[data-js=prev]") as HTMLButtonElement;
    this.nextBtn = this.querySelector("[data-js=next]") as HTMLButtonElement;
  }

  connectedCallback() {
    this.prevBtn.addEventListener("click", this.prevClickHandler);
    this.nextBtn.addEventListener("click", this.nextClickHandler);
    this.switch.addEventListener("ares:switch", this.switchHandler);
    if (!this.initialized) {
      this.querySelectorAll("[data-project-id]").forEach((button) =>
        button.addEventListener("click", async () => {
          const projectId = button.getAttribute("data-project-id");
          const title = button.getAttribute("data-project-title") ?? "";
          const locale = window.Astro.currentLocale ?? defaultLocale;
          const response = await fetch(`/${locale}/projects/${projectId}`);
          const content = await response.text();
          this.modal.setContent(content, title);
          this.modal.open();
        }),
      );
      this.initialized = true;
    }
  }

  disconnectedCallback() {
    this.prevBtn.removeEventListener("click", this.prevClickHandler);
    this.nextBtn.removeEventListener("click", this.nextClickHandler);
    this.switch.removeEventListener("ares:switch", this.switchHandler);
  }

  /** Scrolls the carousel to the previous slide. */
  private prevClickHandler = () => this.carousel.nav("prev");

  /** Scrolls the carousel to the next slide. */
  private nextClickHandler = () => this.carousel.nav("next");

  /**
   * Toggles the wrapper between desktop and mobile layout classes
   * in response to an `ares:switch` state change.
   */
  private switchHandler = (event: AresSwitchEvent) => {
    const isDesktop = event.detail.state === "left";
    this.wrapper.classList.toggle("project__carousel--desktop", isDesktop);
    this.wrapper.classList.toggle("project__carousel--mobile", !isDesktop);
  };
}