import { getAccessToken } from './sita-client';

const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req:Express.Request, res: Response) => {
    // @ts-ignore
    res.status(200).json({'status': 'ok'})
});

app.listen(port, async() => {
    console.log(`[server]: Server is running at https://localhost:${port}`);

});
