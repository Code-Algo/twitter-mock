// CommonJS import
const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const { connectDB } = require('./src/db')
// don't use ES6 modules
// import express from 'express'


dotenv.config()

const app = express()

connectDB()

//set the view engine to ejs
app.set('view engine', 'ejs')

//tell Express where the view folder will live
app.set('views', path.join(__dirname, '/src/templates/views') )

app.use(express.json())

//custom token login required middleware
const loginRequired = function(req, res, next){
    console.log('My Middleware is running')
    if (!req.headers.authorization){
        return res.sendStatus(401)
    } 
    token = req.headers.authorization.slice(7)
    user = people.filter(p=>p.token ==token)
    if (user.length <= 0){
        return res.sendStatus(401)
    }
    next()
}

app.use(['/people', '/item'],loginRequired)


app.get("/",(req, res)=>{
    res.render('home')
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server running at http://localhost:${process.env.PORT} ...`)
})

app.post("/login",(req, res)=>{
    const email = req.body.email
    const password = req.body.password
    user = people.filter(p=>p.email==email)[0]
    if (!user){
        res.sendStatus(401)
    }else{
        const token = `${Math.random().toString(36).slice(2)}`
        user.token = token
        res.send(user.token)
    }
})