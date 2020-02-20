const model = require('../models/index');
const res_json = require('../res');

class SupplierController {

    async index(req, res, next){
        try{
            const supplier = await model.supplier.findAll({where: {'is_deleted': 0}});
            if(supplier.length > 0){
                res.json(res_json('OK', '', supplier));
            }else{
                res.json(res_json('ERROR', 'EMPTY', {}));
            }
        }catch (err){
            res.json(res_json('ERRORs', err.message, {}));
        }
    }

    async show(req, res, next){
        try{
            const supplier = await model.supplier.findOne({where: {'id': req.params.id, 'is_deleted': 0}});
            if(supplier !== null){
                res.json(res_json('OK', '', supplier));
            }else{
                res.json(res_json('ERROR', 'EMPTY', {}));
            }
        }catch (err){
            res.json(res_json('ERRORs', err.message, {}));
        }
    }

    async insert(req, res, next){
        try{
            const {supplier_code, supplier_name, address} = req.body;
            const supplier = await model.supplier.create({
                supplier_code,
                supplier_name,
                address
            });

            if(supplier){
                res.status(201).json(res_json('OK', 'Supplier inserted successfully', supplier));
            }
        }catch (err){
            res.json(res_json('ERRORs', err.message, {}));
        }
    }

    async edit(req, res, next){
        try{
            const suppId = req.params.id;
            const {supplier_code, supplier_name, address} = req.body;
            const supplier = await model.supplier.update({
                supplier_code,
                supplier_name,
                address
            }, {
                where: {
                    id: suppId
                }
            })
            .then(() => { return model.supplier.findOne({where: {'id': req.params.id, 'is_deleted': 0}})});

            if(supplier){
                res.status(201).json(res_json('OK', 'Supplier updated successfully', supplier));
            }
        }catch (err){
            res.status(400).json(res_json('ERRORs', err.message, {}));
        }
    }

    async delete(req, res, next){
        try{
            const suppId = req.params.id;
            const supplier = await model.supplier.update({
                is_deleted: 1
            }, {
                where: {
                    id: suppId
                }
            });

            if(supplier){
                res.json(res_json('OK', 'Supplier deleted successfully', supplier));
            }
        }catch (err){
            res.status(400).json(res_json('ERRORs', err.message, {}));
        }
    }
}

module.exports = SupplierController;