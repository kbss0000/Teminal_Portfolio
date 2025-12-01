import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import MainPage from './pages/MainPage';

const App = () => {
    // Use PUBLIC_URL for GitHub Pages deployment, empty for local dev
    // In development, PUBLIC_URL is undefined, so basename should be empty
    // In production build, PUBLIC_URL will be set to the homepage pathname
    const basename = process.env.NODE_ENV === 'production' && process.env.PUBLIC_URL 
        ? process.env.PUBLIC_URL 
        : '';
    
    return (
        <Router basename={basename}>
            <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/" element={<MainPage />} />
            </Routes>
        </Router>
    );
};

export default App;
