import React from 'react';

const portions = Array.from({ length: 30 }, (_, index) => ({ id: index + 1, title: `Portion ${index + 1}` }));

interface PortionSelectorProps {
    selectedPortions: number[];
    onPortionChange: (portionIds: number[]) => void;
}

const PortionSelector: React.FC<PortionSelectorProps> = ({ selectedPortions, onPortionChange }) => {
    const togglePortion = (id: number) => {
        if (selectedPortions.includes(id)) {
            onPortionChange(selectedPortions.filter(pid => pid !== id));
        } else {
            onPortionChange([...selectedPortions, id]);
        }
    };

    const selectAll = () => {
        onPortionChange(portions.map(p => p.id));
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
                {portions.map(portion => (
                    <button
                        key={portion.id}
                        type="button"
                        onClick={() => togglePortion(portion.id)}
                        style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '8px',
                            background: selectedPortions.includes(portion.id) ? '#6ee7b7' : 'white',
                            border: selectedPortions.includes(portion.id) ? '2px solid #34d399' : '1px solid #ccc',
                            color: selectedPortions.includes(portion.id) ? 'white' : 'black',
                            fontWeight: 'bold',
                            fontSize: '16px',
                        }}
                    >
                        {portion.id}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PortionSelector;