const model = require('../models/index')
const res_json = require('../res')

class PembelianController {

    async index(req, res, next){
        try{
            const pembelian = await model.pembelian.findAll(
                {
                    where: {'is_deleted': 0},
                    include: [
                        'supplier',
                        {model: model.pembelian_detail, as: 'pembelian_detail', include: 'produk'},
                        {model: model.project, as: 'project', include: 'kandang'}
                    ]
                }
            );
            if(pembelian.length > 0){
                res.json(res_json('OK', 'Berhasil', pembelian))
            }else{
                res.status(400).json(res_json('ERROR', 'EMPTY', {}))
            }
        }catch (err){
            res.status(400).json(res_json('ERRORs', err.message, {}))
        }
    }
    
    async show(req, res, next){
        try{
            const pembelian = await model.pembelian.findOne(
                {
                    where: {'id': req.params.id, 'is_deleted': 0},
                    include: [
                        'supplier',
                        {model: model.pembelian_detail, as: 'pembelian_detail', include: 'produk'},
                        {model: model.project, as: 'project', include: 'kandang'}
                    ]
                }
            )
            if(pembelian !== null){
                res.json(res_json('OK', 'Berhasil', pembelian))
            }else{
                res.status(400).json(res_json('ERROR', 'EMPTY', {}))
            }
        }catch (err){
            res.status(400).json(res_json('ERRORs', err.message, {}))
        }
    }

    async insert(req, res, next){
        try{
            const { tanggal, project_id, supplier_id, produk_id, jumlah_beli, tonase_beli} = req.body
            
            const result = await model.sequelize.transaction(async (t) => {
                const pembelian = await model.pembelian.create({
                    tanggal,
                    project_id,
                    supplier_id
                }).then(async (res_data) => {
                    await model.pembelian_detail.create({
                        pembelian_id: res_data.id,
                        produk_id: produk_id,
                        jumlah_beli: jumlah_beli,
                        tonase_beli: tonase_beli
                    }, {transaction: t})

                    const newPembelian = await model.pembelian.findOne(
                        {
                            where: {'id': res_data.id, 'is_deleted': 0},
                            include: [
                                'supplier',
                                {model: model.pembelian_detail, as: 'pembelian_detail', include: 'produk'},
                                {model: model.project, as: 'project', include: 'kandang'}
                            ],
                            transaction: t,
                        }
                    )
    
                    return newPembelian;
``
                }).catch(err => {throw new Error(err.message)})

                return pembelian;
            })
            res.status(201).json(res_json('OK', 'pembelian inserted successfully', result))
        }catch (err){
            res.status(400).json(res_json('ERRORs', err.message, {}))
        }
    }

}

module.exports = PembelianController