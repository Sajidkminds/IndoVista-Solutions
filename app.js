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
  host: 'smtp.example.com', // Your SMTP host
  port: 587, // Your SMTP port (e.g., 587 for TLS, 465 for SSL)
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'indovistasolutions.info@gmail.com',
    pass: 'mnec yors rnkt cfsq'
  }
});

// Endpoint for file upload
app.post('/upload', (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).send('No files were uploaded.');
  }

  const uploadedFile = req.files.file;

  // Email options
  const mailOptions = {
    from: 'indovistasolutions.info@gmail.com',
    to: 'syedsaifali214@gmail.com',
    subject: 'Job Application',
    text: 'Attached is the PDF file.',
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
      return res.status(500).send('Error occurred while sending email.');
    } else {
      console.log('Email sent:', info.response);
      return res.status(200).send('Email sent successfully!');
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




const PORT = process.env.port || 3000;

app.listen(PORT, ()=>{
    console.log(`SREVER IS ACTIVE ON PORT ${PORT}`);
})