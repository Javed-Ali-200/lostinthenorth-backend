// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         poppins: ["Poppins", "sans-serif"],
//       },
//       colors: {
//         main: "#8e44ad",
//         black: "#222",
//         white: "#fff",
//         lightBlack: "#777",
//         lightWhite: "rgba(255, 255, 255, 0.9)",
//         darkBg: "rgba(0, 0, 0, 0.7)",
//         lightBg: "#eee",
//       },
//       borderWidth: {
//         '1': '1px',
//       },
//       animation: {
//         fadeIn: "fadeIn 0.3s linear backwards",
//       },
//       keyframes: {
//         fadeIn: {
//           "0%": { transform: "scale(0)", opacity: "0" },
//         }
//       }
//     },
//   },
//   plugins: [
//     require('tailwindcss-textshadow'),
//     function({ addUtilities }) {
//       const newUtilities = {
//         '.text-shadow-custom': {
//           textShadow: '0 1.5rem 3rem rgba(0, 0, 0, 0.3)',
//         },
//         '.box-shadow-custom': {
//           boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.1)',
//         },
//       }
//       addUtilities(newUtilities)
//     }
//   ],
// }