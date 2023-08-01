// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }





// module.exports = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       screens: {
//         'xl': '1280px',
//       },
//     },
//   },
//   variants: {},
//   plugins: [],
// };






// // tailwind.config.js

// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
//   corePlugins: {},
//   variants: {},
//   layers: {
//     xl: {
//       utilities: {
//         'w-auto': 'width: auto',
//         'h-full': 'height: 100%',
//         'justify-between': 'justify-content: space-between',
//         'flex-col': 'flex-direction: column',
//         'py-8': 'padding-top: 2rem; padding-bottom: 2rem',
//         'px-36': 'padding-left: 9rem; padding-right: 9rem',
//         'p-8': 'padding: 2rem',
//         'p-6': 'padding: 1.5rem',
//         'max-w-xl': 'max-width: 36rem',
//         'gap-7': 'gap: 1.75rem',
//       },
//     },
//   },
// };





// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      utilities: {
        'xl:w-auto': 'width: auto',
        'xl:h-full': 'height: 100%',
        'xl:justify-between': 'justify-content: space-between',
        'xl:flex-col': 'flex-direction: column',
        'xl:py-8': 'padding-top: 2rem; padding-bottom: 2rem',
        'xl:px-36': 'padding-left: 9rem; padding-right: 9rem',
        'xl:p-8': 'padding: 2rem',
        'xl:p-6': 'padding: 1.5rem',
        'xl:max-w-xl': 'max-width: 36rem',
        'xl:gap-7': 'gap: 1.75rem',
      },
    },
  },
  plugins: [],
  corePlugins: {},
  variants: {},
};
