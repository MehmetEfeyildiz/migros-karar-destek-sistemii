-- =====================================================
-- Migros DSS Database Schema
-- Decision Support System for Store Planning
-- =====================================================

-- Database creation
CREATE DATABASE IF NOT EXISTS migros;
USE migros;

-- =====================================================
-- Table: cities (Iller)
-- Stores city information with population data
-- =====================================================
CREATE TABLE IF NOT EXISTS cities (
    city_id INT PRIMARY KEY AUTO_INCREMENT,
    city_name VARCHAR(100) NOT NULL,
    population INT NOT NULL,
    active_store_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_city_name (city_name),
    INDEX idx_population (population)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Table: stores (Magazalar)
-- Stores information about Migros stores
-- =====================================================
CREATE TABLE IF NOT EXISTS stores (
    store_id INT PRIMARY KEY AUTO_INCREMENT,
    store_name VARCHAR(100) NOT NULL COMMENT 'e.g., Migros Jet, 5M, MMM',
    city_id INT NOT NULL,
    status ENUM('active', 'planned', 'closed') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (city_id) REFERENCES cities(city_id) ON DELETE RESTRICT,
    INDEX idx_status (status),
    INDEX idx_city (city_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Table: sales (Satislar)
-- Stores sales transaction data
-- =====================================================
CREATE TABLE IF NOT EXISTS sales (
    sale_id INT PRIMARY KEY AUTO_INCREMENT,
    store_id INT NOT NULL,
    amount DECIMAL(15, 2) NOT NULL COMMENT 'Sales amount in Turkish Lira',
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES stores(store_id) ON DELETE RESTRICT,
    INDEX idx_store (store_id),
    INDEX idx_date (date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Table: planned_stores (Planlanan_Magaza)
-- Stores information about planned future stores
-- =====================================================
CREATE TABLE IF NOT EXISTS planned_stores (
    plan_id INT PRIMARY KEY AUTO_INCREMENT,
    region VARCHAR(100) NOT NULL COMMENT 'Region/area name',
    target_opening_date DATE NOT NULL,
    city_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (city_id) REFERENCES cities(city_id) ON DELETE SET NULL,
    INDEX idx_region (region),
    INDEX idx_target_date (target_opening_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Sample Data (Optional - for testing)
-- =====================================================

-- Insert sample cities
INSERT INTO cities (city_name, population, active_store_count) VALUES
('İstanbul', 15462452, 45),
('Ankara', 5663322, 22),
('İzmir', 4425789, 18),
('Bursa', 3101833, 12),
('Antalya', 2619832, 10),
('Konya', 2250020, 8),
('Gaziantep', 2069364, 9),
('Adana', 2258718, 11),
('Kocaeli', 1997258, 7),
('Mersin', 1891145, 6),
('Diyarbakır', 1783431, 5),
('Hatay', 1670712, 4),
('Manisa', 1440611, 5),
('Kayseri', 1421362, 6),
('Samsun', 1366722, 7),
('Balıkesir', 1257590, 4),
('Kahramanmaraş', 1168163, 3),
('Van', 1136757, 2),
('Aydın', 1119084, 4),
('Denizli', 1040915, 5),
('Şanlıurfa', 2155805, 6),
('Tekirdağ', 1081065, 3),
('Muğla', 1000773, 4),
('Eskişehir', 887475, 5),
('Malatya', 803814, 3),
('Erzurum', 762062, 2),
('Trabzon', 807903, 4),
('Elazığ', 591497, 2),
('Kütahya', 577941, 2),
('Çorum', 525180, 1);

-- Insert sample stores
INSERT INTO stores (store_name, city_id, status) VALUES
('Migros Jet İstanbul 1', 1, 'active'),
('Migros 5M İstanbul 2', 1, 'active'),
('Migros MMM İstanbul 3', 1, 'active'),
('Migros Jet Ankara 1', 2, 'active'),
('Migros 5M Ankara 2', 2, 'active'),
('Migros Jet İzmir 1', 3, 'active'),
('Migros MMM İzmir 2', 3, 'active'),
('Migros 5M Bursa 1', 4, 'active'),
('Migros Jet Antalya 1', 5, 'active'),
('Migros 5M Konya 1', 6, 'active');

-- Insert sample sales
INSERT INTO sales (store_id, amount, date) VALUES
(1, 125000.50, '2024-01-15'),
(1, 132000.75, '2024-01-16'),
(2, 98000.25, '2024-01-15'),
(2, 105000.00, '2024-01-16'),
(3, 250000.80, '2024-01-15'),
(3, 267000.45, '2024-01-16'),
(4, 89000.30, '2024-01-15'),
(4, 92000.60, '2024-01-16'),
(5, 110000.90, '2024-01-15'),
(5, 115000.20, '2024-01-16'),
(6, 78000.40, '2024-01-15'),
(7, 156000.70, '2024-01-15'),
(8, 95000.00, '2024-01-15'),
(9, 88000.50, '2024-01-15'),
(10, 102000.80, '2024-01-15');

-- Insert sample planned stores
INSERT INTO planned_stores (region, target_opening_date, city_id) VALUES
('Marmara Bölgesi', '2024-06-01', 1),
('İç Anadolu', '2024-07-15', 2),
('Ege Bölgesi', '2024-08-20', 3),
('Karadeniz', '2024-09-10', 27);
