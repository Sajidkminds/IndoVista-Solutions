const express = require('express');
const path = require ('path');
const fileUpload = require('express-fileupload');
const nodemailer = require('nodemailer');

const app = express();


app.use('/css', express.static(path.join(__dirname,'css')))
app.use('/images', express.static(path.join(__dirname,'images')))
app.use('/js', express.static(path.join(__dirname,'js')))
app.use('/lib', express.static(path.join(__dirname,'lib')))

app.use(fileUpload());

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587, // Your SMTP port (e.g., 587 for TLS, 465 for SSL)
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'sajidrazapec@gmail.com',
    pass: 'armm gurv phci ofed'
  }
});

// Endpoint for file upload
app.post('/upload', (req, res) => {

  const uploadedFile = req.files.file;
  const clientInfo = {
    name : req.body.name,
    email : req.body.email,
    phone : req.body.phone,
    position : req.body.status,
    experience : req.body.experience,
    details : req.body.details
  }

  // Email options
  const mailOptions = {
    from: 'sajidrazapec@gmail.com',
    to: ['syedsaifalipec@gmail.com', 'indovistasolutions.info@gmail.com'],
    subject: 'Job Application',
    text: `
        Name : ${req.body.name}
        Email : ${req.body.email}
        Phone : ${req.body.phone}
        Position : ${req.body.status}
        Experience : ${req.body.experience}
        Description : ${req.body.details}`,

    attachments: [
        { 
            filename: uploadedFile.name,
            content: uploadedFile.data
        }
      ]
    
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
      return res.status(500).send('application failed');
    } else {
      console.log('Email sent:', info.response);
      return res.status(200).send('application successfull');
    }
  });
});


app.get('/',(req,resp)=>{
    resp.sendFile(`${__dirname}/index.html`)
})

app.get('/home',(req,resp)=>{
    resp.sendFile(`${__dirname}/index.html`)
})

app.get('/university',(req,resp)=>{
    resp.sendFile(`${__dirname}/university.html`);
})




const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`SREVER IS ACTIVE ON PORT ${PORT}`);
})