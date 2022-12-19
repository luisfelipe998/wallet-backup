const nodemailer = require('nodemailer');

async function sendMail() {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: 'Hello there',
        text: 'This is a test with attachment',
        attachments: [
            {
                filename: `test-${new Date().toISOString()}.txt`,
                path: './test.txt'
            }
        ]
    };

    try {
        const response = await transporter.sendMail(mailOptions);
        console.log(`successfully sent email to ${response.accepted.toString()}`);
        return true;
    } catch (e) {
        console.log(`failed to send email: ${e.message}`);
        return false
    }
}

module.exports = {
    sendMail
}