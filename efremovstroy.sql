-- phpMyAdmin SQL Dump
-- version 4.0.10.10
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июл 06 2016 г., 13:33
-- Версия сервера: 5.5.45
-- Версия PHP: 5.5.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `efremovstroy`
--

-- --------------------------------------------------------

--
-- Структура таблицы `tbl_advt`
--

CREATE TABLE IF NOT EXISTS `tbl_advt` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(3) NOT NULL,
  `header` text,
  `address` varchar(300) DEFAULT NULL,
  `phone` bigint(11) NOT NULL,
  `alt_phone` int(5) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0',
  `date_create` datetime NOT NULL,
  `date_update` datetime DEFAULT NULL,
  `date_activate` datetime DEFAULT NULL,
  `date_end` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=30 ;

--
-- Дамп данных таблицы `tbl_advt`
--

INSERT INTO `tbl_advt` (`id`, `id_user`, `header`, `address`, `phone`, `alt_phone`, `status`, `date_create`, `date_update`, `date_activate`, `date_end`) VALUES
(26, 83, 'Тестовое объявление рекламы', 'ул. Комсомольская, д. 40', 89207582642, 67895, 1, '2016-05-05 23:45:54', '2016-05-20 01:04:44', NULL, '2016-11-11 23:36:12'),
(28, 83, 'Магазин "Строитель"', 'Ленина 45', 89538756895, 65309, 1, '2016-05-15 21:20:00', '2016-05-19 19:24:03', NULL, '2016-07-14 21:23:41'),
(29, 87, 'Лаки и краски', 'Мой адрес 123', 89225556688, 0, 1, '2016-05-23 00:02:46', '2016-05-23 00:07:50', NULL, '2016-07-22 00:07:50');

-- --------------------------------------------------------

--
-- Структура таблицы `tbl_checkPhone`
--

