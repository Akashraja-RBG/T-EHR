import React, { useState } from 'react';

const EmailForm = () => {
    const [senderEmail, setSenderEmail] = useState('');
    const [senderPassword, setSenderPassword] = useState('');
    const [receiverEmail, setReceiverEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('/send-email/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ senderEmail, senderPassword, receiverEmail, subject, message }),
            });
            const data = await response.json();
            if (response.ok) {
                setSuccess(true);
            } else {
                setError(data.detail);
            }
        } catch (error) {
            setError('Failed to send email');
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Sender Email" value={senderEmail} onChange={(e) => setSenderEmail(e.target.value)} required />
            <input type="password" placeholder="Sender Password" value={senderPassword} onChange={(e) => setSenderPassword(e.target.value)} required />
            <input type="email" placeholder="Receiver Email" value={receiverEmail} onChange={(e) => setReceiverEmail(e.target.value)} required />
            <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
            <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required />
            <button type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Email'}
            </button>
            {error && <p>{error}</p>}
            {success && <p>Email sent successfully</p>}
        </form>
    );
};

export default EmailForm;
