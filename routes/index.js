var express = require('express');
var router = express.Router();

const SupplierController = require('../controllers/suppliers');
const ProdukKategoriController = require('../controllers/produk_kategoris');
const ProdukController = require('../controllers/produks');
const CustomerController = require('../controllers/customers');
const StandardProduksiController = require('../controllers/standard_produksis');
const KandangController = require('../controllers/kandangs');
const ProjectController = require('../controllers/projects');
const PembelianController = require('../controllers/pembelians');
const PenjualanController = require('../controllers/penjualans');
const GudangTelurController = require('../controllers/gudang_telurs');

const supplierController = new SupplierController();
const produkKategoriController = new ProdukKategoriController();
const produkController = new ProdukController();
const customerController = new CustomerController();
const standardProduksiController = new StandardProduksiController();
const kandangController = new KandangController();
const projectController = new ProjectController();
const penjualanController = new PenjualanController();
const pembelianController = new PembelianController();
const gudangTelurController = new GudangTelurController();

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

router.get('/customers', customerController.index);
router.get('/customers/:id', customerController.show);
router.post('/customers', customerController.insert);
router.put('/customers/:id', customerController.edit);
router.delete('/customers/:id', customerController.delete);

router.get('/standard_produksi', standardProduksiController.index);
router.get('/standard_produksi/:id', standardProduksiController.show);
router.post('/standard_produksi', standardProduksiController.insert);
router.put('/standard_produksi/:id', standardProduksiController.edit);
router.delete('/standard_produksi/:id', standardProduksiController.delete);

router.get('/kandangs', kandangController.index);
router.get('/kandangs/:id', kandangController.show);
router.post('/kandangs', kandangController.insert);
router.put('/kandangs/:id', kandangController.edit);
router.delete('/kandangs/:id', kandangController.delete);

router.get('/projects/:qry', projectController.index);
router.get('/project/:id', projectController.show);
router.post('/projects', projectController.insert);
router.put('/projects/:id', projectController.edit);
router.delete('/projects/:id', projectController.delete);
router.put('/projects/closing/:id', projectController.closing);

router.get('/gudang_telurs', gudangTelurController.index);

router.post('/project/recording_harian', projectController.insert_recording_harian);

router.get('/pembelian', pembelianController.index);
router.get('/pembelian/:id', pembelianController.show);
router.post('/pembelian', pembelianController.insert);

router.get('/penjualan', penjualanController.index);
router.get('/penjualan/:id', penjualanController.show);
router.post('/penjualan', penjualanController.insert);
router.get('/penjualan/stok-telur/:projectId', penjualanController.stokTelur);

module.exports = router;
