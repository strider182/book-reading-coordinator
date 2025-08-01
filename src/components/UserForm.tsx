import React, { useState } from 'react';
import PortionSelector from './PortionSelector';
import CompletionDatePicker from './CompletionDatePicker';
import { User, Portion } from '../types';

interface UserFormProps {
    onSubmit: (data: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [selectedPortions, setSelectedPortions] = useState<number[]>([]);
    const [completionDate, setCompletionDate] = useState<Date | null>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!name || selectedPortions.length === 0 || !completionDate) return;
        // Submit one User object per selected portion
        selectedPortions.forEach(portionId => {
            onSubmit({
                name,
                selectedPortion: { id: portionId, title: `Portion ${portionId}` },
                completionDate,
            });
        });
        setName('');
        setSelectedPortions([]);
        setCompletionDate(null);
    };

    return (
        <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', maxWidth: '600px', margin: 'auto' }}>
            <h2 style={{ marginBottom: '16px' }}>Join the Reading Project</h2>
            <div style={{ marginBottom: '16px' }}>
                <label htmlFor="name" style={{ fontWeight: 'bold' }}>Your Name</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '8px' }}
                />
            </div>
            <div style={{ marginBottom: '16px' }}>
                <label htmlFor="portion" style={{ fontWeight: 'bold' }}>Select Your Reading Portions (1-30)</label>
                <PortionSelector
                    selectedPortions={selectedPortions}
                    onPortionChange={setSelectedPortions}
                />
            </div>
            <div style={{ marginBottom: '16px' }}>
                <label htmlFor="completionDate" style={{ fontWeight: 'bold' }}>Completion Date</label>
                <CompletionDatePicker
                    onDateSelect={setCompletionDate}
                />
            </div>
            <button type="submit" style={{ background: '#facc15', color: '#fff', border: 'none', borderRadius: '6px', padding: '12px 24px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
                Claim Portion(s)
            </button>
        </form>
    );
};

export default UserForm;