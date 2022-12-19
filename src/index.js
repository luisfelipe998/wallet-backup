require('dotenv').config();
const mail = require('./mail');

async function main() {
    mail.sendMail();
}

main()