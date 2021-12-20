const cheerio = require('cheerio');
const axios = require('axios');

const crawlUrl = async url => {
    try {
        console.log(`Start crawling ${url}`);

        const {data} = await axios.get(url);
        const $ = cheerio.load(data);
        const jsonRaw = $("script[type='application/json']")[2].children[0].data;
        const {routeProps} = JSON.parse(jsonRaw);

        return routeProps?.b723?.catalogs[0]?.articles?.map(({title, releaseDate}) => ({title, releaseDate}));

    } catch (err) {
        throw err;
    }
};

module.exports = {
    crawlUrl
};
