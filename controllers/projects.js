const model = require('../models/index')
const res_json = require('../res')

class ProjectController {

    async index(req, res, index) {
        const params = req.params.qry ;
        const qryWhere = params === 'all' ? {is_deleted: 0} : {status: params, is_deleted: 0}
        console.log(qryWhere);
        try{
            const project = await model.project.findAllItems(
                qryWhere
            )

            if(project.length > 0){
                res.json(res_json('OK', 'Berhasil', project))
            }else{
                res.status(400).json(res_json('ERROR', 'EMPTY', {}))
            }
        }catch (err){
            res.status(400).json(res_json('ERRORs', err.message, {}))
        }
    }

    async show(req, res, index){
        try{
            const project = await model.project.findById(req.params.id)

            if(project !== null){
                res.json(res_json('OK', 'Berhasil', project))
            }else{
                res.status(400).json(res_json('ERROR', 'EMPTY', {}))
            }
        }catch (err){
            res.status(400).json(res_json('ERRORs', err.message, {}))
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
            res.status(400).json(res_json('ERRORs', err.message, {}))
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
            .then(() => { return model.project.findById(req.params.id)})

            if(project){
                res.status(201).json(res_json('OK', 'Project updated successfully', project))
            }
        }catch (err){
            res.status(400).json(res_json('ERRORs', err.message, {}))
        }
    }

    async closing(req, res, next){
        const {tanggal_closing} = req.body

        const result = await model.sequelize.transaction(async (t) => {
            const closing = await model.sequelize.transaction(transaction => {
                return model.project.update({
                    tanggal_closing,
                    status: 1
                }, {
                    where: {
                        id: req.params.id
                    }
                }, transaction)
            })

            // todo === add rekap to project_hut

            return closing;
        })
        .then(result => res.json(res_json('OK', 'Project is done', result)))
        .catch(err => res.status(400).json(res_json('ERRORs', err.message, {})))
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
            res.status(400).json(res_json('ERRORs', err.message, {}))
        }
    }

    async get_sisa_pakan(req, res, next){
        try{
            
        }catch (err){
            
        }
    }

    async insert_recording_harian(req, res, next){
        try{
            const { project_id, hari, pakan, jumlah_telur, tonase_telur } = req.body

            const result = await model.sequelize.transaction(async (t) => {
                const recording_harian = await model.project_recording_harians.create({
                    project_id,
                    tanggal: new Date(),
                    hari,
                    pakan,
                    jumlah_telur,
                    tonase_telur
                }, {transaction: t});

                await model.gudang_telur.update({
                    jumlah: model.sequelize.literal('jumlah + ' + jumlah_telur),
                    tonase: model.sequelize.literal('tonase + ' + tonase_telur)
                }, {where: {'id': 1}, transaction: t});

                return recording_harian;
            })
            res.json(res_json('OK', 'recording harian inserted successfully', result))
        }catch (err){
            res.json(res_json("ERRORs", err.message, {}))
        }
    }

}

module.exports = ProjectController