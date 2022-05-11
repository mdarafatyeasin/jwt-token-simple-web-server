const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// api
app.get('/', (req, res) => {
    res.send('hello form jwt token server')
});

app.post('/login', (req, res) => {
    res.send({success : true})
})

app.listen(port, () => {
    console.log("server is activated")
})

