<<<<<<< HEAD
# AI Video Generator

A modern web application for creating AI-generated videos from text prompts and images.

## 🚀 Features

### Core Functionality
- **Text-to-Video Generation**: Transform text descriptions into dynamic video content
- **Image-to-Video Animation**: Animate static images with realistic motion effects
- **User Authentication**: Secure registration and login system with NextAuth.js
- **Generation History**: Track and manage all your video creations
- **Real-time Progress Tracking**: Monitor generation status with live updates
- **Queue Management**: Efficient task processing with visual feedback

### Technical Highlights
- **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with multiple providers
- **State Management**: Zustand for client-side state
- **UI Components**: Custom components with Radix UI primitives
- **API Integration**: Ready for Replicate, RunwayML, and other AI services

## 🏗️ Architecture

```
ai-video-generator/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── auth/              # Authentication pages
│   │   ├── api/               # API routes
│   │   ├── dashboard/         # User dashboard
│   │   └── generate/          # Generation pages
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Base UI components
│   │   └── generation-monitor.tsx
│   └── lib/                   # Utilities and services
│       ├── auth.ts           # Authentication config
│       ├── ai-services.ts    # AI API integrations
│       ├── generation-store.ts # State management
│       └── prisma.ts         # Database client
├── prisma/                    # Database schema
└── public/                    # Static assets
```

## 📦 Dependencies

### Core Dependencies
- `next`: 15.5.4 - React framework with Turbopack
- `react`: 19.1.0 - UI library
- `typescript`: ^5 - Type safety
- `tailwindcss`: ^4 - Styling system
- `prisma`: ^6.16.2 - Database ORM
- `next-auth`: ^4.24.11 - Authentication
- `zustand`: ^5.0.8 - State management

### UI & Styling
- `@radix-ui/react-*`: Accessible UI primitives
- `lucide-react`: Beautiful icons
- `framer-motion`: Smooth animations
- `class-variance-authority`: Component variants
- `tailwind-merge`: Conditional classes

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- AI API keys (Replicate, RunwayML, etc.)

### Installation

1. **Clone and setup**
   ```bash
   cd ai-video-generator
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your values:
   ```env
   DATABASE_URL="postgresql://user:pass@localhost:5432/ai_video_generator"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   REPLICATE_API_TOKEN="your-replicate-token"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

3. **Database Setup**
   ```bash
   npm run db:push
   npm run db:generate
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

   Visit [http://localhost:3001](http://localhost:3001) (or the port shown in terminal)

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `GET/POST /api/auth/[...nextauth]` - NextAuth handlers

### Generation
- `POST /api/generate/text-to-video` - Start text-to-video generation
- `POST /api/generate/image-to-video` - Start image-to-video generation
- `POST /api/generate/status` - Check generation status

### User Data
- `GET /api/user/generations` - Fetch user's generation history

## 🔧 AI Service Configuration

### Replicate Integration
1. Sign up at [Replicate](https://replicate.com)
2. Get your API token from account settings
3. Add to `.env.local`: `REPLICATE_API_TOKEN="r8_..."`
4. Configure model versions in `src/lib/ai-services.ts`

### RunwayML Integration (Planned)
1. Set up RunwayML account
2. Add `RUNWAY_API_KEY` to environment
3. Implement service methods in `ai-services.ts`

## 🗄️ Database Schema

Key models:
- **User** - User accounts and profiles
- **VideoGeneration** - Generation requests and results
- **Account/Session** - NextAuth.js authentication
- **UsageRecord** - Usage tracking and billing

## 🎨 UI/UX Features

### Design System
- **Theme**: Modern indigo/purple gradient design
- **Components**: Consistent, accessible UI components
- **Responsive**: Mobile-first approach
- **Animations**: Smooth micro-interactions
- **Loading States**: Progressive feedback

### User Experience
- **Onboarding**: Clear signup/signin flow
- **Generation**: Step-by-step progress feedback
- **History**: Easy access to past generations
- **Queue**: Visual progress tracking
- **Notifications**: Success/error feedback

## 🚀 Development

### Available Scripts
- `npm run dev` - Development server with Turbopack
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - ESLint code checking
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Prisma Studio

### Project Structure
```
src/
├── app/                    # App Router pages
├── components/ui/          # Reusable UI components
├── lib/                   # Utilities and configurations
└── types/                 # TypeScript type definitions
```

## 🔐 Security Features

### Authentication & Authorization
- Secure session management with NextAuth.js
- Multiple authentication providers (Google, credentials)
- Password hashing with bcryptjs
- CSRF protection built-in

### API Security
- Input validation and sanitization
- Rate limiting ready for implementation
- Environment variable protection
- Secure database queries with Prisma

## 📊 Features Implemented

### ✅ Completed
- [x] Modern Next.js 15 setup with TypeScript
- [x] Beautiful, responsive UI with Tailwind CSS
- [x] User authentication system (NextAuth.js)
- [x] Database design and Prisma setup
- [x] Text-to-video generation page
- [x] Image-to-video generation page
- [x] User dashboard and history
- [x] Real-time progress tracking
- [x] Queue management system
- [x] AI API service integration structure

### 🔄 Ready for Enhancement
- [ ] Connect real AI APIs (Replicate, RunwayML)
- [ ] File upload to cloud storage
- [ ] Payment integration
- [ ] Advanced video editing features
- [ ] Team collaboration features

## 🚀 Deployment

### Production Checklist
1. Set up production PostgreSQL database
2. Configure all environment variables
3. Set up file storage (Cloudinary/AWS S3)
4. Configure domain and SSL certificate
5. Set up monitoring and error tracking

### Recommended Platforms
- **Vercel**: Perfect for Next.js applications
- **Railway**: Simple database + app deployment
- **PlanetScale**: Serverless database option
- **Supabase**: Full backend-as-a-service

## 📈 Future Enhancements

### Planned Features
- **Video Templates**: Pre-made video styles
- **Batch Processing**: Multiple video generation
- **Advanced Editing**: Trim, effects, transitions
- **Team Workspaces**: Collaborative video creation
- **API Access**: Public API for developers
- **Mobile App**: React Native companion app

### Technical Improvements
- **Caching**: Redis for session and data caching
- **CDN**: Video delivery optimization
- **Background Jobs**: Queue processing with Bull/Bee
- **Monitoring**: Application performance monitoring
- **Testing**: Comprehensive test suite

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**🎬 Built with modern web technologies for the future of AI video creation**
=======
# ai-video-generator
>>>>>>> 8fc70df5d6061a1cd559ce88d686ec25cfeda04a
