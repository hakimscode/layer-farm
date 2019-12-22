const model = require('../models/index');
const res_json = require('../res');

class ProdukKategoriController {
    
    async index(req, res, next){
        try{
            const produk_kategori = await model.produk_kategori.findAll({where: {'is_deleted': 0}});
            if(produk_kategori.length > 0){
                res.json(res_json('OK', '', produk_kategori));
            }else{
                res.json(res_json('ERROR', 'EMPTY', {}));
            }
        }catch (err){
            res.json(res_json('ERRORs', err.message, {}));
        }
    }

    async show(req, res, next){
        try{
            const produk_kategori = await model.produk_kategori.findOne({where: {'id': req.params.id, 'is_deleted': 0}});
            if(produk_kategori !== null){
                res.json(res_json('OK', '', produk_kategori));
            }else{
                res.json(res_json('ERROR', 'EMPTY', {}));
            }
        }catch (err){
            res.json(res_json('ERRORs', err.message, {}));
        }
    }

    async insert(req, res, next){
        try{
            const {nama} = req.body;
            const produk_kategori = await model.produk_kategori.create({nama});
    
            if(produk_kategori){
                res.status(201).json(res_json('OK', 'Produk Kategori inserted successfully', produk_kategori));
            }
        }catch (err){
            res.json(res_json('ERROS', err.message, {}));
        }
    }

    async edit(req, res, next){
        try{
            const {nama} = req.body;
            const produk_kategori = await model.produk_kategori.update({nama}, {where: {'id': req.params.id}});

            if(produk_kategori){
                res.status(201).json(res_json('OK', 'Produk Kategori edited successfully', produk_kategori));
            }
        }catch (err){
            res.json(res_json('ERRORs', err.message, {}));
        }
    }

    async delete(req, res, next){
        try{
            const produk_kategori = await model.produk_kategori.update({is_deleted: 1}, {where: {'id': req.params.id}});

            if(produk_kategori){
                res.status(201).json(res_json('OK', 'Produk Kategori deleted successfully', produk_kategori));
            }
        }catch (err){
            res.json(res_json('ERRORs', err.message, {}));
        }
    }

}

module.exports = ProdukKategoriController;