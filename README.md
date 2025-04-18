# Shoppin - Product Discovery App

A Tinder-like product discovery app built with React and Capacitor.js. Users can swipe through products to like, pass, or add them to cart.

## Features

- Tinder-like swiping interface
- Product discovery with swipe gestures
- Like/Pass/Add to Cart functionality
- Beautiful UI with smooth animations
- Mobile-first design
- Cross-platform (Web + Android)

## Tech Stack

- React.js
- Capacitor.js
- Framer Motion
- TailwindCSS
- Vite

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Roshnnnnn/shoppin.git
cd shoppin
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

## Building for Android

1. Install Android dependencies:
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
```

2. Build the app:
```bash
npm run build
```

3. Add Android platform:
```bash
npx cap add android
```

4. Open in Android Studio:
```bash
npx cap open android
```

## Project Structure

- `/src/components` - React components
- `/src/data` - Mock product data
- `/android` - Android project files (after adding platform)

## Gestures

- Swipe Right: Like product
- Swipe Left: Pass product
- Swipe Up: Add to cart

## License

MIT
#   s h o p p i n  
 