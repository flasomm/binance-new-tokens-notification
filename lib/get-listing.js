const getListing = scrapedList => {
  const today = new Date().setHours(0, 0, 0, 0);
  const newsList = scrapedList.reduce((acc, { title, releaseDate }) => {
    if (new Date(releaseDate) > new Date(today)) {
      acc.push(title);
    }
    return acc;
  }, []);

  return newsList;
};

module.exports = {
  getListing,
};
