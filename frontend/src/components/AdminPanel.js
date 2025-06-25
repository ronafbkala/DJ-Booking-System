import React, { useEffect, useState } from 'react';
import './AdminPanel.css';

function AdminPanel({ translations }) {

    const [bookings, setBookings] = useState([]);
    const [editBookingId, setEditBookingId] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', phone: '', date: '' });

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/bookings`)
            .then(res => res.json())
            .then(data => setBookings(data))
            .catch(err => console.error("❌ Failed to fetch bookings:", err));
    }, []);

    const handleDelete = (id) => {
        if (!window.confirm(translations.confirm_delete)) return;

        fetch(`${API_BASE_URL}/api/bookings/${id}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.ok) {
                    setBookings(bookings.filter(b => b.id !== id));
                } else {
                    alert(translations.error_message);
                }
            })
            .catch(err => {
                console.error("❌ Delete failed:", err);
                alert(translations.error_message);
            });
    };

    // Nytt
    const handleApprove = (id) => {
        fetch(`${API_BASE_URL}/api/bookings/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'approved' })
        })
            .then(res => res.json())
            .then(updated => {
                setBookings(bookings.map(b => (b.id === id ? updated : b)));
            })
            .catch(err => {
                console.error("❌ Approval failed:", err);
                alert(translations.error_message);
            });
    };

    const handleEditClick = (booking) => {
        setEditBookingId(booking.id);
        setEditForm({ name: booking.name, phone: booking.phone, date: booking.date });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditSubmit = (id) => {
        fetch(`${API_BASE_URL}/api/bookings/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editForm)
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Update failed");
                }
            })
            .then((updated) => {
                setBookings(bookings.map(b => (b.id === id ? updated : b)));
                setEditBookingId(null);
            })
            .catch(err => {
                console.error("❌ Update failed:", err);
                alert(translations.error_message);
            });
    };

    const handleCancelEdit = () => {
        setEditBookingId(null);
    };

    return (
        <div className="admin-panel">
            <h2>{translations.admin_title}</h2>
            <p>{translations.admin_welcome}</p>
            {/* Här kan du senare lägga till funktioner som att se bokningar, godkänna m.m. */}

            <h3>{translations.admin_all_bookings}</h3>
            <table>
                <thead>
                <tr>
                    <th>{translations.name_placeholder}</th>
                    <th>{translations.phone_placeholder}</th>
                    <th>{translations.date}</th>
                    <th>Status</th>
                    <th>{translations.actions}</th>
                </tr>
                </thead>
                <tbody>
                {bookings.map((booking) => (
                    <tr key={booking.id}>
                        {editBookingId === booking.id ? (
                            <>
                                <td>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editForm.name}
                                        onChange={handleEditChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={editForm.phone}
                                        onChange={handleEditChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        name="date"
                                        value={editForm.date}
                                        onChange={handleEditChange}
                                    />
                                </td>
                                <td>{booking.status}</td>
                                <td>
                                    <button onClick={() => handleEditSubmit(booking.id)}>
                                        {translations.save}
                                    </button>
                                    <button onClick={handleCancelEdit}>
                                        {translations.cancel}
                                    </button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td>{booking.name}</td>
                                <td>{booking.phone}</td>
                                <td>{booking.date}</td>
                                <td>{booking.status}</td>
                                <td>
                                    {booking.status === 'pending' && (
                                        <button onClick={() => handleApprove(booking.id)}>
                                            {translations.approve}
                                        </button>
                                    )}
                                    <button onClick={() => handleEditClick(booking)}>
                                        {translations.edit}
                                    </button>
                                    <button onClick={() => handleDelete(booking.id)}>
                                        {translations.delete}
                                    </button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminPanel;