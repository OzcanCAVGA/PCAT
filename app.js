const express = require('express');
const app = express();
const path = require("path")
app.use(express.static('public'))

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

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname,'temp/index.html'))
});


const port = 3000;
app.listen(port, () => {
    console.log(`Sunucumuz ${port} portunda baslatildi.`)
})