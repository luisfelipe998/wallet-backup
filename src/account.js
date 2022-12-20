const axios = require('axios');
const FormData = require('form-data');

async function login() {
    const data = new FormData();
    data.append('Email', process.env.STATUS_INVEST_EMAIL);
    data.append('Password', process.env.STATUS_INVEST_PASSWORD);

    const config = {
        method: 'post',
        withCredentials: true,
        url: 'https://statusinvest.com.br/account/login',
        headers: {
            'Accept': "*/*",
            'Accept-Language': 'en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7',
            'Accept-Encoding': 'gzip,deflate,compress',
            'Content-Type': 'multipart/form-data',
            'Cookie': '_adasys=726c7e66-3089-4493-8303-6273d3b04767; _ga=GA1.3.1152179455.1659753400; pg_mm2_cookie_a=391e91e0-2869-4b1c-9c2d-98fb3bf1dcad; hubspotutk=b92a9a8ae75851c657de31b10518b021; _fbp=fb.2.1659753421074.272538503; G_ENABLED_IDPS=google; pg_height=1120; pg_width=1792; pg_awidth=1792; pg_aheight=1023; messagesUtk=27d33bdcb09441809b404f75833a7957; _gcl_au=1.1.1908723972.1667571936; pg_custom_timeout=; pg_ip=200.180.174.125; __hssrc=1; pg_analytics=disabled; __gads=ID=356b88b2fce67683-22befdbad5d8001f:T=1659753412:S=ALNI_MZN4Xhp0ALlXrpPadIK0rNweD16Qw; pg_beacon=1; pg_ua=Mozilla/5.0 (Macintosh Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36; pg_bot_reason=lnb; pg_bot_percent=0; __qca=P0-474551009-1671208992309; _gid=GA1.3.766796582.1671473825; .StatusAdThin=1; pg_lazy=1; pg_driftingTypePercent=0; pg_chaser=0; pg_outstream=0; pg_vignettePercent=0; pg_tc=sample; pg_pl=9; pg_quick_check=true; pg_latency_before_tc=382; pg_preconnecting=unset; pg_after_init_response_time=291; pg_bot_model=1; pg_tc_response_time=342; __gpi=UID=00000838f88ecedc:T=1659753412:RT=1671473847:S=ALNI_MajCg7aHp1FLeEwQ3pPoZd2UEH_eg; FCNEC=%5B%5B%22AKsRol-XsA3kIMLytJMuT9_SYPUQ3_zrEhsmraqKSYgYsq0pk4qmikVA0-vhQ83QO57gRMqhXWwgFep3n2VlUcFJXmugVYodOTBVcTVLrNtMgvtZsF-pQU--glWsCtwTZJheOnDs9JWx4cNhiixS7AXPXtmd_nHuTg%3D%3D%22%5D%2Cnull%2C%5B%5D%5D; pg_last_unload=9085660; pg_pv_time_1=9085660; pg_mouse_move=157; pg_keypress=0; pg_click=3; pg_touch_start=0; pg_touch_move=0; pg_scroll=0; __hstc=176625274.b92a9a8ae75851c657de31b10518b021.1663334004007.1671473843166.1671482946920.129; _gat_UA-142136095-1=1; __cf_bm=RQlLpicht2O2H7bolsx7QvvhRc5G4UfC_quYOr2CXDQ-1671506605-0-AcS2ZbIUpfCHjygTRyIbijMofNkaYrpbju+lXAlOgA5VlfMqVmO0jtsoc5svtV32MXSIGfRybg4OxQHUneCxYPARaugutHyTC+z2u5gyUwug/o9+wckF/RBfrBda3W+xno6zWBQwOaWtMN8iCvLnt9o='
            // 'origin': 'https://statusinvest.com.br,',
            // 'pragma': 'no-cache',
            // 'referer': 'https://statusinvest.com.br/',
            // 'sec-ch-ua': `"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"`,
            // 'sec-ch-ua-mobile': '?0',
            // 'sec-ch-ua-platform': "macOS",
            // 'sec-fetch-dest': 'empty',
            // 'sec-fetch-mode': 'cors',
            // 'sec-fetch-site': 'same-origin',
            // 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
            // 'x-requested-with': 'XMLHttpRequest'
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