CREATE TABLE IF NOT EXISTS `tbl_checkPhone` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `init` int(2) NOT NULL DEFAULT '0',
  `phone` bigint(20) NOT NULL,
  `code` int(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `tbl_comment`
--

CREATE TABLE IF NOT EXISTS `tbl_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) NOT NULL,
  `create_time` int(11) DEFAULT NULL,
  `author` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `url` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `post_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_comment_post` (`post_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `tbl_comment`
--

INSERT INTO `tbl_comment` (`id`, `content`, `status`, `create_time`, `author`, `email`, `url`, `post_id`) VALUES
(1, 'This is a test comment.', 2, 1230952187, 'Tester', 'tester@example.com', NULL, 2),
(2, 'qwrqwr', 1, 1458480989, 'йцк', 'qwrqwr@mail.ru', '', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `tbl_comments`
--

CREATE TABLE IF NOT EXISTS `tbl_comments` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) DEFAULT NULL,
  `service_id` int(10) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `date_create` datetime NOT NULL,
  `last_update` int(15) NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_tbl_comments_tbl_user` (`user_id`),
  KEY `FK_tbl_comments_tbl_services` (`service_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=89 ;

--
-- Дамп данных таблицы `tbl_comments`
--

INSERT INTO `tbl_comments` (`id`, `user_id`, `service_id`, `first_name`, `email`, `date_create`, `last_update`, `text`) VALUES
(1, NULL, 5, 'Евгений', 'DemolisH99@yandex.ru', '0000-00-00 00:00:00', 0, 'Проверяю, тестовый комментарий'),
(2, NULL, 4, 'Рома', 'Dreamkiller@mail.ru', '0000-00-00 00:00:00', 0, 'Тестовый\nкомментарий\nпишу\nи \nпроверяю'),
(3, 7, 5, NULL, NULL, '0000-00-00 00:00:00', 0, 'Второй комментарий'),
(4, 8, 5, NULL, NULL, '0000-00-00 00:00:00', 0, 'Вход работает нормально'),
(15, 8, 5, NULL, NULL, '0000-00-00 00:00:00', 0, 'Проверка даты'),
(16, 8, 5, NULL, NULL, '0000-00-00 00:00:00', 0, 'проверка даты 2'),
(17, 8, 6, NULL, NULL, '0000-00-00 00:00:00', 0, 'Первый комментарий'),
(18, 8, 6, NULL, NULL, '0000-00-00 00:00:00', 0, 'Второй комментарий'),
(20, 8, 6, NULL, NULL, '0000-00-00 00:00:00', 0, 'Создана анимация появления этого окна'),
(21, 7, 4, NULL, NULL, '0000-00-00 00:00:00', 0, 'Что то мало полезного написано Рома'),
(22, NULL, 4, 'Анастасия', 'Asya28111955@yandex.ru', '0000-00-00 00:00:00', 0, 'я бабайка'),
(23, NULL, 6, 'qqwe', 'qweqwe@wqe.ru', '0000-00-00 00:00:00', 0, 'qweqwe\nqwe'),
(24, 7, 5, NULL, NULL, '0000-00-00 00:00:00', 0, 'Да что ты говоришь'),
(25, 49, 11, NULL, NULL, '0000-00-00 00:00:00', 0, 'Первый'),
(26, 49, 11, NULL, NULL, '0000-00-00 00:00:00', 0, 'Кто там\nЯ'),
(27, 7, 12, NULL, NULL, '0000-00-00 00:00:00', 0, 'Оставлю ка я первый комментарий'),
(28, 57, 5, NULL, NULL, '0000-00-00 00:00:00', 0, 'Хорошо сделали свою работу'),
(29, NULL, 12, 'Вова', 'DemolisH99@yandex.ru', '0000-00-00 00:00:00', 0, 'Попробую'),
(30, 7, 5, NULL, NULL, '0000-00-00 00:00:00', 0, 'Простой комментарий\nцу '),
(32, NULL, 4, 'jygj', 'gyug', '0000-00-00 00:00:00', 0, 'hggjy'),
(33, 7, 6, NULL, NULL, '0000-00-00 00:00:00', 0, 'qwe'),
(34, 7, 6, NULL, NULL, '0000-00-00 00:00:00', 0, 'eeeeeeeeeeeeeee\nrrrrrrrr'),
(35, 51, 13, NULL, NULL, '0000-00-00 00:00:00', 0, 'weqwrqr'),
(58, 7, 4, '', '', '2016-03-05 17:47:22', 0, 'test of id'),
(59, 7, 15, '', '', '2016-03-05 19:53:47', 0, 'Тестовый комментарий'),
(60, 7, 16, '', '', '2016-03-05 19:56:35', 0, 'Тест'),
(61, 83, 1, '', '', '2016-11-05 21:58:19', 0, 'Тест'),
(62, 7, 1, '', '', '0000-00-00 00:00:00', 0, 'цу'),
(63, 63, 1, '', '', '2016-09-06 15:29:36', 0, 'Тест'),
(64, 63, 3, '', '', '2016-09-06 15:30:53', 0, 'Комментарий'),
(65, NULL, 2, 'qeqwe', 'qwe@mal.ru', '2016-09-06 15:35:48', 0, 'weqe'),
(66, NULL, 2, 'qwe', 'wqweq@rambler.ru', '2016-09-06 15:36:29', 0, 'qweqwe'),
(67, NULL, 9, 'йцуйцк', 'weqwwww@mail.ru', '2016-09-06 15:39:31', 0, 'Тест 123\n456'),
(68, 7, 1, '', '', '2016-09-06 15:47:17', 0, 'Тест 2 \nя мастер'),
(69, 7, 1, '', '', '2016-09-06 15:53:10', 0, 'Порверка'),
(70, NULL, 1, 'qwe', 'qweqerqr@mail.ru', '2016-09-06 16:02:33', 0, 'weqwe'),
(86, 1, 10, '', '', '0000-00-00 00:00:00', 0, 'qwe'),
(87, 1, 8, '', '', '0000-00-00 00:00:00', 0, 'testishe'),
(88, NULL, 2, 'wwww', 'eqwe@mail.ru', '0000-00-00 00:00:00', 0, 'qwe');

-- --------------------------------------------------------

--
-- Структура таблицы `tbl_img_advt`
--

CREATE TABLE IF NOT EXISTS `tbl_img_advt` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `advt_id` int(11) NOT NULL,
  `url` text NOT NULL,
  `simple_url` varchar(300) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_tbl_img_advt_tbl_advt` (`advt_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Дамп данных таблицы `tbl_img_advt`
--

INSERT INTO `tbl_img_advt` (`id`, `advt_id`, `url`, `simple_url`) VALUES
(3, 26, '/assets/d2d71e36/83/IMG_572bb1024978e.jpeg', '/assets/d2d71e36/83/prev/IMG_572bb1024978e.jpeg'),
(5, 28, '/assets/444c0563/83/IMG_5738bdd0029e5.jpeg', '/assets/444c0563/83/prev/IMG_5738bdd0029e5.jpeg'),
(6, 29, '/assets/444c0563/87/IMG_57421e762ed14.jpeg', '/assets/444c0563/87/prev/IMG_57421e762ed14.jpeg');

-- --------------------------------------------------------

--
-- Структура таблицы `tbl_img_services`
--

CREATE TABLE IF NOT EXISTS `tbl_img_services` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_service` int(5) NOT NULL,
  `url` varchar(100) NOT NULL,
  `simple_url` text NOT NULL,
  `description` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_tbl_img_services_tbl_services` (`id_service`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=49 ;

--
-- Дамп данных таблицы `tbl_img_services`
--

INSERT INTO `tbl_img_services` (`id`, `id_service`, `url`, `simple_url`, `description`) VALUES
(1, 1, '/assets/112110ed/7/IMG_572d0123bee26.jpeg', '/assets/112110ed/7/prev/IMG_572d0123bee26.jpeg', '1'),
(2, 1, '/assets/112110ed/7/IMG_572d0123d7cca.jpeg', '/assets/112110ed/7/prev/IMG_572d0123d7cca.jpeg', 'Евро-зал'),
(3, 1, '/assets/112110ed/7/IMG_572d0123e648c.jpeg', '/assets/112110ed/7/prev/IMG_572d0123e648c.jpeg', '3'),
(4, 1, '/assets/112110ed/7/IMG_572d0123ecab2.jpeg', '/assets/112110ed/7/prev/IMG_572d0123ecab2.jpeg', 'Балкон'),
(9, 2, '/assets/8cf4579e/8/IMG_573e34bf55a6f.jpeg', '/assets/8cf4579e/8/prev/IMG_573e34bf55a6f.jpeg', NULL),
(10, 2, '/assets/8cf4579e/8/IMG_573e34bf65bd5.jpeg', '/assets/8cf4579e/8/prev/IMG_573e34bf65bd5.jpeg', NULL),
(11, 2, '/assets/8cf4579e/8/IMG_573e34bf82277.jpeg', '/assets/8cf4579e/8/prev/IMG_573e34bf82277.jpeg', NULL),
(12, 2, '/assets/8cf4579e/8/IMG_573e34bf8937c.jpeg', '/assets/8cf4579e/8/prev/IMG_573e34bf8937c.jpeg', NULL),
(13, 2, '/assets/8cf4579e/8/IMG_573e34bf92dc5.jpeg', '/assets/8cf4579e/8/prev/IMG_573e34bf92dc5.jpeg', NULL),
(14, 3, '/assets/8cf4579e/48/IMG_574065a8b5af2.jpeg', '/assets/8cf4579e/48/prev/IMG_574065a8b5af2.jpeg', NULL),
(15, 3, '/assets/8cf4579e/48/IMG_574065a8bf0e0.jpeg', '/assets/8cf4579e/48/prev/IMG_574065a8bf0e0.jpeg', NULL),
(16, 3, '/assets/8cf4579e/48/IMG_574065a8c9c25.jpeg', '/assets/8cf4579e/48/prev/IMG_574065a8c9c25.jpeg', NULL),
(17, 3, '/assets/8cf4579e/48/IMG_574065a8d5f14.jpeg', '/assets/8cf4579e/48/prev/IMG_574065a8d5f14.jpeg', NULL),
(18, 3, '/assets/8cf4579e/48/IMG_574065a8db3c5.jpeg', '/assets/8cf4579e/48/prev/IMG_574065a8db3c5.jpeg', NULL),
(19, 6, '/assets/8cf4579e/49/IMG_57406705a97e8.jpeg', '/assets/8cf4579e/49/prev/IMG_57406705a97e8.jpeg', NULL),
(20, 6, '/assets/8cf4579e/49/IMG_57406705b8eec.jpeg', '/assets/8cf4579e/49/prev/IMG_57406705b8eec.jpeg', NULL),
(21, 6, '/assets/8cf4579e/49/IMG_57406705c4a47.jpeg', '/assets/8cf4579e/49/prev/IMG_57406705c4a47.jpeg', NULL),
(22, 6, '/assets/8cf4579e/49/IMG_57406705d346d.jpeg', '/assets/8cf4579e/49/prev/IMG_57406705d346d.jpeg', NULL),
(23, 6, '/assets/8cf4579e/49/IMG_57406705e4d6a.jpeg', '/assets/8cf4579e/49/prev/IMG_57406705e4d6a.jpeg', NULL),
(24, 7, '/assets/8cf4579e/56/IMG_574067ebd7aff.jpeg', '/assets/8cf4579e/56/prev/IMG_574067ebd7aff.jpeg', NULL),
(25, 7, '/assets/8cf4579e/56/IMG_574067ebe6be9.jpeg', '/assets/8cf4579e/56/prev/IMG_574067ebe6be9.jpeg', NULL),
(26, 7, '/assets/8cf4579e/56/IMG_574067ebec8fc.jpeg', '/assets/8cf4579e/56/prev/IMG_574067ebec8fc.jpeg', NULL),
(27, 7, '/assets/8cf4579e/56/IMG_574067ec03182.jpeg', '/assets/8cf4579e/56/prev/IMG_574067ec03182.jpeg', NULL),
(28, 7, '/assets/8cf4579e/56/IMG_574067ec0a28b.jpeg', '/assets/8cf4579e/56/prev/IMG_574067ec0a28b.jpeg', NULL),
(29, 8, '/assets/8cf4579e/59/IMG_5741de86562c3.jpeg', '/assets/8cf4579e/59/prev/IMG_5741de86562c3.jpeg', NULL),
(30, 8, '/assets/8cf4579e/59/IMG_5741de865cdf6.jpeg', '/assets/8cf4579e/59/prev/IMG_5741de865cdf6.jpeg', NULL),
(31, 8, '/assets/8cf4579e/59/IMG_5741de866a30a.jpeg', '/assets/8cf4579e/59/prev/IMG_5741de866a30a.jpeg', NULL),
(32, 8, '/assets/8cf4579e/59/IMG_5741de8673d7d.jpeg', '/assets/8cf4579e/59/prev/IMG_5741de8673d7d.jpeg', NULL),
(33, 8, '/assets/8cf4579e/59/IMG_5741de8688197.jpeg', '/assets/8cf4579e/59/prev/IMG_5741de8688197.jpeg', NULL),
(34, 9, '/assets/8cf4579e/62/IMG_5741df04b0781.jpeg', '/assets/8cf4579e/62/prev/IMG_5741df04b0781.jpeg', NULL),
(35, 9, '/assets/8cf4579e/62/IMG_5741df04b5d6b.jpeg', '/assets/8cf4579e/62/prev/IMG_5741df04b5d6b.jpeg', NULL),
(36, 9, '/assets/8cf4579e/62/IMG_5741df04dea06.jpeg', '/assets/8cf4579e/62/prev/IMG_5741df04dea06.jpeg', NULL),
(37, 9, '/assets/8cf4579e/62/IMG_5741df04ecf58.jpeg', '/assets/8cf4579e/62/prev/IMG_5741df04ecf58.jpeg', NULL),
(38, 9, '/assets/8cf4579e/62/IMG_5741df04f3adf.jpeg', '/assets/8cf4579e/62/prev/IMG_5741df04f3adf.jpeg', NULL),
(39, 5, '/assets/8cf4579e/63/IMG_5741df87b7be5.jpeg', '/assets/8cf4579e/63/prev/IMG_5741df87b7be5.jpeg', NULL),
(40, 5, '/assets/8cf4579e/63/IMG_5741df87c3161.jpeg', '/assets/8cf4579e/63/prev/IMG_5741df87c3161.jpeg', NULL),
(41, 5, '/assets/8cf4579e/63/IMG_5741df87cf9a0.jpeg', '/assets/8cf4579e/63/prev/IMG_5741df87cf9a0.jpeg', NULL),
(42, 5, '/assets/8cf4579e/63/IMG_5741df87d856a.jpeg', '/assets/8cf4579e/63/prev/IMG_5741df87d856a.jpeg', NULL),
(43, 5, '/assets/8cf4579e/63/IMG_5741df87e52c6.jpeg', '/assets/8cf4579e/63/prev/IMG_5741df87e52c6.jpeg', NULL),
(44, 10, '/assets/8cf4579e/65/IMG_5741e00e08348.jpeg', '/assets/8cf4579e/65/prev/IMG_5741e00e08348.jpeg', NULL),
(45, 10, '/assets/8cf4579e/65/IMG_5741e00e16012.jpeg', '/assets/8cf4579e/65/prev/IMG_5741e00e16012.jpeg', NULL),
(46, 10, '/assets/8cf4579e/65/IMG_5741e00e24ae9.jpeg', '/assets/8cf4579e/65/prev/IMG_5741e00e24ae9.jpeg', NULL),
(47, 10, '/assets/8cf4579e/65/IMG_5741e00e2d545.jpeg', '/assets/8cf4579e/65/prev/IMG_5741e00e2d545.jpeg', NULL),
(48, 10, '/assets/8cf4579e/65/IMG_5741e00e4b540.jpeg', '/assets/8cf4579e/65/prev/IMG_5741e00e4b540.jpeg', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `tbl_lookup`
--

CREATE TABLE IF NOT EXISTS `tbl_lookup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `code` int(11) NOT NULL,
  `type` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `position` int(11) NOT NULL,
  `price` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=18 ;

--
-- Дамп данных таблицы `tbl_lookup`
--

INSERT INTO `tbl_lookup` (`id`, `name`, `code`, `type`, `position`, `price`) VALUES
(1, 'Черновик', 1, 'PostStatus', 1, 0),
(2, 'Опубликован', 2, 'PostStatus', 2, 0),
(3, 'Архив', 3, 'PostStatus', 3, 0),
(4, 'Pending Approval', 1, 'CommentStatus', 1, 0),
(5, 'Approved', 2, 'CommentStatus', 2, 0),
(6, 'Не активно', 0, 'serviceStatus', 1, 0),
(7, 'Активно', 1, 'serviceStatus', 2, 0),
(8, 'Оплата резюме', 1, 'request_code', 1, 250),
(9, 'Продление резюме', 2, 'request_code', 2, 250),
(10, 'Оплата доступа к базе', 3, 'request_code', 3, 50),
(11, 'Продление доступа к базе', 4, 'request_code', 4, 50),
(12, 'Оплата SMS оповещения', 5, 'request_code', 6, 30),
(13, 'Продление SMS оповещения', 6, 'request_code', 6, 30),
(14, 'Оплата кол-ва картинок', 7, 'request_code', 7, 100),
(15, 'Продление кол-ва картинок', 8, 'request_code', 8, 100),
(16, 'Активация рекламного блока', 9, 'request_code', 9, 800),
(17, 'Продление рекламного блока', 10, 'request_code', 10, 800);

-- --------------------------------------------------------

--
-- Структура таблицы `tbl_orders`
--

CREATE TABLE IF NOT EXISTS `tbl_orders` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int(10) NOT NULL,
  `text` text NOT NULL,
  `date_create` datetime NOT NULL,
  `date_start` date NOT NULL,
  `date_complition` date NOT NULL,
  `date_end` date NOT NULL,
  `status` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_tbl_orders_tbl_user` (`id_user`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=24 ;

--
-- Дамп данных таблицы `tbl_orders`
--

INSERT INTO `tbl_orders` (`id`, `id_user`, `text`, `date_create`, `date_start`, `date_complition`, `date_end`, `status`) VALUES
(1, 41, 'Ремонт однокомнатной квартиры 41 м2. Необходимо произвести комплексный ремонт. Задача стоит сделать качественный ремонт за разумные деньги. Хочу сотрудничать с частной бригадой, которая имеет опыт и знание технологии.', '2016-04-16 23:02:24', '0000-00-00', '2016-05-27', '0000-00-00', 1),
(2, 42, 'Необходимо выполнить ремонт в новостройке. Квартира 78 м2. Есть проект. Готов рассматривать предолжения.', '2016-04-17 00:13:01', '0000-00-00', '2016-05-22', '0000-00-00', 1),
(3, 42, 'Выправить стены поклеить обои, залить полы и уложить ламинат и плитку (коридор), санузел, кухня. По месту обсудим. Важно исполнить ремонт к школе! Сравню цены!', '2016-04-17 00:08:13', '0000-00-00', '2016-04-28', '0000-00-00', 0),
(4, 43, 'Новостройка 55 кв.м. Нужна бригада строителей,ремонт под эконом класс.Перегородок тоже нет. Звоните по тел.89651273107 Елена. Но предварительно высылайте смету по эл. почте el30802.2011@mail.ru Сроки 2 месяца.', '2016-04-17 00:17:35', '2016-04-27', '2016-06-23', '0000-00-00', 1),
(5, 44, 'Здравствуйте! требуется ремонт в студии 23 кв. м. в Моск.обл, Солнечногорский район, д.Голубое\r\n1) Балкон 5м2: на полы положить плитку, плинтуса, стену покрасить, вывести свет и розетку.\r\n2) Комната 23м2: электрика (штробы готовы, стены ровные), грунтовка, штукатурка. Укладка ламината, окраска потолка, плинтуса на пол, обои на стены, поставить перегородку из блоков для санузла.\r\n4) Санузел 3-3,5м2 совмещенный: установить сантехнику, пол и стены - плитка, потолок покрасить или подвесной, вывод розетки. Бюджет 100 тыс.руб.', '2016-04-17 00:18:27', '0000-00-00', '1970-01-01', '0000-00-00', 1),
(6, 45, 'Нужен комплексный ремонт двухкомнатной квартиры в новостройке под ключ. Сколько это будет стоить?\r\nКвартира 92 м2.', '2016-04-17 00:20:08', '0000-00-00', '2016-04-30', '0000-00-00', 1),
(7, 46, 'Требуется капитальный ремонт квартиры-студии\r\nНеобходимые работы:\r\n- стяжка пола\r\n- штукатурка стен (по маякам)\r\n- шпаклевка, покраска стен\r\n- полы - плитка (кухня, коридор), ламинат (комната)\r\n- Разводка сантехники и электрики \r\nПросьба сразу не звонить!\r\nПодробный перечень работ, объемы и планы в дизайн проекте. \r\nПишите на почту vlad-k-2017@bk.ru отправлю проект и жду от бригад предложения по цене.\r\nНа фото состояние квартиры в данный момент', '2016-04-17 00:20:46', '2016-04-27', '2016-07-13', '0000-00-00', 1),
(8, 47, 'Здравствуйте, требуется ремонт в 1к квартире. С нуля. Предложения присылайте на почту (kostochka1982@list.ru). Указывайте пожалуйста приблизительные цены на работы за каждый пункт:\r\n\r\n1) Полная электроразводка квартиры (штробовка, подрозетники, разводка кабеля, монтаж электрощитка, розетки/выключатели) \r\n\r\n2) стяжка, возведение стен, штукатурка, шпатлевка, оклейка обоями\r\n\r\n3) Балкон 3,67 кв м: утепление, теплый пол, плитка, сделать плинтуса, отделка стен, вывести свет и розетку.\r\n\r\n4) Ламинат + плинтус \r\n\r\n5) Санузел 4,41 - Санразводка, укладка плитки в санузле, установка унитаза с инсталляцией, стиралки, мойки, ванной , установка скрытого люка\r\n\r\n6) Натяжные потолки глянец\r\n\r\n7) кухня - фартук, сантехника', '2016-04-17 00:21:26', '2016-05-25', '2016-09-19', '0000-00-00', 1),
(9, 50, 'ремонт 2-комнатной квартиры у м Перово', '2016-04-22 23:33:46', '0000-00-00', '2016-06-14', '0000-00-00', 1),
(10, 50, 'Капремонт ванной и туалета с переделкой стен под плитку.Электрика по всей квартире.Переделка сантехники.Укладка нового пола.Квартира 2-комнатная 38м2', '2016-04-22 23:33:43', '0000-00-00', '2016-04-20', '0000-00-00', 0),
(11, 50, 'Описание заказа:\nВ Коммунарке требуется: \n1. демонтировать оконный блок (выделено СИНИМ);\n2. снести стенку, на которой стоит окно, где висит батарея (выделено КРАСНЫМ);\n3. выдолбить, сравнять с полом порожек балконный.\n\nСтена не несущая, вроде пеноблочная, ногтем крошится.\n\nИнтересует:\n1. цена (КТО ПРЕДЛОЖИТ ДЕШЕВЛЕ)?\n2. время возможное для демонтажа? \n3. сроки выполнения работ?\n\nТребования:\n1. СВОЙ инструмент;\n2. убрать после себя мусор, подмести. Иметь с собой мешки под мусор;\n3. аккуратность выполнения работы.', '2016-04-22 23:33:49', '0000-00-00', '2016-04-29', '0000-00-00', 1),
(12, 51, 'Косметический ремонт комнаты 12 кв.м . Покраска потолка , поклейка обоев , замена линолеума на новый линолиум , замена плинтусов. Ремонт нужно начать 16-17 апреля.', '2016-04-17 01:17:39', '0000-00-00', '2016-05-11', '0000-00-00', 0),
(13, 53, 'Добрый день! Объем работы 1 квадратный метр. Суть работы в следующем. Есть встроенный советский шкаф, его габариты: 100 см длина, 60 см ширина и рядом с ним антресоль (это коридор). Я буду самостоятельно осуществлять демонтаж этих объектов, после чего нужно будет:\r\n\r\n1. Выровнять пол и положить 6 плиток в уровень с другой плиткой\r\n\r\n2. Отштукарить стену и поклеить обои\r\n\r\n3. Отштукатурить потолок и покрасить его в цвет с другой частью потолка\r\n\r\n4. Поставить распредилительную коробку, куда спрятать провода, которые идут над дверью в квартиру\r\n\r\n5. Поставить плинтуса', '2016-04-17 00:49:55', '0000-00-00', '1970-01-01', '0000-00-00', 1),
(14, 53, 'требуется сделать ремнот в комнате 12 кв м (снять старые полы укреаить лаги заштукатурить и выровнять стеныбнаклеить обои)', '2016-04-17 00:50:05', '0000-00-00', '2016-05-27', '0000-00-00', 1),
(15, 53, 'капитальный ремонт квартиры . полностью электрика , сантехника , стены ,пол и потолок!', '2016-04-17 00:50:12', '0000-00-00', '1970-01-01', '0000-00-00', 1),
(16, 51, 'Требуется провести косметический ремонт в гостиничном комплексе 700м2 по полу.\n\nСтены отштукатурены, на полах сделана черновая стяжка, проложена черновая электрика и сантехника. Необходимо прошпаклевать стены, поклеить обои, залить наливной пол, положить ламинат, ковролин, плитку в санузлах, установить двери, подоконники,умывальники, душевые кабины, розетки, выключатели, осветительные приборы. \nСтоимость за квадрат работы 1500р тел. 89295586216', '2016-04-17 02:03:54', '0000-00-00', '2016-08-24', '0000-00-00', 1),
(17, 51, 'Создает поле для ввода нескольких строк текста. Обычно содержит текст инициализации, который при загрузке документа изначально будет записываться в данное поле. Элемент TEXTAREA должен располагаться внутри элемента FORM.', '2016-04-17 02:03:36', '0000-00-00', '1970-01-01', '0000-00-00', 0),
(18, 61, 'It&#039;s important to remember that this function does NOT replace newlines with &lt;br&gt; tags. Rather, it inserts a &lt;br&gt; tag before each newline, but it still preserves the newlines themselves! This caused problems for me regarding a function I was writing -- I forgot the newlines were still being preserved.\nПеревод не прилагается', '2016-04-17 02:54:49', '0000-00-00', '2016-04-30', '0000-00-00', 1),
(20, 64, 'Нужно покрасить потолок 19 кв.м.\nЦена  т.к.\nСроки 3333-  - - 3 33333', '2016-04-18 23:39:21', '2016-04-29', '0000-00-00', '0000-00-00', 1),
(21, 64, 'Тестовая заявка на ремонт', '2016-04-18 23:01:58', '0000-00-00', '2016-05-18', '0000-00-00', 1),
(22, 84, 'Проверка после редактирование формы', '2016-05-08 00:47:14', '0000-00-00', '0000-00-00', '0000-00-00', 1),
(23, 94, 'Ремонт кухни сталинка, 3 квадратных метра\r\nШтукатрука, обои, полы, потолок, окно', '2016-05-23 01:13:38', '0000-00-00', '0000-00-00', '0000-00-00', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `tbl_post`
--

CREATE TABLE IF NOT EXISTS `tbl_post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `tags` text COLLATE utf8_unicode_ci,
  `status` int(11) NOT NULL,
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  `author_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_post_author` (`author_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `tbl_post`
--

INSERT INTO `tbl_post` (`id`, `title`, `content`, `tags`, `status`, `create_time`, `update_time`, `author_id`) VALUES
(1, 'Welcome!', 'This blog system is developed using Yii. It is meant to demonstrate how to use Yii to build a complete real-world application. Complete source code may be found in the Yii releases.\r\n\r\nFeel free to try this system by writing new posts and posting comments.', 'yii, blog', 2, 1230952187, 1230952187, 1),
(2, 'A Test Post', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'test', 2, 1230952187, 1230952187, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `tbl_request`
--

CREATE TABLE IF NOT EXISTS `tbl_request` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date_create` bigint(20) DEFAULT '0',
  `name` varchar(300) DEFAULT NULL,
  `type` int(3) NOT NULL,
  `time` bigint(20) NOT NULL,
  `summ` int(6) NOT NULL,
  `id_user` int(5) DEFAULT NULL,
  `id_service` int(5) DEFAULT NULL,
  `id_advt` int(5) DEFAULT NULL,
  `negative` int(1) DEFAULT '0',
  `description_n` text,
  `positive` int(11) NOT NULL DEFAULT '0',
  `date_processing` bigint(20) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_tbl_request_tbl_user` (`id_user`),
  KEY `FK_tbl_request_tbl_services` (`id_service`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=58 ;

--
-- Дамп данных таблицы `tbl_request`
--

INSERT INTO `tbl_request` (`id`, `date_create`, `name`, `type`, `time`, `summ`, `id_user`, `id_service`, `id_advt`, `negative`, `description_n`, `positive`, `date_processing`) VALUES
(1, 0, NULL, 1, 10368000, 1000, 7, 4, NULL, 1, 'Ошибочная цена', 0, 1460477687),
(4, 1460478888, NULL, 1, 2592000, 250, 7, 4, NULL, 0, NULL, 1, 1460479034),
(5, 1460479147, NULL, 2, 5184000, 500, 7, 4, NULL, 0, NULL, 1, 1460479174),
(6, 1460479563, NULL, 7, 5184000, 200, 7, 4, NULL, 1, 'Пользователь отказался', 0, 1460525805),
(7, 1460480453, NULL, 1, 5184000, 500, 8, 5, NULL, 0, NULL, 1, 1460480492),
(8, 1460565525, NULL, 1, 7776000, 750, 48, 6, NULL, 0, NULL, 1, 1460565689),
(9, 1460566324, NULL, 3, 7776000, 150, 48, 6, NULL, 0, NULL, 1, 1460566441),
(10, 1460567695, NULL, 5, 2592000, 30, 7, 4, NULL, 1, 'Услуга еще не работает', 0, 1463833493),
(11, 1460571110, NULL, 7, 2592000, 100, 7, 4, NULL, 1, 'Не работает', 0, 1460572504),
(12, 1460572528, NULL, 7, 7776000, 300, 7, 4, NULL, 0, NULL, 1, 1460572608),
(13, 1460573925, NULL, 1, 7776000, 750, 59, 13, NULL, 0, NULL, 1, 1460574044),
(14, 1460574155, NULL, 3, 5184000, 100, 59, 13, NULL, 0, NULL, 1, 1460574224),
(15, 1460574168, NULL, 7, 10368000, 400, 59, 13, NULL, 0, NULL, 1, 1460574231),
(16, 1460575144, NULL, 1, 7776000, 750, 49, 11, NULL, 0, NULL, 1, 1460575211),
(17, 1460575153, NULL, 3, 10368000, 200, 49, 11, NULL, 0, NULL, 1, 1460575219),
(18, 1460575162, NULL, 7, 15552000, 600, 49, 11, NULL, 0, NULL, 1, 1460575225),
(19, 1460579768, NULL, 3, 2592000, 50, 7, 4, NULL, 0, NULL, 1, 1460669802),
(20, 1460855451, NULL, 1, 2592000, 250, 56, 12, NULL, 0, NULL, 1, 1460856735),
(21, 1460856678, NULL, 1, 2592000, 250, 63, 15, NULL, 0, NULL, 1, 1460856740),
(22, 1460856715, NULL, 1, 7776000, 750, 62, 14, NULL, 0, NULL, 1, 1460856744),
(23, 1462111470, NULL, 1, 2592000, 250, 82, 16, NULL, 0, NULL, 1, 1462111987),
(24, 1462112112, NULL, 7, 7776000, 300, 82, 16, NULL, 0, NULL, 1, 1462112145),
(25, 1462132120, NULL, 4, 10368000, 200, 7, 4, NULL, 0, NULL, 1, 1463079508),
(26, 1462280498, NULL, 2, 18144000, 1750, 7, 4, NULL, 1, 'Удалено', 0, 1462567604),
(27, 1462567409, NULL, 1, 2592000, 250, 7, 1, NULL, 0, NULL, 1, 1462567615),
(28, 1462901428, NULL, 7, 12960000, 500, 7, 1, NULL, 0, NULL, 1, 1463086592),
(29, 1463002710, NULL, 9, 2592000, 800, 83, NULL, 25, 1, 'Ntcn', 0, 1463003754),
(30, 1463003825, NULL, 9, 7776000, 2400, 83, NULL, 25, 0, NULL, 1, 1463005923),
(31, 1463005975, NULL, 9, 5184000, 1600, 83, NULL, 26, 0, NULL, 1, 1463006085),
(32, 1463078802, NULL, 10, 7776000, 2400, 83, NULL, 26, 1, 'Ошибка активации, реклама не активна', 0, 1463079495),
(33, 1463079661, NULL, 9, 2592000, 800, 83, NULL, 26, 0, NULL, 1, 1463079783),
(34, 1463080596, NULL, 10, 5184000, 1600, 83, NULL, 26, 0, NULL, 1, 1463080630),
(35, 1463084758, NULL, 4, 2592000, 50, 7, 1, NULL, 0, NULL, 1, 1463086585),
(36, 1463086407, NULL, 9, 7776000, 2400, 83, NULL, 25, 0, NULL, 1, 1463086478),
(37, 1463336588, NULL, 9, 5184000, 1600, 83, NULL, 28, 0, NULL, 1, 1463336621),
(38, 1463343922, NULL, 9, 7776000, 2400, 83, NULL, 26, 0, NULL, 1, 1463344572),
(39, 1463577884, NULL, 10, 7776000, 2400, 83, NULL, 26, 0, NULL, 1, 1463695484),
(40, 1463674633, NULL, 2, 15552000, 1500, 7, 0, NULL, 1, 'Резюме еще не активированно', 0, 1463831405),
(41, 1463695072, NULL, 1, 5184000, 500, 8, 1, NULL, 1, 'Резюме уже активированно', 0, 1463831420),
(42, 1463695439, NULL, 1, 2592000, 250, 48, 1, NULL, 1, 'Резюме уже активированно', 0, 1463831465),
(43, 1463830985, NULL, 3, 2592000, 50, 7, 1, NULL, 0, NULL, 1, 1463832952),
(44, 1463833193, NULL, 4, 7776000, 150, 7, 1, NULL, 0, NULL, 1, 1463833854),
(46, 1463837224, NULL, 1, 7776000, 750, 8, 1, NULL, 0, NULL, 1, 1463837387),
(47, 1463837735, NULL, 2, 5184000, 500, 8, 0, NULL, 0, NULL, 1, 1463837894),
(48, 1463838149, NULL, 1, 15552000, 1500, 48, 1, NULL, 0, NULL, 1, 1463838368),
(49, 1463838519, NULL, 1, 5184000, 500, 49, 1, NULL, 0, NULL, 1, 1463838548),
(50, 1463838723, NULL, 1, 2592000, 250, 56, 1, NULL, 0, NULL, 1, 1463838779),
(51, 1463838864, NULL, 7, 2592000, 100, 49, 1, NULL, 1, 'Отказался пользователь', 0, 1463934433),
(52, 1463934348, NULL, 7, 18144000, 700, 8, 1, NULL, 0, NULL, 1, 1463934439),
(53, 1463934630, NULL, 1, 10368000, 1000, 59, 1, NULL, 0, NULL, 1, 1463935078),
(54, 1463934751, NULL, 1, 2592000, 250, 62, 1, NULL, 0, NULL, 1, 1463935084),
(55, 1463934873, NULL, 1, 23328000, 2250, 63, 1, NULL, 0, NULL, 1, 1463935093),
(56, 1463935032, NULL, 1, 12960000, 1250, 65, 1, NULL, 0, NULL, 1, 1463935089),
(57, 1463951223, NULL, 9, 5184000, 1600, 87, NULL, 29, 0, NULL, 1, 1463951270);

-- --------------------------------------------------------

--
-- Структура таблицы `tbl_services`
--

CREATE TABLE IF NOT EXISTS `tbl_services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(5) NOT NULL,
  `note` varchar(300) NOT NULL,
  `description` text NOT NULL,
  `date_create` date NOT NULL,
  `last_update` date NOT NULL,
  `status` int(2) NOT NULL DEFAULT '0',
  `views` int(4) DEFAULT '0',
  `img_limit` int(2) NOT NULL DEFAULT '5',
  `img_time_end` date NOT NULL,
  `end_time` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_tbl_services_tbl_user` (`id_user`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Дамп данных таблицы `tbl_services`
--

INSERT INTO `tbl_services` (`id`, `id_user`, `note`, `description`, `date_create`, `last_update`, `status`, `views`, `img_limit`, `img_time_end`, `end_time`) VALUES
(1, 7, 'Электрик, наружное освещение, бытовая техника.', 'Являюсь электромонтажником с допуском до 1000 В.\nУстраняю неисправности, меняю проводки, устанавливаю люстры, бра, светильники, светодиодные линии и т.д. Замена трансформаторов, сборка электрощитов, установка датчиков движения, розеток, выключателей и многое другое. Делал художественные работы по электрике в художественной галерее в центре столицы, устанавливаю генераторы и стабилизаторы. Консультация.', '2016-05-06', '2016-05-20', 1, 76, 10, '0000-00-00', '2016-05-31'),
(2, 8, 'Ремонт и отделка квартир - молдаване', 'Бригада профессиональных строителей - молдаван выполнит работы по ремонту и отделке квартир недорого, качественно и в срок. Под ключ и отдельные виды работ. Мы работаем в Москве 12 лет. Обратившись к нам Вы сэкономите на посредниках.', '2016-05-20', '2016-05-22', 1, 44, 10, '2016-12-18', '2016-10-18'),
(3, 48, 'Ремонт ванной панелями (пластик)', 'овременный и качественный ремонт ванной комнаты и санузла за 3 дня! \nВыполню качественный ремонт ванной комнаты и санузла ПВХ панелями (пластиком), так же все виды электромонтажных и сантехнических работ.\n\nПодготовлю вашу квартиру под сдачу или сделаю капитальный ремонт.\n\nБлагодаря современным технологиям ПВХ панели стали достаточно плотными и качественными для того что бы их применять в ванных комнатах, не переживая за их повреждение и потерю эстетического вида долгие годы!!!\n\nВы можете получить консультацию по тел...,но все же чтобы узнать точную сумму стоимости ремонта нужно провести замер.\nВыезд на замер бесплатный!!!\nПринимаю звонки с 8-00 по 23-00; 7 дней в неделю.\nДоговор,гарантия на год.\nЗвоните, пишите!!', '2016-05-20', '2016-05-21', 1, 44, 5, '0000-00-00', '2016-11-17'),
(4, 81, 'qwe', 'qwe', '2016-05-20', '2016-05-20', 0, 44, 5, '0000-00-00', '0000-00-00'),
(5, 63, 'Электрик. Электромонтаж под ключ. Качественно', 'Профессиональный электрик, выполню качественно .недорого и в короткие сроки все виды электромонтажных работ. \nЯ электрик,москвич, с большим опытом более 19 лет, имеются подтверждающие документы (допуск, высшее профильное образование,действующее удостоверение,аттестация).\nВыполню следующий перечень работ:\nМонтаж электропроводки в новостройке,в квартире под ключ\nМонтаж электропроводки в доме,коттедже под ключ,\nЗамена электропроводки (полная или частичная)\nДиагностика и ремонт электропроводки,\nСрочный выезд электрика,поиск и устранение неполадок,\nСборка и монтаж электрощита,\nУстановка ,монтаж и замена светильников, люстр, бра,\nМонтаж,замена,перенос розеток, выключателей\nШтробление стен, потолка\nУстановка различных электроприборов,\nСлаботочные работы,\nПусконаладочные работы\nМонтаж контура защитного заземления , и многое другое.\nРаботаю Профессионально и Быстро:\n1-к квартира под ключ (2-3 дня)\n2-к квартира под ключ (3-4 дня)\n3-к квартира под ключ (4-5 дней)\nИспользую только профессиональный инструмент и оборудование,работу выполняю сам, без посредников.\nРуководствуюсь стандартами ПУЭ, ГОСТ. Окажу бесплатную помощь в расчете,закупке и доставке материала на объект.\nРаботы выполняю на совесть! Качественно, быстро и недорого.\nНе беру авансов и предоплаты, оплата по факту выполненной работы.Звоните и интересуйтесь. отвечу на все ваши вопросы.\nРаботы выполняю по всей Москве и области, без выходных с 8.00 до 24.00', '2016-05-20', '2016-05-22', 1, 44, 5, '0000-00-00', '2017-02-16'),
(6, 49, 'Ремонт квартир комнат косметический ремонт', 'Все виды работ. Так же выполняем работы по электрике, сантехнике. Выезд по Москве и московской области.\nВыполняем:\nкосметический ремонт - от 1000р. за м2\nчерновой - от 1500р. за м2\n"под ключ" - от 3500р. за м2\nРаботаем вдвоем с напарником, при необходимости подключаем нужное количество людей.\nРаботы выполняем качественно и в максимально сжатые сроки. Оказываем помощь в выборе и приобретении стройматериалов. Возможна доставка материалов нашими силами. Все условия обсуждаются при встрече.', '2016-05-21', '2016-05-21', 1, 44, 5, '0000-00-00', '2016-07-20'),
(7, 56, 'Ремонт под ключ', 'Отделка помещений, квартир под ключ, ванна под ключ. Услуги сантехника, плотника, электрика .Так же выполним частичный и косметический ремонт.Мастер на час.', '2016-05-21', '2016-05-21', 1, 44, 5, '0000-00-00', '2016-06-20'),
(8, 59, 'Строительство, ремонт под ключ', 'Все виды ремонтно-строительных услуг.\nКатеджи, дачи, квартиры и тп.\nЭлектрика.\nРазводка воды.\nМонтаж, демонтаж любых сложностей.\nМонтаж сантехники и водонагревательных приборов.\nРассматриваем любые виды работ, любой сложности.\nЕсть бригады славянской внешности (украинцы, молдоване).\nКачество работ гарантируем.\nДоговорные обязательства.\nПриемлемые цены.', '2016-05-22', '2016-05-22', 1, 42, 5, '0000-00-00', '2016-09-19'),
(9, 62, 'Ремонт квартир', 'Провожу ремонтные работы квартир, офисов, различных помещений- полностью под ключ или частично . Опыт работы более 12 лет . Россиянин, качество работы, порядочность гарантирую. Цены договорные, ниже рыночных...', '2016-05-22', '2016-05-22', 1, 42, 5, '0000-00-00', '2016-06-21'),
(10, 65, 'Сантехник', 'Частный мастер САНТЕХНИК (русский ) ,помогу с мелким бытовым ремонтом в доме, квартире НЕ ДОРОГО.\n-ЗАМЕНА ВОДОСЧЁТЧИКОВ (в квартирах)\n-УСТАНОВКА ВОДОСЧЕТЧИКОВ (в квартирах)\n- Всевозможные сантехнические работы .\n- Разводка в новых квартирах и новостройках\n-Демонтаж старой разводки и установка новой\n-Укладка труб полипропилен\n-Укладка труб ПВХ канализации\n-Установка гребенок с подключением,кранов от протечек ,счетчиков и фильтров\n- Бесплатный осмотр в день заказа.\n-Работы выполняются по Москве и Московской области в доступности транспортом,а так же все Дмитровское направление до поселка Вербилки.\n- Вопросы по работе и оплате , вы можете задать по телефону. \nЦены договорные.', '2016-05-22', '2016-05-22', 1, 42, 5, '0000-00-00', '2016-10-19');

-- --------------------------------------------------------

--
-- Структура таблицы `tbl_slider`
--

CREATE TABLE IF NOT EXISTS `tbl_slider` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `url` text NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `tbl_slider`
--

INSERT INTO `tbl_slider` (`id`, `url`, `description`) VALUES
(1, '/assets/new/images/slider/slide1.jpg', NULL),
(2, '/assets/new/images/slider/slide2.jpg', NULL),
(3, '/assets/new/images/slider/slide3.jpg', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `tbl_tag`
--

CREATE TABLE IF NOT EXISTS `tbl_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `frequency` int(11) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `tbl_tag`
--

INSERT INTO `tbl_tag` (`id`, `name`, `frequency`) VALUES
(1, 'yii', 1),
(2, 'blog', 1),
(3, 'test', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `tbl_user`
--

CREATE TABLE IF NOT EXISTS `tbl_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_registration` date NOT NULL,
  `first_name` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `second_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `class` int(3) NOT NULL,
  `password` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `email_valid` int(2) NOT NULL DEFAULT '0',
  `phone` bigint(20) NOT NULL,
  `phone_valid` int(2) NOT NULL DEFAULT '0',
  `profile` text COLLATE utf8_unicode_ci,
  `sms_notification` int(1) NOT NULL DEFAULT '0',
  `sms_notification_date` date DEFAULT NULL,
  `phone_read` int(1) NOT NULL DEFAULT '0',
  `phone_read_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_tbl_user_tbl_user_class` (`class`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=95 ;

--
-- Дамп данных таблицы `tbl_user`
--

INSERT INTO `tbl_user` (`id`, `date_registration`, `first_name`, `second_name`, `class`, `password`, `email`, `email_valid`, `phone`, `phone_valid`, `profile`, `sms_notification`, `sms_notification_date`, `phone_read`, `phone_read_date`) VALUES
(1, '2015-11-02', 'Евгений', 'Клюев', 3, '$2y$13$3hfdMBNXX0Bqqyb7MYYTiODnFFUDEibWvF148T2PB1C3WJpm/dbvu', 'webmaster@example.com', 0, 87564235588, 1, NULL, 0, '0000-00-00', 0, '0000-00-00'),
(7, '2016-04-01', 'Евгений', 'Клюев', 0, '$2y$13$3hfdMBNXX0Bqqyb7MYYTiODnFFUDEibWvF148T2PB1C3WJpm/dbvu', 'DemolisH99@yandex.ru', 0, 89207582632, 1, NULL, 0, '0000-00-00', 1, '2016-09-18'),
(8, '2016-03-02', 'Володя', 'Климов', 0, '$2y$13$3hfdMBNXX0Bqqyb7MYYTiODnFFUDEibWvF148T2PB1C3WJpm/dbvu', 'qwer@mail.ru', 0, 82226663355, 1, NULL, 0, '0000-00-00', 0, '0000-00-00'),
(41, '2016-02-22', 'Клюев', 'Евгений', 2, '$2y$13$3hfdMBNXX0Bqqyb7MYYTiODnFFUDEibWvF148T2PB1C3WJpm/dbvu', '', 0, 89207582633, 0, NULL, 0, '0000-00-00', 0, '0000-00-00'),
(42, '2015-12-11', 'Евгений', 'Клюев', 2, '$2y$13$3hfdMBNXX0Bqqyb7MYYTiODnFFUDEibWvF148T2PB1C3WJpm/dbvu', '', 0, 89539999999, 0, NULL, 0, '0000-00-00', 0, '0000-00-00'),
(43, '2016-02-16', 'Hdd', 'Dhh', 2, '$2y$13$3hfdMBNXX0Bqqyb7MYYTiODnFFUDEibWvF148T2PB1C3WJpm/dbvu', '', 0, 89538885566, 0, NULL, 0, '0000-00-00', 0, '0000-00-00'),
(44, '2016-02-04', 'Вадим', 'Дураков', 2, '$2y$13$3hfdMBNXX0Bqqyb7MYYTiODnFFUDEibWvF148T2PB1C3WJpm/dbvu', '', 0, 89532223344, 0, NULL, 0, '0000-00-00', 0, '0000-00-00'),
(45, '2016-01-20', 'Клюев', 'Евгений', 2, '$2y$13$3hfdMBNXX0Bqqyb7MYYTiODnFFUDEibWvF148T2PB1C3WJpm/dbvu', '', 0, 89207582633, 0, NULL, 0, '0000-00-00', 0, '0000-00-00'),
(46, '2016-02-12', 'Клюев', 'Евгений', 2, '$2y$13$3hfdMBNXX0Bqqyb7MYYTiODnFFUDEibWvF148T2PB1C3WJpm/dbvu', '', 0, 89207582644, 0, NULL, 0, '0000-00-00', 0, '0000-00-00'),
(47, '2016-02-22', 'Вася', 'Петров', 2, '$2y$13$3hfdMBNXX0Bqqyb7MYYTiODnFFUDEibWvF148T2PB1C3WJpm/dbvu', '', 0, 89535552233, 0, NULL, 0, '0000-00-00', 0, '0000-00-00'),
(48, '2016-05-03', 'Володя', 'Мастеров', 0, '$2y$13$3hfdMBNXX0Bqqyb7MYYTiODnFFUDEibWvF148T2PB1C3WJpm/dbvu', 'qqq@mail.ru', 0, 85552223366, 1, NULL, 0, '0000-00-00', 0, '0000-00-00'),
(49, '2016-04-13', 'Никита', 'Воронов', 0, '$2y$13$3hfdMBNXX0Bqqyb7MYYTiODnFFUDEibWvF148T2PB1C3WJpm/dbvu', 'DemolisH90@yandex.ru', 0, 89547521685, 1, NULL, 0, '0000-00-00', 0, '0000-00-00'),
(50, '2016-02-28', 'Клюев', 'Евгений', 2, '$2y$13$3hfdMBNXX0Bqqyb7MYYTiODnFFUDEibWvF148T2PB1C3WJpm/dbvu', '', 0, 89995556644, 0, NULL, 0, '0000-00-00', 0, '0000-00-00'),
(51, '2016-01-18', 'Николай', 'Петрович', 2, '$2y$13$3hfdMBNXX0Bqqyb7MYYTiODnFFUDEibWvF148T2PB1C3WJpm/dbvu', '', 0, 89998959525, 0, NULL, 0, '0000-00-00', 0, '0000-00-00'),
(52, '2016-02-12', 'Клюев', 'Евгений', 2, '$2y$13$3hfdMBNXX0Bqqyb7MYYTiODnFFUDEibWvF148T2PB1C3WJpm/dbvu', '', 0, 89207582636, 0, NULL, 0, '0000-00-00', 0, '0000-00-00'),
(53, '2016-01-16', 'Рома', 'Васькин', 2, '$2y$13$3hfdMBNXX0Bqqyb7MYYTiODnFFUDEibWvF148T2PB1C3WJpm/dbvu', '', 0, 89245287425, 0, NULL, 0, '0000-00-00', 0, '0000-00-00'),
(54, '2016-01-21', 'Клюев', 'Евгений', 2, '$2y$13$3hfdMBNXX0Bqqyb7MYYTiODnFFUDEibWvF148T2PB1C3WJpm/dbvu', '', 0, 89999999999, 0, NULL, 0, '0000-00-00', 0, '0000-00-00'),
(56, '2016-04-16', 'Сережа', 'Воронин', 0, '$2y$13$3hfdMBNXX0Bqqyb7MYYTiODnFFUDEibWvF148T2PB1C3WJpm/dbvu', 'qwerty@mail.ru', 0, 89538552348, 1, NULL, 0, '0000-00-00', 0, '0000-00-00'),
(57, '2016-01-19', 'Максим', 'Семенов', 2, '$2y$13$3hfdMBNXX0Bqqyb7MYYTiODnFFUDEibWvF148T2PB1C3WJpm/dbvu', '', 0, 89207582655, 0, NULL, 0, '0000-00-00', 0, '0000-00-00'),
(58, '2016-01-25', 'Максим', 'Попов', 2, '$2y$13$3hfdMBNXX0Bqqyb7MYYTiODnFFUDEibWvF148T2PB1C3WJpm/dbvu', '', 0, 89538423832, 0, NULL, 0, '0000-00-00', 0, '0000-00-00'),
(59, '2016-04-10', 'Имя', 'Фамилия', 0, '$2y$13$XEt7kzOSoUZjtomJzIqoBOcfsTO92zOtHRqWk/Zs43nENgfdfu5sa', 'DemolisH59@yandex.ru', 0, 85555555555, 1, NULL, 0, '0000-00-00', 0, '0000-00-00'),
(60, '2016-01-19', 'Клюев', 'Евгений', 2, '$2y$13$rRdRPY9dGXtF50Cqqc/kiucvusbZxto46YQogLokGKdgSgA.Dqefa', '', 0, 88652354425, 0, NULL, 0, '0000-00-00', 0, '0000-00-00'),
(61, '2015-12-27', 'Владимир', 'Новиков', 2, '$2y$13$uaS0XR4VL3i2vzzBPkhIGeN0lj9QVD1tmgjurnzF6mq3xeb2nqL1u', '', 0, 89107423832, 0, NULL, 0, '0000-00-00', 0, '0000-00-00'),
(62, '2016-03-21', 'Максим', 'Жуков', 0, '$2y$13$REunNPoJWdOdobtDPLpww.UeG0YGtSKe0rw6AAQyiRJd4tkSZTir.', 'max90@yandex.ru', 0, 89534762541, 1, NULL, 0, '0000-00-00', 0, '0000-00-00'),
(63, '2016-01-20', 'Денис', 'Вовочкин', 0, '$2y$13$GBUS/s8uXi7KbFjzE3N82.vVXwPq8rbLlGGKVbPCXpsdyXSI8GLfi', 'ddd@mail.ru', 0, 89564287512, 1, NULL, 0, '0000-00-00', 0, '0000-00-00'),
(64, '2015-12-29', 'Максим', 'Попов', 2, '$2y$13$QxMQlyIAjGSD0kK28.2z6e.uZBrayg6UUla79l28pNKwojdPUlwPG', '', 0, 89535451235, 0, NULL, 0, '0000-00-00', 0, '0000-00-00'),
(65, '2015-12-22', 'Вадим', 'Романов', 0, '$2y$13$dB5euM/SO3ki02hKD08UQemb0ngI6m.aZ.3wEjBINQ8NAohLS/GBO', 'dreamkiller@rambler.ru', 0, 89205458521, 1, NULL, 0, '0000-00-00', 0, '0000-00-00'),
(81, '2016-02-09', 'erqrq', 'weqwr', 0, '$2y$13$1VMA19fqRpZP0Pp375kvHeNOfkhEJu6jlXwRO3akQg0Zwg38wuazq', 'wqwrq@rambler.ru', 0, 89563547458, 1, NULL, 0, '0000-00-00', 0, '0000-00-00'),
(82, '2016-05-01', 'Никита', 'Васькин', 0, '$2y$13$hdsi6kqlw.JLPs6Z7LgmcOPVNqhQJibQMiE4SHIKbtloK2AFbYZpm', 'Demolish399@yandex.ru', 0, 85635478546, 0, NULL, 0, '0000-00-00', 0, '0000-00-00'),
(83, '2016-05-04', 'Сергей', 'Романов', 1, '$2y$13$vQE1ENatF5tNdSA3GuVSD.ByHiraRirpPn/NWnYyfxEgJnPyVvkuO', 'Demolish01@yandex.ru', 0, 89539786445, 0, NULL, 0, '0000-00-00', 0, '0000-00-00'),
(84, '2016-05-08', 'Роман', 'Петрович', 2, '$2y$13$ZC4Wa7QRIQBIBkaUV81D.OhR/fnq.X9H9BHWAsiHUh5Lj1d0mi/q.', '', 0, 89207584324, 0, NULL, 0, '0000-00-00', 0, '0000-00-00'),
(87, '2016-05-23', 'Владимир', 'Пупькин', 1, '$2y$13$PZ4If/xX.i2Xox3KPHzMJeWLNjqYwVQwdc6P.5tNkTVkVaALMw9gC', 'MyEmail@mail.ru', 0, 89526347898, 0, NULL, 0, NULL, 0, NULL),
(93, '2016-05-23', 'Папа', 'Может', 0, '$2y$13$MvT.tQjLi6RPf6zpG.5cg.0DrqBAPyQwhQOTR4xsEFSFzywlGpxLK', 'tazebrani@mail.ru', 0, 89563248765, 0, NULL, 0, NULL, 0, NULL),
(94, '2016-05-23', 'Сергей', 'Владимирович', 2, '$2y$13$zfCQ2m9c3/6Nqx0b5lErEev.ylhONxd/oIdx6LpWxwC4MDwTOy3sS', '', 0, 89556234565, 1, NULL, 0, NULL, 0, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `tbl_user_class`
--

CREATE TABLE IF NOT EXISTS `tbl_user_class` (
  `owner_id` int(10) NOT NULL,
  `description` varchar(50) NOT NULL,
  PRIMARY KEY (`owner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `tbl_user_class`
--

INSERT INTO `tbl_user_class` (`owner_id`, `description`) VALUES
(0, 'Мастер'),
(1, 'Владелец магазина'),
(2, 'Заказчик'),
(3, 'Администратор');

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `tbl_comment`
--
ALTER TABLE `tbl_comment`
  ADD CONSTRAINT `FK_comment_post` FOREIGN KEY (`post_id`) REFERENCES `tbl_post` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `tbl_img_advt`
--
ALTER TABLE `tbl_img_advt`
  ADD CONSTRAINT `FK_tbl_img_advt_tbl_advt` FOREIGN KEY (`advt_id`) REFERENCES `tbl_advt` (`id`);

--
-- Ограничения внешнего ключа таблицы `tbl_orders`
--
ALTER TABLE `tbl_orders`
  ADD CONSTRAINT `FK_tbl_orders_tbl_user` FOREIGN KEY (`id_user`) REFERENCES `tbl_user` (`id`);

--
-- Ограничения внешнего ключа таблицы `tbl_post`
--
ALTER TABLE `tbl_post`
  ADD CONSTRAINT `FK_post_author` FOREIGN KEY (`author_id`) REFERENCES `tbl_user` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD CONSTRAINT `FK_tbl_user_tbl_user_class` FOREIGN KEY (`class`) REFERENCES `tbl_user_class` (`owner_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
