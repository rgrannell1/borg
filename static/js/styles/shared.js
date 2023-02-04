import { css } from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

export default css`
:host {
  --navbar-font-colour: hsl(0, 0%, 100%);
  --navbar-background-colour: hsl(0, 100%, 50%);
  --navbar-border-colour: hsl(0, 99%, 34%);
  --font-colour: hsl(0, 0%, 20%);
  --input-border: hsl(0, 0%, 0%);

  /* default button colours */
  --button-default-background-colour: hsl(216, 100%, 60%);
  --button-default-hover-background-colour: hsl(216, 66%, 41%);

  /* ok button colours */
  --button-ok-background-colour: hsl(112, 100%, 50%);
  --button-ok-hover-background-colour: hsl(112, 100%, 40%);

  /* error button colours */
  --button-error-background-colour: hsl(0, 100%, 50%);
  --button-error-hover-background-colour: hsl(0, 100%, 35%);

  /* unauthorized button colours */
  --button-unauthorized-background-colour: hsl(0, 0%, 54%);
  --button-unauthorized-hover-background-colour: hsl(0, 0%, 0%);

  /* button text colours */
  --button-error-colour: hsl(0, 0%, 100%);
  --button-unauthorized-colour: hsl(0, 0%, 100%);
  --button-ok-colour: hsl(217, 28%, 13%);

  --main-font: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

main {
  font-family: var(--main-font);
  color: var(--font-colour);
  padding: 80px 40px;
  text-align: center;
}
`;
