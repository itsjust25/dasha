import { useState } from 'react';
import { dateOptions } from '../data/dateOptions';
import DateCard from './DateCard';
import './DateSelector.css';

interface DateSelectorProps {
    onComplete: (selection: {
        category: string;
        location: string;
        foodOption?: string;
        activities: string[];
        bringOwnFood?: boolean;
        picnicFoodList?: string;
        customImage?: string;
        date?: string;
    }) => void;
}

export default function DateSelector({ onComplete }: DateSelectorProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [selections, setSelections] = useState<Record<string, any>>({});

    const handleCardToggle = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleSelectionChange = (
        id: string,
        data: {
            location: string;
            foodOption?: string;
            activities: string[];
            bringOwnFood?: boolean;
            picnicFoodList?: string;
            customImage?: string;
            date?: string;
        }
    ) => {
        setSelections((prev) => ({
            ...prev,
            [id]: data,
        }));
    };

    const handleSubmit = () => {
        for (const [id, data] of Object.entries(selections)) {
            if (data.location) {
                const option = dateOptions.find((opt) => opt.id === id);
                onComplete({
                    category: option?.title || '',
                    ...data,
                });
                return;
            }
        }
        alert('Please confirm your destination sector! ✈️');
    };

    return (
        <div className="date-selector">
            <div className="selector-header">
                <h2>DEPARTURES</h2>
                <div className="header-flaps">
                    <span>STATUS: ON TIME</span>
                </div>
            </div>

            <div className="cards-grid">
                {dateOptions.map((option) => (
                    <DateCard
                        key={option.id}
                        option={option}
                        isExpanded={expandedId === option.id}
                        onToggle={() => handleCardToggle(option.id)}
                        onSelectionChange={(data) => handleSelectionChange(option.id, data)}
                    />
                ))}
            </div>

            <div className="selector-footer">
                <button className="btn-primary" onClick={handleSubmit}>
                    Confirm Booking ✈️
                </button>
            </div>
        </div>
    );
}
