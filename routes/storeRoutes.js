const express = require('express');
const router = express.Router();
const StoreController = require('../controllers/storeController');
const { validateStore } = require('../middlewares/validator');

/**
 * Store Routes
 * All routes are prefixed with /api/stores
 */

// Get all stores
router.get('/', StoreController.getAllStores);

// Get stores by status
router.get('/status/:status', StoreController.getStoresByStatus);

// Get stores by city
router.get('/city/:cityId', StoreController.getStoresByCity);

// Get store by ID
router.get('/:id', StoreController.getStoreById);

// Create new store
router.post('/', validateStore, StoreController.createStore);

// Update store
router.put('/:id', validateStore, StoreController.updateStore);

// Delete store (with business rule: cannot delete if has sales)
router.delete('/:id', StoreController.deleteStore);

module.exports = router;
