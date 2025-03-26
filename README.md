# Food Rescue Dashboard

A modern web application built with Next.js that helps users find and save surplus food in their area. This project showcases a responsive dashboard with interactive filters, map integration, and real-time updates.

## Features

- 🗺️ Interactive map showing available food bags in the area
- 🔍 Advanced filtering options (search, sort, time, food types)
- 📱 Responsive design that works on all devices
- ⚡ Real-time updates using RTK Query
- 🎨 Modern UI with Material UI components
- 🌍 Location-based search and distance calculation

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Material UI
- Redux Toolkit & RTK Query
- Google Maps API
- Styled Components

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/food-rescue-dashboard.git
cd food-rescue-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Google Maps API key:

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                # Next.js app router pages
├── components/         # React components
│   ├── Navbar.tsx
│   ├── FilterSidebar.tsx
│   ├── MapView.tsx
│   └── FoodBagList.tsx
├── store/             # Redux store setup
│   ├── store.ts
│   ├── services/      # RTK Query services
│   └── slices/        # Redux slices
└── theme.ts           # Material UI theme configuration
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
