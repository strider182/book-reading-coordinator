import React from 'react';
import { User } from '../types';

interface CoverageDiagramProps {
    data: User[];
}

const TOTAL_PORTIONS = 30;

const CoverageDiagram: React.FC<CoverageDiagramProps> = ({ data }) => {
    // Calculate stats
    const assignedPortions = data.length;
    const availablePortions = TOTAL_PORTIONS - assignedPortions;
    const activeReaders = Array.from(new Set(data.map(u => u.name))).length;
    const estCompletion = data.length > 0 ? new Date(Math.max(...data.map(u => u.completionDate.getTime()))) : null;

    // Build grid overview
    const portionGrid = Array.from({ length: TOTAL_PORTIONS }, (_, i) => {
        const portionId = i + 1;
        const assigned = data.find(u => u.selectedPortion.id === portionId);
        return {
            id: portionId,
            assigned,
        };
    });

    return (
        <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', maxWidth: '900px', margin: '32px auto' }}>
            <h2 style={{ marginBottom: '16px' }}>Project Progress</h2>
            <div style={{ marginBottom: '16px' }}>
                <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
                    <div style={{ width: `${(assignedPortions / TOTAL_PORTIONS) * 100}%`, height: '100%', background: '#34d399' }}></div>
                </div>
                <div style={{ display: 'flex', gap: '32px', marginBottom: '16px' }}>
                    <div><strong>{assignedPortions}</strong><br />Portions Assigned</div>
                    <div><strong>{availablePortions}</strong><br />Available Portions</div>
                    <div><strong>{activeReaders}</strong><br />Active Readers</div>
                    <div><strong>{estCompletion ? estCompletion.toLocaleDateString() : '-'}</strong><br />Est. Completion</div>
                </div>
            </div>
            <h3 style={{ marginBottom: '12px' }}>Reading Portions Overview</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>
                {portionGrid.map(({ id, assigned }) => (
                    <div key={id} style={{
                        background: assigned ? '#6ee7b7' : 'white',
                        border: assigned ? '2px solid #34d399' : '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '12px',
                        minHeight: '60px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                    }}>
                        <div style={{ fontWeight: 'bold' }}>Portion {id}</div>
                        {assigned ? (
                            <>
                                <div style={{ fontSize: '14px' }}>{assigned.name}</div>
                                <div style={{ fontSize: '12px', color: '#374151' }}>Due: {assigned.completionDate.toLocaleDateString()}</div>
                            </>
                        ) : (
                            <div style={{ fontSize: '14px', color: '#6b7280' }}>Available</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoverageDiagram;