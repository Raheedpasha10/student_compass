# 🚀 MARGDARSHAN - AI-Powered Career Guidance Platform

## Overview
MARGDARSHAN is an advanced career guidance platform that helps students and professionals discover their ideal career paths through AI-powered recommendations, interactive roadmaps, and personalized learning resources.

## Features
- **Intelligent Career Matching**: AI-driven career suggestions based on interests and skills
- **Interactive Roadmaps**: Step-by-step learning paths for various career domains
- **Specialization Guidance**: Detailed specialization recommendations within fields
- **Resource Recommendations**: Curated books, courses, and learning materials
- **Progress Tracking**: Visual progress indicators for skill development
- **Responsive Design**: Fully responsive interface that works on all devices

## Technology Stack
- **Frontend**: React.js, Tailwind CSS, Framer Motion
- **Backend**: FastAPI (Python)
- **AI Services**: OpenAI GPT, Google Books API
- **Database**: SQLite (development), PostgreSQL (production)
- **Deployment**: Docker, Nginx

## Project Structure
```
Generative/
├── backend/                 # FastAPI backend services
├── frontend/               # React frontend application
│   ├── public/             # Static assets
│   ├── src/                # Source code
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context providers
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service integrations
│   │   └── styles/         # CSS and styling files
│   ├── package.json        # Frontend dependencies
│   └── tailwind.config.js  # Tailwind CSS configuration
├── docs/                   # Documentation files
├── requirements.txt        # Python backend dependencies
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd Generative
```

2. **Backend Setup:**
```bash
cd backend
pip install -r requirements.txt
```

3. **Frontend Setup:**
```bash
cd frontend
npm install
```

### Running the Application

1. **Start the Backend:**
```bash
cd backend
uvicorn main:app --reload
```

2. **Start the Frontend:**
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

### Building for Production

1. **Frontend Build:**
```bash
cd frontend
npm run build
```

2. **Backend Deployment:**
Follow standard FastAPI deployment practices with your preferred WSGI server.

## Key Components

### Landing Page
The main entry point featuring:
- Hero section with search functionality
- Popular career paths quick selection
- Comprehensive career exploration system
- 3D visual effects and animations

### Career Path Explorer
Interactive three-step selection process:
1. **Categories** - Broad career domains (Engineering, Medical, Business, etc.)
2. **Fields** - Specific fields within categories
3. **Specializations** - Detailed specializations within fields

### Roadmap System
Personalized learning paths that include:
- Skill progression tracking
- Resource recommendations
- Milestone achievements
- Community insights

### AI Chat Assistant
Intelligent tour guide that helps users:
- Navigate the platform
- Answer career-related questions
- Recommend learning resources
- Provide personalized advice

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is proprietary and confidential. All rights reserved.

## Contact
For questions or support, please contact the development team.
