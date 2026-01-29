import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, Heart } from 'lucide-react';
import './IntroOverlay.css';

interface IntroOverlayProps {
    onAccept: () => void;
}

export default function IntroOverlay({ onAccept }: IntroOverlayProps) {
    const [isRevealed, setIsRevealed] = useState(false);

    const handleReveal = () => {
        setIsRevealed(true);
    };

    return (
        <motion.div
            className="intro-overlay"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="boarding-card"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, type: 'spring' }}
            >
                {/* Header */}
                <div className="card-header">
                    <div className="airline-branding">
                        <Plane className="airline-icon" size={32} />
                        <div className="airline-text">
                            <h1 className="airline-name">Love Airlines</h1>
                            <p className="airline-tagline">First Class Romance</p>
                        </div>
                    </div>
                    <Heart className="heart-icon" size={28} fill="currentColor" />
                </div>

                {/* Main Content */}
                <div className="card-body">
                    {!isRevealed ? (
                        <motion.div
                            className="invitation-preview"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <h2 className="invitation-title">You're Invited</h2>
                            <p className="invitation-subtitle">A Special Valentine's Journey Awaits</p>
                            <div className="flight-badge">
                                <span className="badge-label">FLIGHT</span>
                                <span className="badge-value">LA-143</span>
                            </div>
                            <button className="reveal-btn" onClick={handleReveal}>
                                Open Invitation ✈️
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            className="invitation-details"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="passenger-info">
                                <label>PASSENGER</label>
                                <span className="passenger-name">My Valentine</span>
                            </div>

                            <div className="flight-info-grid">
                                <div className="info-item">
                                    <label>FLIGHT</label>
                                    <span>LA-143</span>
                                </div>
                                <div className="info-item">
                                    <label>DATE</label>
                                    <span>14 FEB 2026</span>
                                </div>
                                <div className="info-item">
                                    <label>FROM</label>
                                    <span>HEART</span>
                                </div>
                                <div className="info-item">
                                    <label>CLASS</label>
                                    <span>FIRST</span>
                                </div>
                            </div>

                            <div className="boarding-message">
                                <p>Are you ready for departure?</p>
                                <p className="message-subtitle">Let's plan our perfect Valentine's date</p>
                            </div>

                            <button className="board-btn" onClick={onAccept}>
                                Board Flight ✈️
                            </button>
                        </motion.div>
                    )}
                </div>

                {/* Footer */}
                <div className="card-footer">
                    <div className="barcode">
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className="bar"
                                style={{
                                    width: Math.random() > 0.5 ? '3px' : '2px',
                                    height: '40px'
                                }}
                            />
                        ))}
                    </div>
                    <span className="booking-ref">REF: VAL2026</span>
                </div>
            </motion.div>
        </motion.div>
    );
}
