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
    return res.json({ id: shortId })

}
async function handleRedirect(req, res) {

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
        }
    );
    const url = 'google.com'
    res.redirect(url)
    // if (!entry || !entry.redirectURL) {
    //     console.error('Entry or redirectURL not found');
    //     return res.status(404).send('Not Found');
    // }  



}



//     if (!entry.redirectURL) return res.status(400).json({ error: 'Cannot find the url' })
//     res.redirect(entry.redirectURL);
// };





module.exports = {
    handleURLGenerator,
    handleRedirect

}