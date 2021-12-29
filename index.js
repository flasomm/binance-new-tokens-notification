const { crawlUrl } = require('./lib/scraper');
const { getListing } = require('./lib/get-listing');
const { sendEmail } = require('./lib/mailer');

const BINANCE_NEW_CRYPTO_LISTING_URL = 'https://www.binance.com/en/support/announcement/c-48';

(async () => {
  try {
    const scrapedList = await crawlUrl(BINANCE_NEW_CRYPTO_LISTING_URL);
    const newsList = getListing(scrapedList);
    await sendEmail(newsList);

    console.info(`Found new cryptos`, newsList);

  } catch (err) {
    console.error(err);
  }
})();
