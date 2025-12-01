# Matrix Portfolio - K.B.S Srikar

An immersive terminal-based portfolio website inspired by The Matrix, featuring a dark-themed interface with Matrix rain animation and command-line navigation.

🌐 **Live Site:** [https://kbss0000.github.io/portfolio_main/](https://kbss0000.github.io/portfolio_main/)

## Features

- **Terminal Emulator Interface**: Navigate through the portfolio using Unix-like commands
- **Matrix Rain Animation**: Animated background inspired by The Matrix movie
- **Responsive Design**: Fully optimized for mobile and desktop devices
- **Interactive Commands**: Type commands like `ls`, `help`, `about`, `projects`, `experience` to explore
- **Project Showcases**: Detailed project descriptions with live demos and GitHub links
- **Experience Page**: Work experience and internship details
- **About Page**: Resume and bio information

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/kbss0000/portfolio_main.git

# Navigate to the project directory
cd portfolio_main

# Install dependencies
npm install

# Start the development server
npm start
```

The app will open at `http://localhost:3000`

## Project Structure

```
portfolio_main/
├── src/
│   ├── Components/
│   │   ├── About Page/          # About page components
│   │   ├── Experience Page/     # Work experience components
│   │   ├── Project Page/         # Project showcase components
│   │   └── Page Layout/         # Layout and Matrix rain
│   ├── pages/                    # Main page components
│   ├── hooks/                    # Custom React hooks
│   └── Styles/                   # CSS stylesheets
├── public/                       # Static assets
└── .github/workflows/            # GitHub Actions for deployment
```

## Available Commands

- `ls` - List all available commands
- `help` - Show help information
- `about` - Navigate to About page
- `projects` - Navigate to Projects page
- `experience` - Navigate to Experience page
- `cd` - Go back to main page
- `whoami` - Display current user
- `date` - Show current date
- `pwd` - Print working directory

## Tech Stack

- **Frontend**: React 18
- **Routing**: React Router DOM
- **Styling**: CSS3 with responsive design
- **Deployment**: GitHub Pages with GitHub Actions
- **Build Tool**: Create React App

## Projects Featured

1. **Study Flow** - AI-Powered Productivity Suite
   - React, FastAPI, PostgreSQL, Groq API
   - [Live Demo](https://studyflow-nctjszjb5-kbssrikar7s-projects.vercel.app/)
   - [GitHub](https://github.com/kbss0000/Study-Flow-AI-Powered-Productivity-Suite)

2. **Handwritten Equation Solver**
   - TensorFlow, Next.js, FastAPI, OpenCV
   - [Live Demo](https://simple-math-solver.vercel.app/)
   - [GitHub](https://github.com/kbss0000/Handwritten-Equation-Solver)

3. **Cardio Risk Analyzer**
   - Next.js, FastAPI, XGBoost, CatBoost
   - [Live Demo](https://cardioml-kbss.vercel.app/)
   - [GitHub](https://github.com/kbss0000/Cardio-Risk-Analyzer)

## Deployment

This portfolio is automatically deployed to GitHub Pages using GitHub Actions. Every push to the `main` branch triggers a build and deployment.

### Manual Deployment

```bash
# Build the project
npm run build

# The build folder is ready to be deployed
```

## License

This project is open source and available under the MIT License.

Built using React and The Matrix inspiration
