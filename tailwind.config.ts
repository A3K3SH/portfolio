import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
    darkMode: ['class'],
    content: [
  './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  './src/app/**/*.{js,ts,jsx,tsx,mdx}',
 ],
 theme: {
 	extend: {
 		colors: {
 			background: 'hsl(var(--background))',
 			foreground: 'hsl(var(--foreground))',
 			'theme-background': 'var(--theme-background)',
 			'theme-primary': 'var(--theme-primary)',
 			'theme-secondary': 'var(--theme-secondary)',
 			'theme-accent': 'var(--theme-accent)',
 			card: {
 				DEFAULT: 'hsl(var(--card))',
 				foreground: 'hsl(var(--card-foreground))'
 			},
 			popover: {
 				DEFAULT: 'hsl(var(--popover))',
 				foreground: 'hsl(var(--popover-foreground))'
 			},
 			primary: {
 				DEFAULT: 'hsl(var(--primary))',
 				foreground: 'hsl(var(--primary-foreground))'
 			},
 			secondary: {
 				DEFAULT: 'hsl(var(--secondary))',
 				foreground: 'hsl(var(--secondary-foreground))'
 			},
 			muted: {
 				DEFAULT: 'hsl(var(--muted))',
 				foreground: 'hsl(var(--muted-foreground))'
 			},
 			accent: {
 				DEFAULT: 'hsl(var(--accent))',
 				foreground: 'hsl(var(--accent-foreground))'
 			},
 			destructive: {
 				DEFAULT: 'hsl(var(--destructive))',
 				foreground: 'hsl(var(--destructive-foreground))'
 			},
 			border: 'hsl(var(--border))',
 			input: 'hsl(var(--input))',
 			ring: 'hsl(var(--ring))',
 			chart: {
 				'1': 'hsl(var(--chart-1))',
 				'2': 'hsl(var(--chart-2))',
 				'3': 'hsl(var(--chart-3))',
 				'4': 'hsl(var(--chart-4))',
 				'5': 'hsl(var(--chart-5))'
 			}
 		},
 		keyframes: {
 			grow: {
 				'0%, 100%': {
 					width: '100%'
 				},
 				'50%': {
 					width: '50%'
 				}
 			},
 			'draw-and-wave': {
 				'0%': {
 					strokeDashoffset: '3000',
 					transform: 'translateY(0px)'
 				},
 				'50%': {
 					strokeDashoffset: '0',
 					transform: 'translateY(0px)'
 				},
 				'75%': {
 					transform: 'translateY(-10px)'
 				},
 				'100%': {
 					transform: 'translateY(0px)'
 				}
 			}
 		},
 		animation: {
 			grow: 'grow 1s ease-in-out infinite',
 			'draw-and-wave': 'draw-and-wave 6s ease-in-out infinite'
 		},
 		borderRadius: {
 			lg: 'var(--radius)',
 			md: 'calc(var(--radius) - 2px)',
 			sm: 'calc(var(--radius) - 4px)'
 		}
 	}
 },
 plugins: [typography, require("tailwindcss-animate")],
};
export default config;
