import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Gallery from './pages/Gallery';

function App() {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/gallery">Gallery</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/gallery" element={<Gallery />} />
                {/* Other routes if needed */}
            </Routes>
        </div>
    );
}

export default App;
