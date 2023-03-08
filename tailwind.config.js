module.exports = {
  content: [
    "./src/app/**/*.tsx",
    "./src/components/**/*.tsx",
    "./src/commons/components/**/*.tsx",
  ],
  theme: {
    extend: {
      keyframes: {
        appear: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        appear: "appear 300ms ease-in-out",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
};
