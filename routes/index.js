var express = require('express');
var router = express.Router();

const SupplierController = require('../controllers/suppliers');
const ProdukKategoriController = require('../controllers/produk_kategoris');
const ProdukController = require('../controllers/produks');

const supplierController = new SupplierController();
const produkKategoriController = new ProdukKategoriController();
const produkController = new ProdukController();

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

module.exports = router;
