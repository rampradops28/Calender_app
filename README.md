# 🗓️ Google Calendar Clone

A beautiful, fully-featured calendar application built with React, TypeScript, and Tailwind CSS. This project demonstrates modern frontend development practices with clean architecture and excellent user experience.

## ✨ Features

### Core Calendar Features
- **Current Month Display**: Shows current month and year by default
- **Grid Layout**: Clean calendar grid displaying all days of the month
- **Navigation**: Previous/next month navigation with smooth transitions
- **Today Highlighting**: Current date is visually highlighted with a blue accent
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### Event Management
- **Static JSON Loading**: Events loaded from `src/data/events.json`
- **Event Display**: Events shown in correct date cells with time information
- **Event Details**: Click events to view detailed information in a modal
- **Event Types**: Color-coded categories (work, personal, health, fitness, social, travel)

### Conflict Detection
- **Overlap Detection**: Automatically detects overlapping events
- **Visual Indicators**: Red conflict indicators on calendar days
- **Color Coding**: Conflicting events highlighted with red borders
- **Notifications**: Toast notifications for schedule conflicts
- **Conflict Details**: Modal shows conflict warnings for overlapping events

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **date-fns** - Robust date manipulation
- **Lucide React** - Beautiful icons
- **Vite** - Fast development and building

## 🏗️ Architecture

### Component Structure
```
src/
├── components/
│   ├── Calendar.tsx          # Main calendar container
│   ├── CalendarDay.tsx       # Individual day cell
│   ├── EventItem.tsx         # Event display component
│   ├── EventModal.tsx        # Event details modal
│   └── ConflictNotification.tsx # Conflict alert system
├── utils/
│   ├── dateUtils.ts          # Date manipulation utilities
│   └── eventUtils.ts         # Event processing utilities
├── types/
│   └── Event.ts              # TypeScript interfaces
└── data/
    └── events.json           # Static event data
```

### Key Design Decisions
- **Modular Components**: Each component has a single responsibility
- **Utility Functions**: Separated date and event logic into utility modules
- **Type Safety**: Full TypeScript coverage for better development experience
- **Performance**: Optimized rendering with proper React patterns

## 🎨 Design Features

- **Modern UI**: Clean, professional design inspired by Google Calendar
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Color System**: Consistent color palette with semantic meaning
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Visual Hierarchy**: Clear typography and spacing system

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: Responsive grid layouts for different screen sizes
- **Touch Friendly**: Appropriate touch targets and interactions

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd calendar-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📊 Event Data Structure

Events are stored in `src/data/events.json` with the following structure:

```json
{
  "id": 1,
  "title": "Team Meeting",
  "date": "2025-01-15",
  "time": "09:00",
  "duration": 60,
  "type": "work",
  "description": "Weekly team standup meeting"
}
```

## 🔧 Customization

### Adding New Event Types
1. Update the `Event` type in `src/types/Event.ts`
2. Add color mapping in `src/utils/eventUtils.ts`
3. Update the legend in `src/App.tsx`

### Modifying Styles
- Colors and spacing defined in Tailwind classes
- Custom animations in `src/index.css`
- Component-specific styles in respective component files

## 🧪 Code Quality

- **ESLint**: Code linting with React-specific rules
- **TypeScript**: Strict type checking enabled
- **Clean Code**: Consistent naming and structure
- **Comments**: Well-documented complex logic

## 📈 Performance Optimizations

- **Efficient Rendering**: Minimal re-renders with proper React patterns
- **Date Calculations**: Optimized date utility functions
- **Event Processing**: Efficient conflict detection algorithms
- **Bundle Size**: Tree-shaking and code splitting ready

## 🎯 Assignment Requirements Met

✅ **Calendar Features**
- Current month and year display
- Grid layout of all days
- Previous/next month navigation
- Today's date highlighting

✅ **Event Management**
- Static JSON file loading
- Event data with title, date, time, duration
- Events displayed on correct dates
- Overlapping event handling with color-coding AND notifications

✅ **Technical Requirements**
- React framework
- Tailwind CSS styling
- date-fns library for date handling
- Clean, efficient code structure

✅ **Design Quality**
- Professional, production-ready UI
- Thoughtful user experience
- Responsive design
- Modern visual aesthetics

## 🌟 Bonus Features

- **Event Categories**: Color-coded event types
- **Detailed Modals**: Rich event information display
- **Conflict Notifications**: Toast notifications for schedule conflicts
- **Hover Effects**: Interactive feedback throughout the interface
- **Animation System**: Smooth transitions and micro-interactions

---

Built with ❤️ using modern web technologies. Ready for production deployment!