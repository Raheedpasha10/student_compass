# 🧭 Student Compass - AI-Powered Career Navigation Platform

A modern, interactive career guidance platform that provides personalized career mentorship, roadmap planning, and skill development guidance. Built with cutting-edge AI integration and a sleek, responsive interface.

![Career Guidance Platform](https://img.shields.io/badge/AI-Powered-blue) ![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green) ![React](https://img.shields.io/badge/React-Frontend-blue) ![Google Gemini](https://img.shields.io/badge/Google-Gemini_AI-orange)

## ✨ Features

### 🤖 **AI-Powered Career Discovery**
- **Personalized Roadmaps**: Get custom career paths based on your skills and goals
- **Smart Career Analysis**: Comprehensive skill assessment and path recommendations
- **Actionable Steps**: Receive specific, time-bound learning plans with milestones
- **Interactive Search**: Google-like search with live recommendations
- **Resource Integration**: YouTube videos, books, certifications, and courses

### 🎯 **Core Capabilities**
- **Career Analysis**: Comprehensive skill assessment and career path recommendations
- **Skill Extraction**: Automatically identify and track your growing skill set
- **Mock Tests**: Personalized quizzes based on your expertise level
- **Industry-Specific Guidance**: Tailored advice for different tech and medical domains
- **Enhanced Medical Domains**: Comprehensive coverage of 12 medical specializations with detailed career paths
- **Educational Resources**: YouTube videos and Google Books recommendations

### 🛠️ **Technology Stack**
- **Backend**: FastAPI (Python) with Uvicorn
- **Frontend**: React 18 with Tailwind CSS
- **AI Integration**: Google Gemini AI & Vertex AI
- **UI/UX**: Framer Motion, Three.js, GSAP animations
- **Design**: Glassmorphism, 3D effects, smooth transitions
- **APIs**: Google Books, YouTube Data API v3

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 16+
- npm or yarn
- Google Gemini API Key
- YouTube Data API Key (optional but recommended)
- Google Books API Key (optional but recommended)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/student-compass.git
cd student-compass
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd Generative

# Create virtual environment (recommended)
python -m venv .venv

# Activate virtual environment
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
# Create .env file and add your API keys:
cp env.example .env
# Edit .env and add your keys:
# GOOGLE_GENAI_API_KEY=your_gemini_api_key_here
# REACT_APP_GOOGLE_BOOKS_API_KEY=your_google_books_api_key_here

# Run the backend server
python main.py
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 🎯 Usage Examples

### Career Transition Query
```
"I'm a marketing professional wanting to transition into data science. 
What's my learning roadmap?"
```

**AI Response**: Provides a detailed 6-month roadmap with:
- Month 1: Python fundamentals & statistics
- Month 2: Data manipulation with Pandas
- Month 3: Machine learning basics
- Specific resources, videos, and books

### Medical Specialization Query
```
"I'm interested in becoming a pediatrician. What steps should I take?"
```

**AI Response**: Provides a detailed roadmap for medical specialization with:
- Pre-medical education requirements
- Medical school preparation
- Residency and specialization paths
- Licensing and certification information
- Recommended textbooks and resources

### Skill Building Query
```
"I know Python basics. What should I learn next for web development?"
```

**AI Response**: Tailored guidance based on current skill level with specific next steps, project recommendations, video tutorials, and book suggestions.

## 🔧 API Endpoints

### Core Endpoints
- `POST /analyze` - Comprehensive career analysis and roadmap generation
- `POST /mock-test` - Generate personalized skill assessments
- `GET /health` - Service health check
- `POST /ai-search` - AI-powered search and recommendations

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User authentication
- `POST /auth/logout` - User logout

## 🤖 AI Integration

The platform uses **Google Gemini AI** to provide:

1. **Contextual Understanding**: Analyzes user background and goals
2. **Personalized Responses**: Tailors advice to individual circumstances
3. **Structured Roadmaps**: Creates step-by-step learning plans
4. **Follow-up Questions**: Guides users to provide more specific information
5. **Friendly Tone**: Conversational responses that encourage and support users

### AI Configuration
```python
# Environment variables required
GOOGLE_GENAI_API_KEY=your_gemini_api_key
REACT_APP_GOOGLE_BOOKS_API_KEY=your_google_books_api_key

# The system automatically:
# - Initializes Gemini AI with your API key
# - Integrates Google Books API for educational content
# - Provides intelligent fallbacks if AI is unavailable
# - Maintains conversation context
```

## 📁 Project Structure

```
├── Generative/                 # Backend (FastAPI)
│   ├── main.py                # Application entry point
│   ├── routes/                # API route handlers
│   │   ├── analyze.py        # Career analysis endpoint
│   │   ├── auth.py           # Authentication endpoints
│   │   ├── ai_search.py      # AI search functionality
│   │   ├── mock_test.py      # Mock test generation
│   │   └── health.py         # Health check
│   ├── services/              # Business logic
│   │   ├── ai_service.py     # Google Gemini AI integration
│   │   ├── auth_service.py   # Authentication logic
│   │   └── user_service.py   # User management
│   ├── models/                # Pydantic data models
│   ├── tests/                 # Test suite
│   └── dependencies.py       # FastAPI dependencies
│
├── Generative/frontend/        # React Frontend
│   ├── src/
│   │   ├── pages/            # Main pages
│   │   │   ├── Landing.js    # Home page with career selection
│   │   │   ├── UltimateRoadmap.js  # Learning roadmap
│   │   │   ├── Flowchart.js  # Visual flowchart
│   │   │   └── CareerPath.js # Career exploration
│   │   ├── components/       # Reusable components
│   │   │   ├── Navbar.js     # Navigation bar
│   │   │   ├── SearchBar.js  # Smart search component
│   │   │   └── LoadingSpinner.js
│   │   ├── constants/        # Data constants
│   │   ├── context/          # React context providers
│   │   └── services/         # API communication
│   └── public/               # Static assets
│
└── .env                       # Environment variables
```

## 🎨 Features Showcase

### 🏠 **Smart Landing Page**
- Category-based career selection (Engineering, Medical, Commerce, etc.)
- Field and specialization browsing
- Quick domain selection for popular paths
- Beautiful animated interface

### 📊 **Interactive Career Discovery**
- Comprehensive career cards with salary data
- Growth projections and demand levels
- Specialization breakdowns
- Company hiring insights
- Day-in-life descriptions

### 🎯 **Personalized Learning Roadmaps**
- Step-by-step learning paths
- Duration estimates and difficulty levels
- Key activities and skill gains
- Resource recommendations

### 📚 **Rich Educational Resources**
- YouTube video recommendations
- Google Books integration
- Certification listings
- Online course suggestions
- Real-time resource fetching

## 🔄 **Quick Start Guide**

### Step 1: Explore Careers
1. Open the application (http://localhost:3000)
2. Browse categories: Engineering, Medical, Commerce, Design, etc.
3. Select a field and specialization that interests you

### Step 2: Get Your Roadmap
1. Choose your path or use the search bar
2. View personalized learning roadmap
3. Each step shows:
   - Clear objectives
   - Duration estimates
   - Skills you'll gain

### Step 3: Discover Resources
1. Click YouTube Videos for curated tutorials
2. Browse Books for deeper learning
3. Check Certifications for credentials
4. Explore Online Courses for structured learning

### Step 4: Track Progress
1. Use Flowchart for visual roadmap
2. Mark completed steps
3. Navigate between pages seamlessly

## 🎨 **Modern UI/UX Design**

### 🌈 **Beautiful Visual Effects**
- Gradient text animations
- 3D card effects with depth
- Smooth hover transitions
- Glassmorphism styling

### ⚡ **High Performance**
- Hardware-accelerated animations
- Smooth 60fps interactions
- Responsive design
- Fast page loads

### 🎯 **Clean Interface**
- Minimalistic layout
- Intuitive navigation
- Consistent styling
- Dark mode optimized

## 🔒 Security Features

- JWT-based authentication
- Secure API key management
- Input validation and sanitization
- CORS configuration for frontend integration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful AI capabilities
- **Google Books API** for educational content
- **FastAPI** for the excellent Python web framework
- **React** for the responsive frontend framework
- **Tailwind CSS** for beautiful, utility-first styling

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the [API Documentation](http://localhost:8000/docs)
- Review the example usage in the code

---

**Made with ❤️ using Google Gemini AI, FastAPI, React, and modern web technologies**