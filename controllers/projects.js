const model = require('../models/index')
const res_json = require('../res')

class ProjectController {

    async index(req, res, index) {
        try{
            const project = await model.project.findAll({where: {'is_deleted': 0}})

            if(project.length > 0){
                res.json(res_json('OK', 'Berhasil', project))
            }else{
                res.json(res_json('ERROR', 'EMPTY', {}))
            }
        }catch (err){
            res.json(res_json('ERRORs', err.message, {}))
        }
    }

    async show(req, res, index){
        try{
            const project = await model.project.findByPk(req.params.id)

            if(project !== null){
                res.json(res_json('OK', 'Berhasil', project))
            }else{
                res.json(res_json('ERROR', 'EMPTY', {}))
            }
        }catch (err){
            res.json(res_json('ERRORs', err.message, {}))
        }
    }

    async insert(req, res, next){
        try{
            const {kandang_id, periode, populasi_awal, tanggal_mulai} = req.body
            const project = await model.project.create({
                kandang_id, periode, populasi_awal, tanggal_mulai
            })

            if(project){
                res.status(201).json(res_json('OK', 'Project inserted successfully', project))
            }
        }catch (err){
            res.json(res_json('ERRORs', err.message, {}))
        }
    }

    async edit(req, res, index){
        try{
            const {kandang_id, periode, populasi_awal, tanggal_mulai} = req.body
            const project = await model.project.update({
                kandang_id, periode, populasi_awal, tanggal_mulai
            }, {
                where: {
                    id: req.params.id
                }
            })

            if(project){
                res.json(res_json('OK', 'Project updated successfully', project))
            }
        }catch (err){
            res.json(res_json('ERRORs', err.message, {}))
        }
    }

    async closing(req, res, next){
        const {tanggal_closing} = req.body

        await model.sequelize.transaction(transaction => {
            return model.project.update({
                tanggal_closing,
                status: 1
            }, {
                where: {
                    id: req.params.id
                }
            }, transaction)
        })
        .then(result => res.json(res_json('OK', 'Project is done', result)))
        .catch(err => res.json(res_json('ERRORs', err.message, {})))
    }

    async delete(req, res, index){
        try{
            const project = await model.project.update({
                is_deleted: 1
            }, {
                where: {
                    id: req.params.id
                }
            })

            if(project){
                res.json(res_json('OK', 'Project deleted successfully', project))
            }
        }catch (err){
            res.json(res_json('ERRORs', err.message, {}))
        }
    }

}

module.exports = ProjectController