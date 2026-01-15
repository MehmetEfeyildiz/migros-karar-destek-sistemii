const db = require('../config/db');

/**
 * City Model
 * Handles all database operations related to cities (Iller)
 */
class CityModel {
    /**
     * Get all cities
     */
    static async findAll() {
        const [rows] = await db.query(
            'SELECT city_id, city_name, population, active_store_count FROM cities ORDER BY city_name'
        );
        return rows;
    }

    /**
     * Get city by ID
     */
    static async findById(id) {
        const [rows] = await db.query(
            'SELECT city_id, city_name, population, active_store_count FROM cities WHERE city_id = ?',
            [id]
        );
        return rows[0];
    }

    /**
     * Create a new city
     */
    static async create(cityData) {
        const { city_name, population, active_store_count } = cityData;
        const [result] = await db.query(
            'INSERT INTO cities (city_name, population, active_store_count) VALUES (?, ?, ?)',
            [city_name, population, active_store_count || 0]
        );
        return result.insertId;
    }

    /**
     * Update city
     */
    static async update(id, cityData) {
        const { city_name, population, active_store_count } = cityData;
        const [result] = await db.query(
            'UPDATE cities SET city_name = ?, population = ?, active_store_count = ? WHERE city_id = ?',
            [city_name, population, active_store_count, id]
        );
        return result.affectedRows;
    }

    /**
     * Delete city
     */
    static async delete(id) {
        const [result] = await db.query(
            'DELETE FROM cities WHERE city_id = ?',
            [id]
        );
        return result.affectedRows;
    }

    /**
     * Check city population (for business rule validation)
     */
    static async checkPopulation(cityId, minimumPopulation) {
        const [rows] = await db.query(
            'SELECT population FROM cities WHERE city_id = ?',
            [cityId]
        );
        if (rows.length === 0) return false;
        return rows[0].population >= minimumPopulation;
    }

    /**
     * Get city by name
     */
    static async findByName(name) {
        const [rows] = await db.query(
            'SELECT city_id, city_name, population, active_store_count FROM cities WHERE city_name = ?',
            [name]
        );
        return rows[0];
    }
}

module.exports = CityModel;
