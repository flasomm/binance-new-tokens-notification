const fs = require('fs');
const {crawlUrl} = require('./lib/scraper');

const BINANCE_NEW_CRYPTO_LISTING_URL = "https://www.binance.com/en/support/announcement/c-48";

(async () => {
    try {
        const scrapedList = await crawlUrl(BINANCE_NEW_CRYPTO_LISTING_URL);

        const lastReleaseDate = fs.readFileSync('release.txt', 'utf8');
        let currentReleaseDate = new Date().getTime();

        const newsList = scrapedList.reduce((acc, {title, releaseDate}) => {
            console.log(new Date(releaseDate), new Date(parseInt(lastReleaseDate)));
            console.log(new Date(releaseDate) > new Date(parseInt(lastReleaseDate)));
            if (!lastReleaseDate || new Date(releaseDate) > new Date(parseInt(lastReleaseDate))) {
                console.log("title", title);
                acc.push(title);
                currentReleaseDate = releaseDate;
            }
            return acc;
        }, []);

        //fs.writeFileSync('release.txt', currentReleaseDate.toString());

        console.info(`Found new cryptos`, newsList);

    } catch (err) {
        console.error(err);
    }
})();
