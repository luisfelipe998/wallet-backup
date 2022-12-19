require('dotenv').config();
const mail = require('./mail');

async function main() {
    console.log('HEEELLLLLOOOOOO');
    mail.sendMail();
}

main()