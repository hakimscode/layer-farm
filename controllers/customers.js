const model = require('../models/index')
const res_json = require('../res')

class CustomerController {

    async index(req, res, next){
        try{
            const customer = await model.customer.findAll({where: {'is_deleted': 0}})
            if(customer.length > 0){
                res.json(res_json('OK', 'Berhasil', customer))
            }else{
                res.json(res_json('ERROR', 'EMPTY', {}))
            }
        }catch (err){
            res.json(res_json('ERRORs', err.message, {}))
        }
    }

    async show(req, res, next){
        try{
            const customer = await model.customer.findOne({where: {'id': req.params.id, 'is_deleted': 0}})
            if(customer !== null){
                res.json(res_json('OK', 'Berhasil', customer))
            }else{
                res.json(res_json('ERROR', 'EMPTY', {}))
            }
        }catch (err){
            res.json(res_json('ERRORs', err.message, {}))
        }
    }

    async insert(req, res, next){
        try{
            const {customer_code, customer_name, address} = req.body
            const customer = await model.customer.create({
                customer_code,
                customer_name,
                address
            })

            if(customer){
                res.status(201).json(res_json('OK', 'Customer inserted successfully', customer))
            }
        }catch (err){
            res.json(res_json('ERRORs', err.message, {}))
        }
    }

    async edit(req, res, next){
        try{
            const {customer_code, customer_name, address} = req.body
            const customer = await model.customer.update({
                customer_code,
                customer_name,
                address
            },{
                where: {
                    id: req.params.id
                }
            })

            if(customer){
                res.json(res_json('OK', 'Customer updated successfully', customer))
            }
        }catch (err){
            res.status(400).json(res_json('ERRORs', err.message, {}))
        }
    }

    async delete(req, res, next){
        try{
            const customer = await model.customer.update({
                is_deleted: 1
            }, {
                where: {
                    id: req.params.id
                }
            })

            if(customer){
                res.json(res_json('OK', 'Customer deleted successfully', customer))
            }
        }catch (err){
            res.status(400).json(res_json('ERRORs', err.message, {}))
        }
    }

}

module.exports = CustomerController