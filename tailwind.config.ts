import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        flow: {
          true: "hsl(var(--flow-true))",
          false: "hsl(var(--flow-false))",
          neutral: "hsl(var(--flow-neutral))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { 
            opacity: "1", 
            transform: "scale(1)",
            filter: "brightness(1)"
          },
          "50%": { 
            opacity: "0.9", 
            transform: "scale(1.08)",
            filter: "brightness(1.3)"
          },
        },
        "flow-pulse": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "25%": { transform: "translateY(-8px) rotate(1deg)" },
          "75%": { transform: "translateY(4px) rotate(-1deg)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow-pulse": {
          "0%, 100%": { 
            boxShadow: "0 0 20px hsl(174 100% 50% / 0.3), 0 0 40px hsl(174 100% 50% / 0.1)"
          },
          "50%": { 
            boxShadow: "0 0 40px hsl(174 100% 50% / 0.5), 0 0 80px hsl(174 100% 50% / 0.2)"
          },
        },
        "slide-up-fade": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-bounce": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "ripple": {
          "0%": { transform: "scale(0.8)", opacity: "1" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
        "path-draw": {
          "0%": { strokeDasharray: "0 1000" },
          "100%": { strokeDasharray: "1000 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "flow-pulse": "flow-pulse 2s linear infinite",
        "float": "float 4s ease-in-out infinite",
        "spin-slow": "spin-slow 12s linear infinite",
        "bounce-soft": "bounce-soft 2s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "slide-up-fade": "slide-up-fade 0.5s ease-out",
        "scale-bounce": "scale-bounce 0.4s ease-out",
        "ripple": "ripple 0.6s ease-out",
        "path-draw": "path-draw 1s ease-out forwards",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
