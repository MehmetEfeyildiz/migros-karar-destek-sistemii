const SalesModel = require('../models/SalesModel');

/**
 * Sales Controller
 * Handles HTTP requests for Sales operations
 */
class SalesController {
    /**
     * GET /api/sales
     * Get all sales
     */
    static async getAllSales(req, res, next) {
        try {
            const sales = await SalesModel.findAll();
            res.status(200).json({
                success: true,
                count: sales.length,
                data: sales
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/sales/:id
     * Get sale by ID
     */
    static async getSaleById(req, res, next) {
        try {
            const sale = await SalesModel.findById(req.params.id);

            if (!sale) {
                return res.status(404).json({
                    success: false,
                    error: { message: 'Sale not found' }
                });
            }

            res.status(200).json({
                success: true,
                data: sale
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/sales/store/:storeId
     * Get sales by store
     */
    static async getSalesByStore(req, res, next) {
        try {
            const sales = await SalesModel.findByStore(req.params.storeId);

            res.status(200).json({
                success: true,
                count: sales.length,
                data: sales
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * POST /api/sales
     * Create a new sale
     */
    static async createSale(req, res, next) {
        try {
            const saleId = await SalesModel.create(req.body);
            const newSale = await SalesModel.findById(saleId);

            res.status(201).json({
                success: true,
                message: 'Sale created successfully',
                data: newSale
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * PUT /api/sales/:id
     * Update sale
     */
    static async updateSale(req, res, next) {
        try {
            const sale = await SalesModel.findById(req.params.id);

            if (!sale) {
                return res.status(404).json({
                    success: false,
                    error: { message: 'Sale not found' }
                });
            }

            await SalesModel.update(req.params.id, req.body);
            const updatedSale = await SalesModel.findById(req.params.id);

            res.status(200).json({
                success: true,
                message: 'Sale updated successfully',
                data: updatedSale
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * DELETE /api/sales/:id
     * Delete sale
     */
    static async deleteSale(req, res, next) {
        try {
            const sale = await SalesModel.findById(req.params.id);

            if (!sale) {
                return res.status(404).json({
                    success: false,
                    error: { message: 'Sale not found' }
                });
            }

            await SalesModel.delete(req.params.id);

            res.status(200).json({
                success: true,
                message: 'Sale deleted successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/sales/statistics
     * Get sales statistics
     */
    static async getStatistics(req, res, next) {
        try {
            const stats = await SalesModel.getStatistics();

            res.status(200).json({
                success: true,
                data: stats
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = SalesController;
