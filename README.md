# TinyLink Frontend

A modern, responsive URL shortener web application built with React and Vite. Manage and track your short links with an intuitive, user-friendly interface.

## 🚀 Live Demo

**Live URL**: https://tinylink-frontend.vercel.app

## ✨ Features

- 🔗 Create short links with custom or auto-generated codes
- 📊 View detailed click analytics and statistics
- 🔍 Search and filter links in real-time
- 📋 One-click copy to clipboard
- 📱 Fully responsive design (mobile, tablet, desktop)
- ⚡ Fast and modern UI with smooth animations
- ✅ Form validation with user feedback
- 🎨 Clean, professional interface

## 🛠 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS / Plain CSS
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (see backend README)

## 🚦 Getting Started

### Installation

1. **Clone the repository**
 https://github.com/YOUR_USERNAME/tinylink-frontend.git


2. **Install dependencies**
npm install


3. **Set up environment variables**
Create a `.env` file in the root directory:
VITE_API_URL=http://localhost:5000


4. **Start development server**
npm run dev
App will open at `http://localhost:5173`

5. **Build for production**
npm run build

6. **Preview production build**
npm run preview


## 📁 Project Structure
tinylink-frontend/
├── src/
│ ├── components/
│ │ ├── LinkForm.jsx # Form to create short links
│ │ ├── LinkTable.jsx # Table displaying all links
│ │ └── RedirectHandler.jsx # Handles redirect logic
│ ├── pages/
│ │ ├── Dashboard.jsx # Main dashboard page
│ │ └── StatsPage.jsx # Individual link statistics
│ ├── services/
│ │ └── api.js # Axios API client
│ ├── App.jsx # Router configuration
│ ├── main.jsx # Application entry point
│ └── index.css # Global styles
├── public/
├── .env # Environment variables (local)
├── .env.production # Production environment variables
├── vercel.json # Vercel configuration
├── package.json
└── README.md


## 🔐 Environment Variables

Create a `.env` file for local development:
VITE_API_URL=http://localhost:5000

Create a `.env.production` file for production:
VITE_API_URL=https://tinylink-backend.onrender.com


**Important**: Vite requires the `VITE_` prefix for environment variables to be exposed to the client.

## 📱 Pages & Routes

### Dashboard (`/`)
- Form to create new short links
- Table displaying all links with:
  - Short code
  - Target URL
  - Total clicks
  - Last clicked timestamp
  - Actions (copy, view stats, delete)
- Real-time search/filter functionality
- Sortable columns

### Stats Page (`/code/:code`)
- Detailed view of a single short link
- Displays:
  - Short code and URL
  - Target URL
  - Total clicks
  - Created timestamp
  - Last clicked timestamp
- Back to dashboard link

### Redirect Handler (`/:code`)
- Intercepts short code URLs
- Forwards to backend API
- Backend performs redirect and tracks clicks

## 🎨 Key Components

### LinkForm.jsx
- Controlled form with validation
- Optional custom code input (6-8 alphanumeric characters)
- Loading states during submission
- Success/error feedback messages
- Client-side validation

### LinkTable.jsx
- Sortable columns (click headers to sort)
- Search/filter functionality
- Copy to clipboard feature
- Delete with confirmation
- Responsive table layout

### RedirectHandler.jsx
- Captures `/:code` routes
- Redirects to backend for tracking
- Shows loading state during redirect

## 📝 Scripts

npm run dev # Start development server (http://localhost:5173)
npm run build # Build for production (outputs to /dist)
npm run preview # Preview production build locally
npm run lint # Run ESLint (if configured)

## 🚀 Deployment on Vercel

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub**
git add .
git commit -m "Ready for deployment"
git push origin main

2. **Import on Vercel**
- Go to https://vercel.com
- Click "New Project"
- Import your GitHub repository
- Vercel auto-detects Vite settings

3. **Configure Settings**
- Framework Preset: Vite (auto-detected)
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

