import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <main className="not-found">
        <div className="message">
            <p>Oops</p>
            <Link to="/">
            <span>Go Home</span>
            </Link>
        </div>
    </main>
);

export default NotFound;