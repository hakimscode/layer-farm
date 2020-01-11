const model = require('../models/index')
const res_json = require('../res')

class StandardProduksiController {
    
    async index(req, res, next){
        try{
            const standard_produksi = await model.standard_produksi.findAll({where: {'is_deleted': 0}})
            if(standard_produksi.length > 0){
                res.json(res_json('OK', 'Berhasil', standard_produksi))
            }else{
                res.json(res_json('ERROR', 'EMPTY', {}))
            }
        }catch (err){
            res.json(res_json('ERRORs', err.message, {}))
        }
    }

    async show(req, res, next){
        try{
            const standard_produksi = await model.standard_produksi.findOne({where: {'id': req.params.id, 'is_deleted': 0}})

            if(standard_produksi !== null){
                res.json(res_json('OK', 'Berhasil', standard_produksi))
            }else{
                res.json(res_json('ERROR', 'EMPTY', {}))
            }
        }catch (err){
            res.json(res_json('ERRORs', err.message, {}))
        }
    }

    async insert(req, res, next){
        try{
            const {name, percentage} = req.body
            const standard_produksi = await model.standard_produksi.create({
                name,
                percentage
            })

            if(standard_produksi){
                res.status(201).json(res_json('OK', 'Standard inserted successfully', standard_produksi))
            }
        }catch (err){
            res.status(400).json(res_json('ERRORs', err.message, {}))
        }
    }

    async edit(req, res, next){
        try{
            const {name, percentage} = req.body
            const standard_produksi = await model.standard_produksi.update({
                name,
                percentage
            }, {
                where: {
                    id: req.params.id
                }
            })

            if(standard_produksi){
                res.json(res_json('OK', 'Standard edited successfully', standard_produksi))
            }
        }catch (err){
            res.status(400).json(res_json('ERRORs', err.message, {}))
        }
    }

    async delete(req, res, next){
        try{
            const standard_produksi = await model.standard_produksi.update({
                is_deleted: 1
            },{
                where: {
                    id: req.params.id
                }
            })

            if(standard_produksi){
                res.json(res_json('OK', 'Standard deleted successfully', standard_produksi))
            }
        }catch (err){
            res.status(400).json(res_json('ERRORS', err.message, {}))
        }
    }

}

module.exports = StandardProduksiController