const nodemailer = require('nodemailer');

async function sendMail({ attachments }) {
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
        subject: `Wallet backup from ${new Date().toLocaleDateString('BR')}`,
        text:
            `Hello,
        
Sending as attachments the wallet backup from ${process.env.STATUS_INVEST_EMAIL} account from date ${new Date().toLocaleDateString('BR')}.
        
Regards,
wallet backup script`,
        attachments: [
            {
                filename: `posistions-${new Date().toISOString()}.xlsx`,
                path: attachments.positionsFilePath
            },
            {
                filename: `transactions-${new Date().toISOString()}.xlsx`,
                path: attachments.transactionsFilePath
            },
            {
                filename: `earnings-${new Date().toISOString()}.xlsx`,
                path: attachments.earningsFilePath
            }
        ]
    };

    try {
        const response = await transporter.sendMail(mailOptions);
        console.log(`Successfully sent email to ${response.accepted.toString()}`);
        return true;
    } catch (e) {
        console.log(`Failed to send email: ${e.message}`);
        return false
    }
}

module.exports = {
    sendMail
}