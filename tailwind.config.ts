import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shvr: {
          "0%": { transform: "translate(1px)" },
          "50%": { transform: "translate(0)" },
          "100%": { transform: "translate(-1px)" },
        },
        eye: {
          "0%, 30%, 55%, 90%, 100%": { transform: "translate(0, 0)" },
          "10%, 25%": { transform: "translate(0, 20px)" },
          "65%": { transform: "translate(-20px, 0)" },
          "80%": { transform: "translate(20px, 0)" },
        },
        "text-show": {
          to: { textIndent: "-373px" },
        },
      },
      animation: {
        shvr: "shvr 0.2s infinite",
        eye: "eye 2.5s infinite",
        "text-show": "text-show 2s infinite steps(3)",
      },
    },

  },
  plugins: [],
} satisfies Config;