4. **Add Environment Variable**
- Go to Settings → Environment Variables
- Add: `VITE_API_URL` = `https://tinylink-backend.onrender.com`
- Apply to Production

5. **Deploy**
- Click "Deploy"
- Wait 2-3 minutes
- Get live URL: `https://tinylink-frontend.vercel.app`

### Method 2: Vercel CLI

Install Vercel CLI
npm install -g vercel

Login
vercel login

Deploy
vercel

Add environment variable
vercel env add VITE_API_URL production

Enter your backend URL when prompted
Deploy to production
vercel --prod

## 🔧 Configuration Files

### vercel.json

Create this file to handle client-side routing:

{
"rewrites": [
{
"source": "/(.*)",
"destination": "/index.html"
}
]
}

This ensures all routes are handled by React Router, not Vercel's server.

## 🐛 Troubleshooting

### Issue: API Connection Failed

**Symptoms**: Network errors, "Failed to fetch"

**Solutions**:
1. Verify `VITE_API_URL` is correct in `.env`
2. Check backend is running and accessible
3. Check CORS is enabled on backend
4. Inspect Network tab in DevTools for error details

### Issue: 404 Error on Page Refresh

**Symptoms**: Direct navigation to `/code/:code` returns 404

**Solutions**:
1. Ensure `vercel.json` exists with rewrites configuration
2. Verify Vercel deployment settings
3. Check that React Router is properly configured

### Issue: Environment Variable Not Working

**Symptoms**: `import.meta.env.VITE_API_URL` is `undefined`

**Solutions**:
1. Ensure variable name has `VITE_` prefix
2. Restart dev server after changing `.env`
3. For Vercel: Check environment variables in dashboard
4. Rebuild after environment variable changes

### Issue: Blank Page After Deployment

**Symptoms**: Production build shows white screen

**Solutions**:
1. Check browser console for errors
2. Verify build completed successfully
3. Check `dist` folder was created
4. Review Vercel deployment logs

## 🎯 Features Deep Dive

### Form Validation
- **Client-side**: Instant feedback, prevents invalid submissions
- **URL validation**: Uses native URL constructor
- **Code validation**: Regex pattern `/^[A-Za-z0-9]{6,8}$/`
- **Error messages**: User-friendly and actionable

### State Management
- **useState**: Component-level state
- **useEffect**: API calls and side effects
- **Props**: Parent-child data flow
- No Redux needed (app complexity doesn't require it)

### User Experience
- **Loading states**: Visual feedback during operations
- **Error states**: Clear error messages
- **Empty states**: Helpful prompts when no data
- **Success states**: Confirmation messages
- **Smooth animations**: CSS transitions and keyframes

### Responsive Design
- **Mobile-first**: Optimized for small screens
- **Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Touch-friendly**: Large tap targets on mobile

## 🔄 API Integration

The frontend communicates with the backend via Axios:

// src/services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
baseURL: API_URL,
headers: {
'Content-Type': 'application/json',
},
});

export const createLink = async (targetUrl, customCode = '') => {
const response = await api.post('/api/links', {
target_url: targetUrl,
custom_code: customCode,
});
return response.data;
};


## 📊 Performance

- **Vite HMR**: Instant hot module replacement during development
- **Code splitting**: Automatic with Vite
- **Optimized builds**: Minification and tree-shaking
- **CDN delivery**: Vercel Edge Network

## 🔒 Security

- **Input validation**: Client and server-side
- **XSS prevention**: React's automatic escaping
- **HTTPS**: Enforced in production (Vercel)
- **Environment variables**: Sensitive data not in code

## 📧 Contact

**Developer**: Munnuru Akhil 
**Email**: munnuruakhil26@gmail.com
**GitHub**: https://github.com/akhilmunnuru26  
**LinkedIn**: https://www.linkedin.com/in/akhil-munnuru/


Made with ❤️ using React and Vite

























































