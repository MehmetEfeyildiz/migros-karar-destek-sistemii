const express = require('express');
const router = express.Router();
const CityController = require('../controllers/cityController');

/**
 * City Routes
 * All routes are prefixed with /api/cities
 */

// Get all cities
router.get('/', CityController.getAllCities);

// Get city by ID
router.get('/:id', CityController.getCityById);

// Create new city
router.post('/', CityController.createCity);

// Update city
router.put('/:id', CityController.updateCity);

// Delete city
router.delete('/:id', CityController.deleteCity);

module.exports = router;
