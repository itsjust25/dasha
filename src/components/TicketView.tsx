import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';
import confetti from 'canvas-confetti';
import { dateOptions } from '../data/dateOptions';
import type { DateSelection } from '../types';
import './TicketView.css';

interface TicketViewProps {
    selection: DateSelection;
    onSend: () => void;
}

export default function TicketView({ selection, onSend }: TicketViewProps) {
    const handleSend = () => {
        confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#D4AF37', '#F0F8FF', '#0A192F'],
        });

        onSend();
    };

    return (
        <div className="ticket-view">
            <motion.div
                className="ticket-container"
                initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <div className="boarding-pass">
                    <div className="pass-header">
                        <div className="airline-logo">
                            <Plane className="plane-logo" size={24} />
                            <span>LOVE AIRLINES</span>
                        </div>
                        <div className="pass-class">FIRST CLASS</div>
                    </div>

                    <div className="pass-body">
                        <div className="flight-info-row">
                            <div className="info-block">
                                <label>PASSENGER</label>
                                <div className="value script">Shekeinah</div>
                            </div>
                            <div className="info-block">
                                <label>FLIGHT</label>
                                <div className="value">VAL-143</div>
                            </div>
                            <div className="info-block">
                                <label>DATE</label>
                                <div className="value">14 FEB 2026</div>
                            </div>
                        </div>

                        <div className="destination-row">
                            <div className="route">
                                <div className="city">TIN</div>
                                <div className="plane-path">✈</div>
                                <div className="city">{selection.location.toUpperCase()}</div>
                            </div>
                        </div>

                        <div className="details-grid">
                            <div className="detail-item">
                                <label>ACTIVITY</label>
                                <div>{selection.category}</div>
                            </div>
                            {selection.activities.length > 0 && (
                                <div className="detail-item">
                                    <label>ENTERTAINMENT</label>
                                    <div>{selection.activities.join(', ')}</div>
                                </div>
                            )}
                            <div className="sector-image">
                                {selection.customImage ? (
                                    <img src={selection.customImage} alt="Custom Sector" className="custom-sector-image" />
                                ) : (
                                    <img
                                        src={dateOptions.find(opt => opt.title === selection.category)?.image || ''}
                                        alt="Selected Sector"
                                    />
                                )}
                            </div>
                            {selection.foodOption && (
                                <div className="detail-item">
                                    <label>MEAL</label>
                                    <div>{selection.foodOption}</div>
                                </div>
                            )}
                            {selection.bringOwnFood && (
                                <div className="detail-item">
                                    <label>MEAL</label>
                                    <div>Carry-On (Own Food)</div>
                                </div>
                            )}
                        </div>

                        {selection.comments && (
                            <div className="notes-section">
                                <label>SPECIAL REQUESTS</label>
                                <p>"{selection.comments}"</p>
                            </div>
                        )}
                    </div>

                    <div className="pass-footer">
                        <div className="barcode">
                            {/* Simulated Barcode */}
                            {Array.from({ length: 40 }).map((_, i) => (
                                <div key={i} className="bar" style={{ height: Math.random() > 0.5 ? '100%' : '70%', width: Math.random() * 3 + 1 }} />
                            ))}
                        </div>
                        <button className="confirm-btn" onClick={handleSend}>CONFIRM BOARDING</button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
