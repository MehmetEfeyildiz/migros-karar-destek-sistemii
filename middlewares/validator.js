/**
 * Validation Middleware
 * Custom validation functions for request data
 */

/**
 * Validate Store Creation/Update
 */
const validateStore = (req, res, next) => {
    const { store_name, city_id, status } = req.body;

    if (!store_name || store_name.trim() === '') {
        return res.status(400).json({
            success: false,
            error: { message: 'Store name is required' }
        });
    }

    if (!city_id || isNaN(city_id)) {
        return res.status(400).json({
            success: false,
            error: { message: 'Valid city_id is required' }
        });
    }

    if (status && !['active', 'planned', 'closed'].includes(status)) {
        return res.status(400).json({
            success: false,
            error: { message: 'Status must be active, planned, or closed' }
        });
    }

    next();
};

/**
 * Validate Planned Store Creation
 */
const validatePlannedStore = (req, res, next) => {
    const { region, target_opening_date } = req.body;

    if (!region || region.trim() === '') {
        return res.status(400).json({
            success: false,
            error: { message: 'Region is required' }
        });
    }

    if (!target_opening_date) {
        return res.status(400).json({
            success: false,
            error: { message: 'Target opening date is required' }
        });
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(target_opening_date)) {
        return res.status(400).json({
            success: false,
            error: { message: 'Date must be in YYYY-MM-DD format' }
        });
    }

    next();
};

/**
 * Validate Sale Creation
 */
const validateSale = (req, res, next) => {
    const { store_id, amount, date } = req.body;

    if (!store_id || isNaN(store_id)) {
        return res.status(400).json({
            success: false,
            error: { message: 'Valid store_id is required' }
        });
    }

    if (!amount || isNaN(amount) || amount < 0) {
        return res.status(400).json({
            success: false,
            error: { message: 'Valid amount is required and must be positive' }
        });
    }

    if (!date) {
        return res.status(400).json({
            success: false,
            error: { message: 'Sale date is required' }
        });
    }

    next();
};

module.exports = {
    validateStore,
    validatePlannedStore,
    validateSale
};
