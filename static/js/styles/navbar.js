import { css } from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

export default css`
h1 {
  margin: 0px;
}
.brand {
  font-size: 1.3em;
}

.navbar {
  color: var(--navbar-font-colour);
  background-color: var(--navbar-background-colour);
  border-bottom: 4px solid var(--navbar-border-colour);
}

.navbar ul {
  margin: 0px;
  list-style: none;
}

.navbar ul li {
  padding: 15px;
}

header {
  font-family: var(--main-font);
  color: var(--font-colour);
}
`;
