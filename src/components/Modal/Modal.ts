/**
 * Custom element that wraps a native `<dialog>` with animated show/hide behavior.
 *
 * Content and title are set programmatically via {@link setContent}.
 * Closing is triggered by the close button or clicking the backdrop.
 *
 * @element ares-modal
 */
export class Modal extends HTMLElement {
  private content: HTMLElement;
  private body: HTMLElement;
  private header: HTMLElement;
  private dialog: HTMLDialogElement;
  private closeBtn: HTMLButtonElement;
  private hiding = false;

  constructor() {
    super();
    this.content = this.querySelector("[data-js=content]") as HTMLElement;
    this.body = this.querySelector("[data-js=body]") as HTMLElement;
    this.header = this.querySelector("[data-js=header]") as HTMLElement;
    this.dialog = this.querySelector("[data-js=dialog]") as HTMLDialogElement;
    this.closeBtn = this.querySelector(
      "[data-js=close]",
    ) as HTMLButtonElement;
  }

  connectedCallback() {
    this.dialog.addEventListener("click", this.outsideClickHandler);
    this.dialog.addEventListener("transitionend", this.transitionEndHandler);
    this.closeBtn.addEventListener("click", this.startHiding);
  }

  disconnectedCallback() {
    this.dialog.removeEventListener("click", this.outsideClickHandler);
    this.dialog.removeEventListener(
      "transitionend",
      this.transitionEndHandler,
    );
    this.closeBtn.removeEventListener("click", this.startHiding);
  }

  /** Closes the modal when the user clicks the `<dialog>` backdrop. */
  private outsideClickHandler = (event: PointerEvent) => {
    if (event.target === this.dialog) {
      this.startHiding();
    }
  };

  /**
   * Finalizes the close sequence after the hide transition completes.
   * Calls `dialog.close()` and resets hiding state and CSS class.
   */
  private transitionEndHandler = () => {
    if (this.hiding) {
      this.dialog.close();
      this.hiding = false;
      this.dialog.classList.remove("hide");
    }
  };

  /**
   * Sets the modal's body content and optionally renders a title heading.
   * The generated title is linked to the dialog via `aria-labelledby`.
   *
   * @param content - HTML string to inject into the modal body.
   * @param title - Optional title text rendered as an `<h2>` in the header.
   */
  public setContent = (content: string, title?: string) => {
    this.body.innerHTML = content;
    if (title) {
      const titleElement = document.createElement("h2");
      titleElement.classList.add("modal__title");
      titleElement.id = `modal-${this.id}-title`;
      titleElement.innerText = title;
      this.dialog.setAttribute("aria-labelledby", titleElement.id);
      this.header.replaceChildren(titleElement);
    }
  };

  /**
   * Initiates the hide transition by adding the `hide` class.
   * The dialog is fully closed once `transitionend` fires.
   */
  private startHiding = () => {
    this.hiding = true;
    this.dialog.classList.add("hide");
  };

  public open = () => {
    this.dialog.showModal();
    this.content.scrollTo({ top: 0 })
  };
}