# A.R. Rahman Website Recreation

A modern recreation of the A.R. Rahman official website with the same style, animations, and structure.

## Features

- **Modern React Application** - Built with React and Vite for fast development
- **Smooth Animations** - Using Framer Motion for fluid page transitions and interactions
- **Responsive Design** - Fully responsive across all device sizes
- **Multiple Sections**:
  - HOME - Hero section with featured works and latest news
  - COMPOSER - Musical compositions and works
  - PERFORMANCE - Live performances and concerts
  - PERFORMER - Performance highlights
  - CONTACT - Contact form and information
  - SHOP - Official merchandise and music

## Tech Stack

- React 18
- Vite
- Framer Motion (animations)
- React Router (navigation)
- CSS3 (styling)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will start on `http://localhost:3000`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Navigation.jsx      # Main navigation component
│   ├── Navigation.css
│   ├── Footer.jsx          # Footer component
│   └── Footer.css
├── pages/
│   ├── Home.jsx            # Home page
│   ├── Home.css
│   ├── Composer.jsx        # Composer page
│   ├── Composer.css
│   ├── Performance.jsx     # Performance page
│   ├── Performance.css
│   ├── Performer.jsx       # Performer page
│   ├── Performer.css
│   ├── Contact.jsx         # Contact page
│   ├── Contact.css
│   ├── Shop.jsx            # Shop page
│   └── Shop.css
├── App.jsx                 # Main app component
├── App.css
├── main.jsx                # Entry point
└── index.css               # Global styles
```

## Design Features

- Dark theme with gold accent color (#d4af37)
- Elegant typography using Playfair Display and Inter fonts
- Smooth scroll animations
- Hover effects and transitions
- Mobile-responsive navigation
- Modern card-based layouts

## Notes

- Image placeholders are used throughout. Replace with actual images from the original website.
- All animations and transitions are implemented to match the original site's feel.
- The design maintains the same color scheme, typography, and layout structure as the original.

## License

This is a recreation project for educational purposes.

