const express = require('express');
const router = express.Router();
const SalesController = require('../controllers/salesController');
const { validateSale } = require('../middlewares/validator');

/**
 * Sales Routes
 * All routes are prefixed with /api/sales
 */

// Get sales statistics
router.get('/statistics', SalesController.getStatistics);

// Get all sales
router.get('/', SalesController.getAllSales);

// Get sales by store
router.get('/store/:storeId', SalesController.getSalesByStore);

// Get sale by ID
router.get('/:id', SalesController.getSaleById);

// Create new sale
router.post('/', validateSale, SalesController.createSale);

// Update sale
router.put('/:id', validateSale, SalesController.updateSale);

// Delete sale
router.delete('/:id', SalesController.deleteSale);

module.exports = router;
