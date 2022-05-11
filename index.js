const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();
const jwt = require('jsonwebtoken');
const { use } = require('express/lib/application');
require('dotenv').config()

// middleware
app.use(cors());
app.use(express.json());

// api
app.get('/', (req, res) => {
    res.send('hello form jwt token server')
});

app.post('/login', (req, res) => {
    const user = req.body;
    console.log(user)
    if (user.email === 'user@gmail.com' && user.password === '123456') {
        const accessToken = jwt.sign({ email: use.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
        res.send({
            success: true,
            accessToken: accessToken
        })
    }
    else {
        res.send({ success: false })
    }
})


const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'unauthorized person' })
    }
    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'forbidden' })
        }
        req.decoded= decoded;
        next()
    })
}


app.get('/order', verifyJWT, (req, res) => {
    res.send([{ id: 1, order: 'sunglass' }, { id: 2, order: 'shart' }])
})


app.listen(port, () => {
    console.log("server is activated")
})

