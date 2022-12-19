require('dotenv').config();
const mail = require('./mail');

const fs = require('fs');

async function main() {
    fs.writeFileSync('./test.txt', new Date().toISOString());
    console.log('HEEELLLLLOOOOOO');
    mail.sendMail();
}

main()