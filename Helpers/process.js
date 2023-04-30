const rssParser = require('rss-parser')
const news = require('../Models/newsModel');
const newsSource = require('../Models/newsSourceModel');
const parser = new rssParser();

const parse = async (url, cat, nsId, uId) => {

    await news.model.deleteMany({ userId: uId });
    const feed = await parser.parseURL(url);
    console.log(feed.title);

    feed.items.forEach(item => {

        item.categories.forEach(obj => {
            if (obj === cat) {
                const nNew = new news.model({
                    title: item.title,
                    description: item.contentSnippet,
                    permanLink: item.link,
                    date: item.pubDate,
                    newsSourceId: nsId,
                    userId: uId,
                    category: cat,

                });
                nNew.save();
            }
        })
        //console.log(`${item.title}\n${item.link}\n\n`)

    })
};

module.exports = { parse };