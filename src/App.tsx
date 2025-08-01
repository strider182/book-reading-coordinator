import React, { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import CoverageDiagram from './components/CoverageDiagram';
import Layout from './components/Layout';
import { User } from './types';

const API_URL = 'http://localhost:4000/api/users';

const App: React.FC = () => {
    const [userData, setUserData] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                // Convert completionDate string to Date object
                setUserData(data.map((u: any) => ({
                    ...u,
                    completionDate: new Date(u.completionDate)
                })));
                setLoading(false);
            });
    }, []);

    const handleUserData = (data: User) => {
        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(() => {
                setUserData(prevData => [...prevData, data]);
            });
    };

    return (
        <Layout>
            <h1>Book Reading Coordinator</h1>
            <UserForm onSubmit={handleUserData} />
            {loading ? <div>Loading...</div> : <CoverageDiagram data={userData} />}
        </Layout>
    );
};

export default App;