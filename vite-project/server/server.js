import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

app.get('/', async (req, res) => {
    const APIKEY = '1a2fd9969ad4e1cda83fbc4e3a82008b';
    const city = 'Zurich';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
        console.log(data);
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})