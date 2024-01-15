/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "node_modules/flowbite-react/lib/esm/**/*.js"],
  theme: {
    extend: {
      backgroundSize: {
        "size-200": "200% 200%",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
