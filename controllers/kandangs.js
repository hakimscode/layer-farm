const model = require('../models/index')
const res_json = require('../res')

class KandangController {

    async index(req, res, next){
        try{
            const kandang = await model.kandang.findAll({where: {'is_deleted': 0}})
            if(kandang.length > 0){
                res.json(res_json('OK', 'Berhasil', kandang))
            }else{
                res.json(res_json('ERROR', 'EMPTY', {}))
            }
        }catch (err){
            res.json(res_json('ERRORs', err.message, {}))
        }
    }

    async show(req, res, next){
        try{
            const kandang = await model.kandang.findOne({where: {'id': req.params.id, 'is_deleted': 0}})
            if(kandang !== null){
                res.json(res_json('OK', 'Berhasil', kandang))
            }else{
                res.json(res_json('ERROR', 'EMPTY', {}))
            }
        }catch (err){
            res.json(res_json('ERRORs', err.message, {}))
        }
    }

    async insert(req, res, next){
        try{
            const {code, name, population, address} = req.body
            const kandang = await model.kandang.create({
                code,
                name,
                population,
                address
            })

            if(kandang){
                res.status(201).json(res_json('OK', 'kandang inserted successfully', kandang))
            }
        }catch (err){
            res.json(res_json('ERRORs', err.message, {}))
        }
    }

    async edit(req, res, next){
        try{
            const {code, name, population, address} = req.body
            const kandang = await model.kandang.update({
                code,
                name,
                population,
                address
            },{
                where: {
                    id: req.params.id
                }
            })

            if(kandang){
                res.json(res_json('OK', 'kandang updated successfully', kandang))
            }
        }catch (err){
            res.status(400).json(res_json('ERRORs', err.message, {}))
        }
    }

    async delete(req, res, next){
        try{
            const kandang = await model.kandang.update({
                is_deleted: 1
            }, {
                where: {
                    id: req.params.id
                }
            })

            if(kandang){
                res.json(res_json('OK', 'kandang deleted successfully', kandang))
            }
        }catch (err){
            res.status(400).json(res_json('ERRORs', err.message, {}))
        }
    }

}

module.exports = KandangController