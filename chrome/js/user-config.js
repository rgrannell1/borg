
import { HttpPublisher } from "./publisher.js";

/*
 * User configuration
 *
 */
export function userConfig () {
  return {
    webhooks:  [
      new HttpPublisher({
        url: "https://rgrannell.xyx/api/things"
      }),
    ],
  }
}