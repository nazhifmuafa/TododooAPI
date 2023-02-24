-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 30 Nov 2022 pada 15.07
-- Versi server: 5.7.33
-- Versi PHP: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tododoo`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `task`
--

CREATE TABLE `task` (
  `id_task` int(11) NOT NULL,
  `id_tasksetting` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `task`
--

INSERT INTO `task` (`id_task`, `id_tasksetting`, `name`, `description`, `create_at`, `status`) VALUES
(2, 2, 'Prak Mobile Yeeee', 'UAS ', '2022-11-30 16:44:01', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tasksetting`
--

CREATE TABLE `tasksetting` (
  `id_tasksetting` int(11) NOT NULL,
  `category` varchar(20) DEFAULT NULL,
  `due_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `priority` varchar(20) DEFAULT NULL,
  `reminder` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `repeat_task` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `tasksetting`
--

INSERT INTO `tasksetting` (`id_tasksetting`, `category`, `due_date`, `priority`, `reminder`, `repeat_task`) VALUES
(2, 'Kuliah', '2022-12-23 05:00:00', 'High', '2023-11-25 05:00:00', 'Everyday');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id_task`),
  ADD UNIQUE KEY `id_tasksetting` (`id_tasksetting`) USING BTREE;

--
-- Indeks untuk tabel `tasksetting`
--
ALTER TABLE `tasksetting`
  ADD PRIMARY KEY (`id_tasksetting`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `task`
--
ALTER TABLE `task`
  MODIFY `id_task` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `tasksetting`
--
ALTER TABLE `tasksetting`
  MODIFY `id_tasksetting` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`id_tasksetting`) REFERENCES `tasksetting` (`id_tasksetting`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
