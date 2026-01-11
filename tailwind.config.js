/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm sunrise palette
        warm: {
          cream: '#FFF8F0',
          peach: '#FFB4A2',
          coral: '#FF8C7A',
          sunset: '#FF6B6B',
          amber: '#FFD93D',
          honey: '#FFC857',
          sky: '#A8DADC',
          soft: '#F4ACB7',
        }
      },
      fontFamily: {
        display: ['Fredoka', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.4s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        }
      },
      boxShadow: {
        'warm': '0 4px 20px rgba(255, 107, 107, 0.15)',
        'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
