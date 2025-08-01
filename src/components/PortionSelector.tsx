import React from 'react';

const portions = Array.from({ length: 30 }, (_, index) => ({ id: index + 1, title: `Portion ${index + 1}` }));

interface PortionSelectorProps {
    selectedPortions: number[];
    onPortionChange: (portionIds: number[]) => void;
    assignedPortions?: number[];
}

const PortionSelector: React.FC<PortionSelectorProps> = ({ selectedPortions, onPortionChange, assignedPortions = [] }) => {
    const togglePortion = (id: number) => {
        if (assignedPortions.includes(id)) return;
        if (selectedPortions.includes(id)) {
            onPortionChange(selectedPortions.filter(pid => pid !== id));
        } else {
            onPortionChange([...selectedPortions, id]);
        }
    };

    const selectAll = () => {
        onPortionChange(portions.filter(p => !assignedPortions.includes(p.id)).map(p => p.id));
    };

    const clearAll = () => {
        onPortionChange([]);
    };

    return (
        <div>
            <div style={{ marginBottom: '10px' }}>
                <button type="button" onClick={selectAll} style={{ marginRight: '8px' }}>Select All Available</button>
                <button type="button" onClick={clearAll} style={{ color: 'red', border: '1px solid red', background: 'white' }}>Clear All</button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {portions.map(portion => {
                    const isAssigned = assignedPortions.includes(portion.id);
                    return (
                        <button
                            key={portion.id}
                            type="button"
                            onClick={() => togglePortion(portion.id)}
                            disabled={isAssigned}
                            style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '8px',
                                background: isAssigned
                                    ? '#e5e7eb'
                                    : selectedPortions.includes(portion.id)
                                    ? '#6ee7b7'
                                    : 'white',
                                border: isAssigned
                                    ? '2px solid #d1d5db'
                                    : selectedPortions.includes(portion.id)
                                    ? '2px solid #34d399'
                                    : '1px solid #ccc',
                                color: isAssigned ? '#9ca3af' : selectedPortions.includes(portion.id) ? 'white' : 'black',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                cursor: isAssigned ? 'not-allowed' : 'pointer',
                            }}
                        >
                            {portion.id}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default PortionSelector;