import type { AresSwitchEvent } from "../../scripts/types";
import type { Switch } from "../Switch/Switch.ts";

export class VideoPlayer extends HTMLElement {
  private switch: Switch;

  constructor() {
    super();
    this.switch = this.querySelector("ares-switch") as Switch;
  }

  connectedCallback() {
    this.switch.addEventListener("ares:switch", this.switchHandler);
  }

  disconnectedCallback() {
    this.switch.removeEventListener("ares:switch", this.switchHandler);
  }

  private switchHandler = (event: AresSwitchEvent) => {
    console.log(event);
    const isDesktop = event.detail.state === "right";
    this.classList.toggle("video--mobile", !isDesktop);
    this.classList.toggle("video--desktop", isDesktop);
  };
}