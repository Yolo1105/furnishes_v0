/**
 * Every colour lives once, as a token in globals.css: modules name tokens, never
 * a raw value. The three breakpoints are the only widths a module may switch on.
 */
const config = {
  extends: ["stylelint-config-standard"],
  rules: {
    "color-no-hex": [true, { severity: "error" }],
    "color-named": ["never", { severity: "error" }],
    "media-query-no-invalid": true,
    // the three breakpoints, and no others
    "media-feature-name-value-allowed-list": { width: ["640px", "1024px", "1440px"] },
    "selector-class-pattern": null,
    "custom-property-pattern": null,
    "keyframes-name-pattern": null,
    "value-keyword-case": "lower",
    // CSS Modules: `composes` shares a global class with a module's own
    "property-no-unknown": [true, { ignoreProperties: ["composes"] }],
    // `from` and `to` read as what they are in a two-step keyframe
    "keyframe-selector-notation": null,
    // state selectors ([data-on], [data-step]) follow the base rule they change
    "no-descending-specificity": null,
  },
  overrides: [
    {
      // the tokens' own home
      files: ["src/app/globals.css"],
      rules: { "color-no-hex": null },
    },
  ],
};

export default config;
