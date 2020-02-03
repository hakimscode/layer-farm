const model = require('../models/index');
const res_json = require('../res');

class ProdukController {

    async index(req, res, next){
        try{
            const produk = await model.produk.findAllItems({where: {'is_deleted': 0}});
            
            if(produk.length > 0){
                res.json(res_json('OK', '', produk));
            }else{
                res.json(res_json('ERROR', 'EMPTY', {}));
            }
        }catch (err){
            res.json(res_json('ERRORs', err.message, {}));
        }
    }

    async show(req, res, next){
        try{
            const produk = await model.produk.findById(req.params.id);

            if(produk !== null){
                res.json(res_json('OK', '', produk));
            }else{
                res.json(res_json('ERROR', 'EMPTY', {}));
            }
        }catch (err){
            res.json(res_json(res_json('ERRORs', err.message, {})));
        }
    }

    async insert(req, res, next){
        try{
            const {kategori_id, nama_produk, satuan} = req.body;
            const produk = await model.produk.create({kategori_id, nama_produk, satuan}).then((produk) => {return model.produk.findById(produk.id)});

            if(produk){
                res.status(201).json(res_json('OK', 'Produk inserted successfully', produk));
            }
        }catch (err){
            res.json(res_json('ERRORs', err.message, {}));
        }
    }

    async edit(req, res, next){
        try{
            const {kategori_id, nama_produk, satuan} = req.body;
            const produk = await model.produk.update({kategori_id, nama_produk, satuan}, {where: {id: req.params.id}});
            
            if(produk){
                res.status(201).json(res_json('OK', 'Produk edited successfully', produk));
            }
        }catch (err){
            res.json(res_json('ERRORs', err.message, {}));
        }
    }

    async delete(req, res, next){
        try{
            const produk = await model.produk.update({is_deleted: 1}, {where: {id: req.params.id}});
            
            if(produk){
                res.status(201).json(res_json('OK', 'Produk deleted successfully', produk));
            }
        }catch (err){
            res.json(res_json('ERRORs', err.message, {}));
        }
    }

}

module.exports = ProdukController;