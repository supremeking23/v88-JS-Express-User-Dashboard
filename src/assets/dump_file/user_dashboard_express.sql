-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 11, 2021 at 02:53 AM
-- Server version: 5.7.24
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user_dashboard_express`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `message_id` int(11) NOT NULL,
  `comment` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `user_id`, `message_id`, `comment`, `created_at`, `updated_at`) VALUES
(1, 25, 6, 'eighty six', '2021-06-11 08:44:46', NULL),
(2, 25, 6, 'ulit', '2021-06-11 08:45:30', NULL),
(3, 25, 7, 'dsds', '2021-06-11 09:12:21', NULL),
(4, 25, 7, 'ivan', '2021-06-11 09:12:25', NULL),
(5, 25, 7, 'hahahah', '2021-06-11 09:12:31', NULL),
(6, 25, 5, 'sdsds', '2021-06-11 09:51:10', NULL),
(7, 25, 6, 'hi ulit', '2021-06-11 10:06:58', NULL),
(8, 23, 6, 'ang dami na ahahah', '2021-06-11 10:07:21', NULL),
(9, 23, 10, 'tapos send ko dito', '2021-06-11 10:07:38', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `from_user_id` int(11) NOT NULL,
  `to_user_id` int(11) NOT NULL,
  `message` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `from_user_id`, `to_user_id`, `message`, `created_at`, `updated_at`) VALUES
(1, 25, 24, 'hi nezuko', '2021-06-10 08:33:40', NULL),
(2, 25, 24, 'hi again', '2021-06-10 08:35:42', NULL),
(3, 25, 24, 'supsuo', '2021-06-10 08:36:59', NULL),
(4, 25, 24, 'testing\r\n', '2021-06-10 08:38:20', NULL),
(5, 25, 24, 'ito na', '2021-06-10 08:39:03', NULL),
(6, 23, 24, 'ang ang', '2021-06-10 09:08:07', NULL),
(7, 25, 26, 'sdsds', '2021-06-11 09:12:15', NULL),
(8, 25, 26, 'isa pa', '2021-06-11 09:40:04', NULL),
(9, 25, 26, 'sdsd', '2021-06-11 09:40:29', NULL),
(10, 23, 24, 'gawa nalang ako bago', '2021-06-11 10:07:31', NULL),
(11, 23, 24, 'bago', '2021-06-11 10:21:12', NULL),
(12, 23, 24, 'ahaha', '2021-06-11 10:41:42', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_level` int(11) DEFAULT NULL,
  `description` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `user_level`, `description`, `created_at`, `updated_at`) VALUES
(23, 'Stella', 'Vermillion', 'stellavermillion@gmail.com', '$2b$10$k949Q4MW23TxerUz1rvsNOXld2mNTF.29EPMXv/houhG3AOMqLO1G', 1, 'Crimson Princess sbsbsbsbsbbsbsbsssbbsbsbsbsbs', '2021-06-02 14:34:56', '2021-06-10 05:59:47'),
(24, 'Nezuko', 'Kamado', 'nezukokamado@gmail.com', '$2b$10$fIwww9TEo7nvydOQN7ifM.9QByXepVmhxirwB161YB39ctSF7FGM2', 9, 'Demon', '2021-06-02 14:55:47', '2021-06-11 06:51:49'),
(25, 'Mavis', 'Vermillion', 'mavisvermillion@gmail.com', '$2b$10$8JZDUTHWwwsZFxqQQsJkz.YAduiSrhizhfPM5r0Aua.CA00wkcwri', 9, 'Fairy Tactician and a goddess\r\n', '2021-06-02 15:32:51', '2021-06-09 13:21:03'),
(26, 'Yotsuba', 'Nanako', 'yotsubananako@gmail.com', '$2b$10$9o702HEOz8oEznmN6DySxehwZc3iBu0OYfIypYIqePJhGqzPmePhC', 1, NULL, '2021-06-09 10:33:32', NULL),
(27, 'Miku', 'Nakano', 'mikunakano@gmail.com', '$2b$10$Q0ipw2MYziUeqWDp84ua4OPlTvmjR8UCbf/vA2DEZ2Avn8A3P4dyi', 1, 'the nerd one :) hehe', '2021-06-09 10:35:18', '2021-06-10 06:14:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_comments_users1_idx` (`user_id`),
  ADD KEY `fk_comments_messages1_idx` (`message_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_messages_users_idx` (`from_user_id`),
  ADD KEY `to_user_id_idx` (`to_user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_comments_messages1` FOREIGN KEY (`message_id`) REFERENCES `messages` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_comments_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `from_user_id` FOREIGN KEY (`from_user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `to_user_id` FOREIGN KEY (`to_user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
