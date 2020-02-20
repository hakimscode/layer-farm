const model = require('../models/index')
const res_json = require('../res')

class PenjualanController {

    async index(req, res, next){
        try{
            const penjualan = await model.penjualan.findAll(
                {
                    where: {'is_deleted': 0},
                    include: ['penjualan_detail', 'customer', {model: model.project, as: 'project', include: 'kandang'}]
                }
            );
            if(penjualan.length > 0){
                res.json(res_json('OK', 'Berhasil', penjualan))
            }else{
                res.json(res_json('ERROR', 'EMPTY', {}))
            }
        }catch (err){
            res.json(res_json('ERRORs', err.message, {}))
        }
    }
    
    async show(req, res, next){
        try{
            const penjualan = await model.penjualan.findOne(
                {
                    where: {
                        'id': req.params.id, 'is_deleted': 0
                    },
                    include: ['penjualan_detail', 'customer', {model: model.project, as: 'project', include: 'kandang'}]
                }
            )
            if(penjualan !== null){
                res.json(res_json('OK', 'Berhasil', penjualan))
            }else{
                res.json(res_json('ERROR', 'EMPTY', {}))
            }
        }catch (err){
            res.json(res_json('ERRORs', err.message, {}))
        }
    }

    async insert(req, res, next){
        try{
            const { tanggal, project_id, customer_id, jumlah_jual, tonase_jual} = req.body
            
            const result = await model.sequelize.transaction(async (t) => {
                const penjualan = await model.penjualan.create({
                    tanggal,
                    project_id,
                    customer_id
                }).then(async (res_data) => {
                    await model.penjualan_detail.create({
                        penjualan_id: res_data.id,
                        jumlah_jual: jumlah_jual,
                        tonase_jual: tonase_jual
                    }, {transaction: t})

                    await model.gudang_telur.update({
                        jumlah: model.sequelize.literal('jumlah - ' + jumlah_jual),
                        tonase: model.sequelize.literal('tonase - ' + tonase_jual)
                    }, {where: {'id': 1}, transaction: t});

                    const newPenjualan = await model.penjualan.findOne(
                        {
                            where: {
                                'id': res_data.id, 'is_deleted': 0
                            },
                            include: ['penjualan_detail', 'customer', {model: model.project, as: 'project', include: 'kandang'}],
                            transaction: t,
                        }
                    )
    
                    return newPenjualan;

                }).catch(err => {throw new Error(err.message)})

                return penjualan;
            })
            res.status(201).json(res_json('OK', 'Penjualan inserted successfully', result))
        }catch (err){
            res.json(res_json('ERRORs', err.message, {}))
        }
    }

    async stokTelur(req, res, next){
        try{
            const stokTelur = await model.sequelize.query(
                `
                SELECT IFNULL(
                    (
                        SELECT SUM(project_recording_harians.jumlah_telur)
                        FROM project_recording_harians
                        WHERE project_id = project.id
                    ) - 
                    (
                        SELECT SUM(penjualan_detail.jumlah_jual)
                        FROM penjualan
                        JOIN penjualan_detail ON penjualan_detail.penjualan_id = penjualan.id
                        WHERE penjualan.project_id = project.id
                    ),
                    0
                ) as stok_telur
                FROM project
                WHERE project.id = ${req.params.projectId}
                `,
                { type: model.sequelize.QueryTypes.SELECT, raw: true }
            ).then((result) => { return result[0].stok_telur}); 

            if(stokTelur){
                return res.json(res_json('OK', 'Success', stokTelur));
            }
        }catch (err){
            res.json(res_json('ERRORs', err.message, 0));
        }
    }

}

module.exports = PenjualanController