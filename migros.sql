-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1:3306
-- Üretim Zamanı: 30 Ara 2024, 19:44:11
-- Sunucu sürümü: 9.1.0
-- PHP Sürümü: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `migros`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `aylar`
--

DROP TABLE IF EXISTS `aylar`;
CREATE TABLE IF NOT EXISTS `aylar` (
  `ay_id` varchar(50) COLLATE utf8mb4_turkish_ci NOT NULL,
  `ay_numarasi` int NOT NULL,
  PRIMARY KEY (`ay_id`),
  KEY `ay_numarasi` (`ay_numarasi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `aylar`
--

INSERT INTO `aylar` (`ay_id`, `ay_numarasi`) VALUES
('Ocak', 1),
('Şubat', 2),
('Mart', 3),
('Nisan', 4),
('Mayıs', 5),
('Haziran', 6),
('Temmuz', 7),
('Ağustos', 8),
('Eylül', 9),
('Ekim', 10),
('Kasım', 11),
('Aralık', 12);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `iller`
--

DROP TABLE IF EXISTS `iller`;
CREATE TABLE IF NOT EXISTS `iller` (
  `il_id` int NOT NULL AUTO_INCREMENT,
  `il_adi` varchar(255) COLLATE utf8mb4_turkish_ci NOT NULL,
  `koordinatlar` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `bilgi` text COLLATE utf8mb4_turkish_ci,
  `satis_sayisi` int NOT NULL,
  `ortalama_gunluk_satis` int DEFAULT '100',
  `nufus` int DEFAULT '100000',
  PRIMARY KEY (`il_id`),
  UNIQUE KEY `il_adi` (`il_adi`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `iller`
--

INSERT INTO `iller` (`il_id`, `il_adi`, `koordinatlar`, `bilgi`, `satis_sayisi`, `ortalama_gunluk_satis`, `nufus`) VALUES
(1, 'Adana', '37.0, 35.3213', 'Adana kebaplarıyla ünlüdür.', 1150, 100, 2258718),
(2, 'Adıyaman', '37.7648, 38.2786', 'Nemrut Dağı ile ünlüdür.', 0, 100, 100000),
(3, 'Afyonkarahisar', '38.7638, 30.5404', 'Termal kaplıcalarıyla ünlüdür.', 0, 100, 100000),
(4, 'Ağrı', '39.7191, 43.0503', 'Ağrı Dağı ile tanınır.', 0, 100, 100000),
(5, 'Amasya', '40.6539, 35.8353', 'Tarihi evleri ve Ferhat ile Şirin efsanesiyle bilinir.', 0, 100, 100000),
(6, 'Ankara', '39.9208, 32.8541', 'Türkiye\'nin başkenti.', 2870, 100, 5747325),
(7, 'Antalya', '36.8841, 30.7056', 'Turizmin başkenti.', 1148, 100, 2619832),
(8, 'Artvin', '41.1825, 41.8212', 'Doğal güzellikleriyle ünlüdür.', 0, 100, 100000),
(9, 'Aydın', '37.8450, 27.8396', 'Tarihi Didim ve Kuşadası ile bilinir.', 0, 100, 1134031),
(10, 'Balıkesir', '39.6533, 27.8917', 'Kaz Dağları ile tanınır.', 0, 100, 1250610),
(11, 'Bilecik', '40.1574, 29.9793', 'Osmanlı Devleti\'nin kuruluş yeri.', 0, 100, 100000),
(12, 'Bingöl', '38.8847, 40.4939', 'Doğal güzellikleri ile bilinir.', 0, 100, 100000),
(13, 'Bitlis', '38.4011, 42.1078', 'Nemrut Krater Gölü ile ünlüdür.', 0, 100, 100000),
(14, 'Bolu', '40.7350, 31.6060', 'Abant Gölü ve Yedigöller ile bilinir.', 0, 100, 100000),
(15, 'Burdur', '37.7203, 30.2903', 'Salda Gölü ile ünlüdür.', 0, 100, 100000),
(16, 'Bursa', '40.1826, 29.0661', 'Osmanlı\'nın ilk başkenti.', 1565, 100, 3147818),
(17, 'Çanakkale', '40.1553, 26.4142', 'Tarihi Gelibolu yarımadası ve Truva ile ünlüdür.', 0, 100, 100000),
(18, 'Çankırı', '40.6013, 33.6134', 'Tuz Mağarası ile tanınır.', 0, 100, 100000),
(19, 'Çorum', '40.5506, 34.9556', 'Hititlerin başkenti Hattuşa.', 0, 100, 100000),
(20, 'Denizli', '37.7765, 29.0864', 'Pamukkale travertenleri ile ünlüdür.', 0, 100, 100000),
(21, 'Diyarbakır', '37.9158, 40.2189', 'Tarihi surları ile tanınır.', 0, 100, 1791373),
(22, 'Edirne', '41.6772, 26.5554', 'Selimiye Camii ile ünlüdür.', 0, 100, 100000),
(23, 'Elazığ', '38.6809, 39.2266', 'Harput Kalesi ile bilinir.', 0, 100, 100000),
(24, 'Erzincan', '39.7464, 39.4919', 'Kemaliye Kanyonu ile tanınır.', 0, 100, 100000),
(25, 'Erzurum', '39.9057, 41.2655', 'Kış turizmi ile ünlüdür.', 0, 100, 100000),
(26, 'Eskişehir', '39.7667, 30.5256', 'Odunpazarı evleri ve Porsuk Çayı ile bilinir.', 0, 100, 100000),
(27, 'Gaziantep', '37.0662, 37.3833', 'Baklava ve yemek kültürü ile ünlüdür.', 876, 100, 2130432),
(28, 'Giresun', '40.9128, 38.3895', 'Fındık üretimi ile bilinir.', 0, 100, 100000),
(29, 'Gümüşhane', '40.4600, 39.4814', 'Doğal güzellikleri ile bilinir.', 0, 100, 100000),
(30, 'Hakkari', '37.5744, 43.7408', 'Cilo Dağları ile ünlüdür.', 0, 100, 100000),
(31, 'Hatay', '36.2028, 36.1600', 'Mozaikleriyle ünlü Antakya.', 0, 100, 1659320),
(32, 'Iğdır', '39.9166, 44.0450', 'Ağrı Dağı manzarasıyla bilinir.', 0, 100, 100000),
(33, 'Isparta', '37.7648, 30.5563', 'Gül üretimi ile tanınır.', 0, 100, 100000),
(34, 'Mersin', '36.8121, 34.6415', 'Liman kenti ve Cennet-Cehennem mağaraları ile bilinir.', 0, 100, 1891145),
(35, 'İstanbul', '41.0082, 28.9784', 'Türkiye\'nin en büyük şehri.', 8348, 100, 15907951),
(36, 'İzmir', '38.4192, 27.1287', 'Ege\'nin incisi.', 2504, 100, 4425789),
(37, 'Kahramanmaraş', '37.5774, 36.9371', 'Dondurması ile meşhur.', 0, 100, 1171298),
(38, 'Karabük', '41.2061, 32.6204', 'Safranbolu evleri ile bilinir.', 0, 100, 100000),
(39, 'Karaman', '37.1811, 33.2150', 'Tarihi mekanları ile bilinir.', 0, 100, 100000),
(40, 'Kars', '40.6014, 43.0970', 'Ani Harabeleri ile bilinir.', 0, 100, 100000),
(41, 'Kastamonu', '41.3887, 33.7827', 'Doğal güzellikleri ile tanınır.', 0, 100, 100000),
(42, 'Kayseri', '38.7312, 35.4787', 'Erciyes Dağı ile ünlüdür.', 0, 100, 1421455),
(43, 'Kırıkkale', '39.8468, 33.5152', 'Sanayi şehri.', 0, 100, 100000),
(44, 'Kırklareli', '41.7355, 27.2255', 'Doğal güzellikleri ile bilinir.', 0, 100, 100000),
(45, 'Kırşehir', '39.1458, 34.1600', 'Ahi Evran ile bilinir.', 0, 100, 100000),
(46, 'Kilis', '36.7167, 37.1150', 'Zeytinyağı üretimi ile ünlüdür.', 0, 100, 100000),
(47, 'Kocaeli', '40.8533, 29.8815', 'Sanayi şehri.', 0, 100, 2033441),
(48, 'Konya', '37.8715, 32.4847', 'Mevlana ile ünlüdür.', 1038, 100, 2277017),
(49, 'Kütahya', '39.4242, 29.9833', 'Çinicilik ile tanınır.', 0, 100, 100000),
(50, 'Malatya', '38.3552, 38.3095', 'Kayısısı ile ünlüdür.', 0, 100, 100000),
(51, 'Manisa', '38.6133, 27.4265', 'Spil Dağı ve üzümü ile tanınır.', 0, 100, 1450616),
(52, 'Mardin', '37.3122, 40.7350', 'Tarihi taş evleri ile bilinir.', 0, 100, 100000),
(53, 'Muğla', '37.2153, 28.3636', 'Bodrum, Fethiye ve Marmaris ile bilinir.', 0, 100, 100000),
(54, 'Muş', '38.9462, 41.7539', 'Tarihi eserleriyle bilinir.', 0, 100, 100000),
(55, 'Nevşehir', '38.6247, 34.7141', 'Kapadokya bölgesi ile ünlüdür.', 0, 100, 100000),
(56, 'Niğde', '37.9683, 34.6914', 'Tarihi eserleri ile tanınır.', 0, 100, 100000),
(57, 'Ordu', '40.9838, 37.8769', 'Fındık üretimi ile bilinir.', 0, 100, 100000),
(58, 'Osmaniye', '37.0745, 36.2473', 'Tarihi eserleriyle bilinir.', 0, 100, 100000),
(59, 'Rize', '41.0201, 40.5235', 'Çay üretimi ile ünlüdür.', 0, 100, 100000),
(60, 'Sakarya', '40.7565, 30.3789', 'Sapanca Gölü ile tanınır.', 0, 100, 100000),
(61, 'Samsun', '41.2867, 36.33', 'Karadeniz\'in incisi.', 0, 100, 1371274),
(62, 'Siirt', '37.9333, 41.95', 'Doğal güzellikleriyle tanınır.', 0, 100, 100000),
(63, 'Sinop', '42.0271, 35.1545', 'En kuzey noktamız.', 0, 100, 100000),
(64, 'Sivas', '39.7477, 37.0179', 'Tarihi eserleriyle tanınır.', 0, 100, 100000),
(65, 'Şanlıurfa', '37.1676, 38.7955', 'Peygamberler şehri.', 0, 100, 2143020),
(66, 'Şırnak', '37.4187, 42.4918', 'Doğal güzellikleriyle bilinir.', 0, 100, 100000),
(67, 'Tekirdağ', '40.9789, 27.5110', 'Marmara\'nın güzellikleri.', 0, 100, 100000),
(68, 'Tokat', '40.3140, 36.5544', 'Tarihi dokusuyla tanınır.', 0, 100, 100000);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `kapasite`
--

DROP TABLE IF EXISTS `kapasite`;
CREATE TABLE IF NOT EXISTS `kapasite` (
  `magaza_adi` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `kapasite` int NOT NULL,
  `buyume` int NOT NULL,
  PRIMARY KEY (`magaza_adi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `kapasite`
--

INSERT INTO `kapasite` (`magaza_adi`, `kapasite`, `buyume`) VALUES
('Migros Adana', 95, 12),
('Migros Ankara', 88, 18),
('Migros Antalya ', 95, 15),
('Migros Bursa', 95, 28),
('Migros Diyarbakır', 90, 22),
('Migros Eskişehir', 95, 19),
('Migros Gaziantep', 89, 16),
('Migros İstanbul', 92, 25),
('Migros İzmir', 95, 12),
('Migros Mersin', 94, 17),
('Migros Samsun', 98, 22),
('Migros Trabzon', 96, 21);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `kullanicilar`
--

DROP TABLE IF EXISTS `kullanicilar`;
CREATE TABLE IF NOT EXISTS `kullanicilar` (
  `kullanici_id` int NOT NULL AUTO_INCREMENT,
  `kullanici_adi` varchar(50) COLLATE utf8mb4_turkish_ci NOT NULL,
  `kullanici_parolasi` varchar(50) COLLATE utf8mb4_turkish_ci NOT NULL,
  PRIMARY KEY (`kullanici_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `kullanicilar`
--

INSERT INTO `kullanicilar` (`kullanici_id`, `kullanici_adi`, `kullanici_parolasi`) VALUES
(1, 'admin', '1234');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `magazalar`
--

DROP TABLE IF EXISTS `magazalar`;
CREATE TABLE IF NOT EXISTS `magazalar` (
  `id` int NOT NULL AUTO_INCREMENT,
  `magaza_turu` varchar(20) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `aktif_magaza` int DEFAULT NULL,
  `satis_miktari` decimal(10,2) DEFAULT NULL,
  `musteri_sayisi` int DEFAULT NULL,
  `sepet_ortalama` decimal(10,2) DEFAULT NULL,
  `toplam_satis` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `magazalar`
--

INSERT INTO `magazalar` (`id`, `magaza_turu`, `aktif_magaza`, `satis_miktari`, `musteri_sayisi`, `sepet_ortalama`, `toplam_satis`) VALUES
(1, '5M', 150, 45000.00, 2845, 351.50, 6582420.00),
(2, '3M', 341, 32000.00, 1845, 251.25, 4582420.00),
(3, '2M', 425, 25000.00, 1245, 201.75, 3582420.00),
(4, 'M', 890, 18000.00, 845, 151.25, 2582420.00),
(5, 'MIGROSJET', 535, 12000.00, 445, 101.50, 1582420.00);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `magaza_satis_trend`
--

DROP TABLE IF EXISTS `magaza_satis_trend`;
CREATE TABLE IF NOT EXISTS `magaza_satis_trend` (
  `id` int NOT NULL AUTO_INCREMENT,
  `magaza_turu` varchar(20) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `ay_id` int DEFAULT NULL,
  `satis_miktari` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `magaza_turu` (`magaza_turu`,`ay_id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `magaza_satis_trend`
--

INSERT INTO `magaza_satis_trend` (`id`, `magaza_turu`, `ay_id`, `satis_miktari`) VALUES
(1, '5M', 1, 580000.00),
(2, '5M', 2, 620000.00),
(3, '5M', 3, 590000.00),
(4, '3M', 1, 380000.00),
(5, '3M', 2, 420000.00),
(6, '3M', 3, 390000.00),
(7, '2M', 1, 280000.00),
(8, '2M', 2, 320000.00),
(9, '2M', 3, 290000.00),
(10, 'M', 1, 180000.00),
(11, 'M', 2, 220000.00),
(12, 'M', 3, 190000.00),
(13, 'MIGROSJET', 1, 80000.00),
(14, 'MIGROSJET', 2, 120000.00),
(15, 'MIGROSJET', 3, 90000.00);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `planlanan_magaza`
--

DROP TABLE IF EXISTS `planlanan_magaza`;
CREATE TABLE IF NOT EXISTS `planlanan_magaza` (
  `bolge_adi` varchar(50) COLLATE utf8mb4_turkish_ci NOT NULL,
  `magaza_turu` varchar(50) COLLATE utf8mb4_turkish_ci NOT NULL,
  `bolge_id` int NOT NULL,
  `magaza_sayisi` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `planlanan_magaza`
--

INSERT INTO `planlanan_magaza` (`bolge_adi`, `magaza_turu`, `bolge_id`, `magaza_sayisi`) VALUES
('Marmara', '', 0, 0),
('Maramr', '', 0, 0);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `satislar`
--

DROP TABLE IF EXISTS `satislar`;
CREATE TABLE IF NOT EXISTS `satislar` (
  `yil_id` int NOT NULL,
  `satis_id` int NOT NULL AUTO_INCREMENT,
  `satis_miktari` int NOT NULL,
  `ay_id` varchar(50) COLLATE utf8mb4_turkish_ci NOT NULL,
  PRIMARY KEY (`satis_id`),
  KEY `yil_id` (`yil_id`),
  KEY `ay_id` (`ay_id`)
) ENGINE=InnoDB AUTO_INCREMENT=202413 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `satislar`
--

INSERT INTO `satislar` (`yil_id`, `satis_id`, `satis_miktari`, `ay_id`) VALUES
(2024, 20241, 20000000, 'Ocak'),
(2024, 20242, 22000000, 'Şubat'),
(2024, 20243, 25000000, 'Mart'),
(2024, 20244, 21000000, 'Nisan'),
(2024, 20245, 25000000, 'Mayıs'),
(2024, 20246, 21500000, 'Haziran'),
(2024, 20247, 2900, 'Temmuz'),
(2024, 20248, 3000, 'Ağustos'),
(2024, 20249, 3200, 'Eylül'),
(2024, 202410, 3500, 'Ekim'),
(2024, 202411, 3700, 'Kasım'),
(2024, 202412, 4000, 'Aralık');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `sikayetler`
--

DROP TABLE IF EXISTS `sikayetler`;
CREATE TABLE IF NOT EXISTS `sikayetler` (
  `talep_id` int NOT NULL AUTO_INCREMENT,
  `sikayet_sayisi` int NOT NULL,
  `il_adi` varchar(50) COLLATE utf8mb4_turkish_ci NOT NULL,
  `yil_id` int NOT NULL,
  PRIMARY KEY (`talep_id`),
  KEY `il_adi` (`il_adi`,`yil_id`),
  KEY `yil_id` (`yil_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20246 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `sikayetler`
--

INSERT INTO `sikayetler` (`talep_id`, `sikayet_sayisi`, `il_adi`, `yil_id`) VALUES
(20241, 3148, 'İstanbul', 2024),
(20242, 1789, 'Ankara', 2024),
(20243, 1226, 'İzmir', 2024),
(20244, 1114, 'Bursa', 2024),
(20245, 902, 'Antalya', 2024);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `yil`
--

DROP TABLE IF EXISTS `yil`;
CREATE TABLE IF NOT EXISTS `yil` (
  `yil_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`yil_id`),
  KEY `yil_id` (`yil_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2026 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `yil`
--

INSERT INTO `yil` (`yil_id`) VALUES
(2023),
(2024),
(2025);

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `satislar`
--
ALTER TABLE `satislar`
  ADD CONSTRAINT `satislar_ibfk_1` FOREIGN KEY (`yil_id`) REFERENCES `yil` (`yil_id`),
  ADD CONSTRAINT `satislar_ibfk_2` FOREIGN KEY (`ay_id`) REFERENCES `aylar` (`ay_id`);

--
-- Tablo kısıtlamaları `sikayetler`
--
ALTER TABLE `sikayetler`
  ADD CONSTRAINT `sikayetler_ibfk_1` FOREIGN KEY (`yil_id`) REFERENCES `yil` (`yil_id`),
  ADD CONSTRAINT `sikayetler_ibfk_2` FOREIGN KEY (`il_adi`) REFERENCES `iller` (`il_adi`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
