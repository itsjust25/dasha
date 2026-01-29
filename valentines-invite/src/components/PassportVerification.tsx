import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, CheckCircle } from 'lucide-react';
import './PassportVerification.css';

interface PassportVerificationProps {
    onApprove: () => void;
}

export default function PassportVerification({ onApprove }: PassportVerificationProps) {
    const [photo, setPhoto] = useState<string | null>(null);
    const [isApproving, setIsApproving] = useState(false);

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleApprove = () => {
        setIsApproving(true);
        setTimeout(() => {
            onApprove();
        }, 1500);
    };

    return (
        <div className="passport-verification">
            <motion.div
                className="passport-book"
                initial={{ scale: 0.8, opacity: 0, rotateY: -20 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.8, type: 'spring' }}
            >
                <div className="passport-cover">
                    <div className="passport-emblem">✈</div>
                    <h1>LOVE AIRLINES</h1>
                    <h2>PASSPORT</h2>
                    <p className="passport-country">REPUBLIC OF HEARTS</p>
                </div>

                <div className="passport-inner">
                    <div className="passport-header">
                        <span className="passport-type">TYPE / TYPE</span>
                        <span className="passport-code">P</span>
                    </div>

                    <div className="passport-content">
                        <div className="passport-photo-section">
                            <div className="photo-frame">
                                {photo ? (
                                    <img src={photo} alt="Passport" className="uploaded-photo" />
                                ) : (
                                    <div className="photo-placeholder">
                                        <Camera size={40} />
                                        <span>Upload Photo</span>
                                    </div>
                                )}
                            </div>
                            <label htmlFor="photo-upload" className="upload-btn">
                                <Camera size={16} />
                                {photo ? 'Change Photo' : 'Add Photo'}
                            </label>
                            <input
                                id="photo-upload"
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                                style={{ display: 'none' }}
                            />
                        </div>

                        <div className="passport-details">
                            <div className="detail-field">
                                <label>SURNAME / NOM</label>
                                <div className="detail-value">SHEKEINAH</div>
                            </div>

                            <div className="detail-field">
                                <label>FROM / DE</label>
                                <div className="detail-value">TIN</div>
                            </div>

                            <div className="detail-field">
                                <label>NATIONALITY / NATIONALITÉ</label>
                                <div className="detail-value">HEARTLAND</div>
                            </div>

                            <div className="detail-row">
                                <div className="detail-field">
                                    <label>DATE OF BIRTH / DATE DE NAISSANCE</label>
                                    <div className="detail-value">14 FEB</div>
                                </div>
                                <div className="detail-field">
                                    <label>SEX / SEXE</label>
                                    <div className="detail-value">F</div>
                                </div>
                            </div>

                            <div className="detail-field">
                                <label>PASSPORT NO. / PASSEPORT NO.</label>
                                <div className="detail-value passport-number">LA-2026-143</div>
                            </div>

                            <div className="detail-row">
                                <div className="detail-field">
                                    <label>DATE OF ISSUE / DATE DE DÉLIVRANCE</label>
                                    <div className="detail-value">29 JAN 2026</div>
                                </div>
                                <div className="detail-field">
                                    <label>DATE OF EXPIRY / DATE D'EXPIRATION</label>
                                    <div className="detail-value">14 FEB 2026</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {isApproving && (
                        <motion.div
                            className="visa-stamp"
                            initial={{ scale: 0, rotate: -45, opacity: 0 }}
                            animate={{ scale: 1, rotate: -15, opacity: 1 }}
                            transition={{ duration: 0.5, type: 'spring' }}
                        >
                            <div className="stamp-circle">
                                <CheckCircle size={40} />
                                <span>APPROVED</span>
                                <span className="stamp-date">29 JAN 2026</span>
                            </div>
                        </motion.div>
                    )}

                    <div className="button-group-passport">
                        <button
                            className="approve-visa-btn"
                            onClick={handleApprove}
                            disabled={isApproving || !photo}
                        >
                            {isApproving ? 'APPROVING VISA...' : 'APPROVE VISA & PROCEED'}
                        </button>
                        {!photo && (
                            <p className="photo-required-msg">Please upload a photo to proceed</p>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
