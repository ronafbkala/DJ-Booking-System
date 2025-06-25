import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleSelector.css';


function RoleSelector({ translations, setIsAdminLoggedIn }) {
    const navigate = useNavigate();
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const correctCode = "123456"; // Ändra till din riktiga kod om du vill

    const handleYes = () => {
        setShowCodeInput(true);
    };

    const handleNo = () => {
        navigate("/user-home"); // Ändra till rätt användarsida om du har en
    };

    const handleCodeSubmit = (e) => {
        e.preventDefault();
        if (code === correctCode) {
            setIsAdminLoggedIn(true); // << Lägg till detta
            navigate("/admin-home");
        } else {
            setError(translations.invalid_code);
        }
    };


    return (
        <div className="role-selector">
            {!showCodeInput ? (
                <>
                    <h2>{translations.are_you_data_owner}</h2>
                    <button onClick={handleYes}>{translations.yes}</button>
                    <button onClick={handleNo}>{translations.no}</button>
                </>
            ) : (
                <form onSubmit={handleCodeSubmit}>
                    <label>{translations.enter_verification_code}</label>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                    />
                    <button type="submit">{translations.verify}</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            )}
        </div>
    );
}

export default RoleSelector;
