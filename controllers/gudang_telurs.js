const model = require('../models/index')
const res_json = require('../res')

class KandangController {

    async index(req, res, next){
        try{
            const kandang = await model.gudang_telur.findAll()
            if(kandang.length > 0){
                res.json(res_json('OK', 'Berhasil', kandang))
            }else{
                res.status(400).json(res_json('ERROR', 'EMPTY', {}))
            }
        }catch (err){
            res.status(400).json(res_json('ERRORs', err.message, {}))
        }
    }

}

module.exports = KandangController