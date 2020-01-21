const model = require('../models/index')
const res_json = require('../res')

class PenjualanController {

    async index(req, res, next){
        try{
            const penjualan = await model.penjualan.findAll({where: {'is_deleted': 0}}
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
            const penjualan = await model.penjualan.findOne({where: {'id': req.params.id, 'is_deleted': 0}})
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

                }).catch(err => {throw new Error()})

                return penjualan;
            })
            res.json(res_json('OK', 'Penjualan inserted successfully', result))
        }catch (err){
            res.json(res_json('ERRORs', err.message, {}))
        }
    }

}

module.exports = PenjualanController