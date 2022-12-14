module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    scale: {
      0: "0",
      25: ".25",
      50: ".5",
      75: ".75",
      90: ".9",
      95: ".95",
      100: "1",
      105: "1.05",
      110: "1.1",
      125: "1.25",
      150: "1.5",
      200: "2",
    },
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "active"],
    scale: ["responsive", "hover", "focus", "active"],
    transform: ["responsive", "active", "hover"],
    transformOrigin: ["responsive", "active", "hover"],
    transitionDelay: ["responsive", "active", "hover"],
    transitionDuration: ["responsive", "active", "hover"],
    transitionProperty: ["responsive", "active", "hover"],
    transitionTimingFunction: ["responsive", "active", "hover"],
    translate: ["responsive", "hover", "focus", "active"],
  },
  plugins: [],
};
