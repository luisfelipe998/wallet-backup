require('dotenv').config();
const mail = require('./mail');
const account = require('./account');
const wallet = require('./wallet');

async function main() {
    const cookie = await account.login()
    await wallet.downloadPositions(cookie);
    await wallet.downloadTransactions(cookie);
    await wallet.downloadEarnings(cookie);
    await account.logout(cookie)
    await mail.sendMail({
        attachments: {
            positionsFilePath: './wallet/positions.xlsx',
            transactionsFilePath: './wallet/transactions.xlsx',
            earningsFilePath: './wallet/earnings.xlsx'
        }
    });
}

main()