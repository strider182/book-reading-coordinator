import React, { useState } from 'react';

const CompletionDatePicker: React.FC<{ onDateSelect: (date: Date) => void }> = ({ onDateSelect }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(event.target.value);
        setSelectedDate(date);
        onDateSelect(date);
    };

    return (
        <div className="completion-date-picker">
            <label htmlFor="completion-date">Select Completion Date:</label>
            <input
                type="date"
                id="completion-date"
                onChange={handleDateChange}
            />
        </div>
    );
};

export default CompletionDatePicker;