const reader = require('xlsx');
const axios = require('axios');
const FormData = require('form-data');
const Downloader = require("nodejs-file-downloader");

async function downloadPositions(cookie) {
    const downloader = new Downloader({
        url: "https://statusinvest.com.br/admwallet/patrimonyassetcompleteresultexport",
        directory: "./wallet",
        filename: 'positions.xlsx',
        headers: {
            cookie,
            'Accept': '*/*',
            'Accept-Encoding': 'gzip,deflate,compress',
            'User-Agent': 'PostmanRuntime/7.28.4',
        }
    });
    try {
        await downloader.download();
        console.log("Successfully downloaded positions");
    } catch (error) {
        console.log("Download of positions failed:", error);
    }
}

async function downloadTransactions(cookie) {
    const downloader = new Downloader({
        url: "https://statusinvest.com.br/AdmWallet/TransactionsExport?type=5",
        directory: "./wallet",
        filename: 'transactions.xlsx',
        headers: {
            cookie,
            'Accept': '*/*',
            'Accept-Encoding': 'gzip,deflate,compress',
            'User-Agent': 'PostmanRuntime/7.28.4',
        }
    });
    try {
        await downloader.download();
        console.log("Successfully downloaded transactions");
    } catch (error) {
        console.log("Download of transactions failed:", error);
    }
}

async function downloadEarnings(cookie) {
    const data = new FormData();
    data.append('type', '5');
    data.append('dividendRankType', '0');

    const config = {
        method: 'post',
        url: 'https://statusinvest.com.br/admwallet/allearningresult',
        headers: {
            cookie,
            'Accept': '*/*',
            'Accept-Encoding': 'gzip,deflate,compress',
            'Content-Type': 'multipart/form-data',
            'User-Agent': 'PostmanRuntime/7.28.4',
        },
        data: data
    };
    try {
        const response = await axios(config)
        if (response.status === 200) {
            console.log('Successfully downloaded earnings');
        }
        const worksheet = reader.utils.json_to_sheet(response.data?.data?.[0]?.list);
        const workbook = reader.utils.book_new();
        reader.utils.book_append_sheet(workbook, worksheet, 'earnings');
        reader.writeFile(workbook, './wallet/earnings.xlsx');
    } catch (error) {
        console.log("Processing of earnings failed:", error);
    }
}

module.exports = {
    downloadPositions,
    downloadTransactions,
    downloadEarnings
}