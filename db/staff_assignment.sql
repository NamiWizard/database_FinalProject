-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: staff_assignment
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `name` varchar(12) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `id_card` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `telephone` varchar(16) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `age` int(4) NOT NULL,
  `profession` varchar(12) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `date` datetime NOT NULL,
  `picture` blob,
  `status` varchar(6) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_card`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES ('呂東東','A123456789','02-2222-3333','台北市文湖路三段一八一號',13,'大學教授','2019-12-13 00:00:00','','正常'),('呂東海','A987654321','02-2222-3333','台北市文湖路三段一八一號',12,'大學教授','2020-01-02 00:00:00','','停用'),('呂海東','A987654326','02-2222-3333','台北市文湖路三段一八一號',38,'大學教授','2020-01-10 00:00:00','','正常');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_account`
--

DROP TABLE IF EXISTS `company_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_account` (
  `client_name` varchar(12) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `client_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `receivable_account` decimal(8,2) NOT NULL,
  `receivable_date` datetime NOT NULL,
  `unreceivable_account` decimal(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_account`
--

LOCK TABLES `company_account` WRITE;
/*!40000 ALTER TABLE `company_account` DISABLE KEYS */;
INSERT INTO `company_account` VALUES ('呂東東','A123456789',1000.00,'2019-12-14 00:00:00',0.00),('呂海東','A987654321',3000.00,'2020-01-02 00:00:00',0.00),('呂海東','A987654321',300000.00,'2020-01-08 00:00:00',0.00),('呂海東','A987654321',123456.00,'2020-01-13 00:00:00',0.00);
/*!40000 ALTER TABLE `company_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_purchase`
--

DROP TABLE IF EXISTS `company_purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_purchase` (
  `supplier` varchar(16) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `supplier_number` varchar(5) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `supplier_principal` varchar(12) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `purchase` varchar(16) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `purchase_account` decimal(8,2) NOT NULL,
  `purchase_unit` varchar(6) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `purchase_price` decimal(8,2) NOT NULL,
  `subtotal` decimal(8,2) NOT NULL,
  `inventory_positions` varchar(16) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `specification` varchar(16) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `order_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_purchase`
--

LOCK TABLES `company_purchase` WRITE;
/*!40000 ALTER TABLE `company_purchase` DISABLE KEYS */;
INSERT INTO `company_purchase` VALUES ('選秀實業公司','12345','李四','文蛤',100.00,'公斤',200.00,20000.00,'一樓水池','上品','2020-01-11 00:00:00'),('選秀實業公司','12345','李四','文蛤',10.00,'公斤',20.00,200.00,'一樓水池','上品','2020-01-03 00:00:00'),('選秀實業公司','12345','李四','文蛤',100.00,'公斤',200.00,20000.00,'一樓水池','上品','2020-01-12 00:00:00');
/*!40000 ALTER TABLE `company_purchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_record`
--

DROP TABLE IF EXISTS `order_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_record` (
  `id_card` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `order_date` datetime NOT NULL,
  `expected_delivery_date` datetime NOT NULL,
  `actual_delivery_date` datetime NOT NULL,
  `product_name` varchar(16) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `unit` varchar(6) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `amount` decimal(8,2) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `order_price` varchar(5) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `supplier` varchar(16) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `suppler_number` varchar(5) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_record`
--

LOCK TABLES `order_record` WRITE;
/*!40000 ALTER TABLE `order_record` DISABLE KEYS */;
INSERT INTO `order_record` VALUES ('A987654321','2020-01-04 00:00:00','2020-01-04 00:00:00','2020-01-04 00:00:00','虱目魚','公斤',2.00,50.00,'100','士林生鮮公司','01010'),('A987654321','2020-01-08 00:00:00','2020-01-10 00:00:00','2020-01-10 00:00:00','虱目魚','公斤',20.00,50.00,'1000','士林生鮮公司	','01010'),('A987654321','2020-01-09 00:00:00','2020-01-10 00:00:00','2020-01-10 00:00:00','虱目魚','公斤',200.00,50.00,'10000','士林生鮮公司','01010');
/*!40000 ALTER TABLE `order_record` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-11 23:25:02
