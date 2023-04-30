
export class Media {
  static isNarrowDevice() {
    return window.matchMedia("(max-width: 600px)").matches;
  }
}
