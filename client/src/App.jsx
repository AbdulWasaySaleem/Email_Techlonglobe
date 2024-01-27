import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [fromEmail, setFromEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/send-email', { fromEmail, message });
            alert('Email sent successfully!');
            setFromEmail('');
            setMessage('');
        } catch (error) {
            console.error(error);
            alert('Failed to send email. Please try again later.');
        }
    };

    return (
        <div>
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={fromEmail} onChange={(e) => setFromEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Message:</label>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
                </div>
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default App;
