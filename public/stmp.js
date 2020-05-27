var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'restaurantinder@gmail.com',
    pass: 'a19981117'
  }
});

var mailOptions = {
  from: 'restaurantinder@gmail.com',
  to: 'wangbingwei1117@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};