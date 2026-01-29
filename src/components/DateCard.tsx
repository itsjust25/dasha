import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Camera } from 'lucide-react';
import type { DateOption } from '../types';
import './DateCard.css';

interface DateCardProps {
    option: DateOption;
    isExpanded: boolean;
    onToggle: () => void;
    onSelectionChange: (data: {
        location: string;
        foodOption?: string;
        activities: string[];
        bringOwnFood?: boolean;
        customImage?: string;
    }) => void;
}

export default function DateCard({ option, isExpanded, onToggle, onSelectionChange }: DateCardProps) {
    const [location, setLocation] = useState(option.locations[0]);
    const [foodOption, setFoodOption] = useState('');
    const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
    const [bringOwnFood, setBringOwnFood] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [customWhere, setCustomWhere] = useState('');
    const [customWhen, setCustomWhen] = useState('');
    const [customImage, setCustomImage] = useState<string | undefined>(undefined);

    const handleChange = () => {
        const selection: Parameters<typeof onSelectionChange>[0] = {
            location: option.customInput ? customWhere : location,
            foodOption: foodOption || undefined,
            activities: selectedActivities.length > 0 ? selectedActivities : option.activities || [],
            bringOwnFood: option.hasOwnFood ? bringOwnFood : undefined,
            customImage: option.customInput ? customImage : undefined,
        };
        onSelectionChange(selection);
    };

    const handleCustomPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setCustomImage(result);
                // Trigger change immediately after state update
                const selection: Parameters<typeof onSelectionChange>[0] = {
                    location: customWhere || option.locations[0],
                    foodOption: foodOption || undefined,
                    activities: selectedActivities.length > 0 ? selectedActivities : option.activities || [],
                    bringOwnFood: option.hasOwnFood ? bringOwnFood : undefined,
                    customImage: result,
                };
                onSelectionChange(selection);
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleActivity = (activity: string) => {
        const updated = selectedActivities.includes(activity)
            ? selectedActivities.filter(a => a !== activity)
            : [...selectedActivities, activity];
        setSelectedActivities(updated);
        setTimeout(handleChange, 0);
    };

    // Generate a fake flight code based on ID
    const flightCode = `VAL-${option.id.substring(0, 3).toUpperCase()}`;

    return (
        <motion.div
            className={`date-card ${isExpanded ? 'expanded' : ''}`}
            layout
            onClick={!isExpanded ? onToggle : undefined}
        >
            {/* Flight Row Header */}
            <div className="card-overlay">
                <span className="flight-code">{flightCode}</span>
                <h3>{option.title}</h3>
                <span className="status">ON TIME</span>
                <div className="expand-icon" onClick={(e) => { e.stopPropagation(); onToggle(); }}>
                    {isExpanded ? <ChevronUp /> : <ChevronDown />}
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        className="card-details"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="details-content-grid">
                            <img
                                src={customImage || option.image}
                                alt={option.title}
                                className="expanded-image"
                            />

                            <div className="form-column">
                                <div className="form-group">
                                    <label>PREFERRED DATE</label>
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => {
                                            setSelectedDate(e.target.value);
                                            setTimeout(handleChange, 0);
                                        }}
                                    />
                                </div>

                                {option.customInput ? (
                                    <>
                                        <div className="form-group">
                                            <label>WHERE (Your Suggestion)</label>
                                            <input
                                                type="text"
                                                placeholder="Enter location..."
                                                value={customWhere}
                                                onChange={(e) => {
                                                    setCustomWhere(e.target.value);
                                                    setLocation(e.target.value);
                                                    setTimeout(handleChange, 0);
                                                }}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>WHAT TO DO</label>
                                            <input
                                                type="text"
                                                placeholder="e.g., Dinner, Movie, Walk in the park"
                                                value={customWhen}
                                                onChange={(e) => {
                                                    setCustomWhen(e.target.value);
                                                    setTimeout(handleChange, 0);
                                                }}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>UPLOAD YOUR IDEAL VIEW / ACTIVITY IMAGE</label>
                                            <label htmlFor={`custom-photo-${option.id}`} className="upload-btn">
                                                <Camera size={16} />
                                                {customImage ? 'Change Image' : 'Add Image'}
                                            </label>
                                            <input
                                                id={`custom-photo-${option.id}`}
                                                type="file"
                                                accept="image/*"
                                                onChange={handleCustomPhotoUpload}
                                                style={{ display: 'none' }}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div className="form-group">
                                        <label>DESTINATION SECTOR (Location)</label>
                                        <select
                                            value={location}
                                            onChange={(e) => {
                                                setLocation(e.target.value);
                                                setTimeout(handleChange, 0);
                                            }}
                                        >
                                            <option value="">Select Destination Sector...</option>
                                            {option.locations.map((loc) => (
                                                <option key={loc} value={loc}>
                                                    {loc}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {option.hasOwnFood && (
                                    <div className="form-group checkbox-group">
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={bringOwnFood}
                                                onChange={(e) => {
                                                    setBringOwnFood(e.target.checked);
                                                    setTimeout(handleChange, 0);
                                                }}
                                            />
                                            <span>CARRY-ON MEAL (Bring Own Food)</span>
                                        </label>
                                    </div>
                                )}

                                {option.activities && option.activities.length > 0 && (
                                    <div className="form-group">
                                        <label>IN-FLIGHT ENTERTAINMENT (Activities)</label>
                                        <div className="activity-chips">
                                            {option.activities.map((activity) => (
                                                <button
                                                    key={activity}
                                                    className={`chip ${selectedActivities.includes(activity) ? 'active' : ''}`}
                                                    onClick={() => toggleActivity(activity)}
                                                    type="button"
                                                >
                                                    {activity}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {option.foodOptions && option.foodOptions.length > 0 && (
                                    <div className="form-group">
                                        <label>MEAL PREFERENCE</label>
                                        <select
                                            value={foodOption}
                                            onChange={(e) => {
                                                setFoodOption(e.target.value);
                                                setTimeout(handleChange, 0);
                                            }}
                                        >
                                            <option value="">Select Meal Service...</option>
                                            {option.foodOptions.map((food) => (
                                                <option key={food} value={food}>
                                                    {food}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
