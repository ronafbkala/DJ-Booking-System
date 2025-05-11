import React from 'react';

function AboutUs({ translations }) {
    return (
        <div className="about-container">
            <h2>{translations.about}</h2>
            <p>{translations.about_text}</p>
        </div>
    );
}

export default AboutUs;
