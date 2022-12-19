const axios = require('axios');
const FormData = require('form-data');

async function login() {
    const data = new FormData();
    data.append('Email', process.env.STATUS_INVEST_EMAIL);
    data.append('Password', process.env.STATUS_INVEST_PASSWORD);

    const config = {
        method: 'post',
        url: 'https://statusinvest.com.br/account/login',
        headers: {
            'Accept-Encoding': 'gzip,deflate,compress',
            'Content-Type': 'multipart/form-data',
            'User-Agent': 'PostmanRuntime/7.28.4',
        },
        data: data
    };
    try {
        const response = await axios(config)
        if (response.status === 200) {
            console.log('Successfully logged in');
        }
        return response.headers?.['set-cookie'].reduce((prev, curr) => `${prev}${prev ? ';' : ''} ${curr}`, '');
    } catch (e) {
        console.log("Log in failed:", e);
        return null;
    }
}

async function logout(cookie) {
    const config = {
        method: 'get',
        url: 'https://statusinvest.com.br/account/logout',
        headers: {
            cookie,
            'Accept-Encoding': 'gzip,deflate,compress',
            'User-Agent': 'PostmanRuntime/7.28.4',
        },
    };
    try {
        await axios(config)
        console.log('Successfully logged out');
    } catch (e) {
        console.log("Log out failed");
    }
}

module.exports = {
    login,
    logout
}