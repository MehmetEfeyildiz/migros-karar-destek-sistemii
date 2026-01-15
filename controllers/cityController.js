const CityModel = require('../models/CityModel');

/**
 * City Controller
 * Handles HTTP requests for City operations
 */
class CityController {
    /**
     * GET /api/cities
     * Get all cities
     */
    static async getAllCities(req, res, next) {
        try {
            const cities = await CityModel.findAll();
            res.status(200).json({
                success: true,
                count: cities.length,
                data: cities
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/cities/:id
     * Get city by ID
     */
    static async getCityById(req, res, next) {
        try {
            const city = await CityModel.findById(req.params.id);

            if (!city) {
                return res.status(404).json({
                    success: false,
                    error: { message: 'City not found' }
                });
            }

            res.status(200).json({
                success: true,
                data: city
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * POST /api/cities
     * Create a new city
     */
    static async createCity(req, res, next) {
        try {
            const cityId = await CityModel.create(req.body);
            const newCity = await CityModel.findById(cityId);

            res.status(201).json({
                success: true,
                message: 'City created successfully',
                data: newCity
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * PUT /api/cities/:id
     * Update city
     */
    static async updateCity(req, res, next) {
        try {
            const city = await CityModel.findById(req.params.id);

            if (!city) {
                return res.status(404).json({
                    success: false,
                    error: { message: 'City not found' }
                });
            }

            await CityModel.update(req.params.id, req.body);
            const updatedCity = await CityModel.findById(req.params.id);

            res.status(200).json({
                success: true,
                message: 'City updated successfully',
                data: updatedCity
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * DELETE /api/cities/:id
     * Delete city
     */
    static async deleteCity(req, res, next) {
        try {
            const city = await CityModel.findById(req.params.id);

            if (!city) {
                return res.status(404).json({
                    success: false,
                    error: { message: 'City not found' }
                });
            }

            await CityModel.delete(req.params.id);

            res.status(200).json({
                success: true,
                message: 'City deleted successfully'
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = CityController;
