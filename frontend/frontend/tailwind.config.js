/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#fdf3e7',
        'peach': '#ffd8b8',
        'lavender': '#c4b5fd',
        'mint': '#86efac',
        'warm-brown': '#8b4513',
        'soft-gold': '#f4e4bc',
        'story-purple': '#9333ea',
        'magic-pink': '#ec4899'
      },
      fontFamily: {
        'story': ['Crimson Text', 'serif'],
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'twinkle': 'twinkle 1.5s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-out'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(196, 181, 253, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(196, 181, 253, 0.8)' }
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      backgroundImage: {
        'magic-gradient': 'linear-gradient(135deg, #fdf3e7 0%, #ffd8b8 50%, #c4b5fd 100%)',
        'storybook': 'linear-gradient(45deg, #8b4513 0%, #d2691e 50%, #8b4513 100%)'
      }
    }
  },
  plugins: []
}