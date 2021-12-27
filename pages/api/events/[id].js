const { events } = require('./data.json');

export default function handler(req, res) {
    const evt = events.filter(e => e.id === req.query.id);

    if(req.method === 'GET')
    {
        res.status(200).json(evt)
    }
    else
    {
        res.header('Allow', ['GET']);
        res.status(405).json({message: `${req.method} is not allowed`})
    }
}
