const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_FILE = path.join(__dirname, 'userData.json');

app.use(cors());
app.use(bodyParser.json());

// Helper to read/write user data
function readUserData() {
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}
function writeUserData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Get all user data
app.get('/api/users', (req, res) => {
    res.json(readUserData());
});

// Add new user data
app.post('/api/users', (req, res) => {
    const user = req.body;
    const data = readUserData();
    // Block duplicate portion assignment
    const alreadyAssigned = data.some(u => u.selectedPortion && u.selectedPortion.id === user.selectedPortion.id);
    if (alreadyAssigned) {
        return res.status(400).json({ success: false, message: 'Portion already assigned.' });
    }
    data.push(user);
    writeUserData(data);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
