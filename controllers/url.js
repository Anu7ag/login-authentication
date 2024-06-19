const generateShortId = require('ssid');
const URL = require('../models/url')

async function handleURLGenerator(req, res) {
    const body = req.body
    if (!body.url) return res.status(400).json({ error: 'url is required' })
    const shortId = generateShortId();
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
    })
    return res.send({ shortId: shortId })

}
async function handleRedirect(req, res) {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate(
            {
                shortId,
            },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            },
            { new: true }
        );


        if (!entry || !entry.redirectURL) {
            console.error('Entry or redirectURL not found');
            return res.status(404).send('Not Found');
        }
        return res.redirect(entry.redirectURL)


    }
    catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId
    const result = await URL.findOne({ shortId })
    return res.json({
        totalClicks: result.visitHistory.length, analytics: result.visitHistory
    })



}

async function hanRed(req, res) {

    const { shortId } = req.body
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        },
        { new: true }
    );


    // if (!entry || !entry.redirectURL) {
    //     console.error('Entry or redirectURL not found');
    //     return res.status(404).send('Not Found');
    // }
    // const html = `<a href= ${entry.redirectURL}>hello </a>`
    // res.end(html)
    res.end(entry.redirectURL)


}







module.exports = {
    handleURLGenerator,
    handleRedirect,
    handleGetAnalytics,
    hanRed

}