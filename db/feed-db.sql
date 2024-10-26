-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-10-2024 a las 00:16:54
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `feed-db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `post`
--

CREATE TABLE `post` (
  `id_post` int(11) NOT NULL,
  `title_post` text NOT NULL,
  `description_post` longtext NOT NULL,
  `url_post` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `post`
--

INSERT INTO `post` (`id_post`, `title_post`, `description_post`, `url_post`) VALUES
(1, 'publicacion 1', 'descripcion 1', 'https://static.nationalgeographic.es/files/styles/image_3200/public/75552.ngsversion.1422285553360.jpg?w=1900&h=1267'),
(2, 'Publicacion 2', 'Descripcion 2', 'http://localhost:3000/assets/img/descarga.jpeg'),
(15, 'Perro', 'con cejasss', 'https://ih1.redbubble.net/image.5437205904.1040/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg'),
(16, 'Teneré', 'Níger', 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiUXeQt5nvevRkQ8JFqsdA1mkjOfcMPQu26SP1m6cZdDRnjskExhEbDnbFAZOx2o1pMUoeWbOvlDGBGvfCehpxpGQahxcbmU8sDXBCQ3zedAGduK_OtgabSoLInhXenUIM2kpecro58AZpR/s1600/index2.jpg'),
(17, 'el rey', 'roberto me la pela', 'https://diariocorreo.pe/resizer/LDzyLNboIj9mm_zHfpLrvsEREEc=/1200x1200/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/V5FUUTVTIJG7XEXH2SEIGTA6BI.jpg'),
(18, '', '', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id_post`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `post`
--
ALTER TABLE `post`
  MODIFY `id_post` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
