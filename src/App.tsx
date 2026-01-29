import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import IntroOverlay from './components/IntroOverlay';
import DateSelector from './components/DateSelector';
import PassportVerification from './components/PassportVerification';
import TicketView from './components/TicketView';
import type { DateSelection } from './types';
import './styles/globals.css';
import './App.css';

type AppPhase = 'intro' | 'passport' | 'selection' | 'comments' | 'ticket' | 'sent';

function App() {
    const [phase, setPhase] = useState<AppPhase>('intro');
    const [selection, setSelection] = useState<DateSelection>({
        category: '',
        location: '',
        activities: [],
        comments: '',
    });

    const handleAccept = () => {
        setPhase('passport');
    };

    const handlePassportApprove = () => {
        setPhase('selection');
    };

    const handleDateSelection = (data: {
        category: string;
        location: string;
        foodOption?: string;
        activities: string[];
        bringOwnFood?: boolean;
        customImage?: string;
    }) => {
        setSelection((prev) => ({
            ...prev,
            ...data,
        }));
        setPhase('comments');
    };

    const handleCommentsSubmit = () => {
        setPhase('ticket');
    };

    const handleSend = () => {
        console.log('Date Selection:', selection);
        alert('Your choices have been saved! 💕\n\nIn the future, this will send an email.');
        setPhase('sent');
    };

    return (
        <div className="app">
            <AnimatePresence mode="wait">
                {phase === 'intro' && <IntroOverlay key="intro" onAccept={handleAccept} />}
            </AnimatePresence>

            {phase === 'passport' && (
                <PassportVerification onApprove={handlePassportApprove} />
            )}

            {phase === 'selection' && <DateSelector onComplete={handleDateSelection} />}

            {phase === 'comments' && (
                <div className="comments-section">
                    <div className="comments-container glass-card">
                        <h2>Any special requests or ideas? 💭</h2>
                        <p className="comments-subtitle">Let me know what would make this perfect for you!</p>
                        <textarea
                            placeholder="Share your thoughts here..."
                            value={selection.comments}
                            onChange={(e) => setSelection({ ...selection, comments: e.target.value })}
                            rows={6}
                        />
                        <div className="comments-actions">
                            <button className="btn-secondary" onClick={() => setPhase('selection')}>
                                Go Back
                            </button>
                            <button className="btn-primary" onClick={handleCommentsSubmit}>
                                See Summary ✨
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {phase === 'ticket' && <TicketView selection={selection} onSend={handleSend} />}

            {phase === 'sent' && (
                <div className="sent-confirmation">
                    <div className="confirmation-card glass-card">
                        <div className="confirmation-icon">
                            <Heart size={80} fill="var(--color-gold)" />
                        </div>
                        <h1>PASSPORT STAMPED!</h1>
                        <p>Your flight to our special day is officially confirmed.</p>
                        <p>I can't wait to make these memories with you, Shekeinah!</p>
                        <p className="confirmation-subtitle">See you at the gate, Valentine! 💕</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
