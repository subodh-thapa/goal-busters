# Goal Busters Soccer Team Website

A modern, responsive website for the Goal Busters local soccer team built with Angular 17.

## Features

### 🏠 Home Page
- **Hero Section**: Welcome message with team branding
- **Latest Updates**: Display recent news and announcements
- **Important Updates**: Highlighted important team news
- **Sponsors Section**: Showcase team sponsors by tier featuring Urban Iconstruct as Platinum Sponsor
- **Social Media Links**: Connect to team's social media platforms

### 👥 Team Members Page
- **Organizing Committee**: Display committee members with roles and contact information
- **Team Players**: Show all team players with positions and jersey numbers
- **Team Statistics**: Display key team metrics

### 📸 Photo Gallery
- **Album Organization**: Photos grouped by events and seasons
- **Interactive Gallery**: Click to view albums and individual photos
- **Photo Modal**: Full-screen photo viewing with details
- **Responsive Design**: Optimized for all device sizes

### ⚙️ Admin Panel
- **Team Management**: Add, edit, and remove team members and committee members
- **Gallery Management**: Create and manage photo albums
- **Content Management**: Add and edit team updates and news
- **Sponsor Management**: Manage sponsor information and tiers

## Technology Stack

- **Angular 17**: Modern web framework with standalone components
- **TypeScript**: Type-safe development
- **SCSS**: Advanced styling with CSS variables
- **Angular Signals**: Reactive state management
- **Angular Router**: Client-side routing
- **Angular Forms**: Form handling and validation

## Design Features

### Color Scheme
- **Primary**: Dark Gold/Tan (#8B7355) - Matching the official Goal Buster logo
- **Secondary**: Lighter Gold (#D4AF37) - Accent color
- **Accent**: Black (#000000) - From the official logo
- **Success**: Green (#059669) - Positive actions

### Logo Design
- **Official PNG Logo**: Uses the actual Goal Buster logo PNG file (`goalbuster_transparent_edgebg.png`)
- **High Quality**: Crisp, professional logo with transparent background
- **Responsive Sizes**: Available in header (60px), small (120px), medium (200px), and large (300px) sizes
- **Hover Effects**: Subtle scale animation on hover for interactive feel
- **Mobile Optimized**: Automatically scales down on smaller screens

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## Getting Started

### Prerequisites
- Node.js (v20.14.0 or higher)
- npm (v10.7.0 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd goal-busters-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200`

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── home/                 # Home page component
│   │   ├── gallery/              # Photo gallery component
│   │   ├── team-members/         # Team members page
│   │   └── admin/                # Admin panel
│   ├── services/
│   │   ├── team-members.service.ts
│   │   ├── gallery.service.ts
│   │   ├── updates.service.ts
│   │   └── sponsors.service.ts
│   ├── models/
│   │   ├── team-member.model.ts
│   │   ├── gallery.model.ts
│   │   ├── update.model.ts
│   │   └── sponsor.model.ts
│   ├── app.component.ts          # Main app component
│   ├── app.routes.ts             # Routing configuration
│   └── app.config.ts             # App configuration
├── styles.scss                   # Global styles
└── index.html                    # Main HTML file
```

## Key Features Implementation

### State Management
- Uses Angular Signals for reactive state management
- Services provide data access and manipulation
- Immutable data updates for predictable state changes

### Component Architecture
- Standalone components for better tree-shaking
- Reusable UI components and utilities
- Clear separation of concerns

### Data Models
- TypeScript interfaces for type safety
- Consistent data structures across the application
- Extensible model design

## Customization

### Adding New Team Members
1. Navigate to the Admin panel
2. Go to Team Members tab
3. Click "Add Team Member" or "Add Committee Member"
4. Fill in the required information
5. Save the changes

### Managing Photos
1. Go to Admin panel → Gallery tab
2. Create new albums for different events
3. Add photos to albums (currently using placeholder images)
4. Organize photos by events and seasons

### Updating Content
1. Access Admin panel → Updates tab
2. Add new updates with categories (match, training, general, event)
3. Mark important updates for highlighting
4. Manage sponsor information in the Sponsors tab

## Future Enhancements

- [ ] Image upload functionality
- [ ] User authentication for admin access
- [ ] Database integration
- [ ] Email notifications
- [ ] Match schedule management
- [ ] Player statistics tracking
- [ ] Newsletter subscription
- [ ] Contact form integration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the Goal Busters team management.

---

**Goal Busters** - Your premier local soccer team since 2020 ⚽