const StoreModel = require('../models/StoreModel');

/**
 * Store Controller
 * Handles HTTP requests for Store operations with business logic
 */
class StoreController {
    /**
     * GET /api/stores
     * Get all stores
     */
    static async getAllStores(req, res, next) {
        try {
            const stores = await StoreModel.findAll();
            res.status(200).json({
                success: true,
                count: stores.length,
                data: stores
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/stores/:id
     * Get store by ID
     */
    static async getStoreById(req, res, next) {
        try {
            const store = await StoreModel.findById(req.params.id);

            if (!store) {
                return res.status(404).json({
                    success: false,
                    error: { message: 'Store not found' }
                });
            }

            res.status(200).json({
                success: true,
                data: store
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * POST /api/stores
     * Create a new store
     */
    static async createStore(req, res, next) {
        try {
            const storeId = await StoreModel.create(req.body);
            const newStore = await StoreModel.findById(storeId);

            res.status(201).json({
                success: true,
                message: 'Store created successfully',
                data: newStore
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * PUT /api/stores/:id
     * Update store
     */
    static async updateStore(req, res, next) {
        try {
            const store = await StoreModel.findById(req.params.id);

            if (!store) {
                return res.status(404).json({
                    success: false,
                    error: { message: 'Store not found' }
                });
            }

            const affectedRows = await StoreModel.update(req.params.id, req.body);

            if (affectedRows === 0) {
                return res.status(400).json({
                    success: false,
                    error: { message: 'Update failed' }
                });
            }

            const updatedStore = await StoreModel.findById(req.params.id);

            res.status(200).json({
                success: true,
                message: 'Store updated successfully',
                data: updatedStore
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * DELETE /api/stores/:id
     * Delete store
     * 
     * BUSINESS RULE 1: A Store cannot be deleted if it has linked records in the Sales table
     */
    static async deleteStore(req, res, next) {
        try {
            const storeId = req.params.id;

            // Check if store exists
            const store = await StoreModel.findById(storeId);
            if (!store) {
                return res.status(404).json({
                    success: false,
                    error: { message: 'Store not found' }
                });
            }

            // BUSINESS RULE 1: Check if store has sales records
            const hasSales = await StoreModel.hasSales(storeId);
            if (hasSales) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: 'Cannot delete store with existing sales records',
                        detail: 'This store has linked sales data. Please remove all sales records before deleting the store.'
                    }
                });
            }

            // Proceed with deletion
            await StoreModel.delete(storeId);

            res.status(200).json({
                success: true,
                message: 'Store deleted successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/stores/city/:cityId
     * Get stores by city
     */
    static async getStoresByCity(req, res, next) {
        try {
            const stores = await StoreModel.findByCity(req.params.cityId);

            res.status(200).json({
                success: true,
                count: stores.length,
                data: stores
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/stores/status/:status
     * Get stores by status
     */
    static async getStoresByStatus(req, res, next) {
        try {
            const stores = await StoreModel.findByStatus(req.params.status);

            res.status(200).json({
                success: true,
                count: stores.length,
                data: stores
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = StoreController;
