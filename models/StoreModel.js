const db = require('../config/db');

/**
 * Store Model
 * Handles all database operations related to stores (Magazalar)
 */
class StoreModel {
    /**
     * Get all stores
     */
    static async findAll() {
        const [rows] = await db.query(
            `SELECT s.store_id, s.store_name, s.city_id, s.status, 
                    c.city_name, c.population
             FROM stores s
             LEFT JOIN cities c ON s.city_id = c.city_id
             ORDER BY s.store_id`
        );
        return rows;
    }

    /**
     * Get store by ID
     */
    static async findById(id) {
        const [rows] = await db.query(
            `SELECT s.store_id, s.store_name, s.city_id, s.status,
                    c.city_name, c.population
             FROM stores s
             LEFT JOIN cities c ON s.city_id = c.city_id
             WHERE s.store_id = ?`,
            [id]
        );
        return rows[0];
    }

    /**
     * Create a new store
     */
    static async create(storeData) {
        const { store_name, city_id, status } = storeData;
        const [result] = await db.query(
            'INSERT INTO stores (store_name, city_id, status) VALUES (?, ?, ?)',
            [store_name, city_id, status || 'active']
        );
        return result.insertId;
    }

    /**
     * Update store
     */
    static async update(id, storeData) {
        const { store_name, city_id, status } = storeData;
        const [result] = await db.query(
            'UPDATE stores SET store_name = ?, city_id = ?, status = ? WHERE store_id = ?',
            [store_name, city_id, status, id]
        );
        return result.affectedRows;
    }

    /**
     * Delete store
     */
    static async delete(id) {
        const [result] = await db.query(
            'DELETE FROM stores WHERE store_id = ?',
            [id]
        );
        return result.affectedRows;
    }

    /**
     * Check if store has sales records
     * Used for business rule validation
     */
    static async hasSales(storeId) {
        const [rows] = await db.query(
            'SELECT COUNT(*) as count FROM sales WHERE store_id = ?',
            [storeId]
        );
        return rows[0].count > 0;
    }

    /**
     * Get stores by city
     */
    static async findByCity(cityId) {
        const [rows] = await db.query(
            `SELECT s.store_id, s.store_name, s.city_id, s.status,
                    c.city_name, c.population
             FROM stores s
             LEFT JOIN cities c ON s.city_id = c.city_id
             WHERE s.city_id = ?`,
            [cityId]
        );
        return rows;
    }

    /**
     * Get stores by status
     */
    static async findByStatus(status) {
        const [rows] = await db.query(
            `SELECT s.store_id, s.store_name, s.city_id, s.status,
                    c.city_name
             FROM stores s
             LEFT JOIN cities c ON s.city_id = c.city_id
             WHERE s.status = ?`,
            [status]
        );
        return rows;
    }
}

module.exports = StoreModel;
