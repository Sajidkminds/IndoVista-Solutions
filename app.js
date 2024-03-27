const express = require('express');
const path = require ('path');

const app = express();


app.use('/css', express.static(path.join(__dirname,'css')))
app.use('/images', express.static(path.join(__dirname,'images')))
app.use('/js', express.static(path.join(__dirname,'js')))
app.use('/lib', express.static(path.join(__dirname,'lib')))

app.get('/',(req,resp)=>{
    resp.sendFile(`${__dirname}/index.html`)
})





app.listen(8080, ()=>{
    console.log("server is active on port 8080");
})