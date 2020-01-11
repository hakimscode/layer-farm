var express = require('express');
var router = express.Router();

const SupplierController = require('../controllers/suppliers');
const ProdukKategoriController = require('../controllers/produk_kategoris');
const ProdukController = require('../controllers/produks');
const CustomerController = require('../controllers/customers');
const StandardProduksiController = require('../controllers/standard_produksis')
const KandangController = require('../controllers/kandangs');
const ProjectController = require('../controllers/projects')

const supplierController = new SupplierController();
const produkKategoriController = new ProdukKategoriController();
const produkController = new ProdukController();
const customerController = new CustomerController();
const standardProduksiController = new StandardProduksiController();
const kandangController = new KandangController();
const projectController = new ProjectController();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send('Layer Farm API System');
});

router.get('/suppliers', supplierController.index);
router.get('/suppliers/:id', supplierController.show);
router.post('/suppliers', supplierController.insert);
router.put('/suppliers/:id', supplierController.edit);
router.delete('/suppliers/:id', supplierController.delete);

router.get('/produk_kategori', produkKategoriController.index);
router.get('/produk_kategori/:id', produkKategoriController.show);
router.post('/produk_kategori', produkKategoriController.insert);
router.put('/produk_kategori/:id', produkKategoriController.edit);
router.delete('/produk_kategori/:id', produkKategoriController.delete);

router.get('/produk', produkController.index);
router.get('/produk/:id', produkController.show);
router.post('/produk', produkController.insert);
router.put('/produk/:id', produkController.edit);
router.delete('/produk/:id', produkController.delete);

router.get('/customer', customerController.index);
router.get('/customer/:id', customerController.show);
router.post('/customer', customerController.insert);
router.put('/customer/:id', customerController.edit);
router.delete('/customer/:id', customerController.delete);

router.get('/standard_produksi', standardProduksiController.index);
router.get('/standard_produksi/:id', standardProduksiController.show);
router.post('/standard_produksi', standardProduksiController.insert);
router.put('/standard_produksi/:id', standardProduksiController.edit);
router.delete('/standard_produksi/:id', standardProduksiController.delete);

router.get('/kandang', kandangController.index);
router.get('/kandang/:id', kandangController.show);
router.post('/kandang', kandangController.insert);
router.put('/kandang/:id', kandangController.edit);
router.delete('/kandang/:id', kandangController.delete);

router.get('/project', projectController.index);
router.get('/project/:id', projectController.show);
router.post('/project', projectController.insert);
router.put('/project/:id', projectController.edit);
router.delete('/project/:id', projectController.delete);
router.put('/project/closing/:id', projectController.closing);

module.exports = router;
