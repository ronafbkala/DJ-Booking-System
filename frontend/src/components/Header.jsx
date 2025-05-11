import React, { useState } from 'react';


function Header({ logo }) {
    const [highlight, setHighlight] = useState(false);

    const toggleHighlight = () => {
        setHighlight(!highlight);
    };
    return (
        <header className="header">
            <div className="logo-container">
                <img src={logo} alt="DJ Logo" className="logo glow-on-hover" />            </div>
        </header>
    );
}


export default Header;
