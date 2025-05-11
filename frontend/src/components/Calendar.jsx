/*import React from 'react';

const mockCalendar = [
    { date: '2025-05-01', available: true },
    { date: '2025-05-02', available: false },
    { date: '2025-05-03', available: true }
];

// Lägg till WhatsApp nummer här
const whatsappNumber = 9647504304304; // Ex: '46701234567' (utan +)


function Calendar({ translations }) {

    // Funktion för att öppna WhatsApp vid klick
    const handleClick = (day) => {
        if (day.available) {
            const message = encodeURIComponent(`Hello, I would like to book you on ${day.date}`);
            window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
        }
    };
    return (
        <div className="calendar-container">
            <h2>{translations.calendar_title}</h2>


            <p className="instruction">
                {translations.instruction}
            </p>

            <div className="calendar">
                {mockCalendar.map((day) => (
                    <div
                        key={day.date}
                        className={`calendar-day ${day.available ? 'available' : 'unavailable'}`}
                        onClick={() => handleClick(day)}
                        style={{ cursor: day.available ? 'pointer' : 'default' }}
                    >
                        {day.date}: {day.available ? '✅' : '❌'}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Calendar;

*/
