export class Dropdown extends HTMLElement {
  open() {
    this.classList.add("show");
    this.ariaHidden = "false";
  }

  close() {
    this.classList.remove("show");
    this.ariaHidden = "true";
  }
}