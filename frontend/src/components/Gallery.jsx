import React, { useState } from 'react';
import './Gallery.css';

import photo1 from '../resources/img1.png';
import photo2 from '../resources/img2.png';
import photo3 from '../resources/img3.png';
import photo4 from '../resources/img4.png';
import photo5 from '../resources/img1.png';
import photo6 from '../resources/img2.png';

import videoSample from '../resources/videoTest.mp4';

function Gallery({ translations }) {
    const [showAll, setShowAll] = useState(false);

    const allImages = [photo1, photo2, photo3, photo4, photo5, photo6];
    const imagesToShow = showAll ? allImages : allImages.slice(0, 4);

    return (
        <div className="gallery-container">
            <h2>{translations.gallery_title}</h2>
            <p>{translations.gallery_description}</p>

            {/* 🎥 Video Section */}
            <div className="video-section">
                <video controls>
                    <source src={videoSample} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* 📸 Image Grid */}
            <div className="image-grid">
                {imagesToShow.map((img, index) => (
                    <img key={index} src={img} alt={`DJ event ${index + 1}`} />
                ))}
            </div>

            {/* 👇 Se fler-knapp */}
            {!showAll && (
                <button className="see-more-btn" onClick={() => setShowAll(true)}>
                    {translations.see_more}
                </button>
            )}
        </div>
    );
}

export default Gallery;
