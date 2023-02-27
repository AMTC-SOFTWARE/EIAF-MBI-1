-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 22, 2021 at 06:11 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eiaf`
--

-- --------------------------------------------------------

--
-- Table structure for table `historial`
--

CREATE TABLE `historial` (
  `ID` int(11) NOT NULL,
  `HM` tinytext COLLATE utf8mb4_bin NOT NULL,
  `QR_FET` tinytext COLLATE utf8mb4_bin NOT NULL,
  `QR_MAQUINA` tinytext COLLATE utf8mb4_bin NOT NULL,
  `RESULTADO` tinytext COLLATE utf8mb4_bin NOT NULL,
  `FUSIBLES` longtext COLLATE utf8mb4_bin NOT NULL,
  `REINTENTOS` longtext COLLATE utf8mb4_bin NOT NULL,
  `INICIO` datetime NOT NULL,
  `FIN` datetime NOT NULL,
  `USUARIO` tinytext COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

CREATE TABLE `log` (
  `ID` int(11) NOT NULL,
  `HM` tinytext COLLATE utf8mb4_bin NOT NULL,
  `ESTADO` tinytext COLLATE utf8mb4_bin NOT NULL,
  `FECHA` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `manager`
--

CREATE TABLE `manager` (
  `ID` int(11) NOT NULL,
  `NOMBRE` text COLLATE utf8mb4_bin NOT NULL,
  `GAFET` text COLLATE utf8mb4_bin NOT NULL,
  `TIPO` text COLLATE utf8mb4_bin NOT NULL,
  `SESION` text COLLATE utf8mb4_bin NOT NULL,
  `FECHA` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `modularidades`
--

CREATE TABLE `modularidades` (
  `ID` int(11) NOT NULL,
  `MODULARIDAD` text COLLATE utf8mb4_bin NOT NULL,
  `FECHA` datetime NOT NULL,
  `MODULOS_FUSIBLES` text COLLATE utf8mb4_bin NOT NULL,
  `ACTIVO` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `modulos_fusibles`
--

CREATE TABLE `modulos_fusibles` (
  `ID` int(11) NOT NULL,
  `MODULO` text COLLATE utf8mb4_bin NOT NULL,
  `PDC-R` longtext COLLATE utf8mb4_bin NOT NULL,
  `PDC-RMID` longtext COLLATE utf8mb4_bin NOT NULL,
  `PDC-S` longtext COLLATE utf8mb4_bin NOT NULL,
  `TBLU` longtext COLLATE utf8mb4_bin NOT NULL,
  `PDC-D` longtext COLLATE utf8mb4_bin NOT NULL,
  `PDC-P` longtext COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `ID` int(11) NOT NULL,
  `NOMBRE` text COLLATE utf8mb4_bin NOT NULL,
  `GAFET` text COLLATE utf8mb4_bin NOT NULL,
  `TIPO` text COLLATE utf8mb4_bin NOT NULL,
  `FECHA` datetime NOT NULL,
  `ACTIVO` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`ID`, `NOMBRE`, `GAFET`, `TIPO`, `FECHA`, `ACTIVO`) VALUES
(1, 'Administrador', '654321', 'AMTC', '2021-03-01 14:18:44', 1);

-- --------------------------------------------------------

--
-- Table structure for table `web`
--

CREATE TABLE `web` (
  `ID` int(11) NOT NULL,
  `NOMBRE` text COLLATE utf8mb4_bin NOT NULL,
  `GAFET` text COLLATE utf8mb4_bin NOT NULL,
  `TIPO` text COLLATE utf8mb4_bin NOT NULL,
  `SESION` text COLLATE utf8mb4_bin NOT NULL,
  `FECHA` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `manager`
--
ALTER TABLE `manager`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `modularidades`
--
ALTER TABLE `modularidades`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `modulos_fusibles`
--
ALTER TABLE `modulos_fusibles`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `web`
--
ALTER TABLE `web`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `historial`
--
ALTER TABLE `historial`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `log`
--
ALTER TABLE `log`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `manager`
--
ALTER TABLE `manager`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `modularidades`
--
ALTER TABLE `modularidades`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `modulos_fusibles`
--
ALTER TABLE `modulos_fusibles`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `web`
--
ALTER TABLE `web`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
