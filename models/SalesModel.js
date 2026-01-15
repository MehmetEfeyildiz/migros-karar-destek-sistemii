const db = require('../config/db');

/**
 * Sales Model
 * Handles all database operations related to sales (Satislar)
 */
class SalesModel {
    /**
     * Get all sales
     */
    static async findAll() {
        const [rows] = await db.query(
            `SELECT sa.sale_id, sa.store_id, sa.amount, sa.date,
                    st.store_name, c.city_name
             FROM sales sa
             LEFT JOIN stores st ON sa.store_id = st.store_id
             LEFT JOIN cities c ON st.city_id = c.city_id
             ORDER BY sa.date DESC`
        );
        return rows;
    }

    /**
     * Get sale by ID
     */
    static async findById(id) {
        const [rows] = await db.query(
            `SELECT sa.sale_id, sa.store_id, sa.amount, sa.date,
                    st.store_name, c.city_name
             FROM sales sa
             LEFT JOIN stores st ON sa.store_id = st.store_id
             LEFT JOIN cities c ON st.city_id = c.city_id
             WHERE sa.sale_id = ?`,
            [id]
        );
        return rows[0];
    }

    /**
     * Get sales by store
     */
    static async findByStore(storeId) {
        const [rows] = await db.query(
            `SELECT sale_id, store_id, amount, date 
             FROM sales 
             WHERE store_id = ?
             ORDER BY date DESC`,
            [storeId]
        );
        return rows;
    }

    /**
     * Create a new sale
     */
    static async create(saleData) {
        const { store_id, amount, date } = saleData;
        const [result] = await db.query(
            'INSERT INTO sales (store_id, amount, date) VALUES (?, ?, ?)',
            [store_id, amount, date]
        );
        return result.insertId;
    }

    /**
     * Update sale
     */
    static async update(id, saleData) {
        const { store_id, amount, date } = saleData;
        const [result] = await db.query(
            'UPDATE sales SET store_id = ?, amount = ?, date = ? WHERE sale_id = ?',
            [store_id, amount, date, id]
        );
        return result.affectedRows;
    }

    /**
     * Delete sale
     */
    static async delete(id) {
        const [result] = await db.query(
            'DELETE FROM sales WHERE sale_id = ?',
            [id]
        );
        return result.affectedRows;
    }

    /**
     * Get total sales by store
     */
    static async getTotalByStore(storeId) {
        const [rows] = await db.query(
            'SELECT SUM(amount) as total FROM sales WHERE store_id = ?',
            [storeId]
        );
        return rows[0].total || 0;
    }

    /**
     * Get sales statistics
     */
    static async getStatistics() {
        const [rows] = await db.query(
            `SELECT 
                COUNT(*) as total_sales,
                SUM(amount) as total_amount,
                AVG(amount) as average_amount,
                MAX(amount) as max_amount,
                MIN(amount) as min_amount
             FROM sales`
        );
        return rows[0];
    }
}

module.exports = SalesModel;
