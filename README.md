# Stack Auth Quickstart Website

A beautiful, modern, tech-forward React website that showcases Stack Auth's authentication capabilities with stunning animations, gradients, and a premium feel.

## 🚀 Features

- **Modern Design**: Beautiful gradient backgrounds with subtle animations
- **Interactive Components**: Provider selection with real-time command generation
- **Performance Optimized**: Efficient animations with intersection observers
- **Responsive**: Fully responsive design that works on all devices
- **Accessible**: Built with accessibility in mind
- **TypeScript**: Fully typed for better development experience

## 🎨 Design System

### Colors
- **Primary Dark**: `#0B0F1E` (deep navy background)
- **Surface Dark**: `#1E2230` (command boxes, panels)
- **Text Primary**: `#F0F0F5` (white text)
- **Text Secondary**: `#A1A1AA` (light gray)
- **Accent Purple**: `#8C5EFF` (primary accent)
- **Accent Cyan**: `#5BC0BE` (highlight accents)

### Typography
- **Font Family**: Inter, system sans-serif
- **Headings**: Bold (700), large scale
- **Body**: Medium (500), readable

## 📁 Project Structure

```
src/
├── components/
│   ├── AnimatedText.tsx      # Hero text with crossed-out effect
│   ├── Button.tsx            # Reusable button component
│   ├── Card.tsx              # Card component for features
│   ├── Features.tsx          # Feature showcase section
│   ├── Footer.tsx            # Footer component
│   ├── Header.tsx            # Header navigation
│   ├── Hero.tsx              # Main hero section
│   ├── InstallCommand.tsx    # Command installation section
│   ├── ProviderSelector.tsx  # Auth provider selection
│   ├── QuickstartBuilder.tsx # Interactive command builder
│   └── TestimonialSlider.tsx # Testimonials carousel
├── hooks/
│   ├── useClipboard.ts       # Clipboard functionality
│   └── useProviderSelection.ts # Provider selection state
├── styles/
│   ├── GlobalStyles.ts       # Global CSS styles
│   └── theme.ts              # Design system theme
├── types/
│   └── index.ts              # TypeScript type definitions
├── utils/
│   └── commandBuilder.ts     # Command generation logic
└── App.tsx                   # Main application component
```

## 🛠️ Tech Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Styled Components** - CSS-in-JS styling
- **Framer Motion** - Smooth animations
- **React Icons** - Icon library
- **Vitest** - Testing framework

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stack-auth-quickstart
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:run` - Run tests once

## 🎯 Key Components

### Hero Section
- Beautiful gradient background
- Animated text with crossed-out effect
- "Get Started" button that scrolls to auth selection
- Testimonials carousel

### Provider Selection
- Interactive provider cards (Google, GitHub, Email, OTP, Facebook)
- Real-time command generation
- Copy-to-clipboard functionality
- Responsive grid layout

### Command Builder
- Dynamic command generation based on selected providers
- Syntax highlighting
- One-click copy functionality
- Cursor prompt generation

## 🎨 Animation Features

### Performance Optimizations
- **Intersection Observer**: Animations only run when components are visible
- **CSS Animation Play State**: Animations pause when not in view
- **Throttled Mouse Events**: Optimized mouse tracking for star effects
- **Conditional Rendering**: Components only render when needed

### Animation Types
- **Fade-in effects**: Smooth opacity transitions
- **Slide-up animations**: Content slides from bottom
- **Hover effects**: Interactive button and card animations
- **Star trail effects**: Mouse-following star animations (when enabled)
- **Testimonial carousel**: Continuous scrolling testimonials

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_APP_TITLE=Stack Auth Quickstart
```

### Theme Customization
Edit `src/styles/theme.ts` to customize:
- Colors
- Typography
- Spacing
- Breakpoints
- Border radius

## 🧪 Testing

Run the test suite:
```bash
npm run test
```

Run tests with UI:
```bash
npm run test:ui
```

## 📦 Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🚀 Deployment

The application can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for automatic deployment
- **AWS S3**: Upload the `dist` folder to an S3 bucket

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Stack Auth** - For the amazing authentication library
- **React Team** - For the incredible framework
- **Vite Team** - For the fast build tool
- **Styled Components** - For the excellent CSS-in-JS solution

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

---

Built with ❤️ by the Stack Auth team
