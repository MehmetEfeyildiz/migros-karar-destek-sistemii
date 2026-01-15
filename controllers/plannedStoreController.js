const PlannedStoreModel = require('../models/PlannedStoreModel');
const CityModel = require('../models/CityModel');

/**
 * PlannedStore Controller
 * Handles HTTP requests for PlannedStore operations with business logic
 */
class PlannedStoreController {
    /**
     * GET /api/planned-stores
     * Get all planned stores
     */
    static async getAllPlannedStores(req, res, next) {
        try {
            const plannedStores = await PlannedStoreModel.findAll();
            res.status(200).json({
                success: true,
                count: plannedStores.length,
                data: plannedStores
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/planned-stores/:id
     * Get planned store by ID
     */
    static async getPlannedStoreById(req, res, next) {
        try {
            const plannedStore = await PlannedStoreModel.findById(req.params.id);

            if (!plannedStore) {
                return res.status(404).json({
                    success: false,
                    error: { message: 'Planned store not found' }
                });
            }

            res.status(200).json({
                success: true,
                data: plannedStore
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * POST /api/planned-stores
     * Create a new planned store
     * 
     * BUSINESS RULE 2: City population must be >= 50,000
     */
    static async createPlannedStore(req, res, next) {
        try {
            const { city_id } = req.body;

            // BUSINESS RULE 2: Validate city population
            if (city_id) {
                const city = await CityModel.findById(city_id);

                if (!city) {
                    return res.status(400).json({
                        success: false,
                        error: {
                            message: 'Invalid city',
                            detail: 'The specified city does not exist'
                        }
                    });
                }

                const MINIMUM_POPULATION = 50000;
                if (city.population < MINIMUM_POPULATION) {
                    return res.status(400).json({
                        success: false,
                        error: {
                            message: 'Population requirement not met',
                            detail: `Cannot create a planned store in ${city.city_name}. The city population (${city.population.toLocaleString()}) is below the required minimum of ${MINIMUM_POPULATION.toLocaleString()}.`
                        }
                    });
                }
            }

            // Proceed with creation
            const planId = await PlannedStoreModel.create(req.body);
            const newPlannedStore = await PlannedStoreModel.findById(planId);

            res.status(201).json({
                success: true,
                message: 'Planned store created successfully',
                data: newPlannedStore
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * PUT /api/planned-stores/:id
     * Update planned store
     */
    static async updatePlannedStore(req, res, next) {
        try {
            const plannedStore = await PlannedStoreModel.findById(req.params.id);

            if (!plannedStore) {
                return res.status(404).json({
                    success: false,
                    error: { message: 'Planned store not found' }
                });
            }

            // If updating city_id, validate population requirement
            if (req.body.city_id) {
                const city = await CityModel.findById(req.body.city_id);

                if (!city) {
                    return res.status(400).json({
                        success: false,
                        error: { message: 'Invalid city ID' }
                    });
                }

                const MINIMUM_POPULATION = 50000;
                if (city.population < MINIMUM_POPULATION) {
                    return res.status(400).json({
                        success: false,
                        error: {
                            message: 'Population requirement not met',
                            detail: `City population must be at least ${MINIMUM_POPULATION.toLocaleString()}`
                        }
                    });
                }
            }

            await PlannedStoreModel.update(req.params.id, req.body);
            const updatedPlannedStore = await PlannedStoreModel.findById(req.params.id);

            res.status(200).json({
                success: true,
                message: 'Planned store updated successfully',
                data: updatedPlannedStore
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * DELETE /api/planned-stores/:id
     * Delete planned store
     */
    static async deletePlannedStore(req, res, next) {
        try {
            const plannedStore = await PlannedStoreModel.findById(req.params.id);

            if (!plannedStore) {
                return res.status(404).json({
                    success: false,
                    error: { message: 'Planned store not found' }
                });
            }

            await PlannedStoreModel.delete(req.params.id);

            res.status(200).json({
                success: true,
                message: 'Planned store deleted successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/planned-stores/region/:region
     * Get planned stores by region
     */
    static async getPlannedStoresByRegion(req, res, next) {
        try {
            const plannedStores = await PlannedStoreModel.findByRegion(req.params.region);

            res.status(200).json({
                success: true,
                count: plannedStores.length,
                data: plannedStores
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = PlannedStoreController;
