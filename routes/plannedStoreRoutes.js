const express = require('express');
const router = express.Router();
const PlannedStoreController = require('../controllers/plannedStoreController');
const { validatePlannedStore } = require('../middlewares/validator');

/**
 * PlannedStore Routes
 * All routes are prefixed with /api/planned-stores
 */

// Get all planned stores
router.get('/', PlannedStoreController.getAllPlannedStores);

// Get planned stores by region
router.get('/region/:region', PlannedStoreController.getPlannedStoresByRegion);

// Get planned store by ID
router.get('/:id', PlannedStoreController.getPlannedStoreById);

// Create new planned store (with business rule: city population >= 50,000)
router.post('/', validatePlannedStore, PlannedStoreController.createPlannedStore);

// Update planned store
router.put('/:id', validatePlannedStore, PlannedStoreController.updatePlannedStore);

// Delete planned store
router.delete('/:id', PlannedStoreController.deletePlannedStore);

module.exports = router;
