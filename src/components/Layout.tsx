import React from 'react';

const Layout: React.FC = ({ children }) => {
    return (
        <div className="layout">
            <header className="header">
                <h1>Book Reading Coordinator</h1>
            </header>
            <main className="main-content">
                {children}
            </main>
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Book Reading Coordinator</p>
            </footer>
        </div>
    );
};

export default Layout;