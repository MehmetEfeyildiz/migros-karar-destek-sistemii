const db = require('../config/db');

/**
 * PlannedStore Model
 * Handles all database operations related to planned stores (Planlanan_Magaza)
 */
class PlannedStoreModel {
    /**
     * Get all planned stores
     */
    static async findAll() {
        const [rows] = await db.query(
            `SELECT ps.plan_id, ps.region, ps.target_opening_date, ps.city_id,
                    c.city_name, c.population
             FROM planned_stores ps
             LEFT JOIN cities c ON ps.city_id = c.city_id
             ORDER BY ps.target_opening_date`
        );
        return rows;
    }

    /**
     * Get planned store by ID
     */
    static async findById(id) {
        const [rows] = await db.query(
            `SELECT ps.plan_id, ps.region, ps.target_opening_date, ps.city_id,
                    c.city_name, c.population
             FROM planned_stores ps
             LEFT JOIN cities c ON ps.city_id = c.city_id
             WHERE ps.plan_id = ?`,
            [id]
        );
        return rows[0];
    }

    /**
     * Create a new planned store
     */
    static async create(plannedStoreData) {
        const { region, target_opening_date, city_id } = plannedStoreData;
        const [result] = await db.query(
            'INSERT INTO planned_stores (region, target_opening_date, city_id) VALUES (?, ?, ?)',
            [region, target_opening_date, city_id]
        );
        return result.insertId;
    }

    /**
     * Update planned store
     */
    static async update(id, plannedStoreData) {
        const { region, target_opening_date, city_id } = plannedStoreData;
        const [result] = await db.query(
            'UPDATE planned_stores SET region = ?, target_opening_date = ?, city_id = ? WHERE plan_id = ?',
            [region, target_opening_date, city_id, id]
        );
        return result.affectedRows;
    }

    /**
     * Delete planned store
     */
    static async delete(id) {
        const [result] = await db.query(
            'DELETE FROM planned_stores WHERE plan_id = ?',
            [id]
        );
        return result.affectedRows;
    }

    /**
     * Get planned stores by region
     */
    static async findByRegion(region) {
        const [rows] = await db.query(
            `SELECT ps.plan_id, ps.region, ps.target_opening_date, ps.city_id,
                    c.city_name, c.population
             FROM planned_stores ps
             LEFT JOIN cities c ON ps.city_id = c.city_id
             WHERE ps.region = ?
             ORDER BY ps.target_opening_date`,
            [region]
        );
        return rows;
    }
}

module.exports = PlannedStoreModel;
