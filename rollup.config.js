// rollup.config.js
import typescript from "@rollup/plugin-typescript";

export default {
  input: "./static/ts/views/app.ts",
  output: {
    dir: "static/js",
    format: "es",
  },
  plugins: [typescript()],
};
