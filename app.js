const express = require('express');
const app = express();
const path = require("path")
const ejs = require('ejs');
app.use(express.static('public'))

//TEMPLATE ENGINE
app.set("view engine","ejs")







//MIDDLEWARE
// const myLogger = (req,res,next) =>{
//     console.log("Log kaydi tutuldu")
//     next();
// }
// const myLogger2 = (req,res,next) =>{
//     console.log("Log kaydi tutuldu 2")
//     next();
// }

// app.use(myLogger)
// app.use(myLogger2)


//ROUTES
app.get("/",(req,res)=>{
    res.render('index')
})
app.get("/about",(req,res)=>{
    res.render('about')
})
app.get('/add',(req,res)=>{
    res.render('add')
})


const port = 3000;
app.listen(port, () => {
    console.log(`Sunucumuz ${port} portunda baslatildi.`)
})