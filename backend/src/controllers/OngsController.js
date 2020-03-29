const connection = require('../database/connection');
const crypto = require('crypto')
module.exports = {
    async create(req, res) {
        const { name, email, whatsapp, city, uf } = req.body
        const id = crypto.randomBytes(4).toString('HEX');
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })
        return res.json({ id });
    },
    async index(req, res) {
        const ongs = await connection('ongs').select('*')
        if(!ongs)  {
            return res.status(400).json({err : 'erro'})
        }
        return res.json(ongs);
    }
}