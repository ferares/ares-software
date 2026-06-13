import type { SwitchState } from "../../scripts/types";

/**
 * Custom element that renders a two-state toggle switch.
 *
 * Position can be managed externally via {@link set} or internaly via click events
 * that toggle between states automatically. Emits an `ares:switch` event
 * on every state change.
 *
 * @element ares-switch
 * @fires ares:switch - Dispatched on state change.
 */
export class Switch extends HTMLElement {
  private position: SwitchState = "left";
  private indicator: HTMLElement;
  private toggle: HTMLButtonElement;
  private labels: { left: string; right: string };

  constructor() {
    super();
    this.toggle = this.querySelector("[data-js=toggle]") as HTMLButtonElement;
    this.indicator = this.querySelector("[data-js=indicator]") as HTMLElement;
    this.labels = {
      left: this.dataset.labelLeft ?? "",
      right: this.dataset.labelRight ?? "",
    };
  }

  connectedCallback() {
    this.toggle.addEventListener("click", this.clickHandler);
  }

  disconnectedCallback() {
    this.toggle.removeEventListener("click", this.clickHandler);
  }

  /** Toggles the switch to the opposite position on each click. */
  private clickHandler = () => {
    if (this.position === "right") {
      this.set("left");
    } else {
      this.set("right");
    }
  };

  /**
   * Sets the switch to the given state, updating the indicator position,
   * ARIA label, and notifying listeners via an `ares:switch` event.
   *
   * @param state - The target position to move the switch to.
   */
  public set(state: SwitchState) {
    this.position = state;
    const isRight = this.position === "right";
    this.indicator.classList.toggle("switch__indicator--right", isRight);
    this.indicator.classList.toggle("switch__indicator--left", !isRight);
    this.toggle.setAttribute(
      "aria-label",
      isRight ? this.labels.right : this.labels.left,
    );
    window.Ares.emitEvent(this, "ares:switch", { state: this.position });
  }
}