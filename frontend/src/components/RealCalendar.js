/*import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './RealCalendar.css';
import { enUS, arSA } from 'date-fns/locale';

const whatsappNumber = '9647503404';

function RealCalendar({ translations }) {
    const selectedLocale = translations.lang === 'ar' ? 'ar' : 'en-US';
    const [selectedDate, setSelectedDate] = useState(null);
    const [bookedDates, setBookedDates] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formDate, setFormDate] = useState('');
    const [formName, setFormName] = useState('');
    const [formPhone, setFormPhone] = useState('');

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
    const apiUrl = `${API_BASE_URL}/api/bookings/dates`;




    useEffect(() => {
        console.log("🌐 Backend URL:", apiUrl); // ← Kontroll i alla lägen
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                console.log("✅ Fetched booked dates:", data);
                setBookedDates(data);
            })
            .catch((err) => console.error("❌ API fetch failed:", err));
    }, []);

    //console.log("🔍 Backend URL:", `${API_BASE_URL}/api/bookings/dates`);


    const isBooked = (date) => {
        const formatted = date.toISOString().split('T')[0];
        return bookedDates.includes(formatted);
    };

    const isPastDate = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const handleDateClick = (date) => {
        if (isPastDate(date) || isBooked(date)) return;
        const formatted = date.toISOString().split('T')[0];
        setFormDate(formatted);
        setShowForm(true);
        const message = encodeURIComponent(`Hello! I'd like to book you on ${formatted}`);
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    };



    return (
        <div className="calendar-wrapper">
            <h2>{translations.calendar_title}</h2>
            <p className="instruction">{translations.instruction}</p>
            <Calendar
                onClickDay={handleDateClick}
                tileClassName={({ date }) => {
                    if (isPastDate(date)) return 'past';
                    return isBooked(date) ? 'booked' : 'available';
                }}
                locale={selectedLocale}
            />
        </div>
    );
}

export default RealCalendar;


 */

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './RealCalendar.css';
import { enUS, arSA } from 'date-fns/locale';

const whatsappNumber = '9647503404';

function RealCalendar({ translations }) {
    const selectedLocale = translations.lang === 'ar' ? 'ar' : 'en-US';
    const [selectedDate, setSelectedDate] = useState(null);
    const [bookedDates, setBookedDates] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formDate, setFormDate] = useState('');
    const [formName, setFormName] = useState('');
    const [formPhone, setFormPhone] = useState('');

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
    const datesUrl = `${API_BASE_URL}/api/bookings/dates`;
    const postUrl = `${API_BASE_URL}/api/bookings`;

    useEffect(() => {
        fetch(datesUrl)
            .then((res) => res.json())
            .then((data) => {
                setBookedDates(data);

                const savedDate = localStorage.getItem("pendingBookingDate");
                if (savedDate && !data.includes(savedDate)) {
                    setFormDate(savedDate);
                    setShowForm(true);
                }
            })
            .catch((err) => console.error("❌ API fetch failed:", err));
    }, []);

    const isBooked = (date) => {
        const formatted = date.toISOString().split('T')[0];
        return bookedDates.includes(formatted);
    };

    const isPastDate = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const handleDateClick = (date) => {
        if (isPastDate(date) || isBooked(date)) return;

        const formatted = date.toISOString().split('T')[0];
        localStorage.setItem("pendingBookingDate", formatted);

        const message = encodeURIComponent(`Hello! I'd like to book you on ${formatted}`);
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    };


    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newBooking = { name: formName, phone: formPhone, date: formDate };

        fetch(postUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBooking)
        })
            .then(res => res.json())
            .then(() => {
                alert(translations.success_message);
                setBookedDates([...bookedDates, formDate]);
                setShowForm(false);
                setFormName('');
                setFormPhone('');
                localStorage.removeItem("pendingBookingDate");

                // Öppna WhatsApp EFTER bokningen lyckats
                const message = encodeURIComponent(`Hello! I'd like to book you on ${formDate}`);
                window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
            })
            .catch(err => {
                console.error("❌ Kunde inte spara bokningen:", err);
                alert(translations.error_message);
            });
    };

    return (
        <div className="calendar-wrapper">
            <h2>{translations.calendar_title}</h2>
            <p className="instruction">{translations.instruction}</p>
            <Calendar
                onClickDay={handleDateClick}
                tileClassName={({ date }) => {
                    if (isPastDate(date)) return 'past';
                    return isBooked(date) ? 'booked' : 'available';
                }}
                locale={selectedLocale}
            />
            {showForm && (
                <form className="booking-form" onSubmit={handleFormSubmit}>
                    <h3>{translations.form_title} {formDate}</h3>
                    <input
                        type="text"
                        placeholder={translations.name_placeholder}
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        required
                    />
                    <input
                        type="tel"
                        placeholder={translations.phone_placeholder}
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        required
                    />
                    <button type="submit">{translations.confirm_button}</button>
                </form>
            )}
        </div>
    );
}

export default RealCalendar;
