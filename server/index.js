const express = require('express')
const {connectionToDatabase} = require('./connection/connection.js')
const productRoutes = require('./routes/productRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
require('dotenv').config();
const {authGuard} = require('./middleware/authGuard.js')
const PORT = process.env.PORT
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())

connectionToDatabase()

app.get('/api/protected', authGuard, (req, res) => {
    res.json({ message: 'Token is valid', sucess:true, user: req.user });
  });

app.use('/api/product',authGuard, productRoutes)
app.use('/api/user' ,userRoutes)

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})