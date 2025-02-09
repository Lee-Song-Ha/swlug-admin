/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
    container: {
      screens: {
        sm: "100%", // 작은 화면에서는 100%
        md: "768px", // 중간 화면에서는 768px
        lg: "1024px", // 큰 화면에서는 1024px
        xl: "1280px", // 초대형 화면에서는 1280px
      },
    },
  },
  plugins: [],
}

