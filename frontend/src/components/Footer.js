import React from 'react';

function Footer({ translations }) {
    return (
        <footer className="footer">
            <p>{translations.footer_text}</p>
        </footer>
    );
}

export default Footer;
