    const mongoose = require('mongoose')
    require('dotenv').config();
    const URI = process.env.DATABASE_URI

    async function connectionToDatabase(){
        try{
            await mongoose.connect(URI)
            console.log('Database connected')
        }catch(error){
            console.log(error)
        }
    }
    module.exports = {connectionToDatabase}



