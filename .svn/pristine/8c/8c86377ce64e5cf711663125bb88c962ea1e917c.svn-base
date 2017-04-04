-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 16, 2016 at 05:46 PM
-- Server version: 5.5.39
-- PHP Version: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `bpoapps`
--

-- --------------------------------------------------------

--
-- Table structure for table `alplallocationentry`
--

CREATE TABLE IF NOT EXISTS `alplallocationentry` (
`allocationId` int(11) NOT NULL,
  `processId` int(11) NOT NULL,
  `applicationId` int(20) NOT NULL,
  `userId` int(20) NOT NULL,
  `statusId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `alplapplications`
--

CREATE TABLE IF NOT EXISTS `alplapplications` (
`applicationId` int(11) NOT NULL,
  `applicationNo` varchar(200) NOT NULL,
  `apsNo` varchar(100) NOT NULL,
  `batchId` int(20) NOT NULL,
  `location` varchar(30) NOT NULL,
  `status` int(20) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `alplapplications`
--

INSERT INTO `alplapplications` (`applicationId`, `applicationNo`, `apsNo`, `batchId`, `location`, `status`) VALUES
(1, 'A6663988581', '', 1, 'Kolkata', 5),
(2, 'A6663981428', '', 1, 'Kolkata', 5),
(3, 'C6663717218', '', 1, 'Kolkata', 5),
(4, 'B6663922925', '', 1, 'Kolkata', 5),
(5, 'A6663988581', '', 2, 'Kolkata', 4),
(6, 'A6663981428', '', 2, 'Kolkata', 4),
(7, 'C6663717218', '', 2, 'Kolkata', 4),
(8, 'B6663922925', '', 2, 'Kolkata', 4);

-- --------------------------------------------------------

--
-- Table structure for table `alplbatchtype`
--

CREATE TABLE IF NOT EXISTS `alplbatchtype` (
`batchTypeId` int(11) NOT NULL,
  `batchId` int(11) NOT NULL,
  `applicationType` char(2) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `alplbatchtype`
--

INSERT INTO `alplbatchtype` (`batchTypeId`, `batchId`, `applicationType`) VALUES
(1, 1, 'AL'),
(2, 2, 'PL');

-- --------------------------------------------------------

--
-- Table structure for table `alpllocationmaster`
--

CREATE TABLE IF NOT EXISTS `alpllocationmaster` (
  `locationId` int(11) NOT NULL,
  `location` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `alpllocationmaster`
--

INSERT INTO `alpllocationmaster` (`locationId`, `location`) VALUES
(1, 'Mumbai'),
(2, 'Chennai');

-- --------------------------------------------------------

--
-- Table structure for table `alplprocessusers`
--

CREATE TABLE IF NOT EXISTS `alplprocessusers` (
`processUserId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `processId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `alplreasonmaster`
--

CREATE TABLE IF NOT EXISTS `alplreasonmaster` (
  `rId` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `alplreasonmaster`
--

INSERT INTO `alplreasonmaster` (`rId`, `name`) VALUES
(1, 'Reason1'),
(2, 'Reason2');

-- --------------------------------------------------------

--
-- Table structure for table `alplremarkcodemaster`
--

CREATE TABLE IF NOT EXISTS `alplremarkcodemaster` (
`remarkId` int(11) NOT NULL,
  `remarkType` varchar(255) NOT NULL,
  `remarkDescription` varchar(255) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;

--
-- Dumping data for table `alplremarkcodemaster`
--

INSERT INTO `alplremarkcodemaster` (`remarkId`, `remarkType`, `remarkDescription`) VALUES
(1, 'Reject', 'FOLDER NOT FOUND'),
(2, 'Reject', 'CURSUIE HAND WRITING.'),
(3, 'Reject', 'IMAGE NOT CLEAR'),
(4, 'Reject', 'INCORRECT MOBILE'),
(5, 'Reject', 'INVALID EMAIL ID'),
(6, 'Waiver', 'Waiver remarks 1'),
(7, 'Waiver', 'Waiver remarks 2'),
(8, 'Waiver', 'Waiver Remarks 3'),
(9, 'CAM', 'CAM Remarks 1'),
(10, 'CAM', 'CAM Remarks 2'),
(11, 'Reject', 'Reason'),
(12, 'Reject', 'Reason'),
(13, 'Reject', 'Reason'),
(14, 'Reject', 'Reason'),
(15, 'Reject', 'Reason 2'),
(16, 'Reject', ''),
(17, 'Reject', 'hhhhhhh'),
(18, 'Reject', 'rejected'),
(19, 'Reject', 'test'),
(20, 'Reject', 'jkhkjhkjh');

-- --------------------------------------------------------

--
-- Table structure for table `alplremarktype`
--

CREATE TABLE IF NOT EXISTS `alplremarktype` (
`remarkTypeId` int(11) NOT NULL,
  `remarkType` varchar(255) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `alplremarktype`
--

INSERT INTO `alplremarktype` (`remarkTypeId`, `remarkType`) VALUES
(1, 'Custom'),
(2, 'RV'),
(3, 'OV'),
(4, 'Waiver'),
(5, 'FNCB'),
(6, 'FNCS');

-- --------------------------------------------------------

--
-- Table structure for table `alpluserentry`
--

CREATE TABLE IF NOT EXISTS `alpluserentry` (
`entryId` int(11) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `allocationId` int(20) NOT NULL,
  `rejectReasonId` int(11) NOT NULL,
  `userId` int(20) NOT NULL,
  `processId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `alpluserentryremarks`
--

CREATE TABLE IF NOT EXISTS `alpluserentryremarks` (
`remarkId` int(11) NOT NULL,
  `entryId` int(11) NOT NULL,
  `remarkTypeId` int(11) NOT NULL,
  `remark` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `alplweblinkmaster`
--

CREATE TABLE IF NOT EXISTS `alplweblinkmaster` (
  `Sr_No` int(11) NOT NULL,
  `Case_Type` varchar(2) DEFAULT NULL,
  `Web_URL` varchar(3000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `casadoctypemaster`
--

CREATE TABLE IF NOT EXISTS `casadoctypemaster` (
  `documentId` int(11) NOT NULL,
  `documentName` varchar(255) NOT NULL,
  `isDel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `casadoctypemaster`
--

INSERT INTO `casadoctypemaster` (`documentId`, `documentName`, `isDel`) VALUES
(1, 'ALLOTMENTLETTER', 0),
(2, 'ANNUALREPORT', 0),
(3, 'AOF', 0),
(4, 'APHOUSEHOLDCARD', 0),
(5, 'ARMSLICENSE', 0),
(6, 'ARTICLEOFASSOCIATION', 0),
(7, 'ASSESSMENTORDER', 0),
(8, 'AWARDLETTER', 0),
(9, 'BARCOUNCILIDCARD', 0),
(10, 'BOARDRESOLUTION', 0),
(11, 'CERTIFICATEIDCARDFROMPOSTOFFICE', 0),
(12, 'CERTIFICATEOFINCORPORATION', 0),
(13, 'CERTIFICATEOFVILLAGEHEAD', 0),
(14, 'COMMERCIALBANKPASSBOOK', 0),
(15, 'DEFENCEDEPENDANTCARD', 0),
(16, 'DISCHARGEBOOK', 0),
(17, 'DOBCERTIFICATE', 0),
(18, 'DOMICILECERTIFICATE', 0),
(19, 'DOMICILECERTIFICATEOFSIKKIM', 0),
(20, 'DRIVINGLICENSE', 0),
(21, 'ECSMANDATE', 0),
(22, 'EMPLOYERSLETTER', 0),
(23, 'EXSERVICEMANSCARD', 0),
(24, 'FACTORYREGISTRATION', 0),
(25, 'FORM18', 0),
(26, 'FREEDOMFIGHTERPASS', 0),
(27, 'GASCONNECTIONCARD', 0),
(28, 'GOVTISSUEDIDCARD', 0),
(29, 'GOVTOPERATIONSCERTIFICATE', 0),
(30, 'GRAMPANCHAYATCERTIFICATE', 0),
(31, 'IDCARDISSUEDBYGOVTREGISTEREDENTITIES', 0),
(32, 'IDCARDISSUEDBYMPMLAMLC', 0),
(33, 'IDCARDISSUEDBYPSUS', 0),
(34, 'IDCARDISSUEDBYPSUSTORETIREDPERSON', 0),
(35, 'IMAIDCARD', 0),
(36, 'IMPORTEXPORTCODE', 0),
(37, 'INCOMETAXRETURN', 0),
(38, 'JKCITIZENIDCARD', 0),
(39, 'LEAVELICENSEAGREEMENTUBILL ', 0),
(40, 'LETTERFROMCOMMANDINGOFFICEROROIC ', 0),
(41, 'LICPOLICY', 0),
(42, 'LISTOFDIRECTORS', 0),
(43, 'MARRIAGECERTIFICATE', 0),
(44, 'MEMORANDUMISSUEDBYGOVT', 0),
(45, 'MEMORANDUMOFASSOCIATION', 0),
(46, 'NOCBANK', 0),
(47, 'ORIGINALLETTEROFINTRODUCTION ', 0),
(48, 'OTHERDOCUMENTS', 0),
(49, 'PAN', 0),
(50, 'PARTNERSHIPREGISTRATIONCERTIFICATE', 0),
(51, 'PASSPORT', 0),
(52, 'PENSIONPAYMENTORDER', 0),
(53, 'PHOTOSMARTCARD', 0),
(54, 'PIOBOOKLET', 0),
(55, 'POSTOFFICEPASSBOOK', 0),
(56, 'PROPERTYTAXRECEIPT', 0),
(57, 'PSUBANKPASSBOOK', 0),
(58, 'RATIONCARD', 0),
(59, 'REGISTEREDTITLEDEED', 0),
(60, 'REGISTRATIONCERTIFICATE', 0),
(61, 'REGISTRATIONCERTIFICATEPROFESSIONALBODIES', 0),
(62, 'ROC', 0),
(63, 'SALESTAXCERTIFICATE', 0),
(64, 'SALESTAXRETURN', 0),
(65, 'SCHOOLLEAVINGCERTIFICATE', 0),
(66, 'SENIORCITIZENIDCARD', 0),
(67, 'SSCDEGREEMARKSHEET', 0),
(68, 'TANCERTIFICATE', 0),
(69, 'TDSCERTIFICATE', 0),
(70, 'TRADELICENSE', 0),
(71, 'TRANSFERCERTIFICATE', 0),
(72, 'UTILITYBILL', 0),
(73, 'VATCERTIFICATE', 0),
(74, 'VOTERID', 0),
(75, 'WATERTAXRECEIPT', 0),
(76, 'PERMITCARD', 0),
(77, 'VISA', 0);

-- --------------------------------------------------------

--
-- Table structure for table `casaimageindextype`
--

CREATE TABLE IF NOT EXISTS `casaimageindextype` (
  `indexingId` int(11) NOT NULL,
  `indexingType` varchar(100) NOT NULL,
  `hasPromoCode` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `casaimageindextype`
--

INSERT INTO `casaimageindextype` (`indexingId`, `indexingType`, `hasPromoCode`) VALUES
(1, 'Regular', 1),
(6, 'CA', 0),
(7, 'NRI', 0),
(8, 'ReKYC', 0),
(9, 'SALARY Weeding', 0),
(10, 'ECS mandate', 0);

-- --------------------------------------------------------

--
-- Table structure for table `casanritype`
--

CREATE TABLE IF NOT EXISTS `casanritype` (
  `nriId` int(11) NOT NULL,
  `nriType` varchar(255) NOT NULL,
  `hasPromoCode` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `casanritype`
--

INSERT INTO `casanritype` (`nriId`, `nriType`, `hasPromoCode`) VALUES
(1, 'FFA', 1),
(2, 'NFF', 0),
(3, 'NFF1', 1);

-- --------------------------------------------------------

--
-- Table structure for table `ccagencybatch`
--

CREATE TABLE IF NOT EXISTS `ccagencybatch` (
`batchCreateId` int(11) NOT NULL,
  `agencyId` int(11) NOT NULL,
  `batchId` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `ccagencybatch`
--

INSERT INTO `ccagencybatch` (`batchCreateId`, `agencyId`, `batchId`) VALUES
(1, 2, 7),
(2, 2, 8),
(3, 2, 9);

-- --------------------------------------------------------

--
-- Table structure for table `ccagencymaster`
--

CREATE TABLE IF NOT EXISTS `ccagencymaster` (
  `agencyId` int(11) NOT NULL,
  `agencyCode` varchar(255) NOT NULL,
  `batchFrom` int(11) NOT NULL,
  `batchTo` int(11) NOT NULL,
  `agencyName` varchar(255) NOT NULL,
  `batchId` int(11) NOT NULL,
  `credithub` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ccagencymaster`
--

INSERT INTO `ccagencymaster` (`agencyId`, `agencyCode`, `batchFrom`, `batchTo`, `agencyName`, `batchId`, `credithub`) VALUES
(1, '86', 6000, 9999, 'DEL', 6001, 'DVT'),
(2, '90', 6000, 9999, 'BAN', 6002, 'BNG'),
(3, '91', 6000, 9999, 'CHA', 6003, 'CHE'),
(4, '92', 6000, 9999, 'MUM', 6004, 'MUM'),
(5, '93', 6000, 9999, 'HYD', 6005, 'HYD'),
(6, '94', 6000, 9999, 'KOL', 6006, 'CAL'),
(7, '95', 6000, 9999, 'PUN', 6007, 'PUN'),
(8, '96', 6000, 9999, 'AHD', 6008, 'AHM'),
(9, '89', 6000, 9999, 'BHU', 6009, 'CAL'),
(10, '87', 6000, 9999, 'KIC', 6010, 'HYD'),
(11, '88', 6000, 9999, 'IND', 6011, 'MUM'),
(12, '51', 6000, 9999, 'LUD', 6012, 'DRO'),
(13, '52', 6000, 9999, 'CND', 6013, 'DRO'),
(14, '53', 6000, 9999, 'GHU', 6014, 'CAL'),
(15, '55', 6000, 9999, 'JAI', 6015, 'DRO'),
(16, '81', 6000, 9999, 'DER', 6016, 'DRO');

-- --------------------------------------------------------

--
-- Table structure for table `ccallocation`
--

CREATE TABLE IF NOT EXISTS `ccallocation` (
  `allocationId` int(11) NOT NULL,
  `entryId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ccallocationentry`
--

CREATE TABLE IF NOT EXISTS `ccallocationentry` (
  `allocationId` int(11) NOT NULL,
  `processId` int(11) NOT NULL,
  `entryId` int(20) NOT NULL,
  `userId` int(20) NOT NULL,
  `statusId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ccallocationentry`
--

INSERT INTO `ccallocationentry` (`allocationId`, `processId`, `entryId`, `userId`, `statusId`) VALUES
(1, 1, 1, 89, 2),
(2, 2, 2, 88, 2),
(3, 2, 3, 88, 2);

-- --------------------------------------------------------

--
-- Table structure for table `cccategorymaster`
--

CREATE TABLE IF NOT EXISTS `cccategorymaster` (
  `categoryId` int(11) NOT NULL,
  `categoryName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cccategorymaster`
--

INSERT INTO `cccategorymaster` (`categoryId`, `categoryName`) VALUES
(2, 'RCU'),
(3, 'PHOTOID'),
(4, 'DOCUMENT'),
(5, 'TITLE'),
(6, 'GENDER'),
(7, 'MARITAL'),
(8, 'EDU'),
(9, 'COUNTRY'),
(10, 'RLSTATUS'),
(11, 'RSTATUS'),
(12, 'RTYPE'),
(13, 'VOSHIP'),
(14, 'VNOSHIP'),
(15, 'OCCUP'),
(16, 'INDTYPE'),
(17, 'TYCOMP'),
(18, 'PROFESS'),
(19, 'CURPOS'),
(20, 'MAILADD'),
(21, 'ICICI_REL'),
(22, 'OBCC'),
(23, 'STMTBYEMAIL'),
(24, 'MOBALERT'),
(25, 'ADNREL'),
(26, 'SPGENDER'),
(27, 'AUTODEBT'),
(28, 'SPREQ'),
(29, 'BANK'),
(30, 'REJREASON');

-- --------------------------------------------------------

--
-- Table structure for table `cccategoryvalue`
--

CREATE TABLE IF NOT EXISTS `cccategoryvalue` (
  `categoryValuesId` int(4) NOT NULL,
  `CategoryValue` varchar(20) NOT NULL DEFAULT '',
  `CategoryCode` varchar(20) NOT NULL,
  `categoryId` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cccategoryvalue`
--

INSERT INTO `cccategoryvalue` (`categoryValuesId`, `CategoryValue`, `CategoryCode`, `categoryId`) VALUES
(15567, 'Y', 'YES', 2),
(15568, 'N', 'NO', 2),
(15569, 'N', 'NONE', 3),
(15570, 'P', 'PHOTO', 3),
(15571, 'B', 'PHOTO-SIGN', 3),
(15572, 'S', 'SIGN', 3),
(15573, 'F16', 'FORM 16', 4),
(15574, 'SRG', 'INCOME SUR', 4),
(15575, 'ITR', 'INCOME TAX', 4),
(15576, 'OTH', 'OTHERS', 4),
(15577, 'PAY', 'PAYSLIP', 4),
(15578, 'SAL', 'SALARY CER', 4),
(15579, 'Mr.', 'Mr.', 5),
(15580, 'Ms.', 'Ms.', 5),
(15581, 'Others', 'Others', 5),
(15582, 'F', 'FEMALE', 6),
(15583, 'M', 'MALE', 6),
(15584, 'M', 'MARRIED', 7),
(15585, 'S', 'SINGLE', 7),
(15586, 'GR', 'GRADUATE/D', 8),
(15587, 'MA', 'MATRICULAT', 8),
(15588, 'PG', 'POST-GRADU', 8),
(15589, 'PR', 'PROFESSION', 8),
(15590, 'UG', 'UNDER GRAD', 8),
(15591, 'Dr.', 'Dr.', 5),
(15592, 'Prof.', 'Prof.', 5),
(15593, '356', 'INDIA', 9),
(15594, 'F', 'FOREIGN NA', 10),
(15595, 'N', 'NON-RESIDE', 10),
(15596, 'O', 'OTHERS', 10),
(15597, 'I', 'RESIDENT I', 10),
(15598, 'C', 'COMPANY', 11),
(15599, 'F', 'FINANCED', 11),
(15600, 'X', 'OTHERS', 11),
(15601, 'O', 'OWNED', 11),
(15602, 'R', 'RENTED', 11),
(15603, 'P', 'WITH PAREN', 11),
(15604, 'L', 'WITH RELAT', 11),
(15605, 'B', 'BUNGALOW', 12),
(15606, 'F', 'FLAT', 12),
(15607, 'O', 'OTHERS', 12),
(15608, 'R', 'ROW HOUSES', 12),
(15609, 'C', 'CAR', 13),
(15610, 'N', 'NONE', 13),
(15611, 'O', 'OTHERS', 13),
(15612, 'T', 'TWO WHEELE', 13),
(15613, 'C', 'COMPANY', 14),
(15614, 'F', 'FINANCED', 14),
(15615, 'O', 'OWNED', 14),
(15616, 'OT', 'OTHERS', 15),
(15617, 'RT', 'RETIRED', 15),
(15618, 'SL', 'SALARIED', 15),
(15619, 'SE', 'SELF-EMPLO', 15),
(15620, 'ADV', 'ADVERTISIN', 16),
(15621, 'BKF', 'BANKING/FI', 16),
(15622, 'CRE', 'CONSTRUCTI', 16),
(15623, 'COU', 'COURIER', 16),
(15624, 'EXP', 'EXPORTS', 16),
(15625, 'GOV', 'GOVERNMENT', 16),
(15626, 'HOT', 'HOTEL', 16),
(15627, 'IIT', 'INFORMATIO', 16),
(15628, 'MED', 'MEDICAL', 16),
(15629, 'XXX', 'OTHERS', 16),
(15630, 'TRA', 'TRANSPORT', 16),
(15631, 'MFR', 'MANUFACTUR', 17),
(15632, 'OTH', 'OTHERS', 17),
(15633, 'SER', 'SERVICE', 17),
(15634, 'TRD', 'TRADING', 17),
(15635, 'CA', 'CA', 18),
(15636, 'CO', 'CONSULTANT', 18),
(15637, 'DR', 'DOCTOR', 18),
(15638, 'EN', 'ENGINEER', 18),
(15639, 'JO', 'JOURNALIST', 18),
(15640, 'LW', 'LAWYER', 18),
(15641, 'XX', 'OTHERS', 18),
(15642, 'TE', 'TEACHER', 18),
(15643, 'TR', 'TRADERS', 18),
(15644, 'C', 'CLERICAL/A', 19),
(15645, 'J', 'JUNIOR MAN', 19),
(15646, 'M', 'MIDDLE MAN', 19),
(15647, 'O', 'OTHERS', 19),
(15648, 'S', 'SENIOR MAN', 19),
(15649, 'B', 'BOTH', 20),
(15650, 'W', 'OFFICE', 20),
(15651, 'H', 'RESIDENCE', 20),
(15652, 'A', 'BANK', 21),
(15653, 'B', 'BONDS', 21),
(15654, 'C', 'CAR-LOANS', 21),
(15655, 'R', 'CREDIT CAR', 21),
(15656, 'D', 'DURABLE-LO', 21),
(15657, 'H', 'HOME-LOANS', 21),
(15658, 'O', 'OTHERS', 21),
(15659, 'P', 'PERSONAL-L', 21),
(15660, 'W', 'POWER PAY', 21),
(15661, '1', 'YES', 22),
(15662, '0', 'NO', 22),
(15663, 'P', 'Personal', 23),
(15664, 'O', 'Official', 23),
(15665, 'P', 'Personal', 24),
(15666, 'O', 'Official', 24),
(15667, 'BR', 'BROTHER', 25),
(15668, 'DA', 'DAUGHTER', 25),
(15669, 'FA', 'FATHER', 25),
(15670, 'MA', 'MOTHER', 25),
(15671, 'SI', 'SISTER', 25),
(15672, 'SO', 'SON', 25),
(15673, 'SP', 'SPOUSE', 25),
(15674, 'Mr.', 'MALE', 26),
(15675, 'Ms.', 'FEMALE', 26),
(15676, 'Dr.', 'Dr.', 26),
(15677, 'Prof.', 'Prof.', 26),
(15678, 'Other', 'Others', 26),
(15679, 'S', 'MAD', 27),
(15680, 'D', 'TAD', 27),
(15681, 'y', 'YES', 28),
(15682, 'n', 'NO', 28),
(15683, '', 'None', 27),
(15684, 'ICICI BA', 'ICICI BANK', 29),
(15685, 'HDFC BAN', 'HDFC BANK', 29),
(15686, 'DOB MISS', 'DOB MISSIN', 30),
(15687, 'NAME MIS', 'NAME MISSI', 30),
(15688, 'UCO BANK', 'UCO BANK', 29);

-- --------------------------------------------------------

--
-- Table structure for table `cccitymaster`
--

CREATE TABLE IF NOT EXISTS `cccitymaster` (
  `cityId` int(11) NOT NULL,
  `cityAbrevation` char(3) NOT NULL,
  `cityName` varchar(50) NOT NULL,
  `stateId` int(11) NOT NULL,
  `stdCode` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cccitymaster`
--

INSERT INTO `cccitymaster` (`cityId`, `cityAbrevation`, `cityName`, `stateId`, `stdCode`) VALUES
(1, 'XXX', 'XXX', 0, '1'),
(2, 'DEL', 'DELHI', 0, '11'),
(3, 'FBD', 'FARIDABAD', 0, '129'),
(4, 'GUR', 'GURGAON', 0, '124'),
(5, 'RWI', 'REWARI', 0, '1274'),
(6, 'ROH', 'ROHTAK', 0, '1262'),
(7, 'MHM', 'MEHAM', 0, '1257'),
(8, 'HSR', 'HISSAR', 0, '1662'),
(9, 'BIW', 'BHIWANI', 0, '1664'),
(10, 'SON', 'SONEPAT', 0, '1264'),
(11, 'KNL', 'KARNAL', 0, '184'),
(12, 'PNP', 'PANIPAT', 0, '18'),
(13, 'KRU', 'KURUKSHETRA', 0, '1744'),
(14, 'BDD', 'BADDI', 0, '1795'),
(15, 'AMB', 'AMBALA', 0, '171'),
(16, 'KAK', 'KALKA', 0, '1733'),
(17, 'PAN', 'PANCHKULA', 0, '172'),
(18, 'YGR', 'YAMUNANAGAR', 0, '1732'),
(19, 'KTL', 'KAITHAL', 0, '1746'),
(20, 'CHD', 'CHANDIGARH', 0, '172'),
(21, 'BHD', 'BHATINDA', 0, '164'),
(22, 'ZIR', 'ZIRAKPUR', 0, '172'),
(23, 'PAT', 'PATIALA', 0, '175'),
(24, 'KLI', 'KURALI', 0, '188'),
(25, 'LUD', 'LUDHIANA', 0, '161'),
(26, 'DER', 'DERABASSI', 0, '1762'),
(27, 'NAB', 'NABHA', 0, '1765'),
(28, 'JAL', 'JALANDHAR', 0, '181'),
(29, 'PHG', 'PHAGWARA', 0, '1824'),
(30, 'KHN', 'KHANNA', 0, '1628'),
(31, 'DOR', 'DORAHA', 0, '1628'),
(32, 'MGA', 'MOGA', 0, '1636'),
(33, 'FDK', 'FARIDKOT', 0, '1639'),
(34, 'AMR', 'AMRITSAR', 0, '183'),
(35, 'PTK', 'PATHANKOT', 0, '186'),
(36, 'KLA', 'KAPURTHALLA', 0, '1822'),
(37, 'NDR', 'NAKODAR', 0, '1821'),
(38, 'HPR', 'HOSHIARPUR', 0, '1882'),
(39, 'NWS', 'NAWANSHAHAR', 0, '1823'),
(40, 'KHA', 'KHARAR', 0, '918'),
(41, 'RUP', 'RUPNAGAR', 0, '1765'),
(42, 'RAJ', 'RAJPURA', 0, '176'),
(43, 'SLI', 'SANGRUR', 0, '167'),
(44, 'ROP', 'ROPAR', 0, '1881'),
(45, 'MNS', 'MANSA', 0, '1652'),
(46, 'FZP', 'FIROZPUR', 0, '1632'),
(47, 'MKT', 'MUKTSAR', 0, '1637'),
(48, 'MOH', 'MOHALI', 0, '172'),
(49, 'SHM', 'SHIMLA', 0, '177'),
(50, 'SLN', 'SOLAN', 0, '1792'),
(51, 'BLS', 'BILASPUR', 0, '79'),
(52, 'HMI', 'HAMIRPUR', 0, '1972'),
(53, 'UNA', 'UNA', 0, '1975'),
(54, 'MND', 'MANDI', 0, '1905'),
(55, 'KRA', 'KANGRA', 0, '1893'),
(56, 'JMU', 'JAMMU', 0, '191'),
(57, 'SRN', 'SRINAGAR', 0, '194'),
(58, 'GHZ', 'GHAZIABAD', 0, '120'),
(59, 'MDR', 'MODINAGAR', 0, '1232'),
(60, 'NOI', 'NOIDA', 0, '120'),
(61, 'ALI', 'ALIGARH', 0, '571'),
(62, 'BDU', 'BADAUN', 0, '5836'),
(63, 'KAN', 'KANPUR', 0, '512'),
(64, 'ALL', 'ALLAHABAD', 0, '532'),
(65, 'FAT', 'FATEHPUR', 0, '5180'),
(66, 'VRN', 'VARANASI', 0, '542'),
(67, 'AGH', 'AZAMGARH', 0, '5462'),
(68, 'JNR', 'JAUNPUR', 0, '5452'),
(69, 'STL', 'SULTANPUR LODHI', 0, '1828'),
(70, 'FAZ', 'FAIZABAD', 0, '5272'),
(71, 'LUC', 'LUCKNOW', 0, '522'),
(72, 'BRB', 'BARABANKI', 0, '5248'),
(73, 'PPG', 'PRATAPGARH', 0, '5342'),
(74, 'MZP', 'MIRZAPUR', 0, '5442'),
(75, 'GZP', 'GHAZIPUR', 0, '548'),
(76, 'SGP', 'SINGAPORE', 0, '65'),
(77, 'HZZ', 'HARDOI', 0, '5852'),
(78, 'BRL', 'BAREILLY', 0, '581'),
(79, 'MRD', 'MORADABAD', 0, '591'),
(80, 'BJN', 'BIJNOR', 0, '1344'),
(81, 'MEE', 'MEERUT', 0, '121'),
(82, 'SAH', 'SAHARANPUR', 0, '132'),
(83, 'DEH', 'DEHRADUN', 0, '134'),
(84, 'MUZ', 'MUZAFFARNAGAR', 0, '131'),
(85, 'HDW', 'HARIDWAR', 0, '133'),
(86, 'SPR', 'SITAPUR', 0, '5862'),
(87, 'NTL', 'INAINITAL', 0, '5942'),
(88, 'GRP', 'GORAKHPUR', 0, '551'),
(89, 'DRI', 'DEORIA', 0, '5568'),
(90, 'MAT', 'MATHURA', 0, '565'),
(91, 'AGR', 'AGRA', 0, '562'),
(92, 'JHA', 'JHANSI', 0, '5174'),
(93, 'AWR', 'ALWAR', 0, '144'),
(94, 'JAI', 'JAIPUR', 0, '141'),
(95, 'JOB', 'JOBNER', 0, '1425'),
(96, 'CHO', 'JAIPUR CHOMU', 0, '1423'),
(97, 'AJM', 'AJMER', 0, '145'),
(98, 'TNK', 'TONK', 0, '1434'),
(99, 'BWR', 'BEAWAR', 0, '1462'),
(100, 'KIS', 'KISHANGARH', 0, '1463'),
(101, 'UDP', 'UDAIPUR', 0, '294'),
(102, 'PNL', 'PALI', 0, '2932'),
(103, 'SRH', 'SIROHI', 0, '2972'),
(104, 'BLW', 'BHILWARA', 0, '1483'),
(105, 'CTA', 'CHITTAURGARH', 0, '1472'),
(106, 'DGR', 'DURGAPUR', 0, '343'),
(107, 'BRT', 'BHARATPUR', 0, '5644'),
(108, 'SWM', 'SAWAI MADHOPUR', 0, '7465'),
(109, 'BUN', 'BUNDI', 0, '747'),
(110, 'KOT', 'KOTA', 0, '744'),
(111, 'PNA', 'PATAN', 0, '2734'),
(112, 'JHW', 'JHALAWAR', 0, '7432'),
(113, 'BNS', 'BANSWARA', 0, '2963'),
(114, 'XFX', 'DURBAN', 0, '2731'),
(115, 'SRD', 'SARDARSHYAR', 0, '1564'),
(116, 'BKR', 'BIKANER', 0, '151'),
(117, 'SIK', 'SIKAR', 0, '1575'),
(118, 'JHN', 'JHUNJHUNU', 0, '1592'),
(119, 'SGG', 'SRIGANGANAGAR', 0, '1506'),
(120, 'HMG', 'HANUMANGARH', 0, '1504'),
(121, 'PLL', 'PILLIBANGA', 0, '1594'),
(122, 'JOD', 'JODHPUR', 0, '291'),
(123, 'ATK', 'ATKOT', 0, '2821'),
(124, 'NAA', 'NAGAUR', 0, '1582'),
(125, 'CTU', 'KAILASH NAGAR', 0, '6112'),
(126, 'JLO', 'JALORE', 0, '2977'),
(127, 'BRM', 'BARMER', 0, '2988'),
(128, 'JSL', 'JAISALMER', 0, '2991'),
(129, 'RJK', 'RAJKOT', 0, '281'),
(130, 'DHJ', 'DHORAJI', 0, '2824'),
(131, 'JAM', 'JAMNAGAR', 0, '288'),
(132, 'PBR', 'PORBUNDER', 0, '286'),
(133, 'JUN', 'JUNAGADH', 0, '285'),
(134, 'AME', 'AMRELI', 0, '2792'),
(135, 'SNG', 'SURENDRA NAGAR', 0, '2752'),
(136, 'BVR', 'BHAVNAGAR', 0, '278'),
(137, 'BOT', 'BOTAD', 0, '2849'),
(138, 'BHJ', 'BHUJ', 0, '2836'),
(139, 'KUT', 'KUTCH', 0, '2838'),
(140, 'GAN', 'GANDHINAGAR', 0, '2712'),
(141, 'GDM', 'GANDHIDHAM', 0, '2836'),
(142, 'ADI', 'ADIPURA', 0, '2836'),
(143, 'MDA', 'MUNDRA', 0, '2838'),
(144, 'AHM', 'AHMEDABAD', 0, '79'),
(145, 'MEH', 'MEHSANA', 0, '2762'),
(146, 'AHR', 'ANKLESHWAR', 0, '2646'),
(147, 'DHE', 'DHANERA', 0, '2748'),
(148, 'SUR', 'SURAT', 0, '261'),
(149, 'NDD', 'NADIAD', 0, '268'),
(150, 'KHD', 'KHEDA', 0, '2694'),
(151, 'AND', 'ANAND', 0, '2692'),
(152, 'GOD', 'GODHRA', 0, '2676'),
(153, 'BRD', 'BARODA', 0, '265'),
(154, 'BHA', 'BHARUCH', 0, '2641'),
(155, 'BDL', 'BARDOLI', 0, '2622'),
(156, 'VLD', 'VALSAD', 0, '236'),
(157, 'VPI', 'VAPI', 0, '260'),
(158, 'SIL', 'SILVASSA', 0, '260'),
(159, 'NAV', 'NAVSARI', 0, '2637'),
(160, 'MUM', 'MUMBAI', 0, '22'),
(161, 'THN', 'THANE', 0, '22'),
(162, 'NVM', 'NAVI MUMBAI', 0, '22'),
(163, 'DHN', 'DAHANU', 0, '2528'),
(164, 'RGD', 'RAIGAD', 0, '2143'),
(165, 'GOA', 'GOA', 0, '832'),
(166, 'PUN', 'PUNE', 0, '20'),
(167, 'SAS', 'SASWAD', 0, '2115'),
(168, 'SAT', 'SATARA', 0, '2168'),
(169, 'SHL', 'SOLAPUR', 0, '217'),
(170, 'PND', 'PANDHARPUR', 0, '2186'),
(171, 'BAR', 'BARAMATI', 0, '211'),
(172, 'ANR', 'AHMEDNAGAR', 0, '2426'),
(173, 'LAT', 'LATUR', 0, '2382'),
(174, 'BEE', 'BEED', 0, '2441'),
(175, 'RAT', 'RATNAGIRI', 0, '240'),
(176, 'SAN', 'SANGLI', 0, '231'),
(177, 'KPR', 'KOLHAPUR', 0, '231'),
(178, 'ICH', 'ICHALKARANJI', 0, '230'),
(179, 'MIR', 'MIRAJ', 0, '231'),
(180, 'NSK', 'NASIK', 0, '253'),
(181, 'MLG', 'MALEGAON', 0, '2554'),
(182, 'GTR', 'GUNTUR', 0, '863'),
(183, 'AKL', 'AKOLA', 0, '724'),
(184, 'CHW', 'CHANDWAD', 0, '2556'),
(185, 'DLE', 'DHULE', 0, '2562'),
(186, 'JLN', 'JALGAON', 0, '257'),
(187, 'AUR', 'AURANGABAD', 0, '240'),
(188, 'PBH', 'PARBHANI', 0, '2452'),
(189, 'NAN', 'NANDED', 0, '240'),
(190, 'NAG', 'NAGPUR', 0, '7104'),
(191, 'CHN', 'CHANDRAPUR', 0, '7172'),
(192, 'GON', 'GONDIA', 0, '7182'),
(193, 'WAR', 'WARDA', 0, '7158'),
(194, 'ARV', 'AMRAVATI', 0, '721'),
(195, 'YAL', 'YAVATMAL', 0, '7232'),
(196, 'KHE', 'KHANDWA', 0, '733'),
(197, 'KHG', 'KHARGONE', 0, '7282'),
(198, 'IND', 'INDORE', 0, '731'),
(199, 'MHO', 'MHOW', 0, '7324'),
(200, 'PHM', 'PITHAMPUR', 0, '7292'),
(201, 'DES', 'DEWAS', 0, '7272'),
(202, 'UJN', 'UJJAIN', 0, '7366'),
(203, 'NGD', 'NAGDA', 0, '7366'),
(204, 'UDW', 'UDWADA', 0, '260'),
(205, 'RTL', 'RATLAM', 0, '7412'),
(206, 'MSR', 'MANDSAUR', 0, '7422'),
(207, 'NEE', 'NEEMUCH', 0, '7293'),
(208, 'CPR', 'CHHINDWARA', 0, '7162'),
(209, 'HND', 'HOSHANGABAD', 0, '7574'),
(210, 'ITA', 'ITARSI', 0, '7572'),
(211, 'BHP', 'BHOPAL', 0, '755'),
(212, 'VID', 'VIDISHA', 0, '7590'),
(213, 'SEH', 'SEHORE', 0, '7562'),
(214, 'GNA', 'GUNA', 0, '7542'),
(215, 'GWA', 'GWALIOR', 0, '751'),
(216, 'JOU', 'JOURA', 0, '7537'),
(217, 'JBL', 'JABALPUR', 0, '761'),
(218, 'KTN', 'KATNI', 0, '7622'),
(219, 'REW', 'REWA', 0, '7662'),
(220, 'STN', 'SATNA', 0, '7672'),
(221, 'BLI', 'BHILAI', 0, '788'),
(222, 'DRG', 'DURG', 0, '788'),
(223, 'RAI', 'RAIPUR', 0, '771'),
(224, 'BHT', 'BHATAPARA', 0, '7726'),
(225, 'CHM', 'CHAMPA', 0, '7819'),
(226, 'KBA', 'KORBA', 0, '7759'),
(227, 'RGH', 'RAIGARH', 0, '7762'),
(228, 'HYD', 'HYDERABAD', 0, '40'),
(229, 'SEC', 'SECUNDERABAD', 0, '40'),
(230, 'MEK', 'MEDAK', 0, '8457'),
(231, 'NIZ', 'NIZAMABAD', 0, '8463'),
(232, 'ADL', 'ADILABAD', 0, '8732'),
(233, 'WNL', 'WARANGAL', 0, '870'),
(234, 'KAM', 'KHAMMAM', 0, '8742'),
(235, 'NDA', 'NALGONDA', 0, '8685'),
(236, 'MAB', 'MAHBOOBNAGAR', 0, '8548'),
(237, 'VJW', 'VIJAYAWADA', 0, '866'),
(238, 'HIN', 'HINDUPUR', 0, '8556'),
(239, 'ANT', 'ANANTAPUR', 0, '8554'),
(240, 'CUP', 'CUDDAPAH', 0, '8562'),
(241, 'PRO', 'PRODDATUR', 0, '8564'),
(242, 'CTT', 'CHITTOOR', 0, '8572'),
(243, 'TRU', 'TIRUPATHI', 0, '877'),
(244, 'PIC', 'PICHATOOR', 0, '8576'),
(245, 'KNO', 'KURNOOL', 0, '8517'),
(246, 'NND', 'NANDYAL', 0, '8514'),
(247, 'SKK', 'SRIKAKULAM', 0, '8945'),
(248, 'GVD', 'GUDIVADA', 0, '8674'),
(249, 'NEL', 'NELLORE', 0, '861'),
(250, 'VPM', 'VISHAKAPATNAM', 0, '891'),
(251, 'VLR', 'VELLORE', 0, '416'),
(252, 'KKN', 'KAKINADA', 0, '884'),
(253, 'RJY', 'RAJAHMUNDRY', 0, '883'),
(254, 'APR', 'AMALAPURAM', 0, '8856'),
(255, 'ELU', 'ELURU', 0, '8812'),
(256, 'BHV', 'BHIMAVARAM', 0, '8816'),
(257, 'BNG', 'BANGALORE', 0, '80'),
(258, 'CPT', 'CHANNAPTANA', 0, '8113'),
(259, 'KOL', 'KOLAR', 0, '8157'),
(260, 'MYS', 'MYSORE', 0, '821'),
(261, 'MDY', 'MANDYA', 0, '8232'),
(262, 'KNN', 'KANNUR', 0, '49'),
(263, 'MNG', 'MANGALORE', 0, '824'),
(264, 'TUM', 'TUMKUR', 0, '8135'),
(265, 'HAS', 'HASSAN', 0, '8172'),
(266, 'PTT', 'PUTTUR', 0, '8251'),
(267, 'MAN', 'MANIPAL', 0, '825'),
(268, 'UDI', 'UDIPI', 0, '820'),
(269, 'KUN', 'KUNDAPUR', 0, '8254'),
(270, 'DVG', 'DAVANGERE', 0, '8192'),
(271, 'CMG', 'CHIKMAGALUR', 0, '8262'),
(272, 'SGA', 'SHIMOGA', 0, '8182'),
(273, 'CHR', 'CHITRADURGA', 0, '8194'),
(274, 'DWD', 'DHARWAD', 0, '836'),
(275, 'HBL', 'HUBLI', 0, '836'),
(276, 'KWR', 'KARWAR', 0, '8382'),
(277, 'SSI', 'SIRSI', 0, '8384'),
(278, 'GDG', 'GADAG', 0, '8372'),
(279, 'BRY', 'BELLARY', 0, '8393'),
(280, 'TOG', 'TORANAGALLU', 0, '8395'),
(281, 'GGY', 'GANGAVATHY', 0, '8583'),
(282, 'RCR', 'RAICHUR', 0, '8532'),
(283, 'GBA', 'GULBARGA', 0, '8472'),
(284, 'BDR', 'BIDAR', 0, '8482'),
(285, 'BJP', 'BIJAPUR', 0, '8352'),
(286, 'BKO', 'BAGALKOTE', 0, '8354'),
(287, 'BGM', 'BELGAUM', 0, '831'),
(288, 'NIP', 'NIPANI', 0, '8338'),
(289, 'ATI', 'ATHANI', 0, '8289'),
(290, 'CHE', 'CHENNAI', 0, '44'),
(291, 'SAL', 'SALEM', 0, '427'),
(292, 'PDY', 'PONDICHERRY', 0, '413'),
(293, 'TNN', 'TIRUVANNAMALAI', 0, '4175'),
(294, 'TIR', 'TIRUPUR', 0, '421'),
(295, 'NEY', 'NEYVELI', 0, '4142'),
(296, 'CUD', 'CUDDALORE', 0, '4142'),
(297, 'CBM', 'CHIDAMBARAM', 0, '4144'),
(298, 'XAY', 'PORTO NOVO', 0, '229'),
(299, 'SMK', 'SEMBANARKOIL', 0, '4364'),
(300, 'KUM', 'KUMBAKONAM', 0, '435'),
(301, 'NGP', 'NAGAPATTINAM', 0, '4365'),
(302, 'TNJ', 'TANJORE', 0, '4362'),
(303, 'PKT', 'PUDUKOTTAI', 0, '461'),
(304, 'THJ', 'THANJAVUR', 0, '4362'),
(305, 'PKI', 'PATUKOTTAI', 0, '4373'),
(306, 'TRC', 'TRICHY', 0, '431'),
(307, 'KRR', 'KARUR', 0, '4324'),
(308, 'RMT', 'RAMANATHAPURAM', 0, '4567'),
(309, 'DDL', 'DINDIGUL', 0, '451'),
(310, 'PNI', 'PALANI', 0, '4545'),
(311, 'MDU', 'MADURAI', 0, '451'),
(312, 'THE', 'THENI', 0, '4546'),
(313, 'VNR', 'VIRUDHUNAGAR', 0, '4562'),
(314, 'RPM', 'RAJAPALAYAM', 0, '4563'),
(315, 'TVI', 'TIRUNELVELI', 0, '4637'),
(316, 'NGL', 'NAGERCOIL', 0, '4652'),
(317, 'TUN', 'TUTICORIN', 0, '461'),
(318, 'KDI', 'KARAIKUDI', 0, '4565'),
(319, 'TPU', 'TIRUPATTUR', 0, '4179'),
(320, 'HOS', 'HOSUR', 0, '4344'),
(321, 'KGR', 'KRISHNAGIRI', 0, '4343'),
(322, 'DMP', 'DHARMAPURI-T', 0, '4346'),
(323, 'THM', 'THARAMANGALAM', 0, '4290'),
(324, 'NML', 'NAMAKKAL', 0, '4286'),
(325, 'ERO', 'ERODE', 0, '424'),
(326, 'DHP', 'DHARAPURAM', 0, '4258'),
(327, 'CBT', 'COIMBATORE', 0, '422'),
(328, 'TSS', 'THALASSARY', 0, '490'),
(329, 'CLT', 'CALICUT', 0, '495'),
(330, 'KOZ', 'KOZHICODE', 0, '495'),
(331, 'MJE', 'MANJERI', 0, '493'),
(332, 'TIU', 'TIRUR', 0, '494'),
(333, 'MPM', 'MALAPPURAM', 0, '494'),
(334, 'PGT', 'PALAKKAD', 0, '491'),
(335, 'TRH', 'TRICHUR', 0, '487'),
(336, 'COC', 'COCHIN', 0, '484'),
(337, 'KTT', 'KOTTAYAM', 0, '481'),
(338, 'CHA', 'CHANGANACHERRY', 0, '4824'),
(339, 'PTM', 'PATHANAMTHITTA', 0, '473'),
(340, 'MLI', 'MAVELIKKARA', 0, '479'),
(341, 'RNN', 'RANNI', 0, '47351'),
(342, 'KLR', 'KOLLAM', 0, '474'),
(343, 'TVM', 'TRIVANDRUM', 0, '471'),
(344, 'TRM', 'THIRUVANANTHAPURAM', 0, '471'),
(345, 'CAL', 'KOLKATA', 0, '33'),
(346, 'BAA', 'BARASAT', 0, '33'),
(347, 'PGS', '24 PARAGANAS', 0, '33'),
(348, 'HOW', 'HOWRAH', 0, '33'),
(349, 'BCA', 'BARGACHHIA', 0, '33'),
(350, 'JBR', 'JAGATBALLAVPUR', 0, '33'),
(351, 'HOO', 'HOOGHLY', 0, '33'),
(352, 'SZR', 'SHYAMBAZAR', 0, '342'),
(353, 'MEM', 'MEMARY', 0, '342'),
(354, 'BCM', 'BOINCHIGRAM', 0, '3213'),
(355, 'CNR', 'CHANDANNAGAR', 0, '33'),
(356, 'GUP', 'GURAP', 0, '3213'),
(357, 'DAN', 'DANKUNI', 0, '33'),
(358, 'ARB', 'ARAMBAG', 0, '33'),
(359, 'TKR', 'TARAKESHWAR', 0, '33'),
(360, 'JGA', 'JANGIPARA', 0, '33'),
(361, 'KNA', 'KALNA', 0, '3454'),
(362, 'KHL', 'KHANAKUL', 0, '33'),
(363, 'SMP', 'SERAMPORE', 0, '33'),
(364, 'CDL', 'CHANDITALA', 0, '33'),
(365, 'BUR', 'BURDWAN', 0, '342'),
(366, 'ASL', 'ASANSOL', 0, '341'),
(367, 'AAL', 'ANDAL', 0, '341'),
(368, 'CTN', 'CHITTARANJAN', 0, '341'),
(369, 'KLT', 'KULTI', 0, '341'),
(370, 'RIG', 'RANIGUNJ', 0, '341'),
(371, 'UKH', 'UKHRA', 0, '342'),
(372, 'MID', 'MIDNAPUR', 0, '3220'),
(373, 'CDR', 'CHANDRAKONA ROAD', 0, '3222'),
(374, 'TMU', 'TAMLUK', 0, '3228'),
(375, 'KKH', 'KHARAGPUR', 0, '3222'),
(376, 'HAB', 'HABIPUR', 0, '2642'),
(377, 'HLD', 'HALDIA', 0, '3224'),
(378, 'SBG', 'SABONG', 0, '32208'),
(379, 'BSI', 'BALISAI', 0, '32208'),
(380, 'BED', 'BELDA S O', 0, '3229'),
(381, 'DIG', 'DIGHA', 0, '32208'),
(382, 'EGR', 'EGRA', 0, '32208'),
(383, 'HIR', 'HAIPUR', 0, '32208'),
(384, 'JHD', 'JAHALDA', 0, '3220'),
(385, 'BPR', 'BINPUR', 0, '3221'),
(386, 'KKT', 'KUKRAHATI', 0, '3224'),
(387, 'BSH', 'BISHNUPUR', 0, '3473'),
(388, 'BKU', 'BANKURA', 0, '3242'),
(389, 'MLD', 'MALDA', 0, '3512'),
(390, 'BGT', 'BALURGHAT', 0, '3522'),
(391, 'DDR', 'DAKSHIN DINAJPUR', 0, '3522'),
(392, 'DKH', 'DALKHOLA', 0, '3525'),
(393, 'SGI', 'SILIGURI', 0, '353'),
(394, 'DRJ', 'DARJEELING', 0, '354'),
(395, 'JPG', 'JALPAIGURI', 0, '3561'),
(396, 'KPG', 'KALIMPONG', 0, '3552'),
(397, 'CTK', 'CUTTACK', 0, '671'),
(398, 'KBH', 'KOCHBIHAR', 0, '3582'),
(399, 'AIP', 'ALIPURDUAR', 0, '3564'),
(400, 'CBR', 'COOCHBEHAR', 0, '3582'),
(401, 'GGT', 'GANGTOK', 0, '3592'),
(402, 'KIR', 'KRISHNANAGAR', 0, '3473'),
(403, 'BKL', 'BADKULLA', 0, '3472'),
(404, 'KMR', 'KARIMPUR', 0, '3473'),
(405, 'NKP', 'NAKASHIPARA', 0, '3473'),
(406, 'SHR', 'SHYAMNAGAR', 0, '33'),
(407, 'TEH', 'TEHATTA', 0, '3472'),
(408, 'THP', 'TAHERPUR', 0, '3473'),
(409, 'ICP', 'ICHHAPUR', 0, '33'),
(410, 'RGT', 'RANAGHAT', 0, '3473'),
(411, 'CKD', 'CHAKDAH', 0, '33'),
(412, 'KLY', 'KALYANI', 0, '33'),
(413, 'NWP', 'NABADWIP', 0, '3472'),
(414, 'BMR', 'BAHARAMPUR', 0, '3482'),
(415, 'MHB', 'MURSHIDABAD', 0, '3483'),
(416, 'BPU', 'BARUIPUR', 0, '33'),
(417, 'BST', 'BASIRHAT', 0, '31762'),
(418, 'HSB', 'HASNABAD', 0, '31762'),
(419, 'BHU', 'BHUBANESWAR', 0, '674'),
(420, 'PUR', 'PURI', 0, '6752'),
(421, 'COW', 'CHOUDWAR', 0, '671'),
(422, 'JGT', 'JAGATSINGHPUR', 0, '6724'),
(423, 'PDP', 'PARADIP', 0, '6722'),
(424, 'KDP', 'KENDRAPRA', 0, '6727'),
(425, 'JAJ', 'JAJPUR', 0, '6726'),
(426, 'JJP', 'JAJAPUR', 0, '6726'),
(427, 'BAL', 'BALASORE', 0, '6782'),
(428, 'JLW', 'JALESWAR', 0, '6781'),
(429, 'BHK', 'BHADRAK', 0, '6784'),
(430, 'BRP', 'BARIPADA', 0, '6792'),
(431, 'MAY', 'MAYURBHANJ', 0, '6797'),
(432, 'KJR', 'KEONJHAR', 0, '6766'),
(433, 'JDA', 'JODA', 0, '6767'),
(434, 'BAB', 'BARBIL', 0, '6767'),
(435, 'DKL', 'DHENKANAL', 0, '6762'),
(436, 'AGL', 'ANGUL', 0, '6764'),
(437, 'TCH', 'TALCHER', 0, '6760'),
(438, 'BMP', 'BERHAMPUR', 0, '680'),
(439, 'RYD', 'RAYAGADA', 0, '6856'),
(440, 'PHB', 'PHULABANI', 0, '6842'),
(441, 'SMG', 'SEMILIGUDA', 0, '6853'),
(442, 'KRT', 'KORAPUT', 0, '6852'),
(443, 'JPE', 'JEYPORE', 0, '6854'),
(444, 'BWP', 'BHAWANIPATNA', 0, '6670'),
(445, 'BLG', 'BOLANGIR', 0, '6652'),
(446, 'SMB', 'SAMBALPUR', 0, '663'),
(447, 'BGR', 'BARGARH', 0, '6646'),
(448, 'JRS', 'JHARSUGUDA', 0, '6645'),
(449, 'RKA', 'ROURKELA', 0, '661'),
(450, 'SDG', 'SUNDARGARH', 0, '6622'),
(451, 'RJG', 'RAJGANGPUR', 0, '6624'),
(452, 'SCR', 'SILCHAR', 0, '3842'),
(453, 'GUW', 'GUWAHATI', 0, '361'),
(454, 'NON', 'NAGAON', 0, '3672'),
(455, 'DBR', 'DHUBRI', 0, '3662'),
(456, 'BOG', 'BONGAIGAON', 0, '3664'),
(457, 'TEZ', 'TEZPUR', 0, '3712'),
(458, 'MGL', 'MANGALDOI', 0, '3713'),
(459, 'DIB', 'DIBRUGARH', 0, '373'),
(460, 'JRT', 'JORHAT', 0, '376'),
(461, 'SIB', 'SIBSAGAR', 0, '3772'),
(462, 'GLT', 'GOLAGHAT', 0, '3774'),
(463, 'SLA', 'SOHELA', 0, '6685'),
(464, 'TSK', 'TINSUKIA', 0, '374'),
(465, 'DJN', 'DULIAJAN', 0, '374'),
(466, 'NLK', 'NORTH LAKHIMPUR', 0, '3752'),
(467, 'KGN', 'KARIMGANJ', 0, '3843'),
(468, 'ITN', 'ITANAGAR', 0, '360'),
(469, 'SLO', 'SHILLONG', 0, '364'),
(470, 'IMP', 'IMPHAL', 0, '385'),
(471, 'AIZ', 'AIZWAL', 0, '389'),
(472, 'KOH', 'KOHIMA', 0, '370'),
(473, 'DPU', 'DIMAPUR', 0, '3862'),
(474, 'AGT', 'AGARTALA', 0, '381'),
(475, 'PTN', 'PATNA', 0, '612'),
(476, 'GYA', 'GAYA', 0, '631'),
(477, 'BHG', 'BHAGALPUR', 0, '641'),
(478, 'GDH', 'GIRIDIH', 0, '6532'),
(479, 'HAJ', 'HAZARIBAGH', 0, '6546'),
(480, 'BSC', 'BOKARO', 0, '6542'),
(481, 'DHB', 'DHANBAD', 0, '326'),
(482, 'RNC', 'RANCHI', 0, '651'),
(483, 'JMR', 'JAMSHEDPUR', 0, '33'),
(484, 'SWN', 'SIWAN', 0, '6154'),
(485, 'MZF', 'MUZAFFARPUR', 0, '621'),
(486, 'SMA', 'SITAMARHI', 0, '6226'),
(487, 'DGA', 'DARBHANGA', 0, '6272'),
(488, 'SMT', 'SAMASTIPUR', 0, '6274'),
(489, 'BEG', 'BEGUSARAI', 0, '6243'),
(490, 'PWL', 'PALWAL', 0, '1275'),
(491, 'NRN', 'NARNAUL', 0, '1282'),
(492, 'SIS', 'SISRA', 0, '1666'),
(493, 'JID', 'JIND', 0, '1681'),
(494, 'PPL', 'PIPLI', 0, '130'),
(495, 'SMR', 'SAMRALA', 0, '1628'),
(496, 'BRU', 'BARAUDI', 0, '160'),
(497, 'NAL', 'NANGAL', 0, '1887'),
(498, 'DGH', 'DHARAMGARH', 0, '1762'),
(499, 'BAJ', 'BAJHERI', 0, '1398'),
(500, 'SHE', 'SAHNEWAL', 0, '1627'),
(501, 'LGO', 'LONGOWAL', 0, '16728'),
(502, 'BGO', 'BEGOWAL', 0, '18224'),
(503, 'FZL', 'FAZILKA', 0, '1638'),
(504, 'BEA', 'BEAS', 0, '1853'),
(505, 'PTI', 'PATTI', 0, '1851'),
(506, 'BTA', 'BATALA', 0, '1871'),
(507, 'TDA', 'TANDA URMAR', 0, '1886'),
(508, 'NUM', 'NURMAHAL', 0, '1826'),
(509, 'BGA', 'BANGA', 0, '1825'),
(510, 'KTK', 'KOTAKPURA', 0, '1635'),
(511, 'TLW', 'TALWANDI SABO', 0, '1655'),
(512, 'RUR', 'RAMPUR', 0, '2677'),
(513, 'TKP', 'TRILOKPUR', 0, '5521'),
(514, 'MJR', 'MAJRA', 0, '1663'),
(515, 'DDH', 'DADAHU', 0, '1702'),
(516, 'NGH', 'SANGARH', 0, '1702'),
(517, 'HRS', 'SARAHAN', 0, '1799'),
(518, 'BIN', 'BADRI NGR', 0, '5964'),
(519, 'RJB', 'RAJBAN', 0, '1704'),
(520, 'JGH', 'RAJGARH', 0, '7372'),
(521, 'SNU', 'SANAURA', 0, '181'),
(522, 'DML', 'DHARAM SHALA', 0, '1892'),
(523, 'KNJ', 'KANNAUJ', 0, '5694'),
(524, 'KSU', 'KAUSHAMBI-SIRATHU', 0, '5331'),
(525, 'BDO', 'BHADOHI', 0, '5414'),
(526, 'AMI', 'AMETHI', 0, '5368'),
(527, 'RBY', 'RAIBAREILLY', 0, '535'),
(528, 'RKT', 'RENUKOOT', 0, '5446'),
(529, 'ARA', 'ANPARA', 0, '5446'),
(530, 'RDP', 'RUDRAPUR', 0, '5944'),
(531, 'BLM', 'BALRAMPUR', 0, '5263'),
(532, 'RTJ', 'ROBERTSGANJ', 0, '5444'),
(533, 'BHW', 'BHIWADI', 0, '1493'),
(534, 'BRR', 'BEHROR', 0, '1494'),
(535, 'SHP', 'SHAHAPUR', 0, '2527'),
(536, 'KPI', 'KOTPUTLI', 0, '1421'),
(537, 'DUS', 'DAUSA', 0, '1427'),
(538, 'ABR', 'ABU ROAD', 0, '2974'),
(539, 'DRB', 'DARIBA', 0, '294'),
(540, 'PIL', 'PILANI', 0, '1596'),
(541, 'DAJ', 'DAHEJ', 0, '26416'),
(542, 'VYA', 'VYARA', 0, '2626'),
(543, 'ALB', 'ALIBAUG', 0, '2143'),
(544, 'KHP', 'KHOPOLI', 0, '2192'),
(545, 'NAR', 'NARAYANGAON', 0, '2132'),
(546, 'KRD', 'KARAD', 0, '2164'),
(547, 'DPO', 'DAPOLI', 0, '2358'),
(548, 'MKP', 'MALKAPUR', 0, '7267'),
(549, 'RAU', 'RAU', 0, '7324'),
(550, 'DMN', 'DHAMNOD', 0, '7291'),
(551, 'RJD', 'RAJNANDGAON', 0, '7744'),
(552, 'KWD', 'KAWARDHA', 0, '7754'),
(553, 'MHU', 'MAHASAMUND', 0, '7723'),
(554, 'DMT', 'DHAMTARI', 0, '7722'),
(555, 'JGP', 'JAGDALPUR', 0, '7782'),
(556, 'AKP', 'AMBIKAPUR', 0, '7774'),
(557, 'CII', 'CHIRIMIRI', 0, '7771'),
(558, 'ANA', 'ANAPARTHI', 0, '8857'),
(559, 'PUT', 'PUTTAPARTHI', 0, '8555'),
(560, 'MNP', 'MADANAPALLE', 0, '8571'),
(561, 'ONG', 'ONGOLE', 0, '8592'),
(562, 'PSA', 'PALASA', 0, '8945'),
(563, 'PDD', 'PEDDAPURAM', 0, '8852'),
(564, 'TKU', 'TANUKU', 0, '8819'),
(565, 'PLK', 'PALACOLE', 0, '8814'),
(566, 'JGM', 'JANGAREDDIGUDUM', 0, '8821'),
(567, 'PAR', 'PARVATHIPURAM', 0, '8963'),
(568, 'BDT', 'BIDADI TOWN', 0, '8117'),
(569, 'KEN', 'MADIKERI', 0, '8272'),
(570, 'KLN', 'KUSHAL NAGAR', 0, '8276'),
(571, 'MBR', 'MUDBIDRI', 0, '8258'),
(572, 'CLK', 'CHALLAKERE', 0, '8195'),
(573, 'HAV', 'HAVERI', 0, '8375'),
(574, 'BTK', 'BHATKAL', 0, '8385'),
(575, 'HPT', 'HOSPET', 0, '8394'),
(576, 'KOA', 'KOPPAL', 0, '8539'),
(577, 'SDR', 'SINDHANUR', 0, '8535'),
(578, 'LKL', 'IIKAL', 0, '8351'),
(579, 'KIK', 'KARAIKAL', 0, '4368'),
(580, 'ALG', 'ALANGUDI', 0, '4565'),
(581, 'KDK', 'KODAIKANAL', 0, '4542'),
(582, 'VPT', 'VADIPATTI', 0, '4543'),
(583, 'SVK', 'SHIVAKASHI', 0, '4562'),
(584, 'TEN', 'TENKASI', 0, '4633'),
(585, 'DEK', 'DEVAKOTAI', 0, '4561'),
(586, 'SNR', 'SINGAMPUNARI', 0, '4577'),
(587, 'ATT', 'ATTUR', 0, '4282'),
(588, 'NMK', 'NAMAKKAL1', 0, '4286'),
(589, 'GOB', 'GOBICHETTIPALAYAM', 0, '4285'),
(590, 'KNG', 'KANGAYEM', 0, '4257'),
(591, 'TUR', 'TIRUPPUR', 0, '421'),
(592, 'UDU', 'UDUMALPET', 0, '4252'),
(593, 'COO', 'COONOOR', 0, '423'),
(594, 'PAY', 'PAYYANUR', 0, '498'),
(595, 'KSG', 'KASARGOD', 0, '4994'),
(596, 'KPE', 'KALPETTA', 0, '4936'),
(597, 'PRB', 'PERAMBRA', 0, '480'),
(598, 'WAY', 'WAYANAD', 0, '4935'),
(599, 'MNN', 'MANNARKAD', 0, '4924'),
(600, 'SSU', 'THRISSUR', 0, '487'),
(601, 'KIC', 'KOCHI', 0, '484'),
(602, 'ATP', 'KATTAPANA', 0, '4868'),
(603, 'THD', 'THODUPUZHA', 0, '4862'),
(604, 'VKM', 'VAIKOM', 0, '4829'),
(605, 'ALA', 'PALA', 0, '4822'),
(606, 'CRT', 'CHERTHALKA', 0, '478'),
(607, 'KMB', 'KUMBANAD', 0, '469'),
(608, 'KYM', 'KAYAMKULLAM', 0, '4786'),
(609, 'PLU', 'PUNALUR', 0, '475'),
(610, 'KKK', 'KOTTARAKKARA', 0, '474'),
(611, 'ATN', 'ATTINGAL', 0, '472'),
(612, 'PRY', 'PURULIYA', 0, '3251'),
(613, 'SRI', 'SURI', 0, '3462'),
(614, 'STH', 'SAINTHIA', 0, '3463'),
(615, 'RGJ', 'RAIGUNJ', 0, '3523'),
(616, 'NYH', 'NAYAGARH', 0, '6753'),
(617, 'ASK', 'ASIKA', 0, '6822'),
(618, 'PKD', 'PARALAKHEMUNDI', 0, '6824'),
(619, 'NWG', 'NAWRANGPUR', 0, '6858'),
(620, 'UMK', 'UMERKOTE', 0, '6866'),
(621, 'DOG', 'DEOGHAR', 0, '6432'),
(622, 'BXR', 'BUXAR', 0, '6183'),
(623, 'NWD', 'NAWADA', 0, '6324'),
(624, 'MGR', 'MUNGER', 0, '6342'),
(625, 'LKH', 'LAKHISARAI', 0, '6346'),
(626, 'GDA', 'GODDA', 0, '6422'),
(627, 'KHR', 'KATIHAR', 0, '6452'),
(628, 'SSA', 'SASARAM', 0, '6184'),
(629, 'RAX', 'RAXAUL', 0, '6255'),
(630, 'JHU', 'JHUMRITILIYA', 0, '6534'),
(631, 'PTR', 'PATRATU', 0, '6553'),
(632, 'GLA', 'GUMLA', 0, '6524'),
(633, 'SIM', 'SIMDEGA', 0, '6525'),
(634, 'HJI', 'HAJIPUR', 0, '6224'),
(635, 'MTH', 'MOTIHARI', 0, '6252'),
(636, 'BTH', 'BETTIAH', 0, '6254'),
(637, 'KHI', 'KHAGARIA', 0, '6244'),
(638, 'PRA', 'PURNIA', 0, '6454'),
(639, 'NAG', 'Nagpur', 0, '712'),
(640, 'NSK', 'Nasik', 0, '2551'),
(641, 'PUN', 'Pune', 0, '20'),
(642, 'GDP', 'GURDASPUR', 0, '361'),
(643, 'GBN', 'Gautam Budh Nagar', 0, '120'),
(644, 'BDA', 'Bedla', 0, '2907'),
(645, 'STG', 'Suratgarh', 0, '1509'),
(646, 'SBD', 'Shikohabad', 0, '120'),
(647, 'TVI', 'Tirunelveli', 0, '4633'),
(648, 'ROH', 'ROHTAK', 0, '1258'),
(649, 'MZP', 'Mirzapur', 0, '5442'),
(650, 'JHA', 'Jhansi', 0, '5174'),
(651, 'BWR', 'Beawar', 0, '1462'),
(652, 'AUR', 'Auranagabad', 0, '240'),
(653, 'HNG', 'Hingoli', 0, '2454'),
(654, 'NAG', 'Nagpur', 0, '712'),
(655, 'PGR', 'Patjampur', 0, '7292'),
(656, 'SGR', 'Sagar', 0, '7582'),
(657, 'BBN', 'Bina', 0, '7580'),
(658, 'NGR', 'Nigri', 0, '761'),
(659, 'WDN', 'Waidhan', 0, '7805'),
(660, 'ADL', 'Adilabad', 0, '8732'),
(661, 'KRN', 'Karimnagar', 0, '8729'),
(662, 'VZN', 'Vizianagaram', 0, '8966'),
(663, 'AAR', 'Akhanagar', 0, '3523'),
(664, 'ALM', 'Almora', 0, '5962'),
(665, 'APE', 'Anakapalle', 0, '8924'),
(666, 'ANO', 'Andro', 0, '385'),
(667, 'AMS', 'Assam Rifles', 0, '364'),
(668, 'BHL', 'Baharail', 0, '3523'),
(669, 'BCH', 'Bahraich', 0, '5252'),
(670, 'BJT', 'Bajanapathar', 0, '3713'),
(671, 'BIA', 'Ballia', 0, '549'),
(672, 'BAD', 'Banda', 0, '5192'),
(673, 'BMI', 'Bandarmari', 0, '3712'),
(674, 'BAM', 'Barbam', 0, '373'),
(675, 'BTI', 'Basti', 0, '5542'),
(676, 'BBZ', 'Behara Bazar', 0, '3842'),
(677, 'BIB', 'BIBINagar', 0, '8685'),
(678, 'BYR', 'Bidyanagar', 0, '385'),
(679, 'BPP', 'Bishnupur', 0, '3879'),
(680, 'BUD', 'Budaun', 0, '5832'),
(681, 'GDR', 'Gudur', 0, '8624'),
(682, 'JCL', 'Jedcherla', 0, '8544'),
(683, 'KCH', 'Kanchipuram', 0, '44'),
(684, 'MCL', 'Machilipatnam', 0, '8672'),
(685, 'NSP', 'Narasaraopet', 0, '8647'),
(686, 'PED', 'Peddapalli', 0, '8728'),
(687, 'SAY', 'Sangareddy', 0, '8458'),
(688, 'SPT', 'Suryapet', 0, '8684'),
(689, 'TAM', 'Tambaram', 0, '44'),
(690, 'TCL', 'Tiruchirapalli', 0, '431'),
(691, 'WPY', 'Wanaparthy', 0, '8543'),
(692, 'SXG', 'Shadnagar', 0, '8548'),
(693, 'BUG', 'Bunglong', 0, '3871'),
(694, 'CCH', 'Cachar', 0, '3842'),
(695, 'CAR', 'Canchipur', 0, '385'),
(696, 'CKG', 'Chakpikarong', 0, '3878'),
(697, 'CBA', 'Chamba', 0, '1899'),
(698, 'CZR', 'Cherrabazar', 0, '3637'),
(699, 'COI', 'Chikodi', 0, '8338'),
(700, 'CKN', 'Chingai Khullen', 0, '3845'),
(701, 'CDP', 'Churachandpur', 0, '3874'),
(702, 'CUU', 'Churu', 0, '1562'),
(703, 'DMI', 'Deomornoi', 0, '3713'),
(704, 'DUA', 'Dhula', 0, '3713'),
(705, 'DNG', 'Dungarpur', 0, '2964'),
(706, 'ETH', 'Etah', 0, '5742'),
(707, 'ETW', 'Etawah', 0, '5688'),
(708, 'FHH', 'Fatehgarh', 0, '5692'),
(709, 'GKR', 'GHATKESAR', 0, '8415'),
(710, 'GKK', 'Gokak', 0, '8332'),
(711, 'GDN', 'Gonda', 0, '5262'),
(712, 'GND', 'Gondal', 0, '2825'),
(713, 'HPY', 'Happy Valley', 0, '0364 '),
(714, 'HGG', 'Hiyangthang', 0, '385'),
(715, 'LWH', 'Iewduh', 0, '364'),
(716, 'IKA', 'Irinjalakuda', 0, '480'),
(717, 'NNN', 'Kalain', 0, '5622'),
(718, 'GGG', 'Kanglatongbi', 0, '385'),
(719, 'SSS', 'Kangpokpi', 0, '3880'),
(720, 'VVV', 'Karnajora', 0, '3523'),
(721, 'ZZZ', 'Keithelmanbi', 0, '385'),
(722, 'KVI', 'Kovilpatti', 0, '4632'),
(723, 'LNN', 'Laban', 0, '364'),
(724, 'MPU', 'Mainpuri', 0, '5672'),
(725, 'NTL', 'lNAINITAL', 0, '5942'),
(726, 'PIT', 'Pithoragarh', 0, '5964'),
(727, 'POL', 'Pollachi', 0, '4259'),
(728, 'RAI', 'Raipur', 0, '7782'),
(729, 'RJO', 'Rajouri', 0, '1962'),
(730, 'SJH', 'Shahjahanpur', 0, '5842'),
(731, 'UHR', 'Udhampur', 0, '1992'),
(732, 'DNI', 'Duni', 0, '3713'),
(733, 'LUG', 'Lairouching', 0, '385'),
(734, 'LRP', 'Laitkor Peak', 0, '364'),
(735, 'LMH', 'Laitumkhrah', 0, '364'),
(736, 'LLG', 'Lamlong', 0, '385'),
(737, 'LPT', 'Lamphelpat', 0, '385'),
(738, 'LSG', 'Lamsang', 0, '385'),
(739, 'LEH', 'Leh', 0, '1982'),
(740, 'LIL', 'Lilong', 0, '3848'),
(741, 'LKT', 'Loktak Project', 0, '3879'),
(742, 'LGN', 'Lungchin', 0, '3874'),
(743, 'MRG', 'Madanriting', 0, '364'),
(744, 'MIN', 'Mairang', 0, '3657'),
(745, 'MPI', 'Mantripukhri', 0, '385'),
(746, 'MOA', 'Mao', 0, '3871'),
(747, 'MRM', 'Maram', 0, '3871'),
(748, 'MWT', 'Mawkyrwat', 0, '3656'),
(749, 'MWI', 'Mawlai', 0, '364'),
(750, 'MWG', 'Mawphlang', 0, '364'),
(751, 'MYM', 'Mawsynram', 0, '3637'),
(752, 'MYL', 'Mayang Imphal', 0, '385'),
(753, 'MYI', 'Mayiladuthurai', 0, '4364'),
(754, 'MXG', 'Moirang', 0, '3879'),
(755, 'MXH', 'Moreh', 0, '3872'),
(756, 'MXN', 'Motbung', 0, '3871'),
(757, 'NBL', 'Nambol', 0, '3879'),
(758, 'NJD', 'Nanjangud', 0, '8221'),
(759, 'NHU', 'Nehu', 0, '364'),
(760, 'NGS', 'Neigrihms', 0, '364'),
(761, 'NUN', 'New Kabui khullen', 0, '3877'),
(762, 'NYR', 'Nonglyer', 0, '128544'),
(763, 'NOG', 'Nongmynsong', 0, '364'),
(764, 'NGN', 'Nongstoin', 0, '3654'),
(765, 'NTY', 'Nongthymmai', 0, '364'),
(766, 'NUA', 'Nungba', 0, '3877'),
(767, 'OPM', 'Ottapalam', 0, '4926'),
(768, 'PEL', 'Pallel', 0, '3848'),
(769, 'PBG', 'Parbung', 0, '3874'),
(770, 'POI', 'Patsoi Part ii', 0, '385'),
(771, 'PMW', 'Phudmawri', 0, '364'),
(772, 'PWT', 'Porompat', 0, '385'),
(773, 'RYH', 'Rynjah', 0, '364'),
(774, 'SOL', 'Sagolmang', 0, '385'),
(775, 'SXU', 'Sangaiprou', 0, '385'),
(776, 'SXT', 'Senapati', 0, '3871'),
(777, 'SXL', 'Shella', 0, '36374'),
(778, 'SLO', 'Shillong', 0, '364'),
(779, 'SJI', 'Singjamei', 0, '385'),
(780, 'SMX', 'Smit', 0, '364'),
(781, 'SDL', 'Somdal', 0, '3845'),
(782, 'SPZ', 'Sonapur', 0, '385'),
(783, 'SGZ', 'Sugnu', 0, '3848'),
(784, 'TBU', 'TalukaBihupuria', 0, '3712'),
(785, 'TEI', 'Tamei', 0, '3877'),
(786, 'THL', 'TEHSIL', 0, '381'),
(787, 'TGG', 'Thengjang', 0, '3879'),
(788, 'TBL', 'Thoubal', 0, '3848'),
(789, 'TGX', 'Tuitengphai', 0, '3874'),
(790, 'UCC', 'Ucc', 0, '364'),
(791, 'UHL', 'Ukhrul', 0, '3845'),
(792, 'USG', 'Upper Shillong', 0, '364'),
(793, 'WGA', 'Wairengba', 0, '3877'),
(794, 'YOI', 'Yangangpokpi', 0, '385'),
(795, 'JJP', 'JAJPUR', 0, '6726'),
(796, 'JAT', 'JATANI', 0, '674'),
(797, 'PDP', 'PARADEEP', 0, '6722'),
(798, 'KDP', 'KENDRAPARA', 0, '6727'),
(799, 'CNG', 'CHIRANG', 0, '3664'),
(800, 'MUD', 'Mangadu', 0, '44'),
(801, 'SBB', 'Sembarambakkam', 0, '44'),
(802, 'SSU', 'Thrissur', 0, '480'),
(803, 'COC', 'Cochin', 0, '484'),
(804, 'TVM', 'Trivandrum', 0, '471'),
(805, 'AKM', 'Amanambakkam', 0, '44'),
(806, 'MWC', 'Mahindra World City', 0, '44'),
(807, 'ATR', 'Athur', 0, '44'),
(808, 'KBL', 'Kadambadil', 0, '44'),
(809, 'KUZ', 'Kuzhipanthandalam', 0, '44'),
(810, 'AKK', 'Acharapakk', 0, '44'),
(811, 'JPM', 'Janakipuram', 0, '44'),
(812, 'PGA', 'Perunagar', 0, '44'),
(813, 'DYM', 'Devaradiyarkuppam', 0, '4153'),
(814, 'AYR', 'Ariyalur', 0, '4153'),
(815, 'CPU', 'Chinnaparur', 0, '4142'),
(816, 'AGM', 'Ammaiagaram', 0, '4151'),
(817, 'APD', 'Arampoondi', 0, '4151'),
(818, 'APX', 'Arasampattu', 0, '4151'),
(819, 'APP', 'Arsur', 0, '4153'),
(820, 'GMU', 'Gopalasamudram', 0, '4367'),
(821, 'AKT', 'Alankottai', 0, '4367'),
(822, 'IGI', 'Ilangarkudi', 0, '4374'),
(823, 'MGI', 'Manangorai', 0, '4374'),
(824, 'KNU', 'Kilakunnupatti', 0, '4327'),
(825, 'AVM', 'Algiamanvalam', 0, '431'),
(826, 'TRY', 'Turaiyur', 0, '4327'),
(827, 'BMD', 'Bommanapadi', 0, '4328'),
(828, 'AUE', 'Alathur Gate', 0, '4328'),
(829, 'KOI', 'Konalai', 0, '431'),
(830, 'AAI', 'Alagapuri', 0, '4326'),
(831, 'AVR', 'Aviyur', 0, '4146'),
(832, 'BLL', 'Boganallur', 0, '4633'),
(833, 'AYY', 'Ayyapuram', 0, '4636'),
(834, 'KJE', 'Kanjiracode', 0, '4652'),
(835, 'GMV', 'Gnaramvilai', 0, '4652'),
(836, 'EMZ', 'Eathamozhi', 0, '4652'),
(837, 'KOM', 'Kottaram', 0, '4652'),
(838, 'ACE', 'Alancode', 0, '4651'),
(839, 'KKD', 'Karankad', 0, '4652'),
(840, 'CKR', 'Chinnakannanur', 0, '4575'),
(841, 'AKM', 'Arakkonam', 0, '4177'),
(842, 'AMM', 'Ammanur', 0, '4177'),
(843, 'ARC', 'Arcot', 0, '4172'),
(844, 'ADH', 'Anandhalai', 0, '4172'),
(845, 'STT', 'Sattur', 0, '4172'),
(846, 'AKU', 'Attukaranur', 0, '4290'),
(847, 'DPM', 'Darapuram', 0, '4290'),
(848, 'KLZ', 'Komarapalayam', 0, '4288'),
(849, 'DVI', 'Dalavaipettai', 0, '4256'),
(850, 'AYM', 'Araipalayam', 0, '4295'),
(851, 'ALM', 'Ariyappampalayam', 0, '4295'),
(852, 'AOI', 'Ambodi', 0, '4295'),
(853, 'BAU', 'Bhujanganur', 0, '4254'),
(854, 'IPM', 'Ittiveerampalayam', 0, '421'),
(855, 'GGL', 'Gomangalam', 0, '4252'),
(856, 'VMS', 'Venkatesa Mills', 0, '4252'),
(857, 'DTI', 'Deepalapatti', 0, '4252'),
(858, 'LOV', 'Lovedale', 0, '423'),
(859, 'KEI', 'Ketti', 0, '423'),
(860, 'AKD', 'Ayakkad', 0, '4922'),
(861, 'CHI', 'Chittilancheri', 0, '4922'),
(862, 'LAK', 'Lakkidi', 0, '466'),
(863, 'ATD', 'Andathode', 0, '487'),
(864, 'TBY', 'Thiruvambady', 0, '487'),
(865, 'CSY', 'Chittissery', 0, '480'),
(866, 'APM', 'Anandapuram', 0, '480'),
(867, 'MDD', 'Mangad', 0, '4885'),
(868, 'CPU', 'Cherpu', 0, '487'),
(869, 'AZA', 'Arattupuzha', 0, '487'),
(870, 'CPZ', 'Chettupuzha', 0, '487'),
(871, 'MKA', 'Madakathara', 0, '487'),
(872, 'VKK', 'Vellanikkara', 0, '487'),
(873, 'AZH', 'Azhikode Jetty', 0, '480'),
(874, 'CBU', 'Chembuchira', 0, '480'),
(875, 'PPT', 'Palliport', 0, '484'),
(876, 'SLM', 'Sreemoolanagaram', 0, '484'),
(877, 'GLE', 'Gudarle', 0, '4869'),
(878, 'KTU', 'Kuttur', 0, '469'),
(879, 'CGU', 'Chengannur', 0, '479'),
(880, 'KLR', 'Kollam', 0, '474'),
(881, 'FBD', 'Faridabad', 0, '124'),
(882, 'BNR', 'Bulandsahar', 0, '5732'),
(883, 'KAN', 'Kanpur', 0, '511'),
(884, 'LZZ', 'Lakhimpur Kheri', 0, '5876'),
(885, 'GKH', 'Golagokaranath', 0, '1346'),
(886, 'KSH', 'Kashipur', 0, '5947'),
(887, 'VJW', 'Vijaywada', 0, '866'),
(888, 'RBY', 'Raibareli', 0, '535'),
(889, 'BNR', 'BULANDSHAHAR', 0, '5732'),
(890, 'SUL', 'Singrauli', 0, '731'),
(891, 'MPM', 'Malapuram', 0, '494'),
(892, 'TRH', 'Thrissur', 0, '487'),
(893, 'PUH', 'Puzhakkal', 0, '487'),
(894, 'WDY', 'Wadakancherry', 0, '4884'),
(895, 'KDY', 'Kalady', 0, '484'),
(896, 'THD', 'Thodupuzha', 0, '4862'),
(897, 'VKM', 'Vaikom', 0, '829'),
(898, 'ALZ', 'Ambalapuzha', 0, '477'),
(899, 'KLM', 'Kallambalam', 0, '471'),
(900, 'HDW', 'Haridwar', 0, '1334'),
(901, 'JLA', 'Jalna', 0, '2482'),
(902, 'BND', 'Bhandara', 0, '7184'),
(903, 'BLD', 'Buldhana', 0, '7262'),
(904, 'ANM', 'Anambakkam', 0, '44'),
(905, 'PDY', 'Pondicherry', 0, '413'),
(906, 'PER', 'PERAMABULLUR', 0, '4328'),
(907, 'KKI', 'KANYAKUMARI', 0, '4651'),
(908, 'AYL', 'Ananthangal', 0, '4172'),
(909, 'NML', 'Nammkal', 0, '4286'),
(910, 'SON', 'SONEPAT', 0, '130'),
(911, 'FZP', 'Firozpur', 0, '1632'),
(912, 'RBY', 'RAIBAREILLY', 0, '5315'),
(913, 'RBY', 'RAIBAREILLY', 0, '535'),
(914, 'SBR', 'SABARKANTHA', 0, '2772'),
(915, 'PML', 'Panchmahal', 0, '2676'),
(916, 'NVM', 'Navimumbai', 0, '22'),
(917, 'DAU', 'Daund', 0, '2117'),
(918, 'NSK', 'Nashik', 0, '253'),
(919, 'BHI', 'Bhind', 0, '7539'),
(920, 'SGJ', 'Sahebganj', 0, '6436'),
(921, 'BNR', 'BULANDSHAHR', 0, '5734'),
(922, 'JMM', 'Jamner', 0, '2580'),
(923, 'FZR', 'Faizpur', 0, '2585'),
(924, 'PUD', 'Pusad', 0, '7233'),
(925, 'RAU', 'RAU', 0, '522'),
(926, 'AKM', 'ARAKKONAM', 0, '4177'),
(927, 'DLI', 'Dhaniakhali', 0, '33'),
(928, 'BHN', 'Bardhaman', 0, '341'),
(929, 'DGR', 'Durgapur', 0, '341'),
(930, 'ABG', 'Arambagh', 0, '33'),
(931, 'KGJ', 'Kishangunj', 0, '6456'),
(932, 'KVL', 'KANKAVALI', 0, '2367'),
(933, 'MNL', 'MANALI', 0, '1902'),
(934, 'SSU', 'THRISSUR', 0, '480'),
(935, 'CGU', 'CHENGANNUR', 0, '479'),
(936, 'NDI', 'NADIA', 0, '3473'),
(937, 'PLR', 'PORT BLAIR', 0, '3192'),
(938, 'JRT', 'JORHAT', 0, '376'),
(939, 'CAE', 'CHANDEL', 0, '3872'),
(940, 'CGK', 'CHINGKONPANG', 0, '3874'),
(941, 'KKU', 'MOKOKCHUNG', 0, '369'),
(942, 'ARH', 'ARRAH', 0, '6182'),
(943, 'GRW', 'GARHWA', 0, '6561'),
(944, 'LAH', 'LATEHAR', 0, '6565'),
(945, 'HJI', 'HAJIPUR', 0, '6224'),
(946, 'CRH', 'CHINSURAH', 0, '33'),
(947, 'RPY', 'RUPNARAYANPUR', 0, '341'),
(948, 'KDH', 'KHAKURDAH', 0, '3224'),
(949, 'SRI', 'SURI', 0, '3462'),
(950, 'KLG', 'KALIGUNJ', 0, '3473'),
(951, 'MYP', 'MAYAPUR', 0, '3473'),
(952, 'CHT', 'CHATRAPUR', 0, '7682'),
(953, 'SHO', 'SHEOPUR', 0, '7530');

-- --------------------------------------------------------

--
-- Table structure for table `cccompanymaster`
--

CREATE TABLE IF NOT EXISTS `cccompanymaster` (
  `companyId` int(11) NOT NULL,
  `companyCode` varchar(255) NOT NULL,
  `CompanyName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cccompanymaster`
--

INSERT INTO `cccompanymaster` (`companyId`, `companyCode`, `CompanyName`) VALUES
(1, '1', '3I INFOTECH LTD'),
(2, '2', '3M INDIA LTD'),
(3, '3', 'A AND E INDIA PVT LTD'),
(4, '4', 'A PLUS EDUCATION SOLUTIONS PRIVATE LIMITED'),
(5, '5', 'AARTI DRUGS LTD'),
(6, '6', 'AARTI INDUSTRIES LTD'),
(7, '7', 'AARTI INTERNATIONAL LTD'),
(8, '8', 'AARTI STEELS LTD'),
(9, '9', 'AB MAURI INDIA PRIVATE LIMITED'),
(10, '10', 'ABB LIMTED'),
(11, '11', 'ABBOTT INDIA LTD'),
(12, '12', 'ABC BEARINGS LTD'),
(13, '13', 'ABIR INFRASTRUCTURE PRIVATE LIMITED'),
(14, '14', 'ACB (INDIA) LTD'),
(15, '15', 'ACCEL FRONTLINE LIMITED'),
(16, '16', 'ACCENTURE SERVICES PRIVATE LTD'),
(17, '17', 'ACE CALDERYS LTD'),
(18, '18', 'ACER INDIA PRIVATE LIMITED'),
(19, '19', 'ACKRUTI CITY LIMITED'),
(20, '20', 'ADANI POWER LTD'),
(21, '21', 'ADANI WILMAR LIMITED'),
(22, '22', 'ADECCO INDIA PRIVATE LIMITED'),
(23, '23', 'ADIDAS INDIA PRIVATE LIMITED'),
(24, '24', 'ADM AGRO INDUSTRIES INDIA PRIVATE LIMITED'),
(25, '26', 'ADOBE SOFTWARE INDIA PRIVATE LIMITED'),
(26, '27', 'ADOBE SYSTEMS INDIA PRIVATE LIMITED'),
(27, '28', 'ADOR WELDING LIMITED'),
(28, '29', 'ADP PRIVATE LIMITED'),
(29, '30', 'AECOM INDIA PRIVATE LIMITED'),
(30, '31', 'AEGIS LOGISTICS LTD'),
(31, '32', 'AEON CREDIT SERVICES INDIA PRIVATE LIMITED'),
(32, '33', 'AFCONS INFRASTRUCTURE LTD'),
(33, '34', 'AIR LIQUIDE ENGINEERING INDIA PRIVATE LIMITED'),
(34, '35', 'AIR LIQUIDE MEDICAL SYSTEMS PRIVATE LIMITED'),
(35, '36', 'AIRCEL CELLULAR LTD'),
(36, '37', 'AIRCEL LTD'),
(37, '38', 'AIRCHECK INDIA PRIVATE LIMITED'),
(38, '39', 'AJANTA PHARMA LTD'),
(39, '41', 'ALEMBIC LTD'),
(40, '42', 'ALKEM LABORATORIES LIMITED'),
(41, '43', 'ALLANASONS LTD'),
(42, '44', 'ALLCARGO GLOBAL LOGISTICS LIMITED'),
(43, '45', 'ALLERGAN INDIA PRIVATE LIMITD'),
(44, '46', 'ALLIED DIGITAL SERVICE LTD'),
(45, '47', 'ALOK INDUSTRIES LTD'),
(46, '48', 'ALSTOM INDIA LIMITED'),
(47, '49', 'ALSTOM TRANSPORT INDIA LIMITED'),
(48, '50', 'ALSTOMT&D INDIA LTD'),
(49, '51', 'AMARA RAJA BATTERIES LTD'),
(50, '52', 'AMARACHAND & MANGALDAS &SURESH A SHROFF &CO'),
(51, '54', 'AMBUJA CEMENT LTD'),
(52, '57', 'AMERICAN EXPRESS BANKING CORP.'),
(53, '58', 'AMERICAN EXPRESS SERVICES INDIA LIMITED'),
(54, '59', 'AMERICAN EXPRESS(INIDA) PRIVATE LIMITED'),
(55, '60', 'AMERIPRISE INDIA PRIVATE LIMITED'),
(56, '61', 'ANGELIQUE INTERNATIONAL LTD'),
(57, '62', 'ANIL LTD'),
(58, '64', 'ANUPAM-MHI INDUSTRIES LIMITED'),
(59, '65', 'ANZ OPERATIONS AND TECHNOLOGY PRIVATE LIMITED'),
(60, '66', 'APOLLO INTERNATIONAL LTD'),
(61, '67', 'APOLLO TYRES LTD'),
(62, '68', 'APPLE INDIA PRIVATE LIMITED'),
(63, '69', 'APTECH LIMITED'),
(64, '70', 'ARVAL INDIA PRIVATE LIMITED'),
(65, '71', 'ARVIND LTD'),
(66, '72', 'ASB INTERNATIONAL PRIVATE LIMITED'),
(67, '73', 'ASCO NUMATICS (INDIA) PRIVATE LIMITED'),
(68, '74', 'ASHOK LEYLAND LTD'),
(69, '75', 'ASIAN PAINTS LTD'),
(70, '76', 'ASTRAZENECA PHARMA INDIA LTD'),
(71, '77', 'ATLANTA LIMITED'),
(72, '78', 'ATLAS COPCO (INIDA) LTD'),
(73, '79', 'ATOS INDIA PRIVATE LIMITED'),
(74, '80', 'AUDCO INDIA LTD'),
(75, '81', 'AUROBINDO PHARMA LTD'),
(76, '82', 'AUTOMOTIVE AXLES LTD'),
(77, '83', 'AVERY DENNISON (INDIA) PRIVATE LIMITED'),
(78, '84', 'AVERY WEIGH-TRONIX PRIVATE LIMITED'),
(79, '85', 'AVNET INDIA PRIVATE LIMITED'),
(80, '86', 'AVON CYCLES LTD'),
(81, '87', 'AVTEC LTD'),
(82, '88', 'BACKBONE ENTERPRISES LTD'),
(83, '89', 'BAJAJ AUTO LTD'),
(84, '90', 'BAJAJ HINDUSTHAN LIMITED'),
(85, '91', 'BAKER HUGHES SINGAPORE PTE LTD'),
(86, '92', 'BALDOR ELECTRIC INDIA PRIVATE LIMITED'),
(87, '93', 'BALLARPUR INDUSTRIES LTD'),
(88, '94', 'BALRAMPUR CHINI MILLS LTD'),
(89, '95', 'BANGALORE INTERNATIONAL AIRPORT LIMITED'),
(90, '96', 'BANNARI AMMAN SPINNING MILLS LIMITED'),
(91, '97', 'BANNARI AMMAN SUGARS LTD'),
(92, '98', 'BATA INDIA LTD'),
(93, '99', 'BAXTER INDIA PRIVATE LIMITED'),
(94, '100', 'BBF INDUSTRIES LTD'),
(95, '101', 'BEHR INDIA LIMITED'),
(96, '102', 'BENQ INDIA PRIVATE LIMITED'),
(97, '103', 'BERCO UNDERCARRIAGES (INDIA) PRIVATE LIMITED'),
(98, '104', 'BERGER PAINTS INDIA LTD'),
(99, '105', 'BGR ENERGY SYSTEMS LTD'),
(100, '106', 'BHARAT BIOTECH INTERNATIONAL LIMITED'),
(101, '107', 'BHARAT FORGE LTD'),
(102, '108', 'BHARAT HEAVY ELECTRICALS LIMITED'),
(103, '109', 'BHARAT PETROLEUM CORPN LTD'),
(104, '110', 'BHARAT SANCHAR NIGAM LIMITED'),
(105, '111', 'BHARATI AIRTEL LTD'),
(106, '112', 'BHARATI FOUNDATION'),
(107, '113', 'BHARATI HEXACOM LTD'),
(108, '114', 'BHARATI RETAIL LIMITED'),
(109, '115', 'BHP MINERALS INDIA PRIVATE LIMITED'),
(110, '116', 'BHUSHAN POWER & STEEL LIMITED'),
(111, '117', 'BINANI CEMENT LIMITED'),
(112, '118', 'BIRLA CORPORATION LTD'),
(113, '119', 'BLUE CROSS LABORATORIES LTD'),
(114, '120', 'BLUE DART AVIATION LIMITED'),
(115, '121', 'BLUE DART EXPRESS LTD'),
(116, '122', 'BLUE STAR LTD'),
(117, '123', 'BMC SOFTWARE INDIA PRIVATE LIMITED'),
(118, '125', 'BOMBARDIER TRANSPORTATION INDIA LIMITED'),
(119, '126', 'BOSCH CHASSIS SYSTEMS INDIA LTD'),
(120, '127', 'BOSCH LTD'),
(121, '128', 'BOSTON CONSULTING GROUP (INDIA) PRIVATE LTD'),
(122, '129', 'BRAKES INDIA LIMITED'),
(123, '130', 'BRIDGESTONE INDIA PRIVATE LIMITED'),
(124, '131', 'BRIGHTEST CIRCLE JEWELLERY PVT LTD'),
(125, '132', 'BRITANNIA INDUSTRIES LTD'),
(126, '133', 'BSES YAMUNA POWER LTD'),
(127, '134', 'BT (INDIA) PRIVATE LIMITED'),
(128, '135', 'BVG INDIA LTD'),
(129, '136', 'C M C LTD'),
(130, '137', 'C&S ELECTRIC LTD'),
(131, '138', 'CA TECHNOLOGIES'),
(132, '139', 'CADBURY INDIA'),
(133, '140', 'CADENCE DESIGN SYSTEMS (INDIA) PVT LTD'),
(134, '141', 'CADILA HEALTHCATE LTD'),
(135, '142', 'CAIRN INDIA LTD'),
(136, '143', 'CANON INDIA PRIVATE LIMITED'),
(137, '144', 'CAPGEMINI BUSINESS SERVICES (INDIA) LIMITED'),
(138, '145', 'CAPGEMINI INDIA PRIVATE LTD'),
(139, '147', 'CARBORUNDUM UNIVERSAL LTD'),
(140, '148', 'CARGILL INDIA PVT LTD'),
(141, '149', 'CARLSBERG INDIA PRIVATE LIMITED'),
(142, '150', 'CARREFOUR WC&C INDIA PRIVATE LIMITED'),
(143, '151', 'CARZONRENT (INDIA) PRIVATE LIMITED'),
(144, '152', 'CASTROL INDIA LTD'),
(145, '153', 'CATERPILLAR INDIA PRIVATE LIMITED'),
(146, '154', 'CEAT LIMITED'),
(147, '155', 'CENTRAL COALFEILDS LIMITED'),
(148, '156', 'CENTURY ENKA LIMITED'),
(149, '157', 'CESC LTD'),
(150, '159', 'CHEMINOVA INDIA LIMITED'),
(151, '160', 'CHENNAI CONTAINER TERMINAL PRIVATE LIMITED'),
(152, '161', 'CHEVRON LUBRICANTS INDIA PRIVATE LIMITED'),
(153, '162', 'CIPLA LTD'),
(154, '163', 'CLARIANT (INDIA) LTD'),
(155, '164', 'CLSA INDIA LIMITED'),
(156, '165', 'CMC LIMITED'),
(157, '166', 'CNN'),
(158, '167', 'COAL (I) LTD'),
(159, '168', 'COCA-COLA INDIA PVT LTD'),
(160, '170', 'COLGATE-PALMOLIVE (INDIA) LTD'),
(161, '172', 'COMPUTER SCIENCE CORPORATION INDIA PVT LTD'),
(162, '173', 'COMVIVA TECHNOLOGIES LTD'),
(163, '174', 'CONCORDE AIR LOGISTICS LIMITED'),
(164, '175', 'CONSOLIDATED CONSTRUCTION CONSORTIUM LIMITED'),
(165, '176', 'CONTAINER CORPN OF INDIA LTD'),
(166, '177', 'CONTINENTAL INDIA LIMITED'),
(167, '178', 'COROMANDEL INTERNATIONAL LTD'),
(168, '179', 'CORPORATE ISPAT ALLOYS LTD'),
(169, '180', 'COUNTRY CLUB (INDIA) LTD'),
(170, '181', 'COX & KINGS LIMITED'),
(171, '182', 'CRISIL LTD'),
(172, '183', 'CROMPTON GREAVES LTD'),
(173, '184', 'CUMMINS INDIA LTD'),
(174, '185', 'CUMMINS TECHNOLOGIES INDIA LIMITED'),
(175, '186', 'CUMMINS TURBO TECHNOLOGIES LIMITED'),
(176, '187', 'CYBAGE SOFTWARE PRIVATE LIMITED'),
(177, '188', 'CYIENT LIMITED'),
(178, '189', 'DABUR INDIA LTD'),
(179, '192', 'DAINICHI COLOR INDIA PRIVATE LIMITED'),
(180, '193', 'DALMIA CEMENT (BHARAT) LTD'),
(181, '194', 'DANA INDIA PRIVATE LIMITED'),
(182, '195', 'DANA INDIA TECHNICAL CENTRE PRIVATE LIMITED'),
(183, '196', 'DANIEL MEASUREMENT SOLUTIONS PRIVATE LIMITED'),
(184, '197', 'DB CORP LIMITED'),
(185, '199', 'DELOITTE CONSULTING PVT LTD'),
(186, '200', 'DELOITTE HASKINS & SELLS'),
(187, '201', 'DELTA CORP LIMITED'),
(188, '202', 'DENSO HARYANA PRIVATE LIMITED'),
(189, '204', 'DHARAMPAL SATYAPAL LTD'),
(190, '205', 'DHL EXPRESS (INDIA) PRIVATE LIMITED'),
(191, '206', 'DHL LOGISTICS PRIVATE LIMITED'),
(192, '207', 'DIAGEO INDIA PRIVATE LIMITED'),
(193, '208', 'DIC INDIA LIMITED'),
(194, '209', 'DILIP BUILDCON LTD'),
(195, '210', 'DIMEXON DIAMONDS LIMITED'),
(196, '211', 'DISHNET WIRELESS LTD'),
(197, '212', 'DMX TECHNOLOGIES (INDIA) PRIVATE LIMITED'),
(198, '213', 'DORLING KINDERSLEY (INDIA) PRIVATE LIMITED'),
(199, '214', 'DOVER INDIA PRIVATE LIMITED'),
(200, '215', 'DOW AGROSCIENCES INDIA PRIVATE LIMITED'),
(201, '216', 'DOW CHEMICAL INTERNATIONAL PRIVATE LIMITED'),
(202, '217', 'DR REDDYS LABORATORIES LTD'),
(203, '218', 'DR. LAL PATHLABS PRIVATE LIMITED'),
(204, '219', 'DREDGING INTERNATIONAL INDIA PRIVATE LIMITED'),
(205, '220', 'DRIVE INDIA ENTERPRISE SOLUTIONS LTD'),
(206, '223', 'E I D-PARRY (INDIA) LTD'),
(207, '224', 'E I DUPONT INDIA PRIVATE LIMITED'),
(208, '225', 'E M I TRANSMISSION LIMITED'),
(209, '226', 'EAGLEBURGMANN INDIA PVT LTD'),
(210, '227', 'EASUN REYROLLE LIMITED'),
(211, '228', 'EASUN FLUID POWER LIMITED'),
(212, '229', 'EATON INDUSTRIES PRIVATE LIMITED'),
(213, '230', 'EBAY INDIA PRIVATE LIMITED'),
(214, '231', 'EDELWEISS CAPITAL LTD'),
(215, '232', 'EDELWEISS SECURITIES LTD'),
(216, '234', 'EICHER MOTORS LTD'),
(217, '235', 'EISAI PHARMACEUTICALS INDIA PRIVATE LIMITED'),
(218, '236', 'ELANTAS BEACK INDIA LTD'),
(219, '237', 'ELDER PHARMACEUTICALS LIMITED'),
(220, '238', 'ELECON ENGINEERING COMPANY LTD'),
(221, '239', 'ELGI EQUIPMENTS LIMITED'),
(222, '240', 'EMAMI LTD'),
(223, '241', 'EMC DATA STORAGE SYSTEMS INDIA PVT LTD'),
(224, '243', 'EMCO LTD'),
(225, '244', 'EMCURE PHARMACEUTICALS LTD'),
(226, '246', 'EMERSON NETWORK POWER (INDIA) PRIVATE LIMITE'),
(227, '248', 'ENGINEERS INDIA LTD'),
(228, '249', 'EQUANT SOLUTIONS INDIA PRIVATE LIMITED'),
(229, '250', 'ERA INFRA ENGG LTD'),
(230, '251', 'ERICSSON INDIA GLOBAL SERVICES PRIVATE LIMTED'),
(231, '252', 'ERICSSON INDIA PRIVATE LTD'),
(232, '253', 'ERNST & YOUNG INDIA PRIVATE LTD'),
(233, '254', 'ESAB INDIA LTD'),
(234, '255', 'ESCORTS LIMITED'),
(235, '256', 'ESSAR CONSTRUCTIONS LIMITED'),
(236, '257', 'ESSAR OIL LTD'),
(237, '258', 'ESSAR POWER LIMITED'),
(238, '259', 'ESSEL PROPACK LTD'),
(239, '260', 'ESTER INDUSTRIES LIMITED'),
(240, '261', 'EVEREADY INDUSTRIES INDIA LTD'),
(241, '262', 'EVEREST INDUSTRIES LIMITED'),
(242, '263', 'EXCEL CROP CARE LTD'),
(243, '264', 'EXL SERVICE.COM(INDIA) PVT LTD'),
(244, '265', 'EXPERIS IT PRIVATE LIMITED'),
(245, '266', 'F A G BEARINGS INDIA LTD'),
(246, '267', 'F D C LTD'),
(247, '268', 'FACOR ALLOYS LTD'),
(248, '269', 'FAG BESRINGS INDIA LIMITED'),
(249, '270', 'FEDERAL-MOGUL GOETZE (INDIA) LIMITED'),
(250, '272', 'FENNER (INDIA) LTD'),
(251, '274', 'FINOLEX CABLES LTD'),
(252, '275', 'FINOLEX INDUSTRIES LIMITED'),
(253, '276', 'FIRST DATA (INDIA) PRIVATE LIMITED'),
(254, '277', 'FIRST TRAND BANK LIMITED'),
(255, '278', 'FLEX INDUSTRIES LTD'),
(256, '279', 'FLEXITUFF INTERNATIONAL LIMITED'),
(257, '280', 'FLSMIDTH PRIVATE LIMITED'),
(258, '282', 'FORBES & COMPANY LIMITED'),
(259, '283', 'FORBES MARSHALL PRIVATE LIMTED'),
(260, '284', 'FORCE MOTORS LTD'),
(261, '285', 'FORD INDIA PRIVATE LIMITED'),
(262, '286', 'FOSTER WHEELER INDIA PRIVATE LIMITED'),
(263, '287', 'FRESENIUS KABI ONCOLOGY LIMITED'),
(264, '288', 'FRIGERIO CONSERVA ALLANA LTD'),
(265, '289', 'FUJIFILM SERICOL INDIA PRIVATE LIMITED'),
(266, '290', 'FUJITSU CONSULTING INDIA PRIVATE LIMITED'),
(267, '291', 'G A I L (INDIA) LTD'),
(268, '292', 'G H C L LTD'),
(269, '293', 'GANNON DUNKERLEY & CO LTD'),
(270, '295', 'GATI LIMITED'),
(271, '296', 'GAYATRI PROJECTS LIMITED'),
(272, '297', 'GE GLOBAL SOURCING INDIA PVT LTD'),
(273, '298', 'GE INDIA EXPORTS PRIVATE LIMITED'),
(274, '299', 'GE INDIA INDUSTRIES PRIVATE LIMITED'),
(275, '300', 'GENERAL MOTORS INDIA PRIVATE LIMITED'),
(276, '302', 'GENPACT INDIA'),
(277, '303', 'GEOMETRIC LIMITED'),
(278, '304', 'GETRONICS SOLUTIONS INDIA PRIVATE LIMITED'),
(279, '305', 'GILI INDIA LIMITED'),
(280, '306', 'GILLETTE INDIA LTD'),
(281, '307', 'GILLETTE INDUSTRIES LTD'),
(282, '308', 'GIMPEX LTD'),
(283, '309', 'GITANJALI BRANDS LTD'),
(284, '310', 'GLAXOSMITHKLINE CONSUMER HEALTHCARE LTD'),
(285, '311', 'GLAXOSMITHKLINE PHARMACEUTICALS LTD'),
(286, '312', 'GLENMARK GENERICS LTD'),
(287, '313', 'GLENMARK PHARMACEUTICAL LTD'),
(288, '314', 'GMR INFRASTRUCTURE LIMITED'),
(289, '315', 'GODFREY PHILLIPS INDIA LTD'),
(290, '316', 'GODREJ AGROVET LTD'),
(291, '317', 'GODREJ AND BOYCE MANUFACTURING COMPANY LTD'),
(292, '318', 'GODREJ CONSUMER PRODUCTS LTD'),
(293, '319', 'GODREJ HERSHEY LIMITED'),
(294, '320', 'GODREJ HOUSEHOLD PRODUCTS LIMITED'),
(295, '321', 'GODREJ INDUSTRIES LTD'),
(296, '322', 'GODREJ PROPERTIES'),
(297, '323', 'GODREJ TYSON FOODS LIMITED'),
(298, '324', 'GOODRICH AEROSPACE SERVICES PRIVATE LTD'),
(299, '325', 'GOODYEAR INDIA LTD'),
(300, '326', 'GOOGLE INDIA PRIVATE LIMITED'),
(301, '327', 'GRAPHITE INDIA LTD'),
(302, '328', 'GREATSHIP (INDIA) LTD'),
(303, '329', 'GRAVES COTTON LTD'),
(304, '330', 'GREENPLY INDUSTRIES LTD'),
(305, '331', 'GRINDWELL NORTON LTD'),
(306, '332', 'GUARDIAN LIFECARE PRIVATE LIMITED'),
(307, '333', 'GUJARAT FLUOROCHEMICALS LTD'),
(308, '334', 'GUJARAT NARMADA VALLEY FERILIZERS COMPANY LTD'),
(309, '335', 'GUJARAT NRE COKE LTD'),
(310, '336', 'GVK POWER & INFRASTRUCTURE LIMITED'),
(311, '337', 'H E G LTD'),
(312, '338', 'HARSHA ENGINEERS LIMITED'),
(313, '339', 'HATSUN AGRO PRODUCT LIMITED'),
(314, '340', 'HAVELLS INDIA LTD'),
(315, '341', 'HAZIRA LNG PRIVATE LIMITED'),
(316, '342', 'HBL POWER SYSTEMS LIMITED'),
(317, '343', 'HCL INFOSYSTEMS LTD'),
(318, '344', 'HCL TECHNOLOGIES LTD'),
(319, '345', 'H D MOTOR COMPANY INDIA PRIVATE LIMITED'),
(320, '346', 'HEADSTRONG SERVICES INDIA PVT LTD'),
(321, '347', 'HENKEL CAC PRIVATE LIMITED'),
(322, '348', 'HENKEL INDIA LIMITED'),
(323, '349', 'HENLEY TEROSON INDIA LIMITED'),
(324, '350', 'HENLEY MARKETING PRIVATE LIMITED'),
(325, '351', 'HETERO DRUGS LIMITED'),
(326, '352', 'HINDALCO INDUSTRIES LTD'),
(327, '353', 'HINDUSTAN AERONAUTICS LIMITED'),
(328, '354', 'HINDUSTAN COCA-COLA BEVERAGES PRIVATE LIMITED'),
(329, '355', 'HINDUSTAN COPPER LTD'),
(330, '356', 'HINDUSTAN PETROLEUM CORPORATION LTD'),
(331, '357', 'HINDUSTAN UNILEVER LTD'),
(332, '358', 'HINDUSTATN ZINC LTD'),
(333, '359', 'HITACHI CONSULTING INDIA PRIVATE LTD'),
(334, '360', 'HITACHI HOME & LIFE SOLUTIONS INDIA LTD'),
(335, '361', 'HITACHI INDIA PRIVATE LIMITED'),
(336, '362', 'HITACHI KOKI INDIA LIMITED'),
(337, '363', 'HITACHI LIMITED'),
(338, '364', 'HI-TECH GEARS LIMITED'),
(339, '365', 'HLL LIFECARE LIMITED'),
(340, '366', 'HOLCIM SERVICES (SOUTH ASIA) LIMITED'),
(341, '367', 'HONDA MOTOR INDIA PRIVATE LIMITED'),
(342, '368', 'HONDA MOTORCYCLE & SCOOTER INDIA (PVT.) LTD'),
(343, '369', 'HONDA R&D (INDIA) PRIVATE LIMITED'),
(344, '370', 'HONDA SIEL POWER PRODUCTS LTD'),
(345, '371', 'HONEYWELL AUTOMATION INDIA LTD'),
(346, '372', 'HOSPIRA HEALTHCARE INDIA PRIVATE LIMITED'),
(347, '373', 'HOVER AUTOMOTIVE INDIA PRIVATE LIMITED'),
(348, '374', 'HSIL LIMITED'),
(349, '375', 'HUAWEI TECHNOLOGIES INDIA PRIVATE LIMITED'),
(350, '376', 'I C I INDIA LTD'),
(351, '377', 'I C S A (INDIA) LIMITED'),
(352, '378', 'IBM INDIA PVT LTD'),
(353, '379', 'ICICI BANK LTD'),
(354, '380', 'ICICI HOME FINANCE COMPANY LIMITED'),
(355, '381', 'ICICI LOMBARD GENERAL INSURANCE CO LTD'),
(356, '382', 'ICICI PRUDENTIAL ASSET MANAGEMENT CO LTD'),
(357, '383', 'ICICI PRUDENTIAL LIFE INSURANCE CO LTD'),
(358, '384', 'ICICI SECURITIES LTD'),
(359, '385', 'ICICI SECURITIES PRIMARY DEALERSHIP LTD'),
(360, '386', 'ICICI TRUSTEESHIP SERVICES LTD'),
(361, '387', 'ICICI VENTURES FUND MANAGEMENT CO LTD'),
(362, '388', 'IDEA CELLULAR LTD'),
(363, '389', 'IDEAL ROAD BUILDERS PRIVATE LIMITED'),
(364, '390', 'IFB AUTOMOTIVE PRIVATE LIMITED'),
(365, '391', 'IFB INDUSTRIES LTD'),
(366, '392', 'IFCI LIMITED'),
(367, '393', 'IGATE GLOBAL SOLUTIONS LIMITED'),
(368, '394', 'IGATE PATNI LTD'),
(369, '395', 'INAUTIX TECHNOLOGIES INDIA PRIVATE LIMITED'),
(370, '396', 'INDIA GLYCOLS LIMITED'),
(371, '397', 'INDIA INFOLINE LIMITED'),
(372, '398', 'INDIA MEDTRONIC PRIVATE LIMITED'),
(373, '399', 'INDIABULLS FINANCIAL SERVICES LIMITED'),
(374, '400', 'INDIABULLS HOUSING FINANCE LTD'),
(375, '401', 'INDIABULLS SECURITIES LIMITED'),
(376, '402', 'INDIACAN EDUCATION PRIVATE LIMITED'),
(377, '403', 'INDIAN HOTELS LTD'),
(378, '404', 'INDIAN IMMUNOLOGICALS LTD'),
(379, '405', 'INDIAN OIL CORPN. LTD.'),
(380, '406', 'INDO RAMA SYNTHETICS (INDIA) LIMITED'),
(381, '407', 'INDOFIL INDUSTRIES LIMITED'),
(382, '408', 'INDRAPRASTHA GAS LTD'),
(383, '409', 'INDU PROJECTS LTD'),
(384, '410', 'INDUS TOWER LIMITED'),
(385, '411', 'INEOS ABS (INDIA) LTD'),
(386, '413', 'INFO EDGE INDIA LTD'),
(387, '414', 'INFOSYS CONSULTING INDIA LIMITED'),
(388, '415', 'INFOSYS TECHNOLOTIES LTD'),
(389, '417', 'INGERSOLL-RAND (INDIA) LTD'),
(390, '418', 'INGERSOLL-RAND INTERNATIONAL (INDIA) LIMITED'),
(391, '419', 'INGRAM MICRO INDIA LIMITED'),
(392, '420', 'INOX AIR PRODUCTS LIMITED'),
(393, '421', 'INOX LEISURE LIMITED'),
(394, '422', 'INSECTICIDES INDIA LTD'),
(395, '423', 'INSTITUTE OF RURAL MANAGEMENT ANAND (IRMA)'),
(396, '424', 'INTAS PHARMACEUTICAL LTD'),
(397, '425', 'INTEL TECHNOLOGIES INDIA PRIVATE LIMITED'),
(398, '426', 'INTEQ IT SERVICES (INDIA) PRIVATE LIMITED'),
(399, '427', 'INTERNATIONAL TRACTORS LTD'),
(400, '428', 'INTUIT TECHNOLOGY SERVICES PRIVATE LIMITED'),
(401, '429', 'IPCA LABORATORIES LTD'),
(402, '430', 'ISS SDB SECURITY SERVICES PRIVATE LIMITED'),
(403, '431', 'ITC LTD'),
(404, '432', 'ITRON INDIA PRIVATE LIMITED'),
(405, '433', 'ITW INDIA LIMITED'),
(406, '434', 'J B CHEMICALS & PHARMACEUTICALS LTD'),
(407, '435', 'J K CEMENT PVT LTD'),
(408, '436', 'J KUMAR INFRAPROJECTS LIMITED'),
(409, '437', 'JAGAT JIT INDUSTRIES LIMITED'),
(410, '438', 'JAGRAN PRAKASHAN LTD'),
(411, '439', 'JAIN IRRIGATION SYSTEMS LTD'),
(412, '440', 'JAIPRAKSH ASSOCIATES LTD'),
(413, '441', 'JAMNA AUTO INDUSTRIES LIMITED'),
(414, '442', 'JAY BHARAT MARUTI LTD'),
(415, '443', 'JCB INDIA LIMITED'),
(416, '444', 'JET AIRWAYS (INDIA) LIMITED'),
(417, '445', 'JEWELLEX INDIA PRIVATE LIMITED PART IX'),
(418, '446', 'JINDAL DRILLING AND INDUSTRIES LIMITED'),
(419, '447', 'JINDAL PHOTO LTD'),
(420, '448', 'JINDAL POLY FILMS LIMITED'),
(421, '449', 'JINDAL POWER LIMITED'),
(422, '450', 'JINDAL SAW LTD'),
(423, '451', 'JINDAL STAINLESS STEELWAY LTD'),
(424, '452', 'JINDAL STEEL & POWER LTD'),
(425, '453', 'JK LAKSHMI CEMENT LIMITED'),
(426, '454', 'JK PAPER LIMITED'),
(427, '455', 'JK TYRE & INDUSTRIES LIMITED'),
(428, '456', 'JMC PROJECTS (INDIA) LIMITED'),
(429, '457', 'JOHN DEERE FINANCEIAL INDIA PRIVATE LIMITED'),
(430, '458', 'JOHN DEERE INDIA PRIVATE LIMITED'),
(431, '459', 'JOHNSON & JOHNSON LTD'),
(432, '460', 'JOHNSON SCREENS (INDIA) PRIVATE LIMITED'),
(433, '461', 'JSW ENERGY LIMITED'),
(434, '462', 'JSW STEEL LTD'),
(435, '463', 'JTEKT SONA AUTOMOTIVE INDIA LTD'),
(436, '464', 'JUBILANT INDUSTRIES LTD'),
(437, '465', 'JUBILANT LIFE SCIENCE LIMITED'),
(438, '466', 'JUNIPER NETWORKS INDIA PRIVATE LIMITED'),
(439, '467', 'JYOTHY LABORATORIES LTD'),
(440, '468', 'JYOTI STRUCTURES LIMITED'),
(441, '469', 'KSB PUMPS LIMITED'),
(442, '470', 'KAJARIA CERAMICS LIMITED'),
(443, '471', 'KALPATARU POWER TRANSMISSION LTD'),
(444, '472', 'KALYANI STEEL LTD'),
(445, '473', 'KANSAI NEROLAC PAINTS LTD'),
(446, '474', 'KAPLAN (INDIA) PRIVATE LIMTED'),
(447, '475', 'KARVY COMPUTEERSHARE PRIVATE LIMITED'),
(448, '476', 'KEC INTERNATIONAL LTD'),
(449, '477', 'KELLY SERVICES INDIA PRIVATE LIMITED'),
(450, '478', 'KENNAMETAL INDIA LIMITED'),
(451, '479', 'KENT RO SYSTEMS LTD'),
(452, '480', 'KIMBERLY-CLARK LEVER PRIVATE LIMITED'),
(453, '482', 'KIRI INDUSTRIES LTD'),
(454, '483', 'KIRL OSKAR BROTHERS LTD'),
(455, '484', 'KIRL OSKAR FERROUS INDUSTRIES LTD'),
(456, '485', 'KNR CONSTRUCTIONS LIMITED'),
(457, '486', 'KOBELCO CRANES INDIA PRIVATE LIMITED'),
(458, '487', 'KORES (INDIA) LIMITED'),
(459, '488', 'KP CORPORATE SOLUTIONS LIMITED'),
(460, '489', 'KRBL LIMITED'),
(461, '490', 'KRISHAK BHARATI CO-OPERATIVE LIMITED'),
(462, '491', 'KRISHI RASAYAN EXPORTS PVT LTD'),
(463, '492', 'KRYFS POWER COMPONENTS LTD'),
(464, '493', 'KWALITY DAIRY (INDIA) LTD'),
(465, '494', 'L&T FINANCE LTD'),
(466, '495', 'L&T INFRASTRUCTURE FINANCE COMPANY LTD'),
(467, '496', 'L&T -KOMATSU LTD'),
(468, '498', 'LAFARGE INDIA PVT LTD'),
(469, '499', 'LARSEN & TOUBRO INFOTECH LIMITED'),
(470, '500', 'LARSEN & TOUBRO LIMITED'),
(471, '501', 'LEAR AUTOMOTIVE INDIA PVT LTD'),
(472, '502', 'LEIGHTON WELSPUN CONTRACTOR PRIVATE LIMITED'),
(473, '503', 'LG ELECTRONICS PRIVATE LIMITED'),
(474, '504', 'LG LIFE SCIENCE INDIA PRIVATE LIMITED'),
(475, '505', 'LG SOFT INDIA PRIVATE LIMITED'),
(476, '506', 'LIC HOUSING FINANCE LTD'),
(477, '507', 'LOHA ISPAAT LIMITED'),
(478, '508', 'LOYALTY SOLUTIONS & RESEARCH PRIVATE LIMITED'),
(479, '509', 'LT FOODS LTD'),
(480, '510', 'LUBRIZOL INDIA PRIVATE LIMITED'),
(481, '511', 'LUCAS-TVS LTD'),
(482, '512', 'LUMAX INDUSTRIES LIMITED'),
(483, '513', 'LUMINOUS POWER TECHNOLOGIES PRIVATE LIMITED'),
(484, '514', 'LUPIN LTD'),
(485, '515', 'LUXURY GOODS RETAIL PRIVATE LIMITED'),
(486, '516', 'M R F LTD'),
(487, '517', 'MACKINTOSH BURN LTD'),
(488, '518', 'MADRAS CEMENTS LTD'),
(489, '520', 'MAGMA FINANCE LIMITED'),
(490, '521', 'MAHANAGAR GAS LIMITED'),
(491, '522', 'MAHARASHTRA SEAMLESS LTD'),
(492, '523', 'MAHINDRA & MAHINDRA FINANCIAL SERVICES LTD'),
(493, '524', 'MAHINDRA & MAHINDRA LTD'),
(494, '525', 'MAHINDRA HOLIDAY & RESORTS INDIA LTD'),
(495, '526', 'MAHINDRA SATYAM'),
(496, '527', 'MAHINDRA SONA LTD'),
(497, '528', 'MAN INDUSTRIES (INDIA) LIMITED'),
(498, '529', 'MAN INFRACONSTRUCTION LTD'),
(499, '530', 'MAN TURBO INDIA PRIVATE LIMITED'),
(500, '531', 'MANAKSIA LTD'),
(501, '532', 'MANAPPURAM FINANCE LTD'),
(502, '533', 'MANDHANA INDUSTRIES LIMITED'),
(503, '534', 'MANKIND PHARMA LTD'),
(504, '535', 'MANUGRAPH INDIA LTD'),
(505, '536', 'MARIC LTD'),
(506, '537', 'MARUTI SUZUKI INDIA LIMITED'),
(507, '538', 'MASTEK LTD'),
(508, '539', 'MATHER AND PLATT PUMPS LIMITED'),
(509, '540', 'MAX INDIA LTD'),
(510, '541', 'MAX MRO SERVICES PRIVATE LIMITED'),
(511, '542', 'MAYUR UNIQUOTERS LTD'),
(512, '543', 'MCAFEE SOFTWARE (INDIA) PRIVATE LIMITED'),
(513, '544', 'MCDONALDS INDIA PRIVATE LIMITED'),
(514, '545', 'MCKINSEY & COMPANY INC'),
(515, '546', 'MCLEOD RUSSEL INDIA LTD'),
(516, '547', 'MECON LTD'),
(517, '548', 'MEDLEY PHARMACEUTICALS LTD'),
(518, '549', 'MEGHMANI ORGANICS LTD'),
(519, '550', 'MERCEDES-BENZ INDIA PRIVATE LIMITED'),
(520, '551', 'METRO CASH AND CARRY INDIA PRIVATE LIMITED'),
(521, '552', 'METRO SHOES'),
(522, '553', 'MEYER ORGANICS PRIVATE LIMITED'),
(523, '554', 'MIC ELECTRICS LIMITED'),
(524, '555', 'LICHELL BEARINGS (INDIA) PRIVATE LIMITED'),
(525, '556', 'MICRO INKS LTD'),
(526, '557', 'MICRO LABS LTD'),
(527, '558', 'MICROSOFT CORPORATION (INDIA) PVT LTD'),
(528, '559', 'MICROSOFT INDIA (R&D) PRIVATE LIMITED'),
(529, '560', 'MILTONROY INDIA PRIVATE LIMITED'),
(530, '561', 'MINDA INDUSTRIES LIMITED'),
(531, '562', 'MINDTREE LIMITED'),
(532, '563', 'MIRC ELECTRONICS LIMITED'),
(533, '564', 'MITSUBISHI CORPORATION'),
(534, '566', 'MITSUBISHI ELECTRIC INDIA PRIVATE LIMITED'),
(535, '567', 'MIZUHO CORPORATE BANK LIMITED'),
(536, '568', 'MM FORGINGS LTD'),
(537, '569', 'MOBIS INDIA LIMITED'),
(538, '570', 'MODI RUBBER LIMITED'),
(539, '571', 'MOEN INDIA PRIVATE LIMITED'),
(540, '572', 'MOIL LTD'),
(541, '573', 'MONSTER.COM (INDIA) PRIVATE LIMITED'),
(542, '575', 'MOTHERSON SUMI SYSTEMS LTD'),
(543, '576', 'MRF LTD'),
(544, '577', 'MSD PHARMACEUTICALS PRIVATE LIMITED'),
(545, '578', 'MSTC LTD'),
(546, '579', 'MTC BUSINESS PRIVATE LIMITED'),
(547, '580', 'MUKAND LIMITED'),
(548, '581', 'MUNJAL AUTO INDUSTRIES LIMITED'),
(549, '582', 'MUNJAL SHOWA LIMITED'),
(550, '583', 'NAGARJUNA FERTILIZERS AND CHEMICALS LTD'),
(551, '584', 'NALCO WATER INDIA LIMITED'),
(552, '585', 'NAPC LIMITED'),
(553, '586', 'NARUS NETWORKS PRIVATE LIMITED'),
(554, '587', 'NATCO PHARMA LTD'),
(555, '589', 'NATIONAL STOCK EXCHANGE OF INDIA LIMITED'),
(556, '590', 'NAVAYUGA ENGINEERING COMPANY LTD'),
(557, '591', 'NAVNEET PUBLICATIONS (INDIA) LTD'),
(558, '593', 'NEC INDIA PRIVATE LIMITED'),
(559, '594', 'NEO STRUCTO CONSTRUCTION LTD'),
(560, '596', 'NEPHROLIFE CARE (INDIA) PRIVATE LIMITED'),
(561, '597', 'NESTLE INDIA LTD'),
(562, '598', 'NETAFIM IRRIGATION INDIA PRIVATE LIMITED'),
(563, '599', 'NETAPP INDIA PRIVATE LIMITED'),
(564, '600', 'NEYVELI LIGNITE CORPN. LTD.'),
(565, '601', 'NIIT LIMITED'),
(566, '602', 'NIIT TECHNOLOGIES LIMITED'),
(567, '603', 'NIKE INDIA PRIVATE LIMITED'),
(568, '604', 'NILKAMAL LTD'),
(569, '605', 'NIPPON STEEL INDIA PRIVATE LIMITED'),
(570, '606', 'NIPPON STEEL PIPE INDIA PRIVATE LIMITED'),
(571, '607', 'NIRMA LTD'),
(572, '608', 'NITCO LTD'),
(573, '609', 'NKG INFRASTRUCTURE LTD'),
(574, '610', 'NOIDA POWER COMPANY LTD'),
(575, '611', 'NOKIA INDIA PVT LTD'),
(576, '612', 'NOKIA SIEMENS NETWORKS PRIVATE LIMITED'),
(577, '613', 'NOMURA SERVICES INDIA PRIVATE LIMITED'),
(578, '614', 'NOVARTIS HEALTHCARE PRIVATE LIMITED'),
(579, '615', 'NOVARTIS INDIA LTD'),
(580, '616', 'NSL SUGARS LTD'),
(581, '617', 'NTPC LTD'),
(582, '618', 'NU TEK INDIA LTD'),
(583, '619', 'NUCLEUS SOFTWAR EXPORTS LIMITED'),
(584, '620', 'NUMALIGARH REFINERY LIMITED'),
(585, '621', 'NVIDA GRAPHICS PRIVATE LIMITED'),
(586, '622', 'OCEAN SPARKLE LIMITED'),
(587, '623', 'OCL INDIA LTD'),
(588, '624', 'OIL & NATURAL GAS CORPN. LTD.'),
(589, '625', 'OIL INDIA LIMITED'),
(590, '626', 'OM LOGISTICS LTD'),
(591, '627', 'ON MOBILE GLOBAL LTD'),
(592, '628', 'OOCL (INDIA) PRIVATE LIMITED'),
(593, '629', 'ORACLE CORP'),
(594, '630', 'ORACLE INDIA PRIVATE LIMITED'),
(595, '631', 'ORIENT PAPER & INDS. LIMITED'),
(596, '632', 'OSRAM INDIA PRIVATE LIMITED'),
(597, '633', 'OSWAL WOOLLEN MILLS LTD'),
(598, '634', 'P T C INDIA LTD'),
(599, '635', 'PANACEA BIOTECH LTD'),
(600, '636', 'PANTALOON RETAIL (INDIA) LTD'),
(601, '637', 'PARADEEP PHOSPHATES LIMITED'),
(602, '638', 'PARAS PHARMACEUTICALS LIMITED'),
(603, '639', 'PARLE BISCUITS PRIVATE LIMITED'),
(604, '640', 'PATAKA INDUSTRIES PRIVATE LIMITED'),
(605, '641', 'PATEL ENGINEERING LTD'),
(606, '642', 'PAYPAL INDIA PRIVATE LIMITED'),
(607, '643', 'PEARSON EDUCATION SERVICES PRIVATE LIMITED'),
(608, '644', 'PEC LTD.'),
(609, '645', 'PEPSICO INDIA HOLDINGS PVT LTD'),
(610, '646', 'PERRIGO LABORATORIES INDIA PRIVATE LIMITED'),
(611, '647', 'PERSISTENT SYSTEMS LTD'),
(612, '649', 'PETRO ARALDITE PRIVATE LIMITED'),
(613, '650', 'PETRON ENGINEERING CONSTRUCTION LTD'),
(614, '651', 'PFIZER LTD'),
(615, '652', 'PFIZER PHARMACEUTICAL INDIA PRIVATE LIMITED'),
(616, '653', 'PHILLIPS CARBON BLACK LTD'),
(617, '654', 'PI INDUSTRIES LIMITED'),
(618, '655', 'PIAGGIO VEHICLES PRIVATE LIMITED'),
(619, '656', 'PIDILITE INDUSTRIES LTD'),
(620, '657', 'PIONEER INDIA ELECTRONICS PRIVATE LIMITED'),
(621, '658', 'PIRAMAL HEALTHCARE LTD'),
(622, '659', 'PITNEY BOWES SOFTWARE PRIVATE LIMITED'),
(623, '660', 'PLETHICO PHARMACEUTICALS LTD'),
(624, '661', 'PNC INFRATECH LIMITED'),
(625, '663', 'POSCO- INDIA PRIVATE LIMITED'),
(626, '664', 'POWERGRID CORPORATION OF INDIA LTD'),
(627, '665', 'POWERICA LTD'),
(628, '666', 'POWERLINKS TRANSMISSION LIMITED'),
(629, '667', 'PRAJ INDUSTRIES LTD'),
(630, '668', 'PRAKASH INDUSTRIES LIMITED'),
(631, '669', 'PRAKASH STEELAGE LIMITED'),
(632, '670', 'PRATIBHA INDUSTRIES LIMITED'),
(633, '671', 'PRAXAIR INDIA PRIVATE LIMITED'),
(634, '672', 'PRECOT MERIDIAN LTD'),
(635, '673', 'PREMIUM TRANSMISSION LTD'),
(636, '674', 'PRICOL LIMITED'),
(637, '675', 'PRISM CEMENT LTD'),
(638, '676', 'PROCTER & GAMBLE HYGIENE & HEALTHCARE LTD'),
(639, '678', 'PTC INDIA LIMITED'),
(640, '679', 'PUNJ LLOYD LTD'),
(641, '680', 'PURAVANKARA PROJECT LIMITED'),
(642, '681', 'QUALCOMM INDIA PRIVATE LIMITED'),
(643, '682', 'RADICO KHAITAN LTD'),
(644, '684', 'RAHEJA DEVEL OPERS LTD'),
(645, '685', 'RAMCO INDUSTRIES LTD'),
(646, '686', 'RAMKRISHNA FORGINGS LTD'),
(647, '687', 'RAMKY ENVIRO ENGINEERS LTD'),
(648, '688', 'RANDSTAD INDIA LIMITED'),
(649, '689', 'RANE TRAW STEERING SYSTEMS LIMITED'),
(650, '690', 'RASHMI CEMENT LIMITED'),
(651, '691', 'RASHTRIYA ISPAT NIGAM LIMITED'),
(652, '692', 'RATNAMANI METALS AND TUBES LIMITED'),
(653, '693', 'RAYCHEM-RPG PRIVATE LIMITED'),
(654, '694', 'RECKITT BENCKISER (INDIA) LIMITED'),
(655, '695', 'REDINGTON (INDIA) LTD'),
(656, '696', 'REED ELSEVIER INDIA PRIVATE LIMITED'),
(657, '697', 'RELIANCE CAPITAL ASSET MANAGEMENT LTD'),
(658, '698', 'RELIANCE CAPITAL LTD'),
(659, '699', 'RELIANCE INDUSTRIES LTD'),
(660, '700', 'RELIANCE INFRASTRUCTURE LTD'),
(661, '701', 'RELIANCE POWER LIMITED'),
(662, '702', 'RELIGARE FINVEST LTD'),
(663, '703', 'RELIGARE SECURITIES LIMITED'),
(664, '704', 'RENAULT INDIA PRIVATE LIMITED'),
(665, '706', 'RICOH INDIA LTD'),
(666, '708', 'RIDDHI SIDDHI GLUCO BIOLS LIMITED'),
(667, '709', 'RIO TINTO INDIA PRIVATE LIMITED'),
(668, '710', 'RITES LTD'),
(669, '711', 'ROCHE DIAGNOSTICS INDIA PRIVATE LIMITED'),
(670, '712', 'ROCKWELL AUTOMATION INDIA PRIVATE LIMITED'),
(671, '713', 'ROLL-ROYCE INDIA PRIVATE LIMITED'),
(672, '714', 'RUCHI SOYA INDS. LTD.'),
(673, '715', 'SR BATILIBOI & CO LLP'),
(674, '716', 'S R F LTD.'),
(675, '717', 'SABIC INDIA PRIVATE LIMITED'),
(676, '719', 'SABMILLER INDIA LIMITED'),
(677, '720', 'SADBHAV ENGINEERING LTD.'),
(678, '721', 'SAFEXPRESS PRIVATE LIMITED'),
(679, '723', 'SAHYADRI INDUSTRIES LTD'),
(680, '724', 'SAIC INDIA PRIVATE LIMITED'),
(681, '725', 'SAINT -GOBAIN SEKURIT INDIA LIMITED'),
(682, '726', 'SAIPEM INDIA PROJECT LIMITED'),
(683, '727', 'SAMSONITE SOUTH ASIA PVT LTD.'),
(684, '728', 'SAMSUNG C&T INDIA PRIVATE LIMITED'),
(685, '729', 'SAMSUNG INDIA ELECTRONICS PRIVATE LIMITED'),
(686, '731', 'SANATHAN TEXTILES PRIVATE LIMITED'),
(687, '732', 'SANDOZ PRIVATE LIMITED'),
(688, '733', 'SANDVIK ASIA PRIVATE LIMITED'),
(689, '734', 'SANGAM (INDIA) LIMITED'),
(690, '735', 'SANGHVI MOVERS LIMITED'),
(691, '736', 'SANMINA-SCI INDIA PRIVATE LIMITED'),
(692, '737', 'SANMINA-SCI TECHNOLOGY INDIA PRIVATE LIMITED'),
(693, '738', 'SANOFI INDIA LIMITED'),
(694, '739', 'SANOFI-SYNTHELABO (INDIA) LIMITED'),
(695, '740', 'SANSERA ENGINEERING PRIVATE LIMITED'),
(696, '741', 'SAP LABS INDIA PRIVATE LIMITED'),
(697, '742', 'SARA SAE PRIVATE LIMITED'),
(698, '743', 'SATYAM AUTO COMPONENTS LTD.'),
(699, '744', 'SAVITA OIL TECHNOLOGIES LIMITED'),
(700, '745', 'SCHNEIDER ELECTRIC INDIA PRIVATE LIMITED'),
(701, '746', 'SCHNEIDER ELECTRIC INFRASTRUCTURE LIMITED'),
(702, '747', 'SCHNEIDER ELECTRIC IT BUSINESS INDIA PVT LTD.'),
(703, '748', 'SECURE METERS LTD.'),
(704, '749', 'SECURITIES EXCHANGE BOARD OF INDIA (SEBI)'),
(705, '750', 'SECURITY AND INTELLIGENCE SERVICES INDIA LTD'),
(706, '751', 'SEMCO ELECTRIC LTD'),
(707, '752', 'SEQUENT SCIENTIFIC LIMITED'),
(708, '753', 'SERUM INSTITUTE OF INDIA LTD'),
(709, '754', 'SESA GOA LTD.'),
(710, '755', 'SESA INDUSTRIES LTD.'),
(711, '756', 'SEW INFRASTRUCTURE LIMITED'),
(712, '757', 'SGS INDIA PVT LTD'),
(713, '758', 'SHAHI EXPORTS PRIVATE LIMITED'),
(714, '759', 'SHANTHA BIOTECHNICS LIMITED'),
(715, '760', 'SHAPOORJI PALLONJI AND COMPANY LIMITED'),
(716, '761', 'SHARE MICROFIN LTD'),
(717, '762', 'SHAREKHAN LTD'),
(718, '763', 'SHARP BUSINESS SYSTEMS (INDIA) LIMITED'),
(719, '764', 'SHARP MENTHOL INDIA LIMITED'),
(720, '765', 'SHASUN PHARMACEUTICALS LIMITED'),
(721, '766', 'SHAW INDIA LIMITED'),
(722, '767', 'SHIVA TEXFABS LTD.'),
(723, '768', 'SHOPPERS STOP LTD.'),
(724, '769', 'SHREE CEMENT LTD.'),
(725, '770', 'SHREE RENUKA SUGARS LIMITED'),
(726, '771', 'SHRENUJ AND COMPANY LIMITED'),
(727, '772', 'SHRI LAKSHMI COTSYN LIMITED'),
(728, '773', 'SHRIRAM CITY UNION FINANCE LTD.'),
(729, '774', 'SHRIRAM FOUNDRY LTD'),
(730, '775', 'SHRIRAM TRANSPORT FINANCE COMPANY LTD.'),
(731, '776', 'SICAL LOGISTICS LIMITED'),
(732, '777', 'SIEMENS INDUSTRY SOFTWARE (INDIA) PVT. LTD'),
(733, '778', 'SIEMENS LTD.'),
(734, '779', 'SIMPLEX INFRASTRUCTURES LTD.'),
(735, '780', 'SIMPSON & CO. LTD.'),
(736, '781', 'SISTEMA SHYAM TELESERVICES LIMITED'),
(737, '782', 'SKF INDIA LTD.'),
(738, '783', 'SKF TECHNOLOGIES (INDIA) PRIVATE LIMITED'),
(739, '784', 'SKODA AUTO INDIA PRIVATE LIMITED'),
(740, '785', 'SKS MICROFINANCE LIMITED'),
(741, '786', 'SKYLINE AIR LOGISTICS LIMITED'),
(742, '787', 'SL LUMAX LIMITED'),
(743, '788', 'SOBHA DEVELOPERS LTD'),
(744, '790', 'SODEXO FOOD SOLUTIONS INDIA PRIVATE LIMITED'),
(745, '791', 'SODEXO SVC INDIA PRIVATE LIMITED'),
(746, '792', 'SONA KOYO STEERING SYSTEMS LIMITED'),
(747, '793', 'SONATA SOFTWARE LTD'),
(748, '794', 'SONY INDIA PRIVATE LTD'),
(749, '795', 'SONY INDIA SOFTWARE PRIVATE LIMITED'),
(750, '796', 'SOUTH EASTERN COALFIELDS LIMITED'),
(751, '797', 'SPICER INDIA LTD'),
(752, '798', 'SPML INFRA LIMITED'),
(753, '799', 'SPX FLOW TECHNOLOGY (INDIA) PRIVATE LIMITED'),
(754, '800', 'SPX INDIA PRIVATE LIMITED'),
(755, '801', 'SREI INFRASTRUCTURE FINANCE LIMITED'),
(756, '802', 'SRS LTD.'),
(757, '803', 'SSA INTERNATIONAL LTD.'),
(758, '806', 'STAR INDIA PRIVATE LIMITED'),
(759, '807', 'STATE BANK OF MAURITIUS'),
(760, '808', 'STATE STREET SYNTEL SERVICES PRIVATE LIMITED'),
(761, '809', 'STEEL AUTHORITY OF INDIA LTD.'),
(762, '810', 'STERLING & WILSON LTD.'),
(763, '811', 'STERLITE INDUSTRIES (INDIA) LTD.'),
(764, '812', 'STERLITE TECHNOLOGIES LTD.'),
(765, '813', 'STRYKER INDIA PVT LTD'),
(766, '814', 'SUBROS LTD'),
(767, '815', 'SUDARSHAN CHEMICAL INDUSTRIES LIMITED'),
(768, '816', 'SUGUNA POUL TRY FARM LTD.'),
(769, '817', 'SUJANA METAL PRODUCTS LIMITED'),
(770, '818', 'SUJANA TOWER LIMITED'),
(771, '819', 'SULZER PUMPS INDIA LTD.'),
(772, '820', 'SUMITOMO CHEMICAL INDIA PRIVATE LIMITED'),
(773, '821', 'SUN PHARMACEUTICAL INDUSTRIES LIMITED'),
(774, '822', 'SUNDARAM CLAYTON LIMITED'),
(775, '823', 'SUNDARAM FINANCE LTD.'),
(776, '824', 'SUNDRAM FASTENERS LTD.'),
(777, '825', 'SUNGARD SOLUTIONS (INDIA) PRIVATE LIMITD'),
(778, '826', 'SUNIL HITECH ENGINEERS LIMITED'),
(779, '827', 'SUNSTAR OVERSEAS LTD.'),
(780, '828', 'SUPERTECH LTD'),
(781, '829', 'SUPRAJIT ENGINEERING LIMITED'),
(782, '830', 'SUPREME PETROCHEM LIMITED'),
(783, '831', 'SURYA ROSHNI LIMITED'),
(784, '832', 'SUTHERLAND GLOBAL SERVICES PRIVATE LTD'),
(785, '833', 'SUTLEJ TEXTILES AND INDUSTRIES'),
(786, '834', 'SUZUKI MOTORCYCLE INDIA PRIVATE LIMITED'),
(787, '835', 'SWARAJ MAZDA LIMITED'),
(788, '836', 'SYMPHONY LTD.'),
(789, '837', 'SYNECHRON TECHNOLOGIES PRIVATE LIMITED'),
(790, '838', 'SYNGENTA INDIA LIMITED'),
(791, '839', 'SYNTEL LTD.'),
(792, '840', 'SYNTHES MEDICAL PRIVATE LIMITED'),
(793, '841', 'T.V. SUNDRAM IYENGAR & SONS LIMITED'),
(794, '842', 'T.V. TODAY NETWORK LIMITED'),
(795, '843', 'TACLE AUOMOTIVE INDIA PRIVATE LIMITED'),
(796, '844', 'TALWANDI SABO POWER LIMITED'),
(797, '845', 'TARA JEWELS LTD.'),
(798, '846', 'TARGET CORPORATION INDIA PRIVATE LIMITED'),
(799, '847', 'TATA AUTOCOMP SYSTEMS LTD.'),
(800, '848', 'TATA BLUESCOPE STEEL LIMITED'),
(801, '849', 'TATA CHEMICALS LTD'),
(802, '851', 'TATA CONSULTANCY SERVICES LTD.'),
(803, '852', 'TATA COMMINS LIMITED'),
(804, '853', 'TATA GLOBAL BEVERAGES LIMITED'),
(805, '854', 'TATA INTERNATIONAL LIMITED'),
(806, '855', 'TATA JOHNSON CONTROLS AUTOMOTIVE LIMITED'),
(807, '856', 'TATA MOTORS LTD.'),
(808, '857', 'TATA POWER CO. LTD'),
(809, '858', 'TATA PROJECTS LTD.'),
(810, '859', 'TATA STARBUCKS LIMITED'),
(811, '861', 'TATA TECHNOLOGIES LIMITED'),
(812, '862', 'TATA TELESERVICES LTD.'),
(813, '863', 'TD POWER SYSTEMS PRIVATE LIMITED'),
(814, '864', 'TECH MAHINDRA BUINESS SERVICES LIMITED'),
(815, '865', 'TECH MAHINDRA LTD.'),
(816, '866', 'TECHNIP INDIA LIMITED'),
(817, '867', 'TECHNOFAB ENGINEERING LTD.'),
(818, '868', 'TEJAS NETWORKS'),
(819, '869', 'TELENOR INDIA PRIVATE LIMITED'),
(820, '870', 'TENNECO AUTOMOTIVE INDIA PRIVATE LIMITED'),
(821, '871', 'TETRA-PAK INDIA LTD.'),
(822, '872', 'TEVA API INDIA LIMITED'),
(823, '873', 'TEXAS INSTRUMENTS (INDIA) PRIVATE LIMITED'),
(824, '874', 'THE COTTON CORPORATION OF INDIA LIMITED'),
(825, '875', 'THE INDIA CEMENTS LTD'),
(826, '876', 'THE KCP LTD.'),
(827, '877', 'THERMAX LTD.'),
(828, '878', 'THOMAS COOK (INDIA) LTD.'),
(829, '880', 'THYSSENKRUPP ELEVATOR (INDIA) PRIVATE LIMITED'),
(830, '881', 'THYSSENKRUPP INDUSTRIES INDIA PRIVATE LIMITED'),
(831, '882', 'TIDE WATER OIL CO INDIA LTD.'),
(832, '883', 'TITAGARH WAGONS LIMITED'),
(833, '884', 'TITAN INDUSTRIES LIMITED'),
(834, '885', 'TLG INDIA PRIVATE LIMITED'),
(835, '886', 'TORRENT PHARMACEUTICALS LTD.'),
(836, '887', 'TORRENT POWER LTD.'),
(837, '888', 'TOSHIBA MACHINE INDIA PRIVATE LIMITED'),
(838, '889', 'TOTAL OIL INDIA PRIVATE LIMITED'),
(839, '890', 'TOYOTA FINANCIAL SERVICES INDIA LIMITED'),
(840, '891', 'TOYOTA KIRLOSKAR AUTO PARTS PRIVATE LIMITED'),
(841, '892', 'TOYOTA KIRLOSKAR MOTOR PRIVATE LTD'),
(842, '893', 'TOYOTA LOGISTICS KISHOR INDIA PRIVATE LIMITED'),
(843, '894', 'TOYOTA TSUSHO INDIA PRIVATE LIMITED'),
(844, '895', 'TPSC (INDIA) PRIVATE LIMITED'),
(845, '896', 'TRANE INDIA PRIVATE LIMITED'),
(846, '898', 'TRENT LTD.'),
(847, '899', 'TRF LIMITED.'),
(848, '900', 'TRIMAX IT INFRASTRUCTURE & SERVICES LTD'),
(849, '901', 'TRW SUN STEERING WHEELS PRIVATE LIMITED'),
(850, '902', 'TT LTD.'),
(851, '903', 'TTK PRESTIGE LIMITED'),
(852, '904', 'TTK-LIG LIMITED'),
(853, '905', 'TUBE INVESTMENTS OF INDIA LTD.'),
(854, '906', 'TUTORVISTA GLOBAL PRIVATE LIMITED'),
(855, '907', 'TVS MOTORS COMPANY LTD.'),
(856, '908', 'TVS SRICHAKRA LIMITED'),
(857, '909', 'UBS (INDIA) PRIVATE LIMITED'),
(858, '910', 'UCAL FUEL SYSTEMS LTD.'),
(859, '911', 'UFLEX LIMITED'),
(860, '912', 'ULTRATECH CEMENT LTD.'),
(861, '913', 'UNICHEM LABORATORIES LTD.'),
(862, '914', 'UNILEVER INDUSTRIES PRIVATE LIMITED'),
(863, '915', 'UNISOL INFRASERVICES PRIVATE LIMITED'),
(864, '916', 'UNITED BREWERIES LTD.'),
(865, '917', 'UNITED SHIPPERS LTD.'),
(866, '918', 'UNITED TELECOMS LTD.'),
(867, '919', 'UNITY INFRAPROJECTS LIMITED'),
(868, '920', 'UPS JETAIR EXPRESS PRIVATE LIMITED'),
(869, '921', 'USHA MARTIN LTD.'),
(870, '922', 'USHER AGRO LIMITED'),
(871, '923', 'USV LTD.'),
(872, '924', 'UTTAM GALVA STEEL LTD.'),
(873, '925', 'V GUARD INDUSTRIES LIMITED'),
(874, '926', 'V I P INDUSTRIES LIMITED'),
(875, '927', 'V S T INDUSTRIES LTD.'),
(876, '928', 'VA TECH WABAG LIMITED'),
(877, '929', 'VAISH ASSOCIATES'),
(878, '930', 'VALE INDIA PRIVATE LIMITED'),
(879, '931', 'VALUESOURCE TECHNOLOGIES PRIVATE LIMITED'),
(880, '932', 'VARDHMAN ACRYLICS LTD'),
(881, '933', 'VARDHMAN POLYTEX LTD.'),
(882, '934', 'VARDHMAN TEXTILES LTD.'),
(883, '935', 'VASAN HEALTH CARE PRIVATE LIMITED'),
(884, '936', 'VASCON ENGINEERS LIMITED'),
(885, '937', 'VAYAM TECHNOLOGIES LTD.'),
(886, '938', 'VE COMMERCIAL VEHICLES LIMITED'),
(887, '939', 'VENKYS (INDIA) LIMITED'),
(888, '940', 'VIDEOCON INDUSTRIES LTD.'),
(889, '941', 'VIJAY TANKS AND VESSELS PRIVATE LIMITED'),
(890, '942', 'VIRAJ PROFILES LTD.'),
(891, '943', 'VISA STEEL LIMITED'),
(892, '944', 'VISAKA INDUSTRIES LTD'),
(893, '947', 'VODAFONE ESSAR GUJARAT LTD.'),
(894, '948', 'VODAFONE INDIA LIMITED'),
(895, '949', 'VODAFONE INDIA SERVICES LIMITED'),
(896, '950', 'VOITH HYDRO PRIVATE LIMITED'),
(897, '951', 'VOLKSWAGEN FINANCE PRIVATE LIMITED'),
(898, '952', 'VOLKSWAGEN GROUP SALES INDIA PRIVATE LIMITED'),
(899, '953', 'VOLKSWAGEN INDIA PRIVATE LIMITED'),
(900, '954', 'VOLTAMP TRANSFORMERS LIMITED'),
(901, '955', 'VOLTAS LTD.'),
(902, '956', 'VOLVO AUTO INDIA PRIVATE LIMITED'),
(903, '957', 'VOLVO BUSES INDIA PRIVATE LIMITED'),
(904, '958', 'VOLVO INDIA PRIVATE LTD.'),
(905, '959', 'VRL LOGISTICS LIMITED'),
(906, '960', 'VSL INDIA PRIVATE LIMITED'),
(907, '961', 'VST INDUSTRIES LTD'),
(908, '962', 'VVF LTD.'),
(909, '963', 'WABCO INDIA LTD.'),
(910, '964', 'WALCHANDNAGAR INDUSTRIES LIMITED'),
(911, '965', 'WAPCOS LTD'),
(912, '966', 'WELSPUN CORP LIMITED'),
(913, '967', 'WHIRLPOOL OF INDIA LTD.'),
(914, '968', 'WINERGY DRIVE SYSTEMS INDIA PRIVATE LIMITED'),
(915, '969', 'WIPRO INFOTECH LTD.'),
(916, '971', 'WNS GLOBAL SERVICES PRIVATE LIMITED'),
(917, '972', 'WOCKHARDT LTD'),
(918, '973', 'WOOLWORTHS WHOLESALE (INDIA) PRIVATE LIMITED'),
(919, '974', 'WORLD HEALTH ORGANISATION'),
(920, '975', 'WORLDSPACE INDIA PRIVATE LIMITED'),
(921, '976', 'XEROX INDIA LIMITED'),
(922, '977', 'XOL TECHNOLOGIES PRIVATE LIMITED'),
(923, '978', 'YAHOO SOFTWARE DEVELOPMENT INDIA PVT LTD'),
(924, '979', 'YAKULT DANONE INDIA PRIVATE LIMITED'),
(925, '980', 'YARA FERTILISERS INDIA PRIVATE LIMITED'),
(926, '981', 'YOKOGAWA INDIA LIMITED'),
(927, '982', 'YUM! RESTAURANTS (INDIA) PRIVATE LIMITED'),
(928, '983', 'Z F STEERING GEAR (INDIA) LIMITED'),
(929, '984', 'ZEE ENTERTAINMENT ENTERPRISES LTD.'),
(930, '985', 'ZEE NEWS LTD'),
(931, '986', 'ZENSAR TECHNOLOGIES LIMITED'),
(932, '987', 'ZUVENTUS HEALTHCARE LTD.'),
(933, '988', 'ZYDUS WELLNESS LTD');

-- --------------------------------------------------------

--
-- Table structure for table `ccdataentry`
--

CREATE TABLE IF NOT EXISTS `ccdataentry` (
  `jdNo` int(11) NOT NULL,
  `creationDate` date NOT NULL,
  `applicationNo` bigint(20) NOT NULL,
  `allocatedApplication` varchar(30) NOT NULL,
  `imageType` int(11) NOT NULL,
  `agencyId` int(11) NOT NULL,
  `varaControlNo` int(11) NOT NULL,
  `imageTypeId` int(11) NOT NULL,
  `batchNo` int(11) NOT NULL,
  `ApplRefNo` int(11) NOT NULL,
  `AppSerialNo` int(11) NOT NULL,
  `logoCodeId` int(11) NOT NULL,
  `ccNumber` int(11) NOT NULL,
  `RejectionCatId` int(11) NOT NULL,
`entryId` int(11) NOT NULL,
  `crossSellNo` varchar(255) NOT NULL,
  `uniqueIdNo` varchar(255) NOT NULL,
  `netBankingId` varchar(255) NOT NULL,
  `dmaId` int(11) NOT NULL,
  `dmeId` int(11) NOT NULL,
  `branchCode` varchar(255) NOT NULL,
  `inputter1` varchar(255) NOT NULL,
  `inputter2` varchar(255) NOT NULL,
  `promoId` int(11) NOT NULL,
  `surrogateId` int(11) NOT NULL,
  `pricingId` int(11) NOT NULL,
  `companyId` int(11) NOT NULL,
  `RCUCategoryId` int(11) NOT NULL,
  `rcuCode` varchar(255) NOT NULL,
  `photoFlagCatId` int(11) NOT NULL,
  `courieStampDate` date NOT NULL,
  `docAttachedCatId` int(11) NOT NULL,
  `iciciPolicy1Cpp` varchar(100) NOT NULL,
  `iciciPolicy2Oat` varchar(100) NOT NULL,
  `yourTitleCatId` int(11) NOT NULL,
  `yourTitleExt` varchar(20) NOT NULL,
  `yourFirstName` varchar(255) NOT NULL,
  `yourMiddleName` varchar(255) NOT NULL,
  `yourLastName` varchar(255) NOT NULL,
  `emboName` varchar(255) NOT NULL,
  `motherName` varchar(255) NOT NULL,
  `fatherName` varchar(255) NOT NULL,
  `dateOfBirth` date NOT NULL,
  `smrReferenceBy` varchar(255) NOT NULL,
  `lotcNo` varchar(255) NOT NULL,
  `mailingName` varchar(255) NOT NULL,
  `YourGenderCatId` int(11) NOT NULL,
  `maritialStatus` varchar(255) NOT NULL,
  `noOfChildren` int(11) NOT NULL,
  `noOfDependencies` int(11) NOT NULL,
  `spouseName` varchar(255) NOT NULL,
  `spouseDateofBirth` date NOT NULL,
  `spouseOccupationCatId` int(11) NOT NULL,
  `spouseOccupationExt` varchar(50) NOT NULL,
  `spouseCompany` int(11) NOT NULL,
  `spouseNetAnnualIncome` int(11) NOT NULL,
  `currentAddress1` varchar(255) NOT NULL,
  `currentAddress2` varchar(255) NOT NULL,
  `currentAddress3` varchar(255) NOT NULL,
  `currentAddress4` varchar(255) NOT NULL,
  `cuurentLandMark` varchar(255) NOT NULL,
  `currentPincode` int(11) NOT NULL,
  `currentStateId` int(11) NOT NULL,
  `currentCityId` int(11) NOT NULL,
  `currentCountryCatId` int(11) NOT NULL,
  `currentStdCode` int(11) NOT NULL,
  `currentPhone1` int(11) NOT NULL,
  `currentPhone2` int(11) NOT NULL,
  `currentMobile` int(11) NOT NULL,
  `currentFaxNo` int(11) NOT NULL,
  `currentEmailId` varchar(50) NOT NULL,
  `currentResiTenure` int(11) NOT NULL,
  `currentResiTenurExt` int(11) NOT NULL,
  `permanentAddress1` varchar(255) NOT NULL,
  `permanentAddress2` varchar(255) NOT NULL,
  `permanentAddress3` varchar(255) NOT NULL,
  `permanentAddress4` varchar(255) NOT NULL,
  `permanentLandmark` varchar(255) NOT NULL,
  `permanentPincode` int(11) NOT NULL,
  `permanentStateId` int(11) NOT NULL,
  `permanentCityId` int(11) NOT NULL,
  `permanentCountryCatId` int(11) NOT NULL,
  `permanentStdCode` int(11) NOT NULL,
  `permanentPhone1` int(11) NOT NULL,
  `permanentPhone2` int(11) NOT NULL,
  `permanentMobile` int(11) NOT NULL,
  `permanentFaxNo` int(11) NOT NULL,
  `permanentEmailId` varchar(60) NOT NULL,
  `residenceCatId` int(11) NOT NULL,
  `typeOfResiCatId` int(11) NOT NULL,
  `drivingLicenseNo` varchar(255) NOT NULL,
  `vehicleDescriptionId` int(11) NOT NULL,
  `natureOwnCatId` int(11) NOT NULL,
  `vehicleNo` varchar(20) NOT NULL,
  `passportNo` varchar(20) NOT NULL,
  `gasConnectionNo` varchar(20) NOT NULL,
  `panNo` varchar(20) NOT NULL,
  `referenceName` varchar(255) NOT NULL,
  `referenceAddress1` varchar(255) NOT NULL,
  `referenceAddress2` varchar(255) NOT NULL,
  `referencePincode` int(11) NOT NULL,
  `referenceCityCatId` int(11) NOT NULL,
  `referenceStateCatId` int(11) NOT NULL,
  `referencePhone1` int(11) NOT NULL,
  `referenceMobile` int(11) NOT NULL,
  `reference2Name` varchar(255) NOT NULL,
  `reference2Address1` varchar(255) NOT NULL,
  `reference2Address2` varchar(255) NOT NULL,
  `reference2Pincode` int(11) NOT NULL,
  `reference2CityCatId` int(11) NOT NULL,
  `reference2StateCatId` int(11) NOT NULL,
  `reference2Phone1` int(11) NOT NULL,
  `reference2Mobile` int(11) NOT NULL,
  `yourWorkOccupationCatId` int(11) NOT NULL,
  `YourWorkCompNameCatId` int(11) NOT NULL,
  `YourWorkIndustryCatId` int(11) NOT NULL,
  `YourWorkCompTypeCatId` int(11) NOT NULL,
  `yourWorkBusinessTenure` int(11) NOT NULL,
  `yourWorkBusinessTenureExt` int(11) NOT NULL,
  `YourWorkProfessionCatId` int(11) NOT NULL,
  `yourWorkProfessionExt` varchar(50) NOT NULL,
  `yourWorkDesignation` varchar(20) NOT NULL,
  `yourWorkCrPositionCatId` int(11) NOT NULL,
  `yourWorkDepartment` varchar(30) NOT NULL,
  `yourWorkEmpCode` varchar(20) NOT NULL,
  `yourWorkGAIncome` int(11) NOT NULL,
  `yourWorkNetMIncome` int(11) NOT NULL,
  `yourWorkCardLimit` varchar(20) NOT NULL,
  `yourWorkNetAIncome` int(11) NOT NULL,
  `yourWorkOTHSourceIncome` int(11) NOT NULL,
  `yourWorkTotalIncome` int(11) NOT NULL,
  `yourWorkCRJobTenure` int(11) NOT NULL,
  `yourWorkCRJobTenureExt` int(11) NOT NULL,
  `yourWorkAddress1` varchar(255) NOT NULL,
  `yourWorkAddress2` varchar(255) NOT NULL,
  `yourWorkAddress3` varchar(255) NOT NULL,
  `yourWorkAddress4` varchar(255) NOT NULL,
  `yourWorkLandmark` varchar(255) NOT NULL,
  `yourWorkPincode` int(11) NOT NULL,
  `yourWorkCityCatId` int(11) NOT NULL,
  `yourWorkStateCatId` int(11) NOT NULL,
  `YourWorkCountryCatId` int(11) NOT NULL,
  `yourWorkStdCode` int(11) NOT NULL,
  `yourWorkPhone1` int(11) NOT NULL,
  `yourWorkPhone2` int(11) NOT NULL,
  `yourWorkExtNo` int(11) NOT NULL,
  `yourWorkMobile` int(11) NOT NULL,
  `yourWorkEmailId` varchar(50) NOT NULL,
  `iciciRelTypeCatId` int(11) NOT NULL,
  `iciciSalary_SavingAcNo` varchar(255) NOT NULL,
  `iciciCustomerIdNo` int(11) NOT NULL,
  `iciciLoanAcNo` int(11) NOT NULL,
  `iciciFixedDepositAcNo` int(11) NOT NULL,
  `iciciCreditCardNo` int(11) NOT NULL,
  `nonIciciBranchNameCatId` int(11) NOT NULL,
  `nonIciciAccountNo` int(11) NOT NULL,
  `nonIciciBranchNo` int(11) NOT NULL,
  `nonIciciOTHCCCatId` int(11) NOT NULL,
  `suppApp1CardRequired` int(11) NOT NULL,
  `suppApp1Relation` int(11) NOT NULL,
  `suppApp1DateOfBirth` date NOT NULL,
  `suppApp1CardGenderCatId` int(11) NOT NULL,
  `suppApp1CardGenderExt` varchar(30) NOT NULL,
  `suppApp1NameOnCard` varchar(20) NOT NULL,
  `suppApp1PhotoIdCatId` int(11) NOT NULL,
  `suppApp2CardReqCatId` int(11) NOT NULL,
  `suppApp2RelCatId` int(11) NOT NULL,
  `suppApp2DateOfBirth` date NOT NULL,
  `suppApp2GenderCatId` int(11) NOT NULL,
  `suppApp2GenderExt` varchar(30) NOT NULL,
  `suppAppl2NameOnCard` varchar(20) NOT NULL,
  `suppApp2PhotoCatId` int(11) NOT NULL,
  `mailIdCatId` int(11) NOT NULL,
  `subStatementEmailCatId` int(11) NOT NULL,
  `subMailTypeCatId` int(11) NOT NULL,
  `subscriptionEmailId` varchar(40) NOT NULL,
  `subMobAlertCatId` int(11) NOT NULL,
  `subMobTypeCatId` int(11) NOT NULL,
  `subscriptionMobileNo` int(11) NOT NULL,
  `autoDebitOptCatId` int(11) NOT NULL,
  `autoDebitAccountNo` int(11) NOT NULL,
  `autoDebitBranch` int(11) NOT NULL,
  `autoDebitAmount` int(11) NOT NULL,
  `yourWork4thLineEmbossing` int(11) NOT NULL,
  `appSignatureId` int(11) NOT NULL,
  `applicantSignatureDate` date NOT NULL,
  `DNDCatId` int(11) NOT NULL,
  `entryDate` datetime NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `ccdataentry`
--

INSERT INTO `ccdataentry` (`jdNo`, `creationDate`, `applicationNo`, `allocatedApplication`, `imageType`, `agencyId`, `varaControlNo`, `imageTypeId`, `batchNo`, `ApplRefNo`, `AppSerialNo`, `logoCodeId`, `ccNumber`, `RejectionCatId`, `entryId`, `crossSellNo`, `uniqueIdNo`, `netBankingId`, `dmaId`, `dmeId`, `branchCode`, `inputter1`, `inputter2`, `promoId`, `surrogateId`, `pricingId`, `companyId`, `RCUCategoryId`, `rcuCode`, `photoFlagCatId`, `courieStampDate`, `docAttachedCatId`, `iciciPolicy1Cpp`, `iciciPolicy2Oat`, `yourTitleCatId`, `yourTitleExt`, `yourFirstName`, `yourMiddleName`, `yourLastName`, `emboName`, `motherName`, `fatherName`, `dateOfBirth`, `smrReferenceBy`, `lotcNo`, `mailingName`, `YourGenderCatId`, `maritialStatus`, `noOfChildren`, `noOfDependencies`, `spouseName`, `spouseDateofBirth`, `spouseOccupationCatId`, `spouseOccupationExt`, `spouseCompany`, `spouseNetAnnualIncome`, `currentAddress1`, `currentAddress2`, `currentAddress3`, `currentAddress4`, `cuurentLandMark`, `currentPincode`, `currentStateId`, `currentCityId`, `currentCountryCatId`, `currentStdCode`, `currentPhone1`, `currentPhone2`, `currentMobile`, `currentFaxNo`, `currentEmailId`, `currentResiTenure`, `currentResiTenurExt`, `permanentAddress1`, `permanentAddress2`, `permanentAddress3`, `permanentAddress4`, `permanentLandmark`, `permanentPincode`, `permanentStateId`, `permanentCityId`, `permanentCountryCatId`, `permanentStdCode`, `permanentPhone1`, `permanentPhone2`, `permanentMobile`, `permanentFaxNo`, `permanentEmailId`, `residenceCatId`, `typeOfResiCatId`, `drivingLicenseNo`, `vehicleDescriptionId`, `natureOwnCatId`, `vehicleNo`, `passportNo`, `gasConnectionNo`, `panNo`, `referenceName`, `referenceAddress1`, `referenceAddress2`, `referencePincode`, `referenceCityCatId`, `referenceStateCatId`, `referencePhone1`, `referenceMobile`, `reference2Name`, `reference2Address1`, `reference2Address2`, `reference2Pincode`, `reference2CityCatId`, `reference2StateCatId`, `reference2Phone1`, `reference2Mobile`, `yourWorkOccupationCatId`, `YourWorkCompNameCatId`, `YourWorkIndustryCatId`, `YourWorkCompTypeCatId`, `yourWorkBusinessTenure`, `yourWorkBusinessTenureExt`, `YourWorkProfessionCatId`, `yourWorkProfessionExt`, `yourWorkDesignation`, `yourWorkCrPositionCatId`, `yourWorkDepartment`, `yourWorkEmpCode`, `yourWorkGAIncome`, `yourWorkNetMIncome`, `yourWorkCardLimit`, `yourWorkNetAIncome`, `yourWorkOTHSourceIncome`, `yourWorkTotalIncome`, `yourWorkCRJobTenure`, `yourWorkCRJobTenureExt`, `yourWorkAddress1`, `yourWorkAddress2`, `yourWorkAddress3`, `yourWorkAddress4`, `yourWorkLandmark`, `yourWorkPincode`, `yourWorkCityCatId`, `yourWorkStateCatId`, `YourWorkCountryCatId`, `yourWorkStdCode`, `yourWorkPhone1`, `yourWorkPhone2`, `yourWorkExtNo`, `yourWorkMobile`, `yourWorkEmailId`, `iciciRelTypeCatId`, `iciciSalary_SavingAcNo`, `iciciCustomerIdNo`, `iciciLoanAcNo`, `iciciFixedDepositAcNo`, `iciciCreditCardNo`, `nonIciciBranchNameCatId`, `nonIciciAccountNo`, `nonIciciBranchNo`, `nonIciciOTHCCCatId`, `suppApp1CardRequired`, `suppApp1Relation`, `suppApp1DateOfBirth`, `suppApp1CardGenderCatId`, `suppApp1CardGenderExt`, `suppApp1NameOnCard`, `suppApp1PhotoIdCatId`, `suppApp2CardReqCatId`, `suppApp2RelCatId`, `suppApp2DateOfBirth`, `suppApp2GenderCatId`, `suppApp2GenderExt`, `suppAppl2NameOnCard`, `suppApp2PhotoCatId`, `mailIdCatId`, `subStatementEmailCatId`, `subMailTypeCatId`, `subscriptionEmailId`, `subMobAlertCatId`, `subMobTypeCatId`, `subscriptionMobileNo`, `autoDebitOptCatId`, `autoDebitAccountNo`, `autoDebitBranch`, `autoDebitAmount`, `yourWork4thLineEmbossing`, `appSignatureId`, `applicantSignatureDate`, `DNDCatId`, `entryDate`) VALUES
(344, '2016-12-09', 2016344906001, 'CC-00000000155', 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, '', '', '', 0, 0, '', '', '', 0, 0, 0, 0, 0, '', 0, '0000-00-00', 0, '', '', 0, '', '', '', '', '', '', '', '0000-00-00', '', '', '', 0, '', 0, 0, '', '0000-00-00', 0, '', 0, 0, '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, 0, '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, 0, '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', '', 0, '', '', 0, 0, '', 0, 0, 0, 0, 0, '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '0000-00-00', 0, '', '', 0, 0, 0, '0000-00-00', 0, '', '', 0, 0, 0, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, '0000-00-00', 0, '0000-00-00 00:00:00'),
(344, '2016-12-09', 2016344906002, 'CC-00000000156', 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, '', '', '', 0, 0, '', '', '', 0, 0, 0, 0, 0, '', 0, '0000-00-00', 0, '', '', 0, '', '', '', '', '', '', '', '0000-00-00', '', '', '', 0, '', 0, 0, '', '0000-00-00', 0, '', 0, 0, '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, 0, '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, 0, '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', '', 0, '', '', 0, 0, '', 0, 0, 0, 0, 0, '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '0000-00-00', 0, '', '', 0, 0, 0, '0000-00-00', 0, '', '', 0, 0, 0, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, '0000-00-00', 0, '0000-00-00 00:00:00'),
(344, '2016-12-09', 2016344906003, 'CC-00000000158', 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 3, '', '', '', 0, 0, '', '', '', 0, 0, 0, 0, 0, '', 0, '0000-00-00', 0, '', '', 0, '', '', '', '', '', '', '', '0000-00-00', '', '', '', 0, '', 0, 0, '', '0000-00-00', 0, '', 0, 0, '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, 0, '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, 0, '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', '', 0, '', '', 0, 0, '', 0, 0, 0, 0, 0, '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '0000-00-00', 0, '', '', 0, 0, 0, '0000-00-00', 0, '', '', 0, 0, 0, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, '0000-00-00', 0, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `ccdmamaster`
--

CREATE TABLE IF NOT EXISTS `ccdmamaster` (
  `dmaId` int(11) NOT NULL,
  `dmaCode` varchar(20) NOT NULL,
  `dmaDescription` varchar(150) NOT NULL,
  `dmaCity` varchar(30) NOT NULL,
  `dmaActiveStatus` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ccdmemaster`
--

CREATE TABLE IF NOT EXISTS `ccdmemaster` (
  `dmeId` int(11) NOT NULL,
  `dmeCode` varchar(20) NOT NULL,
  `dmeName` varchar(100) NOT NULL,
  `dmaId` int(11) NOT NULL,
  `dmeModifyDate` date NOT NULL,
  `dmeModifyBy` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ccimageinputtype`
--

CREATE TABLE IF NOT EXISTS `ccimageinputtype` (
  `imageTypeId` int(11) NOT NULL,
  `imageName` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ccimageinputtype`
--

INSERT INTO `ccimageinputtype` (`imageTypeId`, `imageName`) VALUES
(1, 'image base'),
(2, 'idisburse');

-- --------------------------------------------------------

--
-- Table structure for table `ccimagetypemaster`
--

CREATE TABLE IF NOT EXISTS `ccimagetypemaster` (
  `imageTypeId` bigint(20) NOT NULL,
  `imageType` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ccimport`
--

CREATE TABLE IF NOT EXISTS `ccimport` (
`importId` int(11) NOT NULL,
  `CCNo` varchar(60) NOT NULL,
  `agencyBatchId` int(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `ccimport`
--

INSERT INTO `ccimport` (`importId`, `CCNo`, `agencyBatchId`, `status`) VALUES
(1, 'CC-00000000155', 3, 6),
(2, 'CC-00000000156', 3, 6),
(3, 'CC-00000000157', 3, 6),
(4, 'CC-00000000158', 3, 6),
(5, 'CC-00000000159', 3, 6),
(6, 'CC-00000000160', 3, 6),
(7, 'CC-00000000161', 3, 6),
(8, 'CC-00000000162', 3, 6),
(9, 'CC-00000000164', 3, 6),
(10, 'CC-00000000165', 3, 6);

-- --------------------------------------------------------

--
-- Table structure for table `ccindexedimage`
--

CREATE TABLE IF NOT EXISTS `ccindexedimage` (
`inedexedImageId` int(11) NOT NULL,
  `generatedApplicationNo` bigint(20) NOT NULL,
  `imageCount` int(11) NOT NULL,
  `creationDate` date NOT NULL,
  `createdBy` int(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `cclogomaster`
--

CREATE TABLE IF NOT EXISTS `cclogomaster` (
  `logoId` int(11) NOT NULL,
  `logoCode` char(3) NOT NULL,
  `logoDescription` varchar(150) NOT NULL,
  `logoTempl` char(2) NOT NULL,
  `logoActiveStatus` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cclogomaster`
--

INSERT INTO `cclogomaster` (`logoId`, `logoCode`, `logoDescription`, `logoTempl`, `logoActiveStatus`) VALUES
(1, '0', '000 | Nacs Test Logo', 'RT', 'A'),
(2, '110', '110 | ICICI Bank Sterling Silver Visa Credit Card', 'RT', 'A'),
(3, '111', '111 | ICICI Bank Visa Mini Credit Card', 'RT', 'A'),
(4, '112', '112 | ICICI Bank preferred Silver Visa Credit Card', 'RT', 'A'),
(5, '113', '113 | ICICI BANK VISA SILVER - CTL', 'RT', 'A'),
(6, '114', '114 | ICICI Bank HLN Silver Credit Card', 'RT', 'A'),
(7, '115', '115 | ICICI Bank True Value Visa Credit Card', 'RT', 'A'),
(8, '116', '116 | ICICI Bank Online Credit Card', 'RT', 'A'),
(9, '117', '117 | ICICI Bank NRI - Easy Deposit Silver Credit Card', 'SE', 'A'),
(10, '118', '118 | ICICI Bank Indiatimes Online Credit Card', 'RT', 'A'),
(11, '119', '119 | ICICI Mobile Payment Card', 'RT', 'A'),
(12, '120', '120 | ICICI Bank Solid Gold Visa Credit Card', 'RT', 'A'),
(13, '121', '121 | ICICI Bank Limited Edition Solid Gold Visa Credit Card', 'RT', 'A'),
(14, '122', '122 | ICICI Bank Private Banking Credit Card', 'RT', 'A'),
(15, '123', '123 | ICICI Bank Preferred Gold Visa Credit Card', 'RT', 'A'),
(16, '124', '124 | ICICI Bank Air Deccan Visa Credit Card', 'RT', 'A'),
(17, '125', '125 | ICICI Bank Central Gold Credit Card', 'RT', 'A'),
(18, '126', '126 | ICICI Bank Toyota Credit Card', 'RT', 'A'),
(19, '127', '127 | ICICI Bank NRI - Easy Deposit Gold Credit Card', 'SE', 'A'),
(20, '128', '128 | ICICI Bank Kingfisher Visa Gold Credit Card', 'RT', 'A'),
(21, '129', '129 | ICICI Bank Big Bazaar Visa Gold Credit Card', 'RT', 'A'),
(22, '130', '130 | ICICI Bank True Blue Visa Credit Card', 'RT', 'A'),
(23, '131', '131 | ICICI Bank Bajaj Capital Visa Credit Card', 'RT', 'A'),
(24, '132', '132 | ICICI Bank Buzz Visa Credit card', 'RT', 'A'),
(25, '133', '133 | Centurion Bank of Punjab Miracle Credit Card', 'RT', 'A'),
(26, '134', '134 | ICICI Bank X-Box Credit Card', 'RT', 'A'),
(27, '135', '135 | ICICI Bank Cash Card (Gold)', 'RT', 'A'),
(28, '136', '136 | ICICI Bank True Value Star Card', 'RT', 'A'),
(29, '137', '137 | ICICI Easy Deposit True Blue Credit Card', 'SE', 'A'),
(30, '138', '138 | ICICI Bank Cash Card (Silver)', 'RT', 'A'),
(31, '139', '139 | ICICI Bank India Infoline Card', 'RT', 'A'),
(32, '140', '140 | ICICI Bank HPCL Visa Credit Card', 'RT', 'A'),
(33, '141', '141 | ICICI Bank HPCL Liability Silver Credit Card', 'RT', 'A'),
(34, '142', '142 | ICICI BANK Cruise Credit Card', 'RT', 'A'),
(35, '143', '143 | ICICI Bank Gitanjali Gems Card', 'RT', 'A'),
(36, '144', '144 | CBOP Visa Gold Credit Card', 'RT', 'A'),
(37, '145', '145 | ICICI Bank Megamart Credit Card', 'RT', 'A'),
(38, '146', '146 | CBOP Miracle True Value Star Card-V', 'RT', 'A'),
(39, '147', '147 | ICICI Bank Purchase Card - Dual Billing Cycle', 'CR', 'A'),
(40, '148', '148 | ICICI Bank Virtual Card', 'RT', 'A'),
(41, '149', '149 | ICICI Bank Corporate Foreign Nationals Card', 'CR', 'A'),
(42, '150', '150 | ICICI Bank Corporate Liability Silver Visa Credit Card', 'CR', 'A'),
(43, '151', '151 | ICICI Bank Corporate Individual Liability Silver Visa Credit Card', 'RT', 'A'),
(44, '152', '152 | ICICI BANK CORP GOLD CARD-RELIANCE RTL', 'RT', 'A'),
(45, '154', '154 | ICICI Bank VPA Purchase Card', 'CR', 'A'),
(46, '155', '155 | ICICI Bank Pepsi Distribution Card', 'IN', 'A'),
(47, '156', '156 | ICICI Bank Caterpillar Expatriate Card (CCCL-V)', 'CR', 'A'),
(48, '157', '157 | ICICI Caterpillar Card (CCCL-V)', 'CR', 'A'),
(49, '158', '158 | ICICI Bank Nokia Distribution Card', 'IN', 'A'),
(50, '159', '159 | ICICI Bank Pepsi Distribution Card', 'IN', 'A'),
(51, '160', '160 | ICICI Bank Corporate Liability Gold Visa Credit Card', 'CR', 'A'),
(52, '161', '161 | ICICI Bank Corporate Individual Liability Gold Visa Credit Card', 'RT', 'A'),
(53, '162', '162 | ICICI Bank Purchase Card', 'IN', 'A'),
(54, '163', '163 | ICICI Bank BPCL Instruction Card', 'IN', 'A'),
(55, '164', '164 | ICICI Bank HPCL Instruction Card', 'IN', 'A'),
(56, '165', '165 | ICICI Bank IOCL Instruction Card', 'IN', 'A'),
(57, '166', '166 | ICICI Bank Purchase Card', 'CR', 'A'),
(58, '167', '167 | ICICI Bank Purchase Fuel Card', 'CR', 'A'),
(59, '168', '168 | ICICI Bank FADA Purchase Card', 'CR', 'A'),
(60, '169', '169 | ICICI Bank Cement Exchange Card', 'RT', 'A'),
(61, '170', '170 | ICICI Bank Secured Silver Visa Credit Card', 'SE', 'A'),
(62, '171', '171 | ICICI Bank Post India Silver Credit Card', 'RT', 'A'),
(63, '172', '172 | ICICI Bank Picture Card', 'RT', 'A'),
(64, '173', '173 | - ICICI Bank Intrex Business Card', 'RT', 'A'),
(65, '174', '174 | ICICI Bank Central Travel Account(CTA) Card', 'CR', 'A'),
(66, '175', '175 | ICICI Bank Utility Purchase Card', 'CR', 'A'),
(67, '176', '176 | ICICI Bank Business Platinum Chip Card', 'CR', 'A'),
(68, '177', '177 | ICICI Bank Purchase Card - Riya Dealer Program', 'CR', 'A'),
(69, '178', '178 | ICICI Disbursement - Purchase Card', 'CR', 'A'),
(70, '180', '180 | ICICI Bank Secured Gold Visa Credit Card', 'SE', 'A'),
(71, '181', '181 | ICICI Post India (Gold) Card', 'RT', 'A'),
(72, '182', '182 | ICICI Picture (Gold) Card', 'RT', 'A'),
(73, '183', '183 | ICICI Bank Preferred Gold Picture Card', 'RT', 'A'),
(74, '184', '184 | ICICI Bank - JET Cobranded Business Card', 'PM', 'A'),
(75, '186', '186 | ICICI Bank Expressions Secured Credit Card', 'RT', 'A'),
(76, '187', '187 | ICICI Bank Business Black Advantage Credit Card', 'CR', 'A'),
(77, '190', '190 | ICICI Bank BPL Visa Credit Card', 'RT', 'A'),
(78, '191', '191 | ICICI PLCC OTL', 'RT', 'A'),
(79, '200', '200 | ICICI Banl Electron Silver Visa Credit Card', 'RT', 'A'),
(80, '201', '201 | ICICI Bank Travel Agent Purchase Card', 'SE', 'A'),
(81, '202', '202 | DEVELOPMENT CREDIT BANK SILVER CARD', 'RT', 'A'),
(82, '203', '203 | Development Credit Bank Gold Card', 'RT', 'A'),
(83, '210', '210 | ICICI Bank Silver Master Credit Card', 'RT', 'A'),
(84, '211', '211 | ICICI Bank PSB Silver Master Credit Card', 'RT', 'A'),
(85, '212', '212 | ICICI Bank Preferred Silver Master Credit Card', 'RT', 'A'),
(86, '213', '213 | ICICI BANK CESC Master Credit Card', 'RT', 'A'),
(87, '214', '214 | ICICI Bank Adani Master Credit Card', 'RT', 'A'),
(88, '215', '215 | ICICI Bank Dhiraj Sons Master Credit Card', 'RT', 'A'),
(89, '216', '216 | ICICI Bank Karvy Master Credit Card', 'RT', 'A'),
(90, '217', '217 | ICICI Bank Gateway Premium Card', 'RT', 'A'),
(91, '218', '218 | ICICI Bank Home Silver Card', 'RT', 'A'),
(92, '219', '219 | ICICI Bank Gateway Classic Card', 'RT', 'A'),
(93, '220', '220 | ICICI Bank Solid Gold Master Credit Card', 'RT', 'A'),
(94, '221', '221 | ICICI Bank PSB Solid Gold Master Credit Card', 'RT', 'A'),
(95, '222', '222 | ICICI Bank HPCL Solid Gold Master Credit Card', 'RT', 'A'),
(96, '223', '223 | ICICI Bank HPCL Airtel Gold Master Credit Card', 'RT', 'A'),
(97, '224', '224 | ICICI BANK GOLD CREDIT CARD', 'RT', 'A'),
(98, '225', '225 | ICICI Bank Golf Gold Master Credit Card', 'RT', 'A'),
(99, '227', '227 | ICICI Bank Travel Smart Master Credit Card', 'RT', 'A'),
(100, '228', '228 | ICICI Bank Home Gold Card', 'RT', 'A'),
(101, '229', '229 | ICICI Bank Kingfisher Master (Gold)Card', 'RT', 'A'),
(102, '230', '230 | ICICI Bank True Blue Master Credit Card', 'RT', 'A'),
(103, '231', '231 | ICICI Bank PSB True Blue Credit Card', 'RT', 'A'),
(104, '232', '232 | ICICI Bank Sarovar Credit Card', 'RT', 'A'),
(105, '233', '233 | ICICI Bank Forum Co-branded Card', 'RT', 'A'),
(106, '234', '234 | ICICI Bank Future Silver Card-V', 'RT', 'A'),
(107, '235', '235 | ICICI Bank Future Gold Card-V', 'RT', 'A'),
(108, '236', '236 | ICICI Bank Future Silver Card', 'RT', 'A'),
(109, '237', '237 | ICICI Bank Future Gold Card', 'RT', 'A'),
(110, '238', '238 | ICICI Future Visa Silver Card', 'RT', 'A'),
(111, '239', '239 | ICICI Future Visa Gold Card', 'RT', 'A'),
(112, '240', '240 | ICICI Bank FIFA Silver Master Credit Card', 'RT', 'A'),
(113, '241', '241 | ICICI Bank Peerless Credit Card', 'RT', 'A'),
(114, '242', '242 | ICICI Singapore Airlines Platin Card', 'PM', 'A'),
(115, '243', '243 | ICICI Bank Gold Plus Credit Card', 'RT', 'A'),
(116, '244', '244 | ICICI Bank Platinum Credit Card (CPT)', 'RT', 'A'),
(117, '245', '245 | ICICI Bank Titanium Credit Card(CPT)', 'RT', 'A'),
(118, '246', '246 | ICICI Bank MasterCard Platinum chip Credit Card', 'RT', 'A'),
(119, '247', '247 | ICICI Bank MasterCard Coral Credit Card', 'RT', 'A'),
(120, '248', '248 | ICICI CCIL-INSURANCE VISA GOLD CARD', 'CR', 'A'),
(121, '249', '249 | ICICI Bank Corporate Foreign Nationals Card', 'CR', 'A'),
(122, '250', '250 | ICICI Corporate Gold Card-CCIL-Expat-V', 'CR', 'A'),
(123, '252', '252 | ICICI BANK CORPORATE FLEET CARD', 'CR', 'A'),
(124, '253', '253 | Corporate Card Corporate Liability', 'CR', 'A'),
(125, '254', '254 | Corporate Card Individual Liability', 'CR', 'A'),
(126, '259', '259 | ICICI Bank Corporate Ford India Card', 'CR', 'A'),
(127, '260', '260 | ICICI Corporate Card-(CCCL)', 'RT', 'A'),
(128, '261', '261 | ICICI CORPARATE CARD (CCIL)', 'RT', 'A'),
(129, '262', '262 | ICICI Bank Corp Platinum Card (CCIL)', 'CR', 'A'),
(130, '263', '263 | ICICI Bank Corp Platinum Card (CCCL)', 'CR', 'A'),
(131, '264', '264 | ICICI Bank Platinum Card (CCSL-V)', 'CR', 'A'),
(132, '265', '265 | ICICI Bank Gold Card (CCSL-V)', 'CR', 'A'),
(133, '266', '266 | ICICI Bank Purchase MasterCard', 'CR', 'A'),
(134, '267', '267 | ICICI Bank Purchase Card - VMP', 'CR', 'A'),
(135, '269', '269 | ICICI Dual Billing Purchase Card', 'CR', 'A'),
(136, '270', '270 | ICICI EMI SILVER CARD', 'RT', 'A'),
(137, '271', '271 | ICICI EMI SILVER CARD', 'RT', 'A'),
(138, '272', '272 | ICICI EMI SILVER CARD', 'RT', 'A'),
(139, '273', '273 | ICICI BANK EMI CARD- ELITE 100% CASH BACK', 'RT', 'A'),
(140, '274', '274 | ICICI BANK EMI CARD- SUPER PRIME 100% CASH BACK', 'RT', 'A'),
(141, '275', '275 | ICICI Bank EMI Master Credit Card', 'RT', 'A'),
(142, '276', '276 | ICICI Bank EMI Master Credit Card', 'RT', 'A'),
(143, '277', '277 | ICICI Bank EMI Master Credit Card', 'RT', 'A'),
(144, '279', '279 | ICICI Bank HPCL 21 day statement Credit Card', 'CR', 'A'),
(145, '301', '301 | ICICI Bank HPCL Platinum Credit Card LF', 'RT', 'A'),
(146, '302', '302 | ICICI Bank HPCL Titanium Credit Card LF', 'RT', 'A'),
(147, '304', '304 | eBoR Gold Visa Credit Card', 'RT', 'A'),
(148, '305', '305 | eBoR Silver Visa credit Card', 'RT', 'A'),
(149, '307', '307 | ICICI Bank Platinum Chip Credit Card', 'RT', 'A'),
(150, '308', '308 | ICICI Bank Travel Agent Card (BCCL-V)', 'CR', 'A'),
(151, '309', '309 | ICICI Bank Adora Business Card', 'CR', 'A'),
(152, '310', '310 | ICICI Bank Silver Credit Card', 'RT', 'A'),
(153, '311', '311 | ICICI Bank Home Silver Master Credit Card', 'RT', 'A'),
(154, '312', '312 | ICICI Bank Federal Bank Silver Visa Credit Card', 'RT', 'A'),
(155, '313', '313 | ICICI Bank Apollo NIC Cobranded Visa Credit Card', 'RT', 'A'),
(156, '314', '314 | ICICI Bank Ebony Visa Credit Card', 'RT', 'A'),
(157, '315', '315 | ICICI Bank Spice Telecom Visa Credit Card', 'RT', 'A'),
(158, '316', '316 | ICICI Bank RCA Plus Visa Credit Card', 'RT', 'A'),
(159, '317', '317 | ICICI Business Card', 'RT', 'A'),
(160, '318', '318 | ICICI Bank Self Employed (BCIL) Card', 'RT', 'A'),
(161, '319', '319 | ICICI Bank Pharma Sector(BCPS)', 'RT', 'A'),
(162, '320', '320 | ICICI Bank Gold Credit Card', 'RT', 'A'),
(163, '321', '321 | ICICI Bank Platinum Credit Card', 'RT', 'A'),
(164, '322', '322 | ICICI Bank Grand Perks Platinum Credit Card', 'RT', 'A'),
(165, '323', '323 | ICICI Bank Gold Next Credit Card', 'RT', 'A'),
(166, '324', '324 | ICICI Bank Platinum Low APR Card', 'RT', 'A'),
(167, '325', '325 | ICICI Bank Platinum Card', 'RT', 'A'),
(168, '326', '326 | ICICI Bank Business Platinum Card', 'RT', 'A'),
(169, '327', '327 | ICICI Bank Indiabulls Platinum', 'RT', 'A'),
(170, '328', '328 | ICICI Bank Platinum Card (BCCL-V)', 'CR', 'A'),
(171, '329', '329 | ICICI Bank Platinum Identity Card-V', 'RT', 'A'),
(172, '330', '330 | ICICI Bank Amway Visa Credit Card', 'RT', 'A'),
(173, '331', '331 | ICICI Bank Foreign National Platinum Card', 'RT', 'A'),
(174, '332', '332 | ICICI Bank HPCL Platinum Credit Card', 'RT', 'A'),
(175, '333', '333 | ICICI Bank Visa Signature Card', 'RT', 'A'),
(176, '334', '334 | ICICI Bank World Womens Card', 'PM', 'A'),
(177, '335', '335 | Instant Platinum Credit Card', 'RT', 'A'),
(178, '336', '336 | ICICI Bank Kingfisher World Card', 'PM', 'A'),
(179, '337', '337 | ICICI Bank Kingfisher Platinum Card', 'PM', 'A'),
(180, '338', '338 | ICICI Bank Kingfisher Titanium Card', 'PM', 'A'),
(181, '339', '339 | ICICI Bank Signature Secured Card', 'RT', 'A'),
(182, '340', '340 | ICICI Bank HPCL Solid Gold Credit Card', 'RT', 'A'),
(183, '341', '341 | ICICI Bank Federal Bank Gold Visa Credit Card', 'RT', 'A'),
(184, '342', '342 | ICICI Gold Business Card (BCIL-V)', 'RT', 'A'),
(185, '343', '343 | ICICI Gold Business Card (BCCL-V)', 'CR', 'A'),
(186, '344', '344 | ICICI Gold Business Card (BCIL-M)', 'RT', 'A'),
(187, '345', '345 | ICICI Bank Business Gold Card (BCCL-M)', 'CR', 'A'),
(188, '346', '346 | Platinum Identity Secured Card', 'RT', 'A'),
(189, '347', '347 | ICICI Bank Platinum Identity Account', 'RT', 'A'),
(190, '350', '350 | ICICI Bank CSOI Solid Gold Visa Credit Card', 'RT', 'A'),
(191, '351', '351 | ICICI Bank Preferred Gold Master Credit Card', 'RT', 'A'),
(192, '352', '352 | ICICI Bank Indian Platinum Card', 'RT', 'A'),
(193, '353', '353 | Thomas Cook Titanium', 'RT', 'A'),
(194, '354', '354 | ICICI Bank Titanium Card', 'RT', 'A'),
(195, '355', '355 | INSTANT EASY DEPOSIT TITANIUM CARD', 'RT', 'A'),
(196, '356', '356 | Instant Easy Deposit Preferred Gold Card', 'RT', 'A'),
(197, '357', '357 | ICICI Bank HPCL Titanium Credit Card', 'RT', 'A'),
(198, '358', '358 |ICICI Bank Amethyst Credit Card', 'RT', 'A'),
(199, '359', '359 | ICICI Bank Instant Gold Credit Card', 'RT', 'A'),
(200, '360', '360 | ICICI Bank Trinethra Silver Visa Credit Card', 'RT', 'A'),
(201, '361', '361 | ICICI Bank Titanium Women Card', 'RT', 'A'),
(202, '362', '362 | ICICI Eternia World Secured Card', 'RT', 'A'),
(203, '363', '363 | ICICI Bank Rubyx Visa Credit Card', 'RT', 'A'),
(204, '364', '364 | ICICI Bank Sapphiro Visa Credit Card', 'RT', 'A'),
(205, '365', '365 | ICICI Bank Coral Credit Card', 'RT', 'A'),
(206, '366', '366 | ICICI Bank MasterCard Platinum chip Credit Card', 'RT', 'A'),
(207, '367', '367 | ICICI Bank MasterCard Coral Credit Card', 'RT', 'A'),
(208, '370', '370 | ICICI Bank HPCL Master Credit Card', 'RT', 'A'),
(209, '371', '371 | ICICI Bank Mohun Bagan Credit Card', 'RT', 'A'),
(210, '372', '372 | ICICI Bank Airtel Master Credit Card', 'RT', 'A'),
(211, '373', '373 | MOHUN BAGAN SILVER-MASTER', 'RT', 'A'),
(212, '374', '374 | ICICI Rubyx Master PLT Chip Card', 'RT', 'A'),
(213, '375', '375 | ICICI Sapphiro Master PLT Chip Card', 'RT', 'A'),
(214, '376', '376 | ICICI DIAMANT MASTER CHIP CARD', 'RT', 'A'),
(215, '377', '377 | ICICI Bank HPCL Coral MasterCard Platinum Credit C', 'RT', 'A'),
(216, '378', '378 | ICICI Bank Unifare Mumbai Credit Card', 'RT', 'A'),
(217, '379', '379 | ICICI Bank Unifare Bangalore Credit Card', 'RT', 'A'),
(218, '380', '380 | ICICI Bank Prulife Visa Credit Card', 'RT', 'A'),
(219, '381', '381 | ICICI Bank Business Card-Dual Billing Cycle', 'RT', 'A'),
(220, '382', '382 | ICICI Bank Unifare Hyderabad Credit Card', 'RT', 'A'),
(221, '383', '383 | ICICI Bank Coral Pilot Contactless Credit Card', 'RT', 'A'),
(222, '385', '385 | ICICI Bank Expressions Credit Card', 'RT', 'A'),
(223, '386', '386 | ICICI Bank HPCL Coral Contactless Credit Card', 'RT', 'A'),
(224, '387', '387 | ICICI Bank Ferrari Fan Platinum Credit Card', 'RT', 'A'),
(225, '388', '388 | ICICI Bank Ferrari Fan Signature Credit Card', 'RT', 'A'),
(226, '389', '389 | ICICI Bank HPCL Coral Visa Contactless Credit Card', 'RT', 'A'),
(227, '390', '390 | ICICI Bank Big Bazaar Visa Credit Card', 'RT', 'A'),
(228, '391', '391 | ICICI Bank HPCL Platinum Chip Credit Card', 'RT', 'A'),
(229, '392', '392 | ICICI Bank Carbon Visa Infinite EMV Credit Card', 'RT', 'A'),
(230, '393', '393 | ICICI Bank Instant Platinum Chip Credit Card', 'RT', 'A'),
(231, '394', '394 | ICICI Bank Unifare MasterCard Platinum Chip Transi', 'RT', 'A'),
(232, '395', '395 | ICICI Bank Secured Coral Credit Card', 'RT', 'A'),
(233, '397', '397 | ICICI Bank Jet Airways Visa Platinum Credit Card', 'PM', 'A'),
(234, '398', '398 | ICICI Bank Jet Airways Visa Signature Credit Card', 'PM', 'A'),
(235, '399', '399 | ICICI Bank Jet Airways Visa Infinite Credit Card', 'PM', 'A'),
(236, '400', '400 | ICICI Bank Jet Airways Amex Platinum Credit Card E', 'PM', 'A'),
(237, '401', '401 | ICICI Bank Jet Airways Amex Platinum Credit Card M', 'PM', 'A'),
(238, '402', '402 | ICICI Bank Jet Airways Amex Platinum Credit Card T', 'PM', 'A'),
(239, '403', '403 | ICICI Bank Coral American Express Credit Card', 'RT', 'A'),
(240, '404', '404 | ICICI Bank HPCL Coral American Express Credit Card', 'RT', 'A'),
(241, '410', '410 | ICICI Bank Amex Green Credit Card', 'RT', 'A'),
(242, '412', '412 | ICICI Sapphiro Card', 'RT', 'A'),
(243, '415', '415 | PRIORITY PASS MASTERCARD PLATINUM', 'RT', 'A'),
(244, '420', '420 | ICICI Bank Amex Gold Credit Card', 'RT', 'A'),
(245, '421', '421 | ICICI BANK AMEX GOLD - CTL', 'RT', 'A'),
(246, '422', '422 | ICICI Business Ascent Amex Card (IL)', 'RT', 'A'),
(247, '423', '423 | AMEX Gold Low APR Card', 'RT', 'A'),
(248, '424', '424 | ICICI Business Ascent Amex Card (CL)', 'RT', 'A'),
(249, '425', '425 | ICICI Ascent American Express Card', 'RT', 'A'),
(250, '426', '426 | ICICI Bank AMEX Gateway Classic Card', 'PM', 'A'),
(251, '427', '427 | ICICI Bank AMEX Gateway Premium Card', 'PM', 'A'),
(252, '428', '428 | ICICI Bank AMEX USD CCCL Card', 'RT', 'A'),
(253, '429', '429 | ICICI AMEX BUS ASCENT WITH VISA PLAT', 'RT', 'A'),
(254, '430', '430 | ICICI Amex Ascent with Visa Platinum', 'RT', 'A'),
(255, '431', '431 | ICICI Bank Platinum Identity AMEX Account', 'RT', 'A'),
(256, '432', '432 | ICICI Bank Amex Prepaid US Travel Card', 'RT', 'A'),
(257, '435', '435 | ICICI RUBYX PLT CREDIT CARD', 'RT', 'A'),
(258, '440', '440 | ICICI Bank Amex Green Credit Card', 'AT', 'A'),
(259, '441', '441 | TFL Silver', 'AT', 'A'),
(260, '450', '450 | ICICI Bank Amex Gold Credit Card', 'AT', 'A'),
(261, '451', '451 | TFL GOLD', 'AT', 'A'),
(262, '510', '510 | PRE-PAID CARD', 'RT', 'A'),
(263, '527', '527 | ARP Plan I X bucket', 'RT', 'A'),
(264, '528', '528 | ARP Plan II 30+ bucket', 'RT', 'A'),
(265, '529', '529 | ARP Plan III Current bucket', 'RT', 'A'),
(266, '530', '530 | ICICI Prudential Life Annuity Card', 'RT', 'A'),
(267, '531', '531 | ICICI Bank E-Wallet Card', 'RT', 'A'),
(268, '532', '532 | ICICI Bank Gift Card', 'RT', 'A'),
(269, '533', '533 | ICICI Indian Easy Pay Pre-Paid Card', 'RT', 'A'),
(270, '777', '777 | test777', 'RT', 'A'),
(271, '888', '888 | TEST888', 'RT', 'A'),
(272, '910', '910 | FLEET CARD', 'FT', 'A'),
(273, '912', '912 | ICICI Reliance Trans-Connect Fleet Card', 'FT', 'A'),
(274, '920', '920 | AUTO OD', 'IN', 'A'),
(275, '930', '930 | REIMBURSEMENT CARD', 'RI', 'A'),
(276, '931', '931 | ICICI Bank Big Bazaar PLC Card', 'RT', 'A'),
(277, '932', '932 | ICICI Bank ME Beat Plan Test Card', 'RT', 'A'),
(278, '933', '933 | ICICI Bank ME Beat Plan Test Card', 'RT', 'A'),
(279, '940', '940 | ICICI BANK TOBACCO CARD', 'IN', 'A'),
(280, '941', '941 | ICICI BANK KISAN TOBACCO (AP)', 'RT', 'A'),
(281, '942', '942 | ICICI Bank Kisan Card (GAIC 4)', 'RT', 'A'),
(282, '943', '943 | ICICI Bank Kisan Card (GAIC 5)', 'RT', 'A'),
(283, '944', '944 | ICICI Bank Kisan Card (GAIC 6)', 'RT', 'A'),
(284, '950', '950 | Relaince Fleet Card', 'FT', 'A');

-- --------------------------------------------------------

--
-- Table structure for table `ccmasterupload`
--

CREATE TABLE IF NOT EXISTS `ccmasterupload` (
  `id` int(11) NOT NULL,
  `masterName` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ccmasterupload`
--

INSERT INTO `ccmasterupload` (`id`, `masterName`) VALUES
(1, 'Logo Code'),
(2, 'Promo Logo Code'),
(3, 'Price Code'),
(4, 'DMA Code'),
(5, 'Surrogate Code'),
(6, 'Pin Code'),
(7, 'Img Type'),
(8, 'Company Master'),
(9, 'Tier Code');

-- --------------------------------------------------------

--
-- Table structure for table `ccpricemaster`
--

CREATE TABLE IF NOT EXISTS `ccpricemaster` (
  `priceId` int(11) NOT NULL,
  `priceCode` char(3) NOT NULL,
  `logoId` int(11) NOT NULL,
  `priceDescription` varchar(255) NOT NULL,
  `prgCtrl` varchar(10) NOT NULL,
  `priceCtrl` varchar(10) NOT NULL,
  `priceDays` varchar(10) NOT NULL,
  `priceCardFeeDsays` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ccpromocodemaster`
--

CREATE TABLE IF NOT EXISTS `ccpromocodemaster` (
  `promoId` int(11) NOT NULL,
  `promoCode` char(3) NOT NULL,
  `promoDescription` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ccpromocodemaster`
--

INSERT INTO `ccpromocodemaster` (`promoId`, `promoCode`, `promoDescription`) VALUES
(1, 'A04', ' ICICI Bank Kisan Card (GAIC 4)'),
(2, 'A05', ' ICICI Bank Kisan Card (GAIC 5)'),
(3, 'A06', ' ICICI Bank Kisan Card (GAIC 6)'),
(4, 'ABC', ' ASSOCITAED CLUB SOURCED UNDER'),
(5, 'ADC', 'Air Deccan Conversion'),
(6, 'ADD', 'add-on cards project,add-on to be generated on primary logo'),
(7, 'ADI', 'Air Deccan inflight sourcing'),
(8, 'ADM', 'UNIFIED CROSS-SELL ADM CHANNEL'),
(9, 'ADR', 'UNIFIED CROSS-SELL ADM CHANNEL with residence address proof'),
(10, 'ADS', 'INS Advisor Channel Sourcing Credit Cards'),
(11, 'ADT', 'Air Deccan Tellecalling'),
(12, 'ADV', 'Newspaper Advt - Lifetime Free'),
(13, 'AFD', 'BC against FD'),
(14, 'AGL', 'Agility Logistics'),
(15, 'ALA', 'New Car Loan Customers sourced through AOF'),
(16, 'ALC', 'Business card Auto loan customers'),
(17, 'ALL', 'Lower limit for on Auto AOF'),
(18, 'ALO', 'Auto AOF in non APS locations'),
(19, 'ALR', 'New Car Loan Customers sourced through AOF'),
(20, 'ALU', 'New Car Loan Customers sourced through AOF'),
(21, 'AMI', 'Amity Business School'),
(22, 'AMP', 'Amway pre approved'),
(23, 'AMS', 'Amway semi approved'),
(24, 'ANA', 'Action Aid'),
(25, 'AOC', 'Account Opening Form - Non Contact Pilot'),
(26, 'AOD', 'Rejection cases under Liability AOF'),
(27, 'AOF', 'Account opening form'),
(28, 'AOL', 'CBOP Art of Living'),
(29, 'AOM', 'Multi carding under Liability AOF'),
(30, 'APL', 'Internet Sourc thru Apnaloan'),
(31, 'APT', 'Tobacco Card for A.P'),
(32, 'AR4', 'Promo code for Airtel cobrand'),
(33, 'AR8', 'Promo code for Airtel cobrand'),
(34, 'ARD', 'Air Deccan'),
(35, 'AUA', 'credit card approved for used car loan customer'),
(36, 'AUR', 'credit card rejected for used car loan customer'),
(37, 'AUU', 'credit card undecisioned for used car loan customer'),
(38, 'AVR', 'ARVIND MILLS'),
(39, 'BAC', 'Bajaj Capital Affinity Card'),
(40, 'BBC', 'Big Bazaar c conversion 375'),
(41, 'BBF', 'Bib Bazaar Free Card in select'),
(42, 'BCF', 'Big Bazaar Card first y free'),
(43, 'BDM', 'BPCL - LOGO 163 ON'),
(44, 'BHU', 'BHUSHAN STEEL-4th line & logo'),
(45, 'BLK', 'BULK'),
(46, 'BM1', 'GRADE1'),
(47, 'BM2', 'GRADE2'),
(48, 'BM3', 'GRADE3'),
(49, 'BMB', 'B M BIRLA HOSP - LOGO - 4TH LN'),
(50, 'BMS', 'BMSCollege of Engineering'),
(51, 'C00', 'Corporate Card Relationship'),
(52, 'CAB', 'Megacab promo in Delhi'),
(53, 'CBB', 'CBoP customers who are active - either Transactor or Revolve'),
(54, 'CBG', 'CBoP customers who are active or'),
(55, 'CBM', 'Centurian Bank Applicants with ICICI Bank Cards'),
(56, 'CBR', 'CBoP customers who are active- transactor on both the card'),
(57, 'CBT', 'CBOP customers calling the call center and requesting for a'),
(58, 'CCL', 'Country Club members'),
(59, 'CCS', 'CREDIT CARD SELF EMPLOYED'),
(60, 'CEC', 'SEG - Corporate Expense Card'),
(61, 'CHL', 'Preapproved Xcell for CBOP Home Loan customers'),
(62, 'CNV', 'Conversion Cases'),
(63, 'COA', 'Coporate Office Address Waiver'),
(64, 'COD', 'Card OverDraft'),
(65, 'COG', 'Retail Credit Card for Cognizant Technology System'),
(66, 'COM', 'Corporate Companion card'),
(67, 'COP', 'CORPORATE'),
(68, 'COR', 'CORPORATE'),
(69, 'COS', 'Card On Swipe'),
(70, 'COT', 'HCL Connect sourcing'),
(71, 'CPL', 'Preapproved Xcell for CBOP Personal Loan customers'),
(72, 'CRP', 'Limits for corporates - Logo 910'),
(73, 'CRR', 'Reliance Retail (Corp Cards).'),
(74, 'CSL', 'Commercially Imp HNI customer'),
(75, 'CSO', 'CSOI PROMO'),
(76, 'CTM', 'CCIL Card for Tata Motors Empl'),
(77, 'CTS', 'Card for Cognizent - CTS logo'),
(78, 'CZC', 'USED FOR CASH CARD'),
(79, 'DBC', 'Direct Banking Cards'),
(80, 'DCI', 'DaimlerChrysler India'),
(81, 'DCM', 'DCB applicant with ICICI credi card relation'),
(82, 'DEL', 'DELL Company'),
(83, 'DFU', 'Business card Dealer funding'),
(84, 'DNB', 'Business Cards against DnB DM'),
(85, 'DOF', 'DIRECT MAILERS'),
(86, 'DOO', 'Doon School Affinity card'),
(87, 'DOR', 'Dormant customers-Additional card under P6M'),
(88, 'DPS', 'Card to Teachers employed with'),
(89, 'DSI', '4th line-DSI , Cards to Dayanand Saraswati Institute of En'),
(90, 'DTV', 'DISH TV EMPLOYEES'),
(91, 'E55', 'For EAD of Rs 5500'),
(92, 'EBA', 'Preapproved calling for Emerging Market'),
(93, 'ECM', 'ECS application multicarding'),
(94, 'ECO', 'E-sourcing through corporates and docs picked up by issuance'),
(95, 'ECS', 'E-sourcing thru corporates and docs picked up by storefronts'),
(96, 'ED1', 'EMI Card Promo code for Pre-approved Sourcing and Fast Despa'),
(97, 'ED2', 'EMI Card Promo code for Pre-approved Sourcing and Fast Despa'),
(98, 'ED4', 'EMI Card Promo code for Pre-approved Sourcing and Fast Despa'),
(99, 'EDC', 'Easy deposit instant credit card'),
(100, 'EE1', 'EMI of Rs 1000'),
(101, 'EE2', 'EMI of Rs 2000'),
(102, 'EE4', 'EMI of Rs 4000'),
(103, 'EIA', 'SME selected for the Emerging India Awards'),
(104, 'EM1', 'EMI1'),
(105, 'EM2', 'EMI'),
(106, 'EM4', 'EMI'),
(107, 'EMP', 'Platinum Srcng for both Auto & Liability srcs by Emrgng mrkt'),
(108, 'EMR', 'Loan repayment surrogate for Emerging Cities'),
(109, 'EP1', 'EMI Card Promo code for Pre-approved Sourcing and Installmen'),
(110, 'EP2', 'EMI Card Promo code for Pre-approved Sourcing and Installmen'),
(111, 'EP4', 'EMI Card Promo code for Pre-approved Sourcing and Installmen'),
(112, 'ER6', 'Perennial EGM Programme'),
(113, 'ERV', 'Enhanced Relationship Value'),
(114, 'ES1', 'For EAD of Rs 1000'),
(115, 'ES2', 'For EAD of Rs 2000'),
(116, 'ES4', 'For EAD of Rs 4000'),
(117, 'ESC', 'E-Sourcing through corporate'),
(118, 'ESM', 'Promo for E-sourcing'),
(119, 'ESO', 'Applications sourced thru E-Sourcing'),
(120, 'ESR', 'APPLN SOURCE THREW ESMR'),
(121, 'ETO', 'E-Sourcing done by Thomas Cook'),
(122, 'EVR', 'EVEREADY - LOGO - 4TH LINE'),
(123, 'FAM', 'Credit Card to FADA Members'),
(124, 'FDF', 'FD AOF customers'),
(125, 'FEL', 'Financial Evaluation and Loan Repayment'),
(126, 'FIL', 'Focus Infosys Logo'),
(127, 'GAR', 'Go Air'),
(128, 'GGM', 'Car Owners surrogate Garuda GM'),
(129, 'GLF', 'GULF OIL 4 th line embossing'),
(130, 'GLI', 'Sourcing IndiaTimes Transacting Customers'),
(131, 'GLN', 'New Chargeslip Policy'),
(132, 'GLO', 'CHARGESLIP SURROGATE'),
(133, 'GMP', 'Platinum card to the group companies Employee'),
(134, 'GMR', 'GMR Group Logo'),
(135, 'GPC', 'Global Private Clients'),
(136, 'GYS', 'GAYSON AFFINITY CARD'),
(137, 'GZC', 'DUMMY Corporate Cards'),
(138, 'HET', 'Open Market'),
(139, 'HLA', 'HOME LOAN FOR AOF'),
(140, 'HLP', 'Helpage India'),
(141, 'HMC', 'HPCL CARD FOR EXISTING CUST'),
(142, 'HPD', 'HPCL - LOGO 164'),
(143, 'HPE', 'HOME CARD'),
(144, 'HPL', 'HPCL Card as a campanion Card'),
(145, 'HSL', 'Very High Net worth Customers'),
(146, 'HVN', 'Low Vintage'),
(147, 'IAC', 'Insta Amway Credit Card'),
(148, 'IBP', 'IBP - LOGO 165'),
(149, 'IBS', 'One month promo from 10th August to 10th September07'),
(150, 'ICA', 'Institute of Chartered Accountants'),
(151, 'ICF', 'ICFAI logo - ICFAI UNIVERSITY'),
(152, 'ICI', 'SR MGMT REFERAL'),
(153, 'ICS', 'ICICI Bank Card Surrogate'),
(154, 'IDK', 'Sourced from I direct - KYC req No FI'),
(155, 'IDN', 'Sourced from I direct - No KYC FI req'),
(156, 'IDP', 'Source - IDirect. No KYC docs req for straight pass offers'),
(157, 'IDR', 'LOP(Pre-approved) sourcing at IDirect.com'),
(158, 'IDS', 'Sourcing from IDirect.com'),
(159, 'IDT', 'Source - IDirect. KYC docs are req for straight pass offer'),
(160, 'IDV', 'Sourcing from idirect.com'),
(161, 'IED', 'IBank Employee Database'),
(162, 'IFT', 'Indian Inst of Foreign Trade'),
(163, 'IFY', 'INFOSYS'),
(164, 'IGT', 'Promo code for IGATE'),
(165, 'IMA', 'IIM AHMEDABAD'),
(166, 'IMB', 'IIM BANGALORE'),
(167, 'IMK', 'IMA Kanpur'),
(168, 'IMT', 'IMT-ICICI Bank Affinity Card'),
(169, 'INF', 'Affinity tie up of India Infoline'),
(170, 'INI', 'LOP cases'),
(171, 'INK', 'Source from I bank- KYC req NO FI'),
(172, 'INN', 'Sourced from I Bank- No KYC FI req'),
(173, 'INP', 'Source-IBANK/Infinity.No KYC docs req straight pass offer'),
(174, 'INS', 'Indian Airlines'),
(175, 'INT', 'Source-IBANK/Infinity.KYC docs req for straight pass offer'),
(176, 'INV', 'Sourcing from ibank.com'),
(177, 'IOC', 'IOCL Instruction Card'),
(178, 'IPA', 'Prulife Anuity Card'),
(179, 'IPC', 'Indian Platinum Credit Card'),
(180, 'ISB', 'Indian School of Business'),
(181, 'ISL', 'I - SELECT'),
(182, 'ISP', 'Issunce of Platnum card to ICICI Brokrage Srvices Ltd (IBSL)'),
(183, 'ITB', 'Income Tax returns & Bank statement'),
(184, 'ITD', 'Promo codes for IIT D'),
(185, 'ITX', 'Intrex exchange'),
(186, 'JSW', 'Jindal Steels employees'),
(187, 'KFL', 'PEM deal - P blocked Kingfisher cobrand cards'),
(188, 'KFS', 'Kingfisher'),
(189, 'KID', 'Kidzee -ICICI Bank Affinity Card'),
(190, 'KNT', 'KARNATAKA TOBACCO'),
(191, 'LAN', 'LANCO group with LANCO logo'),
(192, 'LAP', 'Business Cards against LAP DM'),
(193, 'LGL', 'LG electronics'),
(194, 'LNT', 'L&T Preferred Card Promo'),
(195, 'LO1', 'PCOB - ATOB - Upgd - Dwngd'),
(196, 'LO2', 'PCIB - UPGD - DWNGD'),
(197, 'LO5', 'PRGO - UPGD - DWNGD'),
(198, 'LRS', '.BC against Loan Repayment Surrogate'),
(199, 'LSL', 'Rs 5 to 25 lakhs - HNI'),
(200, 'LVN', 'OB with card vintage 3-6 mnths'),
(201, 'MAC', 'Business card Merchant Acquiring customers'),
(202, 'MAH', 'ICICI Bank Mahima Group Affinity Card'),
(203, 'MAN', 'Pilot on Credit decline cases'),
(204, 'MAR', 'P6M ADDON MAMR ACTIVITY'),
(205, 'MAT', 'Comat Technologies'),
(206, 'MBA', 'Magic Bus Affinity'),
(207, 'MBS', 'Magic Bus association'),
(208, 'MCA', 'Merchant Acquiring Account AOF'),
(209, 'MCB', 'Existing Big Bazar Customers'),
(210, 'MCH', 'mCheque'),
(211, 'MCK', 'For McKinsey empl Cr Limit 6L'),
(212, 'MCR', 'Multicarding Activity -Within the line & within same account'),
(213, 'MEQ', 'Business card Medical Equipment'),
(214, 'MES', 'Merchant Services'),
(215, 'MGM', 'Megamart Database sourcing'),
(216, 'MIT', 'Affintiy card to Mahindra Intertrade'),
(217, 'MIX', 'Unsecured as well as secured limits for drivesmart custome'),
(218, 'MMP', 'Plartinum Cards given to DGM, JGM'),
(219, 'MMT', 'MMTC - 4th line & logo'),
(220, 'MPC', 'Mobile payment card set as companion card'),
(221, 'MUP', 'Promo required for tracking of multicards set up this fiscal'),
(222, 'NCO', 'Companies which were earlier i'),
(223, 'NET', 'INTERNET APPLICATIONS'),
(224, 'NFL', 'NFL Empl - 4th line & Logo'),
(225, 'NIS', 'NIS Sparta -4th line & logo'),
(226, 'NIT', 'HPCL cards for NITIE - logo & 4th line - NITIE'),
(227, 'NPC', 'Non Pre approved customers (ILOP)'),
(228, 'NRI', 'NRI EDC'),
(229, 'NSR', 'Nasr School-Logo in photo pane'),
(230, 'NTE', 'No Third-line Embossing'),
(231, 'NUN', 'NUNP-Additional card under P6M'),
(232, 'NUP', 'Recarding of NUNP customers'),
(233, 'OAK', 'Oakridge School'),
(234, 'OBC', 'Other Bank Card'),
(235, 'OBS', 'BC Against Cards'),
(236, 'ODY', 'Card for Odyssey tie up'),
(237, 'ONL', 'Companion Online Credit Card'),
(238, 'ORB', 'IDA Silver for Oral B Dentist'),
(239, 'ORI', 'ORCHID AFFINITY - 4TH LINE - MOST AWARDED ECOTEL'),
(240, 'ORM', 'Orchid Card for Gold Card Holders swipe at Orchid'),
(241, 'ORT', 'Ortel Communication'),
(242, 'OSP', 'Prime customers through OTC Policy'),
(243, 'OTC', 'Other Bank customers under OTC Policy'),
(244, 'OTH', 'Non-ICICI cust with vehicles financed by other finance cmp'),
(245, 'OTL', 'Personal Loan-Over The Line'),
(246, 'OUB', 'outsbound cross sell'),
(247, 'OUS', 'OUTSKIRTS'),
(248, 'P1R', 'Software cos having Salary account with residence address p'),
(249, 'P24', 'Premium Car Ownership Pilot'),
(250, 'P28', 'MB Club'),
(251, 'P29', 'ICICI Pru Advisor Loyalty Prgm'),
(252, 'P2R', 'Unlisted Software Cos having Salary account with residence'),
(253, 'P35', 'Emp in Cat B & C software cos not having an ICICI bnk acc'),
(254, 'P36', 'Empl in other software cos not having an ICICI bnk acc'),
(255, 'P39', 'Miracle card to the ICICI Bank customers withvintage 0-3mnts'),
(256, 'P3R', 'New Joinee in Top Software companies with residence address'),
(257, 'P40', 'Miracle card to the ICICI Bank customers withvintage 3-6mnts'),
(258, 'P41', 'Self employed customers with three months bank statement'),
(259, 'P42', 'Self employed customers with repayment track'),
(260, 'P43', 'ICICI Prudential Insurance for Advisors'),
(261, 'P44', 'Luxury & Premier car owner surrogate'),
(262, 'P4R', 'PP4 with residence address proof'),
(263, 'P6M', 'CROSS SELL - P6M ACTIVITY'),
(264, 'P6R', 'CROSS SELL - P6M ACTIVITY with residence address proof'),
(265, 'PAL', 'To provide Platinum card to Auto Loan customers'),
(266, 'PAO', 'S2S PULL Channel Activity'),
(267, 'PBB', 'PRE APPROVED THROUGH BRANCH BANKING'),
(268, 'PCM', 'CC to member of Premium Clubs'),
(269, 'PEM', 'PRE EMBOSSED'),
(270, 'PEP', 'Pepsi'),
(271, 'PER', 'Peerless Affinity credit card'),
(272, 'PET', 'Sourcing of ICICI Prudential ETs'),
(273, 'PFC', 'Con to Preferred from any othe'),
(274, 'PGR', 'Platinum Gift Reward'),
(275, 'PHL', 'To provide Platinum card to Home Loan customers'),
(276, 'PIC', 'PICTURE CARD APPLICATIONS'),
(277, 'PIR', 'PIR with residence address proof'),
(278, 'PL1', 'Plan 1'),
(279, 'PL2', 'Plan 2'),
(280, 'PL3', 'Plan 3'),
(281, 'PLA', 'New personal loan customers sourced through AOF'),
(282, 'PLC', 'Shakti PLC'),
(283, 'PLD', 'Personnal Loan :Business card Doctors'),
(284, 'PLL', 'Lower limit for on PL AOF'),
(285, 'PLN', 'Personnal Loan :Business card Self employed Non professional'),
(286, 'PLO', 'PL AOF from Non APS locations'),
(287, 'PLP', 'To provide Platinum card to Personal Loan customers'),
(288, 'PLR', 'New personal loan customers sourced through AOF'),
(289, 'PLT', 'Platinum Card set-up as Self Add-On to existing customers'),
(290, 'PLU', 'New personal loan customers sourced through AOF'),
(291, 'PMA', 'Platinum Multicarding for Asset customers'),
(292, 'PMI', 'Platinum multicarding sourced thru issuance team'),
(293, 'PMP', 'Platinum Multicarding for Private Banking'),
(294, 'PMS', 'Platinum Muticarding for Salary customers'),
(295, 'PNR', 'SDA with residence address proof'),
(296, 'PP1', 'Software cos in Cat B & C having Salary account'),
(297, 'PP2', 'Unlisted Software Cos having Salary account'),
(298, 'PP3', 'New Joinee in Top Software companies'),
(299, 'PP4', 'PP4'),
(300, 'PPA', 'PPA CUSTOMERS OF I -BANK'),
(301, 'PPI', 'ppi'),
(302, 'PPN', 'PPA10 without Auto Debit'),
(303, 'PPP', 'Pre Approved Customers with Pan(ILOP)'),
(304, 'PPR', 'Pre Approved Customers with Pan(ILOP) with residence addres'),
(305, 'PRC', 'Purchase card without magnetic stripe'),
(306, 'PRD', 'Pride-ICICI Bank Affinity Card'),
(307, 'PRI', 'Priority Embossing Cases'),
(308, 'PRO', 'Open Market Sourcing of Prulife Card'),
(309, 'PRR', 'PL AOF Not Interested customers giving consent for card upon'),
(310, 'PRU', 'ICICI Prudential'),
(311, 'PSB', 'conversion to PSB cobranded ca'),
(312, 'PVM', 'For Multi Carding of Private Banking Customers'),
(313, 'PVN', 'For new account set up for Private Banking customers'),
(314, 'PWP', 'Pre Approved Customer without Pan (ILOP)'),
(315, 'PWR', 'Pre Approved Customer without Pan (ILOP) with residence add'),
(316, 'RBU', 'R B University'),
(317, 'RCA', 'Roaming Current Account'),
(318, 'RDP', 'Readers Digest magazine'),
(319, 'REC', 'BBKK - RECA - NUNP AMEX'),
(320, 'RED', 'REDIFF PROMO'),
(321, 'REF', 'Referral program'),
(322, 'RET', 'RETAIL'),
(323, 'RL1', '912 - Pre-Approved Cases'),
(324, 'RL2', '912 - Approval Required Cases'),
(325, 'ROC', 'Promo code for Railway officer'),
(326, 'RPG', 'RPG group employees logo card'),
(327, 'RTI', 'RTI- ICICI Bank Affinity Card'),
(328, 'RTL', 'Secured limits for retail customers'),
(329, 'RUI', 'Ruchi Logo on photo panel - No 4th Line Embossing'),
(330, 'SAF', 'CBoP staff app. form'),
(331, 'SAP', 'CITIBANK - OTHER BANK CARD'),
(332, 'SAR', 'Sarovar Affinity Card'),
(333, 'SBA', 'ICICI BANK SAVINGS BANK AC PA'),
(334, 'SBN', 'SB AC OWNER WITHOUT AUTO DEBIT'),
(335, 'SBP', 'BPCL - LOGO 163 ONLY'),
(336, 'SCO', 'SCIENCE COLLEGE'),
(337, 'SDA', 'New joinee in S/W with salary A/c with ICICI'),
(338, 'SDF', 'DCB Staff'),
(339, 'SDR', 'SDA with residence address proof'),
(340, 'SE1', 'EMI card- SMR with EAD Rs 1000'),
(341, 'SE2', 'EMI card- SMR with EAD Rs 2000'),
(342, 'SE4', 'EMI card- SMR with EAD Rs 4000'),
(343, 'SEC', '201 logo - Secured'),
(344, 'SED', 'Business Cards against SE DM'),
(345, 'SFD', 'Secured cards sold to existing'),
(346, 'SFL', '940 LOGO - SAFAL'),
(347, 'SFP', 'Platinum customer to be sourced through Storefornts channel'),
(348, 'SFT', 'Tier1 2 PEM soft copy applicat'),
(349, 'SGM', 'Travel voucher of MakeMyTrip.com'),
(350, 'SGR', '35000 Reward points'),
(351, 'SJP', 'Promo Sugarcane farmers in AP'),
(352, 'SL3', 'Business card SEG customers'),
(353, 'SLC', 'Shreya Life Science Pvt. Ltd - 4th line - LIFE IS HEALTH'),
(354, 'SLI', 'Affinity- SALES INDIA 4th line'),
(355, 'SLP', 'Salary Account Platinum'),
(356, 'SMP', 'For Plartinum Cards given to DGM, JGM, Gm & SGM'),
(357, 'SMR', 'Senior Management Referals'),
(358, 'SMS', 'SMS by BIU'),
(359, 'SOP', 'BC against Security of property'),
(360, 'SPJ', 'S P Jain Affinity Cards'),
(361, 'SPL', 'PAS sourcing preapproved data list from policy or SMR.'),
(362, 'SPM', 'Platinum card issuance to NON ICICI Bank salary account hold'),
(363, 'SPT', 'Spicejet'),
(364, 'SSV', 'Superseva'),
(365, 'STF', 'STAFF'),
(366, 'STG', 'Secured limits for strategic customers'),
(367, 'STM', 'Multiple Card for Employees'),
(368, 'STN', 'For OB sur StanC cus with3Wpri'),
(369, 'STO', 'Straight pass through by outbound'),
(370, 'STR', 'Strategic'),
(371, 'STS', 'Straight pass through by storefronts'),
(372, 'SU2', '940 LOGO'),
(373, 'SUP', 'Promo Sugarcane farmers in UP'),
(374, 'SYD', 'Sydenham Affinity card'),
(375, 'TAT', 'PEM promo for TATA Motors - 4th line Embossing Name'),
(376, 'TBC', 'Tech Book company'),
(377, 'TCC', 'Thomas Cook Corporate Sourcing'),
(378, 'TCF', 'Conversion of existing card holder into Toyota card'),
(379, 'TCH', 'AOLTeachers'),
(380, 'TCK', 'Thomas Cook Applications'),
(381, 'TEL', 'Telco Construction Ltd.'),
(382, 'TG1', 'Tag Heuer Watch Model No : WAC111A.BA0850'),
(383, 'TG2', 'Tag Heuer Watch Model No : CAH1110.BT0714'),
(384, 'TIN', 'Travel Insurance as Joining Gift'),
(385, 'TM1', '3M CCIL CARDS'),
(386, 'TMC', 'TVS Motor CCIL applications'),
(387, 'TRA', 'Travel Card set-up as self add-on with the same account'),
(388, 'TRS', 'AOL Trustees'),
(389, 'TST', 'TEST'),
(390, 'TVS', 'Affinity Card with TVS group'),
(391, 'UAR', 'Upgrade at renewal'),
(392, 'UNC', '201 logo - Unsecured'),
(393, 'UPC', 'Upgrade customers based on their consent'),
(394, 'UPG', 'Upgraded card Tracking on Cards Setup and Spend'),
(395, 'USR', 'Unsecured limits - Retail customers - Logo 910'),
(396, 'USS', 'Unsecured limits - Strategic customers - Logo 910'),
(397, 'VAB', 'Sourcing of retail merchants'),
(398, 'VCC', 'Virtual Credit Card'),
(399, 'VDY', 'Un Senior management refrral'),
(400, 'VID', 'Videcon employees for Non pho'),
(401, 'VIR', 'Test'),
(402, 'VMP', 'Summer Prm for VisaMini-Plnt M'),
(403, 'VSQ', 'V Square'),
(404, 'WHA', 'WinBack Program on Helpage Ind'),
(405, 'XIM', 'Xavier Institute of Management, Bhubaneshwar'),
(406, 'XJA', 'Xavier s Alumni - Jaipur'),
(407, 'XLR', 'XLR - AFFINTITY CARDS'),
(408, 'XNH', 'CROSS SELL -HOME LOAN NEW CUST'),
(409, 'XOH', 'CROSS SELL- HOME LN EXSTG CUST'),
(410, 'XXX', 'REIMBURSEMENT CARD'),
(411, 'ZER', 'Zero day Other Bank Card Surrogate'),
(412, 'ZET', 'ZEE TURNER EMPLOYEES');

-- --------------------------------------------------------

--
-- Table structure for table `ccstatemaster`
--

CREATE TABLE IF NOT EXISTS `ccstatemaster` (
  `stateId` int(11) NOT NULL,
  `stateAbrevation` char(3) NOT NULL,
  `stateName` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ccstatemaster`
--

INSERT INTO `ccstatemaster` (`stateId`, `stateAbrevation`, `stateName`) VALUES
(1, 'ANP', 'ANDHRA PRA'),
(2, 'BIH', 'BIHAR'),
(3, 'CHS', 'CHATTISGAR'),
(4, 'DEL', 'DELHI'),
(5, 'GOA', 'GOA'),
(6, 'GUJ', 'GUJARAT'),
(7, 'HAR', 'HARAYANA'),
(8, 'HMP', 'HIMACHAL P'),
(9, 'JAK', 'JAMMU AND '),
(10, 'JND', 'JHARKHAND'),
(11, 'KAR', 'KARNATAKA'),
(12, 'KER', 'KERALA'),
(13, 'MAH', 'MAHARASHTR'),
(14, 'MDP', 'MADHYA PRA'),
(15, 'MGH', 'MEGHALAYA'),
(16, 'MNP', 'MANIPUR'),
(17, 'NAG', 'NAGALAND'),
(18, 'ORA', 'ORISSA'),
(19, 'PON', 'PONDICHERR'),
(20, 'PUN', 'PUNJAB'),
(21, 'RAJ', 'RAJASTHAN'),
(22, 'TMN', 'TAMILNADU'),
(23, 'TPR', 'TRIPURA'),
(24, 'UTP', 'UTTAR PRAD'),
(25, 'UTA', 'UTTARANCHA'),
(26, 'WBL', 'WEST BENGA'),
(27, 'ASM', 'ASSAM'),
(28, 'ARP', 'ARUNACHAL '),
(29, 'ESM', 'SIKKIM'),
(30, 'MIZ', 'MIZORAM'),
(31, 'UTR', 'UTTARAKHAN');

-- --------------------------------------------------------

--
-- Table structure for table `coreapps`
--

CREATE TABLE IF NOT EXISTS `coreapps` (
`appId` int(11) NOT NULL,
  `appname` varchar(100) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `coreapps`
--

INSERT INTO `coreapps` (`appId`, `appname`) VALUES
(1, 'ALPL'),
(2, 'Credit Card'),
(3, 'CASA'),
(4, 'User Access Control - Role Based'),
(6, 'Admin'),
(7, 'OCTM'),
(8, 'Technical Scrutiny'),
(9, 'PDCCTS Pro'),
(10, 'Playground');

-- --------------------------------------------------------

--
-- Table structure for table `corebankmaster`
--

CREATE TABLE IF NOT EXISTS `corebankmaster` (
  `bankId` int(11) NOT NULL,
  `bankName` varchar(255) NOT NULL,
  `micrCode` int(11) NOT NULL,
  `branchName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `corebatchmaster`
--

CREATE TABLE IF NOT EXISTS `corebatchmaster` (
`batchId` int(20) NOT NULL,
  `batchNo` varchar(255) NOT NULL,
  `batchDate` datetime NOT NULL,
  `appId` int(11) NOT NULL,
  `uploadedBy` int(11) NOT NULL,
  `batchAlias` varchar(255) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `corebatchmaster`
--

INSERT INTO `corebatchmaster` (`batchId`, `batchNo`, `batchDate`, `appId`, `uploadedBy`, `batchAlias`) VALUES
(1, '1', '2016-12-16 22:04:07', 1, 89, 'KOL_1'),
(2, '2', '2016-12-16 22:04:20', 1, 89, 'KOL_2');

-- --------------------------------------------------------

--
-- Table structure for table `corecompany`
--

CREATE TABLE IF NOT EXISTS `corecompany` (
`companyId` int(11) NOT NULL,
  `companyName` varchar(255) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `corecompany`
--

INSERT INTO `corecompany` (`companyId`, `companyName`) VALUES
(1, 'ICICI'),
(2, 'HDFC'),
(3, 'Jet Airways');

-- --------------------------------------------------------

--
-- Table structure for table `corecontracts`
--

CREATE TABLE IF NOT EXISTS `corecontracts` (
`contractId` int(11) NOT NULL,
  `contractTitle` varchar(255) NOT NULL,
  `companyId` int(11) NOT NULL,
  `appId` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `corecontracts`
--

INSERT INTO `corecontracts` (`contractId`, `contractTitle`, `companyId`, `appId`) VALUES
(1, 'ALPL Contract - ICICI', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `corecontractusers`
--

CREATE TABLE IF NOT EXISTS `corecontractusers` (
  `contractuserId` int(11) NOT NULL,
  `contractId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `allocateDate` datetime NOT NULL,
  `deallocateDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `corefields`
--

CREATE TABLE IF NOT EXISTS `corefields` (
`fieldId` int(11) NOT NULL,
  `fieldName` varchar(100) NOT NULL,
  `fieldDescription` text NOT NULL,
  `fieldTypeId` int(11) NOT NULL,
  `metaInfo` text NOT NULL,
  `sectionId` int(11) NOT NULL,
  `validationIds` text NOT NULL,
  `row` int(10) NOT NULL,
  `col` int(11) NOT NULL,
  `model` varchar(255) NOT NULL,
  `isDel` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=602 ;

--
-- Dumping data for table `corefields`
--

INSERT INTO `corefields` (`fieldId`, `fieldName`, `fieldDescription`, `fieldTypeId`, `metaInfo`, `sectionId`, `validationIds`, `row`, `col`, `model`, `isDel`) VALUES
(1, 'FullName', 'Users Full ame', 1, '', 1, '1', 1, 1, 'tmp.fname', 0),
(2, 'Document Type', 'CASA Document Type', 2, '{\n"Tables":["casadoctypemaster"],\n"Val":"documentId",\n"DisplayLabel":"documentName"\n}', 1, '', 1, 2, 'tmp.docId', 0),
(3, 'Email Id', 'emailId', 5, '', 1, '2', 2, 1, 'tmp.email', 0),
(10, 'Select File ', 'upload csv file', 9, '', 3, '1', 2, 1, '', 0),
(11, 'Upload', 'Upload', 10, '', 3, '', 3, 1, '', 0),
(217, 'Cross Sell No.', '', 1, '', 5, '1', 1, 1, 'ccdataentry.crossSellNo', 0),
(218, 'Unique ID', '', 1, '', 5, '1', 1, 2, 'ccdataentry.uniqueIdNo', 0),
(219, 'Card Type', '', 2, '', 5, '', 1, 3, 'ccdataentry.', 0),
(220, 'Net Banking Id', '', 1, '', 5, '1', 1, 4, 'ccdataentry.netBankingId', 0),
(221, 'DMA Code', '', 2, '{"Table":"ccdmamaster","Val":"dmaId","DisplayLabel":"dmaCode","sql":"SELECT ccdmamaster.dmaCode as displaylabel, ccdmamaster.* FROM `ccdmamaster` WHERE 1"}', 5, '', 2, 1, 'ccdataentry.dmaId', 0),
(222, 'DMA City', '', 2, '{"Table":"ccdmamaster","Val":"dmaId","DisplayLabel":"dmaCode","sql":"SELECT ccdmamaster.dmaCity as displaylabel, ccdmamaster.* FROM `ccdmamaster` WHERE 1"}', 5, '', 2, 2, 'ccdataentry.dmaId', 0),
(223, 'DME Code', '', 2, '{"Table":"ccdmemaster","Val":"dmeId","DisplayLabel":"dmeCode","sql":"SELECT ccdmamaster.dmaCode as displaylabel, ccdmemaster.* FROM `ccdmemaster` WHERE 1"}', 5, '', 2, 3, 'ccdataentry.dmeId', 0),
(224, 'Promo Code', '', 2, '{"Table":"ccpromocodemaster","Val":"promoId","DisplayLabel":"promoCode","sql":"SELECT ccpromocodemaster.promoCode as displaylabel, ccpromocodemaster.* FROM `ccpromocodemaster` WHERE 1"}', 5, '', 2, 4, 'ccdataentry.promoId	', 0),
(225, 'Channel Code', '', 2, '{"Table":"ccsurrogatecodemaster","Val":"surrogateId","DisplayLabel":"surrogateCode","sql":"SELECT ccsurrogatecodemaster.surrogateCode as displaylabel, ccsurrogatecodemaster.* FROM `ccsurrogatecodemaster` WHERE 1"}', 5, '', 3, 1, 'ccdataentry.surrogateId', 0),
(226, '', '', 2, '{"Table":"ccpricemaster","Val":"priceId","DisplayLabel":"priceCode","sql":"SELECT ccpricemaster.priceCode as displaylabel, ccpricemaster.* FROM `ccpricemaster` WHERE 1"}', 5, '', 3, 2, 'ccdataentry.pricingId', 0),
(227, 'Branch Code', '', 1, '{"Table":"ccbranchmaster","Val":"branchId","DisplayLabel":"branchCode","sql":"SELECT ccbranchmaster.branchCode as displaylabel, ccbranchmaster.* FROM `ccbranchmaster` WHERE 1"}', 5, '1', 3, 3, 'ccdataentry.branchCode', 0),
(228, 'Company Code', '', 2, '{"Table":"cccompanymaster","Val":"companyId","DisplayLabel":"companyName","sql":"SELECT cccompanymaster.companyName as displaylabel, cccompanymaster.* FROM `cccompanymaster` WHERE 1"}', 5, '', 3, 4, 'ccdataentry.companyId', 0),
(229, 'Inputter 1', '', 1, '', 5, '1', 4, 1, 'ccdataentry.inputter1', 0),
(230, 'Inputter 2', '', 2, '', 5, '1', 4, 2, 'ccdataentry.inputter2', 0),
(231, 'Reference Card', '', 2, '', 5, '1', 4, 3, '', 0),
(232, 'RCU Screen/Sample', '', 2, '{"Table":"cccategoryvalue","Val":"categoryValuesId","DisplayLabel":"CategoryCode","sql":"SELECT cccategoryvalue.CategoryCode as displaylabel, cccategoryvalue.* FROM `cccategoryvalue`,cccategorymaster WHERE cccategoryvalue.categoryId=cccategorymaster.categoryId and cccategorymaster.categoryId=2"}', 5, '', 4, 4, 'ccdataentry.RCUCategoryId', 0),
(233, 'RCU Code', '', 1, '', 5, '', 5, 1, 'ccdataentry.rcuCode', 0),
(234, 'Photo Flag', '', 2, '{"Table":"cccategoryvalue","Val":"categoryValuesId","DisplayLabel":"CategoryCode","sql":"SELECT cccategoryvalue.CategoryCode as displaylabel, cccategoryvalue.* FROM `cccategoryvalue`,cccategorymaster WHERE cccategoryvalue.categoryId=cccategorymaster.categoryId and cccategorymaster.categoryId=3"}', 5, '', 5, 2, 'ccdataentry.photoFlagCatId', 0),
(235, 'Courier/Stamp Date', '', 1, '', 5, '', 5, 3, 'ccdataentry.courieStampDate', 0),
(236, 'Document Attached', '', 2, '{"Table":"cccategoryvalue","Val":"categoryValuesId","DisplayLabel":"CategoryCode","sql":"SELECT cccategoryvalue.CategoryCode as displaylabel, cccategoryvalue.* FROM `cccategoryvalue`,cccategorymaster WHERE cccategoryvalue.categoryId=cccategorymaster.categoryId and cccategorymaster.categoryId=4"}', 5, '', 5, 4, 'ccdataentry.docAttachedCatId', 0),
(237, 'ICICI Prulife Policy 1/CPP', '', 1, '', 5, '', 6, 1, 'ccdataentry.iciciPolicy1Cpp', 0),
(238, 'ICICI Prulife 2/OAT', '', 1, '', 5, '', 6, 2, 'ccdataentry.iciciPolicy2Oat', 0),
(239, 'GL Consent', '', 2, '', 5, '', 6, 3, '', 0),
(240, 'Title', '', 2, '{"Table":"cccategoryvalue","Val":"categoryValuesId","DisplayLabel":"CategoryCode","sql":"SELECT cccategoryvalue.CategoryCode as displaylabel, cccategoryvalue.* FROM `cccategoryvalue`,cccategorymaster WHERE cccategoryvalue.categoryId=cccategorymaster.categoryId and cccategorymaster.categoryId=5"}', 6, '', 1, 1, 'ccdataentry.yourTitleCatId', 0),
(241, '', '', 1, '', 6, '', 1, 2, 'ccdataentry.yourTitleExt', 0),
(242, 'FirstName', '', 1, '', 6, '', 1, 3, 'ccdataentry.yourFirstName', 0),
(243, 'LastName', '', 1, '', 6, '', 1, 4, 'ccdataentry.yourLastName	', 0),
(244, 'MiddleName', '', 1, '', 6, '', 2, 1, 'ccdataentry.yourMiddleName	', 0),
(245, 'EmboName', '', 1, '', 6, '', 2, 2, 'ccdataentry.emboName', 0),
(246, 'MotherName', '', 1, '', 6, '', 2, 3, 'ccdataentry.motherName', 0),
(247, 'FatherName', '', 1, '', 6, '', 2, 4, 'ccdataentry.fatherName', 0),
(248, 'DateOFBirth', '', 8, '', 6, '', 3, 1, 'ccdataentry.dateOfBirth', 0),
(249, 'SMR Reference By', '', 1, '', 6, '', 3, 2, 'ccdataentry.smrReferenceBy', 0),
(250, 'Lotc No.', '', 1, '', 6, '', 3, 3, 'ccdataentry.lotcNo', 0),
(251, 'Mailing Name', '', 1, '', 6, '', 3, 4, 'ccdataentry.mailingName	', 0),
(252, 'Gender', '', 2, '{"Table":"cccategoryvalue","Val":"categoryValuesId","DisplayLabel":"CategoryCode","sql":"SELECT cccategoryvalue.CategoryCode as displaylabel, cccategoryvalue.* FROM `cccategoryvalue`,cccategorymaster WHERE cccategoryvalue.categoryId=cccategorymaster.categoryId and cccategorymaster.categoryId=6"}', 6, '', 4, 1, 'ccdataentry.YourGenderCatId', 0),
(253, 'Maritial Status', '', 1, '', 6, '1', 4, 2, 'ccdataentry.maritialStatus', 0),
(254, 'No. Of Children', '', 1, '', 6, '1', 4, 3, 'ccdataentry.noOfChildren', 0),
(255, 'No of Dependencies', '', 1, '', 6, '1', 4, 4, 'ccdataentry.noOfDependencies', 0),
(256, 'Qualification', '', 2, '', 6, '1', 4, 5, 'ccdataentry.', 0),
(257, 'Spouse Details', '', 11, '', 6, '', 5, 1, '', 0),
(258, 'Name', '', 1, '', 6, '', 7, 1, 'ccdataentry.spouseName', 0),
(259, 'Date of Birth', '', 8, '', 6, '', 7, 2, 'ccdataentry.spouseDateofBirth', 0),
(260, 'Occupation', '', 2, '{"Table":"cccategoryvalue","Val":"categoryValuesId","DisplayLabel":"CategoryCode","sql":"SELECT cccategoryvalue.CategoryCode as displaylabel, cccategoryvalue.* FROM `cccategoryvalue`,cccategorymaster WHERE cccategoryvalue.categoryId=cccategorymaster.categoryId and cccategorymaster.categoryId=15"}', 6, '', 7, 3, 'ccdataentry.spouseOccupationCatId', 0),
(261, '', '', 1, '', 6, '', 7, 4, 'ccdataentry.spouseOccupationExt', 0),
(262, 'Company', '', 1, '', 6, '', 8, 1, 'ccdataentry.spouseCompany', 0),
(263, 'Net Annual Income', '', 1, '', 6, '', 8, 2, 'ccdataentry.spouseNetAnnualIncome', 0),
(264, 'Current Residental Address', '', 11, '', 7, '', 1, 3, '', 0),
(265, 'Address 1', '', 1, '', 7, '', 2, 1, 'ccdataentry.currentAddress1', 0),
(266, 'Address 2', '', 1, '', 7, '', 2, 2, 'ccdataentry.currentAddress2', 0),
(267, 'Address 3', '', 1, '', 7, '', 2, 3, 'ccdataentry.currentAddress3', 0),
(268, 'Address 4', '', 1, '', 7, '', 2, 4, 'ccdataentry.currentAddress4', 0),
(269, 'LandMark', '', 1, '', 7, '', 3, 1, 'ccdataentry.cuurentLandMark	', 0),
(270, 'Pincode', '', 1, '', 7, '', 3, 2, 'ccdataentry.currentPincode', 0),
(271, 'City', '', 2, '{"Table":"cccitymaster","Val":"cityId","DisplayLabel":"cityName","sql":"SELECT cccitymaster.cityName as displaylabel, cccitymaster.* FROM `cccitymaster` WHERE 1"} ', 7, '', 3, 3, 'ccdataentry.currentCityId', 0),
(272, 'State', '', 2, '{"Table":"ccstatemaster","Val":"stateId","DisplayLabel":"stateName","sql":"SELECT ccstatemaster.stateName as displaylabel, ccstatemaster.* FROM `ccstatemaster` WHERE 1"} ', 7, '', 3, 4, 'ccdataentry.currentStateId', 0),
(273, 'STDCode', '', 1, '', 7, '', 4, 1, 'ccdataentry.currentStdCode', 0),
(274, 'Country', '', 2, '{"Table":"cccategoryvalue","Val":"categoryValuesId","DisplayLabel":"CategoryCode","sql":"SELECT cccategoryvalue.CategoryCode as displaylabel, cccategoryvalue.* FROM `cccategoryvalue`,cccategorymaster WHERE cccategoryvalue.categoryId=cccategorymaster.categoryId and cccategorymaster.categoryId=9"} ', 7, '', 4, 2, 'ccdataentry.currentCountryCatId	', 0),
(275, 'Phone 1', '', 1, '', 7, '', 4, 3, 'ccdataentry.currentPhone1	', 0),
(276, 'Phone 2', '', 1, '', 7, '', 4, 4, 'ccdataentry.currentPhone2', 0),
(277, 'Mobile', '', 1, '', 7, '', 5, 1, 'ccdataentry.currentMobile', 0),
(278, 'FAX No', '', 1, '', 7, '', 5, 2, 'ccdataentry.currentFaxNo', 0),
(279, 'EmailID', '', 1, '', 7, '2', 5, 3, 'ccdataentry.currentEmailId	', 0),
(280, 'Resi Tenure', '', 1, '', 7, '', 5, 4, 'ccdataentry.currentResiTenure', 0),
(281, '', '', 1, '', 7, '', 5, 5, 'ccdataentry.currentResiTenureExt', 0),
(282, 'Permanent Residental Address', '', 11, '', 7, '', 6, 1, '', 0),
(283, 'Address 1', '', 1, '', 7, '', 7, 1, 'ccdataentry.permanentAddress1', 0),
(284, 'Address 2', '', 1, '', 7, '', 7, 2, 'ccdataentry.permanentAddress2', 0),
(285, 'Address 3', '', 1, '', 7, '', 7, 3, 'ccdataentry.permanentAddress3	', 0),
(286, 'Address 4', '', 1, '', 7, '', 7, 4, 'ccdataentry.permanentAddress4', 0),
(287, 'LandMark', '', 1, '', 7, '', 8, 1, 'ccdataentry.permanentLandmark	', 0),
(288, 'Pincode', '', 1, '', 7, '', 8, 2, 'ccdataentry.permanentPincode', 0),
(289, 'City', '', 2, '{"Table":"cccitymaster","Val":"cityId","DisplayLabel":"cityName","sql":"SELECT cccitymaster.cityName as displaylabel, cccitymaster.* FROM `cccitymaster` WHERE 1"} ', 7, '', 8, 3, 'ccdataentry.permanentCityId	', 0),
(290, 'State', '', 2, '{"Table":"ccstatemaster","Val":"stateId","DisplayLabel":"stateName","sql":"SELECT ccstatemaster.stateName as displaylabel, ccstatemaster.* FROM `ccstatemaster` WHERE 1"} ', 7, '', 8, 4, 'ccdataentry.permanentStateId', 0),
(291, 'STDCode', '', 1, '', 7, '', 9, 1, 'ccdataentry.permanentStdCode', 0),
(292, 'Country', '', 2, '{"Table":"cccategoryvalue","Val":"categoryValuesId","DisplayLabel":"CategoryCode","sql":"SELECT cccategoryvalue.CategoryCode as displaylabel, cccategoryvalue.* FROM `cccategoryvalue`,cccategorymaster WHERE cccategoryvalue.categoryId=cccategorymaster.categoryId and cccategorymaster.categoryId=9"} ', 7, '', 9, 2, 'ccdataentry.permanentCountryCatId', 0),
(293, 'Phone 1', '', 1, '', 7, '', 9, 3, 'ccdataentry.permanentPhone1', 0),
(294, 'Phone 2', '', 1, '', 7, '', 9, 4, 'ccdataentry.permanentPhone2', 0),
(295, 'Mobile', '', 1, '', 7, '', 10, 1, 'ccdataentry.permanentMobile', 0),
(296, 'FAX No', '', 1, '', 7, '', 10, 2, 'ccdataentry.permanentFaxNo', 0),
(297, 'EmailID', '', 1, '', 7, '2', 10, 3, 'ccdataentry.permanentEmailId', 0),
(300, 'Residence Status Details', '', 11, '', 8, '', 1, 1, '', 0),
(301, 'Residence Status', '', 2, '{"Table":"cccategoryvalue","Val":"categoryValuesId","DisplayLabel":"CategoryCode","sql":"SELECT cccategoryvalue.CategoryCode as displaylabel, cccategoryvalue.* FROM `cccategoryvalue`,cccategorymaster WHERE cccategoryvalue.categoryId=cccategorymaster.categoryId and cccategorymaster.categoryId=11"} ', 8, '', 2, 1, 'ccdataentry.residenceCatId	', 0),
(302, 'Type Of Residence', '', 2, '{"Table":"cccategoryvalue","Val":"categoryValuesId","DisplayLabel":"CategoryCode","sql":"SELECT cccategoryvalue.CategoryCode as displaylabel, cccategoryvalue.* FROM `cccategoryvalue`,cccategorymaster WHERE cccategoryvalue.categoryId=cccategorymaster.categoryId and cccategorymaster.categoryId=12"} ', 8, '', 2, 2, 'ccdataentry.typeOfResiCatId', 0),
(303, 'Type Of Residence', '', 2, '{"Table":"cccategoryvalue","Val":"categoryValuesId","DisplayLabel":"CategoryCode","sql":"SELECT cccategoryvalue.CategoryCode as displaylabel, cccategoryvalue.* FROM `cccategoryvalue`,cccategorymaster WHERE cccategoryvalue.categoryId=cccategorymaster.categoryId and cccategorymaster.categoryId=12"} ', 8, '', 2, 3, 'ccdataentry.typeOfResiCatId', 0),
(304, 'Vehicle Details', '', 11, '', 8, '', 3, 1, '', 0),
(305, 'Driving Licence No.', '', 1, '', 8, '', 4, 1, 'ccdataentry.drivingLicenseNo', 0),
(306, 'Description Details', '', 2, '{"Table":"cccategoryvalue","Val":"categoryValuesId","DisplayLabel":"CategoryCode","sql":"SELECT cccategoryvalue.CategoryCode as displaylabel, cccategoryvalue.* FROM `cccategoryvalue`,cccategorymaster WHERE cccategoryvalue.categoryId=cccategorymaster.categoryId and cccategorymaster.categoryId=13"} ', 8, '', 4, 2, 'ccdataentry.vehicleDescriptionId', 0),
(307, 'Nature Of Ownership', '', 2, '{"Table":"cccategoryvalue","Val":"categoryValuesId","DisplayLabel":"CategoryCode","sql":"SELECT cccategoryvalue.CategoryCode as displaylabel, cccategoryvalue.* FROM `cccategoryvalue`,cccategorymaster WHERE cccategoryvalue.categoryId=cccategorymaster.categoryId and cccategorymaster.categoryId=14"} ', 8, '', 4, 3, 'ccdataentry.natureOwnCatId', 0),
(308, 'Vehicle No', '', 1, '', 8, '', 5, 1, 'ccdataentry.vehicleNo', 0),
(309, 'Passport No', '', 1, '', 8, '', 5, 2, 'ccdataentry.passportNo	', 0),
(310, 'Gas Connection No', '', 1, '', 8, '', 5, 3, 'ccdataentry.gasConnectionNo', 0),
(311, 'Your Other Detail', '', 11, '', 8, '', 6, 1, '', 0),
(312, 'PAN No.', '', 1, '', 8, '', 7, 1, 'ccdataentry.panNo', 0),
(313, 'Reference -1 Details', '', 11, '', 8, '', 8, 1, '', 0),
(314, 'Name', '', 1, '', 8, '', 9, 1, 'ccdataentry.referenceName	', 0),
(315, 'Address-1', '', 1, '', 8, '', 9, 2, 'ccdataentry.referenceAddress1', 0),
(316, 'Address-2', '', 1, '', 8, '', 9, 3, 'ccdataentry.referenceAddress2', 0),
(317, 'Pincode', '', 1, '', 8, '', 9, 4, 'ccdataentry.referencePincode', 0),
(318, 'City', '', 2, '{"Table":"cccitymaster","Val":"cityId","DisplayLabel":"cityName","sql":"SELECT cccitymaster.cityName as displaylabel, cccitymaster.* FROM `cccitymaster` WHERE 1"}', 8, '', 10, 1, 'ccdataentry.referenceCityCatId', 0),
(319, 'State', '', 2, '{"Table":"ccstatemaster","Val":"stateId","DisplayLabel":"stateName","sql":"SELECT ccstatemaster.stateName as displaylabel, ccstatemaster.* FROM `ccstatemaster` WHERE 1"} ', 8, '', 10, 2, 'ccdataentry.referenceStateCatId', 0),
(320, 'Phone 1', '', 1, '', 8, '', 10, 3, 'ccdataentry.referencePhone1', 0),
(321, 'Mobile', '', 1, '', 8, '', 10, 4, 'ccdataentry.referenceMobile', 0),
(322, 'Reference -2 Details', '', 11, '', 8, '', 11, 1, '', 0),
(323, 'Name', '', 1, '', 8, '', 12, 1, 'ccdataentry.reference2Name', 0),
(324, 'Address-1', '', 1, '', 8, '', 12, 2, 'ccdataentry.reference2Address1', 0),
(325, 'Address-2', '', 1, '', 8, '', 12, 3, 'ccdataentry.reference2Address2', 0),
(326, 'Pincode', '', 1, '', 8, '', 12, 4, 'ccdataentry.reference2Pincode', 0),
(327, 'City', '', 2, '{"Table":"cccitymaster","Val":"cityId","DisplayLabel":"cityName","sql":"SELECT cccitymaster.cityName as displaylabel, cccitymaster.* FROM `cccitymaster` WHERE 1"}', 8, '', 13, 1, 'ccdataentry.reference2CityCatId', 0),
(328, 'State', '', 2, '{"Table":"ccstatemaster","Val":"stateId","DisplayLabel":"stateName","sql":"SELECT ccstatemaster.stateName as displaylabel, ccstatemaster.* FROM `ccstatemaster` WHERE 1"} ', 8, '', 13, 2, 'ccdataentry.reference2StateCatId', 0),
(329, 'Phone 1', '', 1, '', 8, '', 13, 3, 'ccdataentry.reference2Phone1', 0),
(330, 'Mobile', '', 1, '', 8, '', 13, 4, 'ccdataentry.reference2Mobile', 0),
(331, 'About Your Work', '', 11, '', 9, '', 1, 1, '', 0),
(332, 'Occupation', '', 2, '', 9, '', 2, 1, 'ccdataentry.yourWorkOccupationCatId	', 0),
(333, 'CoName', '', 2, '{"Table":"cccompanymaster","Val":"companyId","DisplayLabel":"companyName","sql":"SELECT cccompanymaster.companyName as displaylabel, cccompanymaster.* FROM `cccompanymaster` WHERE 1"} ', 9, '', 2, 2, 'ccdataentry.YourWorkCompNameCatId', 0),
(334, 'Type Of Industry/Biz', '', 2, '{"Table":"cccategoryvalue","Val":"categoryValuesId","DisplayLabel":"CategoryCode","sql":"SELECT cccategoryvalue.CategoryCode as displaylabel, cccategoryvalue.* FROM `cccategoryvalue`,cccategorymaster WHERE cccategoryvalue.categoryId=cccategorymaster.categoryId and cccategorymaster.categoryId=16"}', 9, '', 2, 3, 'ccdataentry.YourWorkIndustryCatId', 0),
(335, 'Type of Company', '', 2, '{"Table":"cccategoryvalue","Val":"categoryValuesId","DisplayLabel":"CategoryCode","sql":"SELECT cccategoryvalue.CategoryCode as displaylabel, cccategoryvalue.* FROM `cccategoryvalue`,cccategorymaster WHERE cccategoryvalue.categoryId=cccategorymaster.categoryId and cccategorymaster.categoryId=17"}', 9, '', 2, 4, 'ccdataentry.YourWorkCompTypeCatId	', 0),
(336, 'Business Tenure', '', 1, '', 9, '', 3, 1, 'ccdataentry.yourWorkBusinessTenure', 0),
(337, '', '', 1, '', 9, '', 3, 2, 'ccdataentry.yourWorkBusinessTenureExt', 0),
(338, 'Profession', '', 2, '{"Table":"cccategoryvalue","Val":"categoryValuesId","DisplayLabel":"CategoryCode","sql":"SELECT cccategoryvalue.CategoryCode as displaylabel, cccategoryvalue.* FROM `cccategoryvalue`,cccategorymaster WHERE cccategoryvalue.categoryId=cccategorymaster.categoryId and cccategorymaster.categoryId=18"}', 9, '', 3, 3, 'ccdataentry.YourWorkProfessionCatId', 0),
(339, '', '', 1, '', 9, '', 3, 4, 'ccdataentry.yourWorkProfessionExt	', 0),
(340, 'Designation', '', 1, '', 9, '', 4, 1, 'ccdataentry.yourWorkDesignation', 0),
(341, 'CR Position', '', 2, '{"Table":"cccategoryvalue","Val":"categoryValuesId","DisplayLabel":"CategoryCode","sql":"SELECT cccategoryvalue.CategoryCode as displaylabel, cccategoryvalue.* FROM `cccategoryvalue`,cccategorymaster WHERE cccategoryvalue.categoryId=cccategorymaster.categoryId and cccategorymaster.categoryId=19"}', 9, '', 4, 2, 'ccdataentry.yourWorkCrPositionCatId', 0),
(342, 'Department', '', 1, '', 9, '', 4, 3, 'ccdataentry.yourWorkDepartment', 0),
(343, 'Emp Code', '', 1, '', 9, '', 4, 4, 'ccdataentry.yourWorkEmpCode', 0),
(344, 'GA Income', '', 1, '', 9, '', 5, 1, 'ccdataentry.yourWorkGAIncome', 0),
(345, 'Net M Income', '', 1, '', 9, '', 5, 2, 'ccdataentry.yourWorkNetMIncome', 0),
(346, 'Card Limit', '', 1, '', 9, '', 5, 3, 'ccdataentry.yourWorkCardLimit', 0),
(347, 'Net A Income', '', 1, '', 9, '', 5, 4, 'ccdataentry.yourWorkNetAIncome	', 0),
(348, 'OTH source Income', '', 1, '', 9, '', 6, 2, 'ccdataentry.yourWorkOTHSourceIncome', 0),
(349, 'Total Income', '', 1, '', 9, '', 6, 3, 'ccdataentry.yourWorkTotalIncome', 0),
(350, 'CR JOB Tenure', '', 1, '', 9, '', 6, 4, 'ccdataentry.yourWorkCRJobTenure', 0),
(351, '', '', 1, '', 9, '', 6, 1, 'ccdataentry.yourWorkCRJobTenureExt', 0),
(352, 'About Your Work', '', 11, '', 9, '', 7, 1, '', 0),
(353, 'Address-1', '', 1, '', 9, '', 8, 1, 'ccdataentry.yourWorkAddress1	', 0),
(354, 'Address-2', '', 1, '', 9, '', 8, 2, 'ccdataentry.yourWorkAddress2', 0),
(355, 'Address-3', '', 1, '', 9, '', 8, 3, 'ccdataentry.yourWorkAddress3', 0),
(356, 'Adderss-4', '', 1, '', 9, '', 8, 4, 'ccdataentry.yourWorkAddress4', 0),
(357, 'LandMark', '', 1, '', 9, '', 9, 1, 'ccdataentry.yourWorkLandmark', 0),
(358, 'Pincode', '', 1, '', 9, '', 9, 2, 'ccdataentry.yourWorkPincode', 0),
(359, 'City', '', 2, '{"Table":"cccitymaster","Val":"cityId","DisplayLabel":"cityName","sql":"SELECT cccitymaster.cityName as displaylabel, cccitymaster.* FROM `cccitymaster` WHERE 1"} ', 9, '', 9, 3, 'ccdataentry.yourWorkCityCatId	', 0),
(360, 'State', '', 2, '{"Table":"ccstatemaster","Val":"stateId","DisplayLabel":"stateName","sql":"SELECT ccstatemaster.stateName as displaylabel, ccstatemaster.* FROM `ccstatemaster` WHERE 1"} {"Table":"ccstatemaster","Val":"stateId","DisplayLabel":"stateName","sql":"SELECT ccstatemaster.stateName as displaylabel, ccstatemaster.* FROM `ccstatemaster` WHERE 1"} ', 9, '', 9, 4, 'ccdataentry.yourWorkStateCatId	', 0),
(361, 'STDCode', '', 1, '', 9, '', 10, 1, 'ccdataentry.yourWorkStdCode	', 0),
(362, 'Country', '', 2, '{"Table":"cccategoryvalue","Val":"categoryValuesId","DisplayLabel":"CategoryCode","sql":"SELECT cccategoryvalue.CategoryCode as displaylabel, cccategoryvalue.* FROM `cccategoryvalue`,cccategorymaster WHERE cccategoryvalue.categoryId=cccategorymaster.categoryId and cccategorymaster.categoryId=9"}', 9, '', 10, 2, 'ccdataentry.YourWorkCountryCatId	', 0),
(363, 'Phone-1', '', 1, '', 9, '', 10, 3, 'ccdataentry.yourWorkPhone1	', 0),
(364, 'Phone-2', '', 1, '', 9, '', 10, 4, 'ccdataentry.yourWorkPhone2', 0),
(365, 'EXT No', '', 1, '', 9, '', 11, 1, 'ccdataentry.yourWorkExtNo', 0),
(366, 'Mobile', '', 1, '', 9, '', 11, 2, 'ccdataentry.yourWorkMobile', 0),
(367, 'EmailId', '', 1, '', 9, '2', 11, 3, 'ccdataentry.yourWorkEmailId	', 0),
(368, 'Your ICICI Relatioship', '', 11, '', 10, '', 1, 1, '', 0),
(369, 'Relationship type', '', 2, '{"Table":"cccategoryvalue","Val":"categoryValuesId","DisplayLabel":"CategoryCode","sql":"SELECT cccategoryvalue.CategoryCode as displaylabel, cccategoryvalue.* FROM `cccategoryvalue`,cccategorymaster WHERE cccategoryvalue.categoryId=cccategorymaster.categoryId and cccategorymaster.categoryId=12"} ', 10, '', 2, 1, 'ccdataentry.iciciRelTypeCatId', 0),
(370, 'Salary/SavingA/C No', '', 1, '', 10, '1', 2, 2, 'ccdataentry.iciciSalary_SavingAcNo', 0),
(371, 'CustomerId No', '', 1, '', 10, '', 2, 3, 'ccdataentry.iciciCustomerIdNo', 0),
(372, 'Loan A/C No.', '', 1, '', 10, '', 3, 1, 'ccdataentry.iciciLoanAcNo	', 0),
(373, 'Fixed DepositA/C No', '', 1, '', 10, '', 3, 2, 'ccdataentry.iciciFixedDepositAcNo', 0),
(374, 'Credit Card No', '', 1, '', 10, '', 3, 3, 'ccdataentry.iciciCreditCardNo', 0),
(375, 'Your non-ICICI Bank relationship', '', 11, '', 10, '', 4, 1, '', 0),
(376, 'Branch Name', '', 2, '', 10, '', 5, 1, 'ccdataentry.nonIciciBranchNameCatId	', 0),
(377, 'Account No', '', 1, '', 10, '', 5, 2, 'ccdataentry.nonIciciAccountNo', 0),
(378, 'Branch Name', '', 1, '', 10, '', 5, 3, 'ccdataentry.nonIciciBranchNo', 0),
(379, 'Other Bank Credit/Card', '', 2, '{"Table":"cccategoryvalue","Val":"categoryValuesId","DisplayLabel":"CategoryCode","sql":"SELECT cccategoryvalue.CategoryCode as displaylabel, cccategoryvalue.* FROM `cccategoryvalue`,cccategorymaster WHERE cccategoryvalue.categoryId=cccategorymaster.categoryId and cccategorymaster.categoryId=22"} ', 10, '', 5, 4, 'ccdataentry.nonIciciOTHCCCatId', 0),
(380, 'Supplementary card Applicant-1', '', 11, '', 10, '', 6, 1, '', 0),
(381, 'Supplementary card required', '', 2, '{"Table":"cccategoryvalue","Val":"categoryValuesId","DisplayLabel":"CategoryCode","sql":"SELECT cccategoryvalue.CategoryCode as displaylabel, cccategoryvalue.* FROM `cccategoryvalue`,cccategorymaster WHERE cccategoryvalue.categoryId=cccategorymaster.categoryId and cccategorymaster.categoryId=28"} ', 10, '', 7, 1, 'ccdataentry.suppApp1CardRequired', 0),
(382, 'Relation', '', 2, '', 10, '', 7, 2, 'ccdataentry.suppApp1Relation	', 0),
(383, 'Date Of Birth', '', 8, '', 10, '', 7, 3, 'ccdataentry.suppApp1DateOfBirth', 0),
(384, 'Gender', '', 2, '{"Table":"cccategoryvalue","Val":"categoryValuesId","DisplayLabel":"CategoryCode","sql":"SELECT cccategoryvalue.CategoryCode as displaylabel, cccategoryvalue.* FROM `cccategoryvalue`,cccategorymaster WHERE cccategoryvalue.categoryId=cccategorymaster.categoryId and cccategorymaster.categoryId=6"} ', 8, '', 10, 1, 'ccdataentry.suppApp1CardGenderCatId', 0),
(385, '', '', 1, '', 8, '', 10, 2, 'ccdataentry.suppApp1CardGenderExt	', 0),
(386, 'Desired name on card', '', 1, '', 10, '', 8, 3, 'ccdataentry.suppApp1NameOnCard', 0),
(387, 'Photo flag', '', 2, '{"Table":"cccategoryvalue","Val":"categoryValuesId","DisplayLabel":"CategoryCode","sql":"SELECT cccategoryvalue.CategoryCode as displaylabel, cccategoryvalue.* FROM `cccategoryvalue`,cccategorymaster WHERE cccategoryvalue.categoryId=cccategorymaster.categoryId and cccategorymaster.categoryId=3"} ', 10, '', 8, 4, 'ccdataentry.suppApp1PhotoIdCatId	', 0),
(388, 'Supplementary card Applicant-2', '', 11, '', 10, '', 9, 1, '', 0),
(389, 'Supplementary card required', '', 2, '{"Table":"cccategoryvalue","Val":"categoryValuesId","DisplayLabel":"CategoryCode","sql":"SELECT cccategoryvalue.CategoryCode as displaylabel, cccategoryvalue.* FROM `cccategoryvalue`,cccategorymaster WHERE cccategoryvalue.categoryId=cccategorymaster.categoryId and cccategorymaster.categoryId=28"}', 10, '', 10, 1, 'ccdataentry.suppApp2CardReqCatId', 0),
(390, 'Relation', '', 2, '', 10, '', 10, 2, 'ccdataentry.suppApp2RelCatId	', 0),
(391, 'Date Of Birth', '', 8, '', 10, '', 10, 3, 'ccdataentry.suppApp2DateOfBirth', 0),
(392, 'Gender', '', 2, '{"Table":"cccategoryvalue","Val":"categoryValuesId","DisplayLabel":"CategoryCode","sql":"SELECT cccategoryvalue.CategoryCode as displaylabel, cccategoryvalue.* FROM `cccategoryvalue`,cccategorymaster WHERE cccategoryvalue.categoryId=cccategorymaster.categoryId and cccategorymaster.categoryId=6"} ', 10, '', 11, 1, 'ccdataentry.suppApp2GenderCatId	', 0),
(393, '', '', 1, '', 10, '', 11, 2, 'ccdataentry.suppApp2GenderExt', 0),
(394, 'Desired name on card', '', 1, '', 10, '', 11, 3, 'ccdataentry.suppAppl2NameOnCard', 0),
(395, 'Photo flag', '', 2, '{"Table":"cccategoryvalue","Val":"categoryValuesId","DisplayLabel":"CategoryCode","sql":"SELECT cccategoryvalue.CategoryCode as displaylabel, cccategoryvalue.* FROM `cccategoryvalue`,cccategorymaster WHERE cccategoryvalue.categoryId=cccategorymaster.categoryId and cccategorymaster.categoryId=3"} ', 10, '', 11, 4, 'ccdataentry.suppApp2PhotoCatId', 0),
(396, 'Preferred Mailing Address', '', 11, '', 11, '', 1, 1, '', 0),
(397, 'Mailing Address', '', 2, '', 11, '', 2, 1, 'ccdataentry.mailIdCatId', 0),
(398, 'Subscribtion for Email/Mobile Alert', '', 11, '', 11, '', 3, 1, '', 0),
(399, 'Statement by email', '', 2, '{"Table":"cccategoryvalue","Val":"categoryValuesId","DisplayLabel":"CategoryCode","sql":"SELECT cccategoryvalue.CategoryCode as displaylabel, cccategoryvalue.* FROM `cccategoryvalue`,cccategorymaster WHERE cccategoryvalue.categoryId=cccategorymaster.categoryId and cccategorymaster.categoryId=23"} ', 11, '', 4, 1, 'ccdataentry.subStatementEmailCatId', 0),
(400, 'Resi', '', 3, '', 11, '', 4, 2, 'ccdataentry.subMailTypeCatId	', 0),
(401, 'Office', '', 3, '', 11, '', 4, 3, 'ccdataentry.subMailTypeCatId	', 0),
(402, 'EmaiID', '', 1, '', 11, '2', 4, 4, 'ccdataentry.subscriptionEmailId', 0),
(403, 'Mail Alert', '', 2, '', 11, '', 5, 1, 'ccdataentry.subMobAlertCatId', 0),
(404, 'Resi', '', 3, '', 11, '', 5, 2, 'ccdataentry.subMobTypeCatId', 0),
(405, 'Office', '', 3, '', 11, '', 5, 3, 'ccdataentry.subMobTypeCatId', 0),
(406, 'Mobile No', '', 1, '', 11, '2', 5, 4, 'ccdataentry.subscriptionMobileNo', 0),
(407, 'Auto Debit Facility', '', 11, '', 11, '', 6, 1, '', 0),
(408, 'Auto Debit Option', '', 2, '{"Table":"cccategoryvalue","Val":"categoryValuesId","DisplayLabel":"CategoryCode","sql":"SELECT cccategoryvalue.CategoryCode as displaylabel, cccategoryvalue.* FROM `cccategoryvalue`,cccategorymaster WHERE cccategoryvalue.categoryId=cccategorymaster.categoryId and cccategorymaster.categoryId=27"} ', 11, '', 7, 1, 'ccdataentry.autoDebitOptCatId', 0),
(409, 'Auto Debit Account No.', '', 1, '', 11, '', 7, 2, 'ccdataentry.autoDebitAccountNo	', 0),
(410, 'Auto Debit Branch', '', 1, '', 11, '', 8, 1, 'ccdataentry.autoDebitBranch', 0),
(411, 'Amount', '', 1, '', 11, '', 8, 2, 'ccdataentry.autoDebitAmount', 0),
(412, 'About Your Work', '', 11, '', 11, '', 9, 1, '', 0),
(413, '4th Line Embossing', '', 1, '', 11, '', 10, 1, 'ccdataentry.yourWork4thLineEmbossing', 0),
(414, 'Signature', '', 11, '', 11, '', 11, 1, '', 0),
(415, 'Applicant Signature', '', 2, '', 11, '', 12, 1, 'ccdataentry.appSignatureId	', 0),
(416, 'Applicant Sign Date', '', 8, '', 11, '', 12, 2, 'ccdataentry.applicantSignatureDate', 0),
(417, 'Important Credit Card Declaration Card', '', 11, '', 11, '', 13, 1, '', 0),
(418, 'Do Not Call', '', 2, '', 11, '', 14, 1, 'ccdataentry.DNDCatId', 0),
(419, 'Agency Code', '', 2, '{"Table":"ccagencymaster","Val":"agencyId","DisplayLabel":"agencyCode"}', 12, '', 1, 1, 'ccdataentry.agencyid', 0),
(420, 'Vara Control No', '', 1, '', 12, '', 1, 2, 'ccdataentry.varaControlNo', 0),
(421, 'Image Type', '', 2, '', 12, '', 1, 3, 'ccdataentry.imageTypeId', 0),
(422, 'Batch No', '', 1, '', 12, '', 1, 4, 'ccdataentry.batchNo', 0),
(423, 'Appl Ref No.', '', 1, '', 12, '', 2, 1, 'ccdataentry.ApplRefNo', 0),
(424, 'App Serial No', '', 1, '', 12, '', 2, 2, 'ccdataentry.AppSerialNo', 0),
(425, 'Logo Code', '', 2, '', 12, '', 2, 3, 'ccdataentry.logoCodeId', 0),
(426, 'CC Number', '', 1, ' { "name":"abc" }', 12, '', 2, 4, 'ccdataentry.ccNumber', 0),
(427, 'Tick For Reject', '', 3, ' { "name":"group" }', 12, '', 3, 1, 'ccdataentry.RejectionCatId	', 0),
(431, 'Process Name', 'Process Select dropdown', 2, '{\r\n"Tables":["alplprocessmaster"],\r\n"Val":"processId",\r\n"DisplayLabel":"name"\r\n} ', 4, '1', 1, 1, '', 0),
(433, 'Batch  No', 'Batch Select dropdown', 2, '{\n"Tables":["alplbatchmaster"],\n"Val":"batchId",\n"DisplayLabel":"batchNo"\n} ', 4, '1', 2, 2, '', 0),
(434, 'User Name', 'User Select dropdown', 2, '{\r\n"Tables":["coreusers"],\r\n"Val":"userId",\r\n"DisplayLabel":"fullName"\r\n} ', 4, '1', 3, 3, '', 0),
(435, 'Select Record', 'select record', 3, '', 4, '1', 4, 1, '', 0),
(440, 'Select Record', 'select record', 3, '', 4, '1', 4, 1, '', 0),
(451, 'Import Logs', 'Logs', 12, '', 3, '', 4, 1, 'logs', 0),
(456, 'From Date', '', 8, '', 14, '', 1, 2, 'fromDate', 0),
(457, 'To Date', '', 8, '', 14, '', 1, 3, 'toDate', 0),
(458, 'From Batch', '', 1, '', 14, '', 2, 1, 'fromBatch', 0),
(459, 'To Batch', '', 1, '', 14, '', 2, 2, 'toBatch', 0),
(460, 'Auto Loan', '', 3, '', 14, '', 2, 4, 'autoLoan', 0),
(461, 'Personal Loan', '', 3, '', 14, '', 1, 4, 'personalLoan', 0),
(463, 'Show', '', 10, '', 14, '', 3, 3, '', 0),
(467, 'Total Record', '', 1, '', 14, '', 2, 3, 'totalRecord', 0),
(468, 'Select Option', '', 2, '', 14, '', 1, 1, '', 0),
(469, 'CLG Date', '', 2, '{ "Tables":"octmClgDate", "Val":"clgDateId", "DisplayLabel":"clgDate" }', 16, '', 1, 1, 'selectedclgDate', 0),
(470, 'Category', '', 2, '{ "Tables":"octmamountcategory", "Val":"categoryId", "DisplayLabel":"categoryName" }', 16, '', 1, 2, 'selectedcategory', 0),
(471, 'Lot Number', '', 2, '{ "Tables":"corelotnumber", "Val":"lotNumberId", "DisplayLabel":"lotNumber" }', 16, '', 1, 3, 'selectedlotNumber', 0),
(473, 'Batch No.', '', 1, '', 15, '1', 1, 1, 'octmchequeentry.batchNumber', 0),
(474, 'Sr No.', '', 11, '', 15, '', 1, 2, '', 0),
(475, 'Lot No.', '', 11, '', 15, '', 1, 3, 'octmchequeentry.lotNumber', 0),
(477, 'Category', '', 11, '', 15, '', 1, 4, 'octmchequeentry.categoryAmount', 0),
(478, 'Account No.', '', 1, '', 15, '', 3, 1, 'octmchequeentry.accountNumber', 0),
(479, 'Pay in slip Date (mm/dd/yy)', '', 8, '', 15, '', 3, 2, 'octmchequeentry.payinSlipDate', 0),
(480, 'Cheque Date', '', 8, '', 15, '', 4, 1, 'octmchequeentry.chequeDate', 0),
(481, 'Amount(In Letters)', '', 11, '', 15, '', 3, 4, '', 0),
(482, 'Cheque No.', '', 1, '', 15, '', 4, 2, 'octmchequeentry.chequeNumber', 0),
(483, 'Cheque Amount', '', 1, '', 15, '', 3, 3, 'octmchequeentry.chequeAmount', 0),
(484, 'MICR code', '', 1, '', 15, '', 4, 3, 'octmchequeentry.micrCode', 0),
(485, 'Bank Name', '', 11, '', 15, '', 4, 4, '', 0),
(486, 'Trans Code', '', 1, '', 15, '', 7, 1, 'octmchequeentry.transCode', 0),
(487, 'Payee name', '', 1, '', 15, '', 7, 2, 'octmchequeentry.payeeName', 0),
(488, 'Drawee Name', '', 1, '', 15, '', 8, 1, 'octmchequeentry.draweeName', 0),
(489, 'Cheque Amount', '', 1, '', 15, '', 7, 3, 'octmchequeentry.chequeAmnt', 0),
(490, 'Sol Id', '', 1, '', 15, '', 8, 2, 'octmchequeentry.solId', 0),
(491, 'Amount(In Letters)', '', 11, '', 15, '', 7, 4, '', 0),
(492, 'Last Cheque No.', '', 11, '', 15, '', 10, 1, '', 0),
(493, 'Last Cheque Amount', '', 11, '', 15, '', 10, 2, '', 0),
(498, 'Batch No', '', 11, '{\n''readonly'':''readonly''\n}', 13, '', 2, 1, 'batchAlias', 0),
(499, 'Batch No.', '', 1, '', 17, '', 1, 1, 'octmchequeentry.batchNumber', 0),
(500, 'Lot No.', '', 1, '', 17, '', 1, 2, 'octmchequeentry.lotNumber', 0),
(502, 'Category', '', 2, '{ "Tables":"octmnonctscategory", "Val":"nonCtsCategoryId", "DisplayLabel":"nonCtsCategoryName" }', 17, '', 1, 3, 'octmchequeentry.nonCtsCategory', 0),
(503, 'Sr No.', '', 1, '', 17, '', 1, 4, 'octmchequeentry.serialNumber', 0),
(504, 'Cheque Date', '', 8, '', 17, '', 4, 1, 'octmchequeentry.chequeDate', 0),
(505, 'Account No.', '', 1, '', 17, '', 4, 2, 'octmchequeentry.accountNumber', 0),
(506, 'Card No.', '', 1, '', 17, '', 4, 4, 'octmchequeentry.cardNumber', 0),
(507, 'Cheque No.', '', 1, '', 17, '', 4, 3, 'octmchequeentry.chequeNumber', 0),
(508, 'Cheque Amount', '', 1, '', 17, '', 6, 1, 'octmchequeentry.chequeAmount', 0),
(510, 'MICR code', '', 1, '', 17, '', 6, 3, 'octmchequeentry.micrCode', 0),
(511, 'Bank name', '', 11, '', 17, '', 6, 4, '', 0),
(512, 'Short MICR No.', '', 1, '', 17, '', 8, 1, 'octmchequeentry.shortMicrCode', 0),
(513, 'Trans code', '', 1, '', 17, '', 8, 3, 'octmchequeentry.transCode', 0),
(514, 'Payee Name', '', 1, '', 17, '', 8, 2, 'octmchequeentry.payeeName', 0),
(515, 'ICICI Bank credit', '', 3, '', 17, '', 10, 2, '', 0),
(516, 'App No', '', 11, '{\n''readonly'':''readonly''\n}', 13, '', 2, 2, 'applicationNo', 0),
(517, 'card type', '', 2, '{ "Tables":"octmcardtype", "Val":"cardTypeId", "DisplayLabel":"cardType" }', 17, '', 10, 1, 'octmchequeentry.cardType', 0),
(518, 'Rejection Reason', '', 2, '{ "Tables":"octmreasonmaster", "Val":"reasonId", "DisplayLabel":"reason" }', 17, '', 8, 4, 'octmchequeentry.reason', 0),
(519, 'Cheque Amount', '', 1, '', 17, '', 10, 3, 'octmchequeentry.chequeAmnt', 0),
(520, 'Amount(In Letters)', '', 11, '', 17, '', 10, 4, '', 0),
(521, 'Cheque Date', '', 8, '', 17, '', 12, 1, 'octmchequeentry.chequeDate', 0),
(522, 'Debit Account No.', '', 1, '', 17, '', 12, 3, 'octmchequeentry.debitAccountNumber', 0),
(523, 'Sol Id', '', 1, '', 17, '', 12, 2, 'octmchequeentry.solId', 0),
(524, 'Last cheque No.', '', 11, '', 17, '', 14, 1, '', 0),
(525, 'Last Cheque Amount', '', 11, '', 17, '', 14, 2, '', 0),
(526, 'APS No', '', 11, '{\n''readonly'':''readonly''\n}', 13, '', 2, 3, 'apsNo', 0),
(527, 'Reject Remark', '', 12, '{\n''readonly'':''readonly''\n}', 13, '', 3, 1, 'remark', 0),
(528, 'Clearing Date', '', 2, '{ "Tables":"octmClgDate", "Val":"clgDateId", "DisplayLabel":"clgDate" }', 18, '', 1, 1, '', 0),
(529, 'Lot No.', '', 2, '{ "Tables":"corelotnumber", "Val":"lotNumberId", "DisplayLabel":"lotNumber" }', 18, '', 1, 2, '', 0),
(532, 'Amount(In Letters)', '', 11, '', 17, '', 6, 2, '', 0),
(533, 'Select File', 'upload csv file', 9, '', 19, '1', 1, 1, '', 0),
(534, 'Upload', 'upload', 10, '', 19, '', 1, 2, '', 0),
(535, 'Logs', 'log', 12, '', 19, '', 2, 1, 'logs', 0),
(536, 'Rejected', '', 3, '', 13, '', 3, 2, 'rejected', 0),
(537, 'Reason', '', 2, '{"Table":"alplremarkcodemaster","Val":"remarkId","DisplayLabel":"remarkDescription","sql":"select remarkDescription as displaylabel from alplremarkcodemaster where remarkType like ("Reject")","Datalist":"get"}', 13, '', 3, 3, 'rejectDEReason', 1),
(538, 'Cut Of Process Date', 'backup proces date', 2, '{\n"Tables":"tsdataentry",\n"Val":"dataEntryId",\n"DisplayLabel":"startDate"\n}', 20, '1', 1, 1, 'tsdataentry.startDate', 0),
(539, 'Agency Code', '', 2, '{"Table":"ccagencymaster","Val":"agencyId","DisplayLabel":"agencyCode","sql":"select agencyCode as displaylabel,ccagencymaster.* from ccagencymaster"}', 21, '', 2, 1, 'batchAgencyId', 0),
(540, 'BatchRange from ', '', 1, '{"state":"true"}', 21, '', 3, 1, 'batchFrom', 0),
(541, 'To', '', 1, '{"state":"true"}', 21, '', 3, 2, 'batchTo', 0),
(542, 'Batch No', '', 1, '{"state":"true"}', 21, '', 2, 2, 'batchId', 0),
(543, 'JD No.', '', 1, '{"state":"true"}', 21, '', 4, 1, 'JDNo', 0),
(544, 'Max Application', '', 1, '{"state":"true"}', 21, '', 4, 2, 'maxApplication', 0),
(545, 'No. of Application', '', 1, '', 21, '', 4, 3, 'NoOfApplication', 0),
(546, 'First Application', '', 1, '{"state":"true"}', 21, '', 5, 1, 'firstApp', 0),
(547, 'Last Application', '', 1, '{"state":"true"}', 21, '', 5, 2, 'lastApp', 0),
(548, 'Select File', '', 9, '', 22, '', 2, 1, '', 0),
(549, 'Upload', '', 10, '', 22, '', 3, 1, '', 0),
(550, 'Location Code', '', 1, '', 24, '', 1, 1, 'pdcctscommunicationmaster.locationCode', 0),
(551, 'Location Name', '', 1, '', 24, '', 1, 2, 'pdcctscommunicationmaster.locationName', 0),
(552, 'Account Name', '', 1, '', 24, '', 1, 3, 'pdcctscommunicationmaster.accountNumber', 0),
(553, 'Phone Number', '', 1, '', 24, '', 1, 4, 'pdcctscommunicationmaster.phoneNumber', 0),
(554, 'Address 1', '', 1, '', 24, '', 2, 1, 'pdcctscommunicationmaster.address1', 0),
(555, 'Address 2', '', 1, '', 24, '', 2, 2, 'pdcctscommunicationmaster.address2', 0),
(556, 'Address 3', '', 1, '', 24, '', 2, 3, 'pdcctscommunicationmaster.address3', 0),
(557, 'Address 4', '', 1, '', 24, '', 2, 4, 'pdcctscommunicationmaster.address4', 0),
(558, 'Address 5', '', 1, '', 24, '', 3, 1, 'pdcctscommunicationmaster.address5', 0),
(559, 'Payable at', '', 1, '', 24, '', 3, 2, 'pdcctscommunicationmaster.payableAt', 0),
(560, 'Active', '', 4, '{"name":"active"}', 24, '', 3, 3, 'pdcctscommunicationmaster.activeInactive', 0),
(561, 'Inactive', '', 4, '{"name":"active"}', 24, '', 3, 4, 'pdcctscommunicationmaster.activeInactive', 0),
(562, 'Full Name', '', 1, '', 27, '1', 1, 1, 'tmpPlayground.vName', 0),
(563, 'Email', '', 1, '', 27, '1', 2, 1, 'tmpPlayground.vEmail', 0),
(564, 'Select File', '', 9, '', 28, '1', 1, 1, '', 0),
(565, 'Logs', '', 12, '', 28, '', 2, 1, 'logs', 0),
(567, 'AL', '', 4, '{"name":"active"}', 13, '1', 1, 1, 'applicationType', 0),
(568, 'PL', '', 4, '{"name":"active"}', 13, '1', 1, 2, 'applicationType', 0),
(569, 'Reasons', 'Cheque Reject Reason', 2, '{ "Tables":"reasonmaster", "Val":"reasonId", "DisplayLabel":"reason" }', 29, '', 1, 1, '', 0),
(570, 'Display Image', 'display image checkbox', 3, '', 29, '', 1, 2, '', 0),
(571, 'Stale Date', 'stale date ', 1, '', 29, '', 2, 1, '', 0),
(572, 'Clg Date', 'clg date ', 1, '', 29, '', 2, 2, '', 0),
(573, 'PDC Date', 'pdc date ', 1, '', 29, '', 2, 3, '', 0),
(574, 'Start ', 'start', 10, '', 29, '', 3, 1, '', 0),
(575, 'Previous', 'previous img', 10, '', 29, '', 3, 2, '', 0),
(576, 'Next', 'next img', 10, '', 29, '', 3, 3, '', 0),
(577, 'Cheque No', 'cheque no', 11, '', 29, '', 4, 1, '', 0),
(578, 'Account No', 'account no', 11, '', 29, '', 4, 2, '', 0),
(579, 'MICR', 'MICR', 11, '', 29, '', 4, 3, '', 0),
(580, 'Cheque Date', 'chq date', 8, '', 29, '', 2, 4, '', 0),
(581, 'Payee Name', 'payee name label', 1, '', 29, '', 5, 1, '', 0),
(582, 'Amount', 'Amount', 1, '', 29, '', 5, 2, '', 0),
(583, 'TC', 'TC', 11, '', 29, '', 5, 3, '', 0),
(584, 'UDK No', 'UDK No', 11, '', 29, '', 5, 4, '', 0),
(585, 'Total Cheques', 'total cheques', 11, '', 29, '', 6, 2, '', 0),
(586, 'Batch No', 'batch no', 11, '', 29, '', 6, 1, '', 0),
(587, 'Pending Cheques', 'pending cheques', 11, '', 29, '', 6, 3, '', 0),
(588, 'Select Report Type', '', 2, '', 30, '', 1, 1, '', 0),
(589, 'category', '', 2, '{ "Tables":"octmnonctscategory", "Val":"nonCtsCategoryId", "DisplayLabel":"nonCtsCategoryName" }', 27, '', 1, 3, 'tmpPlaygroundvCategory', 0),
(590, 'Agency Code', '', 2, '{"Table":"ccagencymaster","Val":"agencyId","DisplayLabel":"agencyCode","sql":"select agencyCode as displaylabel,ccagencymaster.* from ccagencymaster","Datalist":"getAgencyCode"}', 22, '', 1, 1, 'agencyId', 0),
(591, 'Image base', '', 4, '{"name":"active"}', 21, '', 1, 1, 'imageType', 0),
(592, 'Idisburse', '', 4, '{"name":"active"}', 21, '', 1, 2, 'imageType', 0),
(593, 'Select File', '', 9, '', 31, '', 2, 1, '', 0),
(594, 'Master Name', 'select ', 2, '{"Table":"ccmasterupload","Val":"masterName","DisplayLabel":"masterName","sql":"select masterName as displaylabel,ccmasterupload.* from ccmasterupload","Datalist":"getAgencyCode"}', 31, '', 1, 1, '', 0),
(595, 'Upload', '', 10, '', 31, '', 3, 1, '', 0),
(596, 'AL', '', 4, '{"name":"active"}', 3, '1', 1, 1, 'applicationType', 0),
(597, 'PL', '', 4, '{"name":"active"}', 3, '1', 1, 2, 'applicationType', 0),
(598, 'Previous Remarks', '', 13, '', 13, '', 4, 1, 'previousRemark', 0),
(599, 'Reason', '', 2, '{"Table":"alplremarkcodemaster","Val":"remarkId","DisplayLabel":"remarkDescription","sql":"select remarkDescription as displaylabel from alplremarkcodemaster where remarkType like("Reject") or remarkType like ("Waiver")" , "Datalist":"getWaiverReason"}', 13, '', 3, 3, 'rejectWaiverReason', 1),
(600, 'Reason', '', 2, '{"Table":"alplremarkcodemaster","Val":"remarkId","DisplayLabel":"remarkDescription","sql":"select remarkDescription as displaylabel from alplremarkcodemaster" ,"Datalist":"getQCReason"}', 13, '', 3, 3, 'rejectQCReason', 0),
(601, 'Other Reason', '', 1, '', 13, '', 3, 4, 'remarkDescription', 0);

-- --------------------------------------------------------

--
-- Table structure for table `corefieldtypes`
--

CREATE TABLE IF NOT EXISTS `corefieldtypes` (
`fieldTypeId` int(11) NOT NULL,
  `fieldType` varchar(100) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `corefieldtypes`
--

INSERT INTO `corefieldtypes` (`fieldTypeId`, `fieldType`) VALUES
(1, 'TextField'),
(2, 'DropDown'),
(3, 'Checkbox'),
(4, 'Radio'),
(5, 'Email'),
(6, 'Url'),
(7, 'Password'),
(8, 'Calendar'),
(9, 'File'),
(10, 'Button'),
(11, 'Label'),
(12, 'TextArea'),
(13, 'Link');

-- --------------------------------------------------------

--
-- Table structure for table `corefieldvalidations`
--

CREATE TABLE IF NOT EXISTS `corefieldvalidations` (
  `validationId` int(11) NOT NULL,
  `validationName` varchar(100) NOT NULL,
  `htmlCode` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `corefieldvalidations`
--

INSERT INTO `corefieldvalidations` (`validationId`, `validationName`, `htmlCode`) VALUES
(1, 'Blank', ''),
(2, 'Email', ''),
(3, 'URL', '');

-- --------------------------------------------------------

--
-- Table structure for table `corefiles`
--

CREATE TABLE IF NOT EXISTS `corefiles` (
`fileId` int(11) NOT NULL,
  `filename` text NOT NULL,
  `fileheaders` varchar(255) NOT NULL,
  `creationdate` datetime DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `corefiles`
--

INSERT INTO `corefiles` (`fileId`, `filename`, `fileheaders`, `creationdate`) VALUES
(1, '20161202033646_maurya-web.png', '', '2016-12-02 20:06:46'),
(2, '20161202034000_maurya-web.png', '', '2016-12-02 20:10:00'),
(3, '20161202034136_maurya-web.png', '', '2016-12-02 20:11:36'),
(4, '20161202041411_maurya-web.png', '', '2016-12-02 20:44:11'),
(5, '20161202042109_icon.png', '', '2016-12-02 20:51:09');

-- --------------------------------------------------------

--
-- Table structure for table `corefolders`
--

CREATE TABLE IF NOT EXISTS `corefolders` (
`folderId` int(11) NOT NULL,
  `folderPath` varchar(255) NOT NULL,
  `folderConstant` varchar(255) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `corefolders`
--

INSERT INTO `corefolders` (`folderId`, `folderPath`, `folderConstant`) VALUES
(1, '/apps/alpl/input/', 'ALPL_IMPORT_CSV'),
(2, '\\apps\\casaindex\\', 'IMAGE_INDEXING_JOB_ROOT'),
(3, '/profile/', 'USER_PROFILE'),
(4, '\\apps\\jla\\input\\', 'JLA_IMPORT_CSV'),
(5, 'apps\\cc\\input\\', 'CC_IMPORT_CSV'),
(6, '\\apps\\technicalscrutiny\\input\\', 'TS_IMPORT_TXT');

-- --------------------------------------------------------

--
-- Table structure for table `corelocationcontract`
--

CREATE TABLE IF NOT EXISTS `corelocationcontract` (
  `contractmappingId` int(11) NOT NULL,
  `contractId` int(11) NOT NULL,
  `locationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `corelocations`
--

CREATE TABLE IF NOT EXISTS `corelocations` (
`locationId` int(11) NOT NULL,
  `locationName` varchar(255) NOT NULL,
  `regionId` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `corelocations`
--

INSERT INTO `corelocations` (`locationId`, `locationName`, `regionId`) VALUES
(1, 'Vashi', 1),
(2, 'Hyderabad', 4),
(3, 'Delhi', 3);

-- --------------------------------------------------------

--
-- Table structure for table `corelotnumber`
--

CREATE TABLE IF NOT EXISTS `corelotnumber` (
`lotNumberId` int(11) NOT NULL,
  `lotNumber` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `corelotnumber`
--

INSERT INTO `corelotnumber` (`lotNumberId`, `lotNumber`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8);

-- --------------------------------------------------------

--
-- Table structure for table `coremenu`
--

CREATE TABLE IF NOT EXISTS `coremenu` (
`menuId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `url` text NOT NULL,
  `priority` int(11) NOT NULL,
  `openas` varchar(100) NOT NULL,
  `parentId` int(11) NOT NULL,
  `moduleId` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=45 ;

--
-- Dumping data for table `coremenu`
--

INSERT INTO `coremenu` (`menuId`, `name`, `url`, `priority`, `openas`, `parentId`, `moduleId`) VALUES
(1, 'Master', '', 1, '', 0, 0),
(2, 'ALPL', '', 2, '', 0, 0),
(3, 'Credit Card Entry', 'CC/dataEntry', 1, '', 5, 0),
(4, 'CASA', '', 3, '', 0, 0),
(5, 'Credit Card', '', 4, '', 0, 0),
(6, 'Upload', 'ALPL/upload', 1, '', 2, 0),
(7, 'Release', 'ALPL/release', 4, '', 2, 0),
(8, 'Batch Allocation', 'ALPL/batchallocation', 3, '', 2, 0),
(9, 'Image Indexing', 'CASA/imageindex', 2, '', 4, 0),
(10, 'Image Renaming', 'CASA/imagerename', 3, '', 4, 0),
(11, 'Data Entry', 'ALPL/dataEntry?process=1', 5, '', 2, 0),
(12, 'Company Master', 'Core/Company', 1, '_self', 1, 0),
(13, 'Application Master', 'Core/Apps', 2, '_self', 1, 0),
(14, 'Location Master', 'Core/Locations', 4, '', 1, 0),
(15, 'AL/PL MIS Report', 'ALPL/report/consolidated', 11, '', 2, 0),
(16, 'Contract Master', 'Core/Contract', 8, '', 1, 0),
(17, 'User Master', 'Core/Users', 9, '', 1, 0),
(18, 'Role Master', 'Core/Roles', 10, '', 1, 0),
(19, 'OCTM', '', 5, '', 0, 0),
(21, 'Cheque Entry', 'OCTM/Chequeentry', 2, '', 19, 0),
(22, 'Other Cheque Entry', 'OCTM/Otherchequeentry', 3, '', 19, 0),
(23, 'MIS Report', 'OCTM/misreport', 4, '', 19, 0),
(24, 'Jewel Loan Audit ', '', 6, '', 0, 0),
(25, 'Uploads', 'JLA/uploads', 1, '', 24, 0),
(26, 'Field Investigation', 'ALPL/dataEntry?process=2', 6, '', 2, 0),
(27, 'Quality Check', 'ALPL/dataEntry?process=3', 7, '', 2, 0),
(28, 'CAM Report', 'ALPL/dataEntry?process=4', 8, '', 2, 0),
(29, 'Audit', 'ALPL/dataEntry?process=5', 9, '', 2, 0),
(30, 'AL/PL Performance Report', 'ALPL/userreport/performance', 10, '', 2, 0),
(31, 'Technical Scrutiny', 'TechnicalScrutiny', 7, '', 0, 0),
(32, 'PDCCTS', '', 8, '', 0, 0),
(33, 'Batch Creation', 'CC/allocate', 2, '', 5, 0),
(34, 'Communication Master', 'PDCCTS/communicationmaster', 1, '', 32, 0),
(35, 'Upload', 'CC/upload', 3, '', 5, 0),
(36, 'Process User Allocation', 'ALPL/userProcess', 2, '', 2, 0),
(37, 'Upload', 'TechnicalScrutiny/uploadCheques', 2, '', 31, 0),
(38, 'Data Entry', 'TechnicalScrutiny/dataEntry', 3, '', 31, 0),
(39, 'Image Optimization', 'CASA/imageoptimization', 1, '', 4, 0),
(40, 'Back up', 'TechnicalScrutiny/backUp', 1, '', 31, 0),
(41, 'MIS Report', 'TechnicalScrutiny/misReport', 4, '', 31, 0),
(42, 'Image Indexing', 'CC/imageIndexing', 1, '', 5, 0),
(43, 'Query Executor', 'CC/executequery', 4, '', 5, 0),
(44, 'Master Upload', 'CC/masterUpload', 6, '', 5, 0);

-- --------------------------------------------------------

--
-- Table structure for table `coremenumodules`
--

CREATE TABLE IF NOT EXISTS `coremenumodules` (
  `menuModuleId` int(11) NOT NULL,
  `moduleId` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `coremenumodules`
--

INSERT INTO `coremenumodules` (`menuModuleId`, `moduleId`, `id`) VALUES
(2, 1, 1),
(2, 2, 2),
(1, 3, 3),
(1, 4, 4),
(1, 5, 5),
(1, 6, 6),
(1, 7, 7),
(2, 8, 8),
(2, 9, 9),
(1, 10, 10),
(2, 11, 11);

-- --------------------------------------------------------

--
-- Table structure for table `coremodules_depricated`
--

CREATE TABLE IF NOT EXISTS `coremodules_depricated` (
  `moduleId` int(11) NOT NULL,
  `modulename` varchar(255) NOT NULL,
  `url` varchar(100) NOT NULL,
  `appId` int(11) NOT NULL,
  `menuId` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `coremodules_depricated`
--

INSERT INTO `coremodules_depricated` (`moduleId`, `modulename`, `url`, `appId`, `menuId`) VALUES
(3, 'Employees', 'employees', 1, 0),
(4, 'Departments', 'departments', 1, 0),
(6, 'Roles', 'roles', 1, 0),
(11, 'Edit Profile', 'editProfile', 1, 0),
(14, 'Image Renaming', '', 3, 10),
(13, 'Image Indexing', '', 3, 9),
(15, 'Upload', '', 1, 6),
(16, 'Release', '', 1, 7),
(17, 'Batch Allocation', '', 1, 8),
(18, 'Data Entry', '', 1, 11),
(19, 'MIS Report', '', 1, 15),
(20, 'Company Master', '', 6, 12),
(21, 'Application Master', '', 6, 13),
(22, 'Location Master', '', 6, 14),
(23, 'Contract Master', '', 6, 16),
(24, 'User Master', '', 6, 17),
(25, 'Role Master', '', 6, 18),
(26, 'Technical Scrunity', '', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `corepermissions`
--

CREATE TABLE IF NOT EXISTS `corepermissions` (
  `permissionId` int(11) NOT NULL,
  `permissionName` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `corepermissions`
--

INSERT INTO `corepermissions` (`permissionId`, `permissionName`) VALUES
(1, 'Read'),
(2, 'Create'),
(3, 'Modify'),
(4, 'Delete'),
(5, 'Self Restricted'),
(6, 'Approve');

-- --------------------------------------------------------

--
-- Table structure for table `coreprocessfieldsenable`
--

CREATE TABLE IF NOT EXISTS `coreprocessfieldsenable` (
  `enableId` int(11) NOT NULL,
  `processId` int(11) NOT NULL,
  `fieldId` int(11) NOT NULL,
  `enable` tinyint(1) NOT NULL,
  `prepopulated` tinyint(1) NOT NULL,
  `validation` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `coreprocessfieldsenable`
--

INSERT INTO `coreprocessfieldsenable` (`enableId`, `processId`, `fieldId`, `enable`, `prepopulated`, `validation`) VALUES
(15, 3, 562, 1, 0, 1),
(16, 3, 563, 1, 0, 1),
(21, 2, 562, 1, 0, 0),
(22, 2, 563, 1, 0, 0),
(23, 1, 533, 1, 0, 0),
(24, 1, 567, 1, 0, 0),
(25, 1, 431, 1, 0, 0),
(26, 1, 468, 1, 0, 0),
(27, 1, 534, 1, 0, 0),
(28, 1, 568, 1, 0, 0),
(29, 1, 456, 1, 0, 0),
(30, 1, 457, 1, 0, 0),
(31, 1, 461, 1, 0, 0),
(32, 1, 10, 1, 0, 0),
(33, 1, 535, 1, 0, 0),
(34, 1, 458, 1, 0, 0),
(35, 1, 498, 1, 0, 0),
(36, 1, 516, 1, 0, 0),
(37, 1, 433, 1, 0, 0),
(38, 1, 459, 1, 0, 0),
(39, 1, 526, 1, 0, 0),
(40, 1, 467, 1, 0, 0),
(41, 1, 460, 1, 0, 0),
(42, 1, 11, 1, 0, 0),
(43, 1, 527, 1, 0, 0),
(44, 1, 451, 1, 0, 0),
(45, 1, 536, 1, 0, 0),
(46, 1, 537, 1, 0, 0),
(47, 1, 434, 1, 0, 0),
(48, 1, 463, 1, 0, 0),
(49, 1, 435, 1, 0, 0),
(50, 1, 440, 1, 0, 0),
(59, 1, 563, 1, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `coreprocessmaster`
--

CREATE TABLE IF NOT EXISTS `coreprocessmaster` (
  `processId` int(11) NOT NULL,
  `processName` varchar(300) NOT NULL,
  `nextProcessId` int(11) NOT NULL,
  `dataValidationProcess` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `coreprocessmaster`
--

INSERT INTO `coreprocessmaster` (`processId`, `processName`, `nextProcessId`, `dataValidationProcess`) VALUES
(1, 'Data Entry', 2, 0),
(2, 'Field Investigation', 3, 0),
(3, 'QC', 4, 1),
(4, 'CAM', 5, 0),
(5, 'Audit Entry', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `coreproecsssection`
--

CREATE TABLE IF NOT EXISTS `coreproecsssection` (
  `mapId` int(11) NOT NULL,
  `processId` int(11) NOT NULL,
  `sectionId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `corereasonmaster`
--

CREATE TABLE IF NOT EXISTS `corereasonmaster` (
  `reasonId` int(11) NOT NULL,
  `reason` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `corereasonmaster`
--

INSERT INTO `corereasonmaster` (`reasonId`, `reason`) VALUES
(1, 'PDC'),
(2, 'Amount in w/f differ');

-- --------------------------------------------------------

--
-- Table structure for table `coreregions`
--

CREATE TABLE IF NOT EXISTS `coreregions` (
  `regionId` int(11) NOT NULL,
  `regionName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `coreregions`
--

INSERT INTO `coreregions` (`regionId`, `regionName`) VALUES
(1, 'West'),
(2, 'East'),
(3, 'North'),
(4, 'South');

-- --------------------------------------------------------

--
-- Table structure for table `corerole`
--

CREATE TABLE IF NOT EXISTS `corerole` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `isDel` int(11) NOT NULL DEFAULT '0',
  `system` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `corerole`
--

INSERT INTO `corerole` (`roleId`, `roleName`, `description`, `isDel`, `system`) VALUES
(38, 'Super Admin', '', 0, 1),
(41, 'BPO Manager', '', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `corerolemodule`
--

CREATE TABLE IF NOT EXISTS `corerolemodule` (
  `roleModuleId` int(11) NOT NULL,
  `roleId` int(11) NOT NULL,
  `menuId` int(11) NOT NULL,
  `parentId` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `corerolemodule`
--

INSERT INTO `corerolemodule` (`roleModuleId`, `roleId`, `menuId`, `parentId`) VALUES
(12, 41, 12, 1),
(13, 41, 13, 1),
(14, 41, 14, 1),
(15, 41, 16, 1),
(16, 41, 17, 1),
(17, 41, 18, 1),
(23, 41, 35, 5),
(22, 41, 33, 5),
(21, 41, 3, 5),
(24, 41, 42, 5),
(25, 41, 43, 5),
(26, 41, 44, 5);

-- --------------------------------------------------------

--
-- Table structure for table `coresectionmaster`
--

CREATE TABLE IF NOT EXISTS `coresectionmaster` (
  `sectionId` int(11) NOT NULL,
  `sectionName` varchar(100) NOT NULL,
  `isDel` int(11) NOT NULL DEFAULT '0',
  `appId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `coresectionmaster`
--

INSERT INTO `coresectionmaster` (`sectionId`, `sectionName`, `isDel`, `appId`) VALUES
(1, 'Section 1', 1, -1),
(2, 'Section 2 User', 1, -1),
(3, 'Upload', 0, 1),
(4, 'Batch Allocation', 0, 1),
(5, 'Sourcing Details\r\n', 0, 2),
(6, 'Personal Details', 0, 2),
(7, 'Residence Details', 0, 2),
(8, 'Residence/Reference Details', 0, 2),
(9, 'Work Details', 0, 2),
(10, 'Bank/Other Details', 0, 2),
(11, 'Other Details', 0, 2),
(12, 'AToolbar', 0, 2),
(13, 'AL/PL Data Entry', 0, 1),
(14, 'Mis Report', 0, 1),
(15, 'Check Entry', 0, 7),
(16, 'Category and Lot Selection', 0, 7),
(17, 'Other Cheque Entry', 0, 7),
(18, 'MIS report', 0, 7),
(19, 'Upload', 0, 1),
(20, 'Back Up', 0, 8),
(21, 'Allocate', 0, 2),
(22, 'Upload', 0, 2),
(24, 'Communication Master', 0, 9),
(25, 'CP Data Upload', 0, 9),
(27, 'PlaygroundDE', 0, 10),
(28, 'Upload Cheques', 0, 8),
(29, 'Data Entry', 0, 8),
(30, 'MIS Report', 0, 8),
(31, 'Master Upload', 0, 2);

-- --------------------------------------------------------

--
-- Table structure for table `coresol`
--

CREATE TABLE IF NOT EXISTS `coresol` (
  `branchsolId` int(11) NOT NULL,
  `solId` int(11) NOT NULL,
  `branchName` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `corestatus`
--

CREATE TABLE IF NOT EXISTS `corestatus` (
  `statusId` int(11) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `corestatus`
--

INSERT INTO `corestatus` (`statusId`, `status`) VALUES
(1, 'Pending'),
(2, 'Completed'),
(3, 'Started'),
(4, 'Duplicate'),
(5, 'Unique'),
(6, 'Allocated'),
(7, 'Non Allocated');

-- --------------------------------------------------------

--
-- Table structure for table `corestatusmaster`
--

CREATE TABLE IF NOT EXISTS `corestatusmaster` (
  `statusId` int(11) NOT NULL,
  `status_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `corestatusmaster`
--

INSERT INTO `corestatusmaster` (`statusId`, `status_name`) VALUES
(1, 'accepted'),
(2, 'rejected');

-- --------------------------------------------------------

--
-- Table structure for table `coretoken`
--

CREATE TABLE IF NOT EXISTS `coretoken` (
  `id` int(11) NOT NULL,
  `emailId` varchar(255) DEFAULT NULL,
  `token` varchar(200) DEFAULT NULL,
  `tokenGenerationDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `coretoken`
--

INSERT INTO `coretoken` (`id`, `emailId`, `token`, `tokenGenerationDate`) VALUES
(1, 'mayur.patil@vikarta.co.in', '25YUZSbC89', '2016-12-03 12:05:47'),
(2, 'poonam@mauryacravings.com', 'Ch1vtVoF9q', '2016-12-03 12:50:05'),
(3, 'poonam@mauryacravings.com', 'W3wF9y5dL4', '2016-12-03 12:50:48'),
(4, 'poonam@mauryacravings.com', 'bUL4SJaGT1', '2016-12-03 12:51:23'),
(5, 'poonam@mauryacravings.com', 'dxjhUXcpLz', '2016-12-03 12:52:46'),
(6, 'poonam@mauryacravings.com', '5SDlnvQ8dR', '2016-12-03 12:57:26'),
(7, 'poonam@mauryacravings.com', 'f3XiKELIby', '2016-12-03 13:01:52'),
(8, 'poonam@mauryacravings.com', '0waigMnljb', '2016-12-03 13:02:49'),
(9, 'poonam@mauryacravings.com', '05YrK2B7eW', '2016-12-03 13:04:52'),
(10, 'poonam@mauryacravings.com', 'Y18wKBkGQ9', '2016-12-03 13:06:16'),
(11, 'poonam@mauryacravings.com', 'cqRENJ13ku', '2016-12-03 14:04:26'),
(12, 'poonam@mauryacravings.com', 'v5QuAYyC3f', '2016-12-03 14:07:21'),
(13, 'poonam@mauryacravings.com', '284wNvTnye', '2016-12-03 14:34:56'),
(14, 'poonam@mauryacravings.com', 'OlZ9htmaxU', '2016-12-03 14:36:48'),
(15, 'poonam@mauryacravings.com', 'lP19tNzUKT', '2016-12-03 14:38:40'),
(16, 'poonam@mauryacravings.com', 'tWujx3qnzV', '2016-12-03 14:40:32'),
(17, 'poonam@mauryacravings.com', 'YfeEMaJSbl', '2016-12-03 14:42:23'),
(18, 'poonam@mauryacravings.com', 'E4BkfvOrHq', '2016-12-03 14:44:29'),
(19, 'poonam@mauryacravings.com', 'T4yLbZX05l', '2016-12-03 14:47:42'),
(20, 'poonam@mauryacravings.com', 'SEU4BMTJOj', '2016-12-03 14:49:36'),
(21, 'poonam@mauryacravings.com', 'Oj8EYNiQpG', '2016-12-03 14:50:20'),
(22, 'mayur.patil@vikarta.co.in', 'FYx29oINjA', '2016-12-03 15:35:14'),
(23, 'mayur.patil@vikarta.co.in', 'wRngFfKT6s', '2016-12-03 15:35:21'),
(24, 'poonam@mauryacravings.com', 'zjLRueMqW7', '2016-12-03 15:45:16'),
(25, 'poonam@mauryacravings.com', 'gM3YRn6Jcw', '2016-12-03 15:46:25'),
(26, 'mayur.patil@vikarta.co.in', 'pPbuXCGcxh', '2016-12-03 15:46:53'),
(27, 'mayur.patil@vikarta.co.in', 'NDHk0mLXfh', '2016-12-03 15:46:59'),
(28, 'mayur.patil@vikarta.co.in', 'U9fpqLvk5u', '2016-12-03 15:47:05'),
(29, 'mayur.patil@vikarta.co.in', 'MTo4IicUKJ', '2016-12-03 15:47:12'),
(30, 'mayur.patil@vikarta.co.in', '80p2Bzcvyb', '2016-12-03 15:50:58'),
(31, 'mayur.patil@vikarta.co.in', 'lSbrQ4Kxj2', '2016-12-03 15:51:05'),
(32, 'poonam@mauryacravings.com', 'KgnFhxyHam', '2016-12-03 15:58:21'),
(33, 'poonam@mauryacravings.com', 'CQOgtYspI7', '2016-12-03 16:07:59'),
(34, 'mayur.patil@vikarta.co.in', '6W1XUfJysq', '2016-12-03 16:08:53'),
(35, 'poonam@mauryacravings.com', '9FUhObkY51', '2016-12-03 16:11:45'),
(36, 'poonam@mauryacravings.com', 'hsjFMLS5Vu', '2016-12-03 16:11:57'),
(37, 'poonam@mauryacravings.com', 'dSKEebqoTD', '2016-12-03 16:24:41'),
(38, 'poonam@mauryacravings.com', 'V3h82UEIjW', '2016-12-03 16:25:49'),
(39, 'poonam@mauryacravings.com', 'oZSO8mrU0w', '2016-12-03 16:27:47'),
(40, 'poonam@mauryacravings.com', 'k4jwgLOPiU', '2016-12-03 16:33:02'),
(41, 'mayur.patil@vikarta.co.in', 'Aq3DhBwC57', '2016-12-03 16:33:44'),
(42, 'poonam@mauryacravings.com', 'C7YMdhzlst', '2016-12-03 16:33:50'),
(43, 'mayur.patil@vikarta.co.in', 'ti9jbKqPwG', '2016-12-03 16:36:29'),
(44, 'poonam@mauryacravings.com', 'c6zpv37JSV', '2016-12-03 16:55:46');

-- --------------------------------------------------------

--
-- Table structure for table `coreuserroles`
--

CREATE TABLE IF NOT EXISTS `coreuserroles` (
  `userId` int(11) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `coreuserroles`
--

INSERT INTO `coreuserroles` (`userId`, `roleId`) VALUES
(1, 1),
(69, 3),
(70, 2),
(70, 35);

-- --------------------------------------------------------

--
-- Table structure for table `coreusers`
--

CREATE TABLE IF NOT EXISTS `coreusers` (
`userId` int(11) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `emailId` varchar(255) NOT NULL,
  `passWord` varchar(255) NOT NULL,
  `imageId` int(11) NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `isDel` int(11) NOT NULL DEFAULT '0',
  `dateOfBirth` datetime NOT NULL,
  `roleId` int(11) NOT NULL,
  `locationId` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=91 ;

--
-- Dumping data for table `coreusers`
--

INSERT INTO `coreusers` (`userId`, `fullName`, `emailId`, `passWord`, `imageId`, `gender`, `isDel`, `dateOfBirth`, `roleId`, `locationId`) VALUES
(85, 'Super Admin', 'admin@vikarta.co.in', 'admin', 3, 'Male', 0, '2016-12-07 00:00:00', 38, 1),
(88, 'Mayur Patil', 'mayur.patil@vikarta.co.in', 'mayur', 4, 'Male', 0, '2016-11-26 18:30:00', 38, 1),
(89, 'Pooja Mourya', 'pooja@mauryacravings.com', 'pooja', 5, 'Female', 0, '2016-11-27 18:30:00', 38, 1),
(90, 'Poonam Yadav', 'poonam@mauryacravings.com', 'jj', 0, 'Female', 0, '0000-00-00 00:00:00', 38, 1);

-- --------------------------------------------------------

--
-- Table structure for table `jlaauditappraisermaster`
--

CREATE TABLE IF NOT EXISTS `jlaauditappraisermaster` (
  `auditAppraiser` varchar(100) NOT NULL,
  `zonalManager` varchar(50) NOT NULL,
  `auditAppraiserEmpNo` varchar(50) NOT NULL,
  `auditAppraiserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `jlabranchmaster`
--

CREATE TABLE IF NOT EXISTS `jlabranchmaster` (
  `solId` varchar(20) NOT NULL,
  `branchName` varchar(200) NOT NULL,
  `region` varchar(200) NOT NULL,
  `zone` varchar(50) NOT NULL,
  `category` varchar(100) NOT NULL,
  `branchEmailId` varchar(100) NOT NULL,
  `ProcessManagerName` varchar(100) NOT NULL,
  `clusterManagerEmailId` varchar(200) NOT NULL,
  `branchId` int(11) NOT NULL,
  `clusterManagerContactNo` varchar(255) NOT NULL,
  `CCEmailIds` text NOT NULL,
  `fromEmialID` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `jlacouriermaster`
--

CREATE TABLE IF NOT EXISTS `jlacouriermaster` (
  `courierName` varchar(100) NOT NULL,
  `courierId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `jlagoldrate`
--

CREATE TABLE IF NOT EXISTS `jlagoldrate` (
  `acctNature` varchar(50) NOT NULL,
  `acctType` varchar(50) NOT NULL,
  `period` varchar(50) NOT NULL,
  `rateMonth` varchar(50) NOT NULL,
  `disbFrom` varchar(50) NOT NULL,
  `disbTo` varchar(50) NOT NULL,
  `carat18` int(10) NOT NULL,
  `carat19` int(10) NOT NULL,
  `carat20` int(10) NOT NULL,
  `carat21` int(10) NOT NULL,
  `carat22` int(10) NOT NULL,
  `carat23` int(10) NOT NULL,
  `carat24` int(10) NOT NULL,
  `goldRateId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `jlalivecountmaster`
--

CREATE TABLE IF NOT EXISTS `jlalivecountmaster` (
  `solId` varchar(10) NOT NULL,
  `liveCount` int(20) NOT NULL,
  `amt` varchar(100) NOT NULL,
  `livecountId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `octmamountcategory`
--

CREATE TABLE IF NOT EXISTS `octmamountcategory` (
  `categoryId` int(11) NOT NULL,
  `categoryName` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `octmamountcategory`
--

INSERT INTO `octmamountcategory` (`categoryId`, `categoryName`, `amount`) VALUES
(1, 'A', 49999),
(2, 'B', 99999),
(3, 'C', 499999),
(4, 'D', 999999),
(5, 'E', 9999999),
(6, 'F', 9999999),
(7, 'NON-CTS', 0);

-- --------------------------------------------------------

--
-- Table structure for table `octmcardtype`
--

CREATE TABLE IF NOT EXISTS `octmcardtype` (
  `cardTypeId` int(11) NOT NULL,
  `cardtype` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `octmcardtype`
--

INSERT INTO `octmcardtype` (`cardTypeId`, `cardtype`) VALUES
(1, 'VISA'),
(2, 'Credit card'),
(3, 'Master card'),
(4, 'platinium card'),
(5, 'Shoping card');

-- --------------------------------------------------------

--
-- Table structure for table `octmchequeentry`
--

CREATE TABLE IF NOT EXISTS `octmchequeentry` (
  `chequeEntryId` int(11) NOT NULL,
  `clgDate` date NOT NULL,
  `batchNumber` int(11) NOT NULL,
  `serialNumber` int(11) NOT NULL,
  `lotNumber` int(11) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `categoryAmount` int(11) NOT NULL,
  `accountNumber` int(11) NOT NULL,
  `payinSlipDate` date NOT NULL,
  `chequeDate` date NOT NULL,
  `chequeNumber` int(11) NOT NULL,
  `micrCode` int(11) NOT NULL,
  `shortMicrCode` int(11) NOT NULL,
  `transCode` int(11) NOT NULL,
  `payeeName` varchar(255) NOT NULL,
  `draweeName` varchar(255) NOT NULL,
  `chequeAmount` int(11) NOT NULL,
  `chequeAmnt` int(11) NOT NULL,
  `solId` int(11) NOT NULL,
  `chequeType` varchar(255) NOT NULL,
  `debitAccountNumber` int(11) NOT NULL,
  `debitCardNumber` int(11) NOT NULL,
  `auditFlag` int(11) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `cardType` varchar(255) NOT NULL,
  `nonCtsCategory` varchar(255) NOT NULL,
  `cardNumber` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `octmchequeentry`
--

INSERT INTO `octmchequeentry` (`chequeEntryId`, `clgDate`, `batchNumber`, `serialNumber`, `lotNumber`, `userName`, `categoryAmount`, `accountNumber`, `payinSlipDate`, `chequeDate`, `chequeNumber`, `micrCode`, `shortMicrCode`, `transCode`, `payeeName`, `draweeName`, `chequeAmount`, `chequeAmnt`, `solId`, `chequeType`, `debitAccountNumber`, `debitCardNumber`, `auditFlag`, `reason`, `cardType`, `nonCtsCategory`, `cardNumber`) VALUES
(1, '0000-00-00', 213, 0, 0, '', 0, 0, '2016-10-04', '0000-00-00', 0, 0, 0, 0, '', 'nikhil', 0, 0, 0, '', 0, 0, 0, '', '', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `octmclgdate`
--

CREATE TABLE IF NOT EXISTS `octmclgdate` (
  `clgDateId` int(11) NOT NULL,
  `clgDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `octmclgdate`
--

INSERT INTO `octmclgdate` (`clgDateId`, `clgDate`) VALUES
(1, '2016-11-02'),
(2, '2016-11-01'),
(3, '2016-10-31'),
(4, '2016-10-30');

-- --------------------------------------------------------

--
-- Table structure for table `octmnonctscategory`
--

CREATE TABLE IF NOT EXISTS `octmnonctscategory` (
  `nonCtsCategoryId` int(11) NOT NULL,
  `nonCtsCategoryName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `octmnonctscategory`
--

INSERT INTO `octmnonctscategory` (`nonCtsCategoryId`, `nonCtsCategoryName`) VALUES
(13, 'AIRTEL'),
(14, 'CANCELLED CHEQUE'),
(16, 'CMS'),
(18, 'CREDIT CARD'),
(19, 'CREDIT CARD REJECTION'),
(20, 'CTS REJECTION'),
(21, 'DELHI JAL BOARD'),
(22, 'FOREIN CURRENCY'),
(23, 'ICICI CREDIT CARD'),
(24, 'ICICI CREDIT CARD REJECTION'),
(25, 'ICICI PRUDENTIAL'),
(26, 'ICICI REJECTION'),
(27, 'INCOME TAX REFUND'),
(28, 'LOAN'),
(29, 'NON CTS CREDIT CARD'),
(30, 'NON CTS ICICI CREDIT CARD'),
(31, 'NON CTS REJECTION'),
(32, 'NOT A FINANCIAL'),
(33, 'NOT DRAWN IN ICICI'),
(34, 'OUTSTATION CHEQUES'),
(35, 'PAY NAME DIFFER'),
(36, 'RBI RELIEF BOND'),
(37, 'SCHOOL FEES'),
(38, 'SL COLLECTION'),
(39, 'TIKONA'),
(40, 'TRF CHEQUES');

-- --------------------------------------------------------

--
-- Table structure for table `pdcctscommunicationmaster`
--

CREATE TABLE IF NOT EXISTS `pdcctscommunicationmaster` (
  `communicationmasterId` int(11) NOT NULL,
  `locationCode` int(11) NOT NULL,
  `locationName` varchar(255) NOT NULL,
  `accountNumber` int(11) NOT NULL,
  `phoneNumber` int(11) NOT NULL,
  `address1` varchar(255) NOT NULL,
  `address2` varchar(255) NOT NULL,
  `address3` varchar(255) NOT NULL,
  `address4` varchar(255) NOT NULL,
  `address5` varchar(255) NOT NULL,
  `payableAt` varchar(255) NOT NULL,
  `activeInactive` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pdcctscommunicationmaster`
--

INSERT INTO `pdcctscommunicationmaster` (`communicationmasterId`, `locationCode`, `locationName`, `accountNumber`, `phoneNumber`, `address1`, `address2`, `address3`, `address4`, `address5`, `payableAt`, `activeInactive`) VALUES
(1, 0, '', 0, 0, '', '', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `tmp`
--

CREATE TABLE IF NOT EXISTS `tmp` (
  `id` int(11) NOT NULL,
  `fname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `docId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tmp`
--

INSERT INTO `tmp` (`id`, `fname`, `email`, `docId`) VALUES
(22, 'mayur', 'a@a.a', 1),
(23, 'nikhil', 'a@a.a', 2),
(24, 'poonam', 'a@a.a', 3),
(25, 'pooja', 'a@a.a', 4),
(26, 'mayur', 'a@a.a', 1),
(27, 'nikhil', 'a@a.a', 2),
(28, 'poonam', 'a@a.a', 3),
(29, 'pooja', 'a@a.a', 4),
(30, 'mayur', 'a@a.a', 1),
(31, 'nikhil', 'a@a.a', 2),
(32, 'poonam', 'a@a.a', 3),
(33, 'pooja', 'a@a.a', 4),
(34, 'mayur', 'a@a.a', 1),
(35, 'nikhil', 'a@a.a', 2),
(36, 'poonam', 'a@a.a', 3),
(37, 'pooja', 'a@a.a', 4),
(38, 'mayur', 'a@a.a', 1),
(39, 'nikhil', 'a@a.a', 2),
(40, 'poonam', 'a@a.a', 3),
(41, 'pooja', 'a@a.a', 4),
(42, 'mayur', 'a@a.a', 1),
(43, 'nikhil', 'a@a.a', 2),
(44, 'poonam', 'a@a.a', 3),
(45, 'pooja', 'a@a.a', 4),
(46, 'mayur', 'a@a.a', 1),
(47, 'nikhil', 'a@a.a', 2),
(48, 'poonam', 'a@a.a', 3),
(49, 'pooja', 'a@a.a', 4),
(50, 'mayur', 'a@a.a', 1),
(51, 'nikhil', 'a@a.a', 2),
(52, 'poonam', 'a@a.a', 3),
(53, 'pooja', 'a@a.a', 4),
(54, 'mayur', 'a@a.a', 1),
(55, 'nikhil', 'a@a.a', 2),
(56, 'poonam', 'a@a.a', 3),
(57, 'pooja', 'a@a.a', 4),
(58, 'mayur', 'a@a.a', 1),
(59, 'nikhil', 'a@a.a', 2),
(60, 'poonam', 'a@a.a', 3),
(61, 'pooja', 'a@a.a', 4),
(62, 'mayur', 'a@a.a', 1),
(63, 'nikhil', 'a@a.a', 2),
(64, 'poonam', 'a@a.a', 3),
(65, 'pooja', 'a@a.a', 4),
(66, 'mayur', 'a@a.a', 1),
(67, 'nikhil', 'a@a.a', 2),
(68, 'poonam', 'a@a.a', 3),
(69, 'pooja', 'a@a.a', 4),
(70, 'mayur', 'a@a.a', 1),
(71, 'nikhil', 'a@a.a', 2),
(72, 'poonam', 'a@a.a', 3),
(73, 'pooja', 'a@a.a', 4),
(74, 'mayur', 'a@a.a', 1),
(75, 'nikhil', 'a@a.a', 2),
(76, 'poonam', 'a@a.a', 3),
(77, 'pooja', 'a@a.a', 4);

-- --------------------------------------------------------

--
-- Table structure for table `tmpalpl`
--

CREATE TABLE IF NOT EXISTS `tmpalpl` (
  `id` int(11) NOT NULL,
  `appNo` varchar(255) NOT NULL,
  `apsNo` varchar(255) NOT NULL,
  `batchId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tmpalpl`
--

INSERT INTO `tmpalpl` (`id`, `appNo`, `apsNo`, `batchId`) VALUES
(1, 'app2', 'aps2', 'batch2'),
(2, 'app3', 'aps3', 'batch3'),
(3, 'app4', 'aps4', 'batch4'),
(4, 'app5', 'aps5', 'batch5'),
(5, 'app6', 'aps6', 'batch6'),
(6, 'app7', 'aps7', 'batch7'),
(7, 'app8', 'aps8', 'batch8'),
(8, 'app9', 'aps9', 'batch9'),
(9, 'app10', 'aps10', 'batch10'),
(10, 'app11', 'aps11', 'batch11'),
(11, 'app12', 'aps12', 'batch12'),
(12, 'app13', 'aps13', 'batch13'),
(13, 'app14', 'aps14', 'batch14'),
(14, 'app15', 'aps15', 'batch15'),
(15, 'app16', 'aps16', 'batch16'),
(16, 'app17', 'aps17', 'batch17'),
(17, 'app18', 'aps18', 'batch18'),
(18, 'app19', 'aps19', 'batch19'),
(19, 'app20', 'aps20', 'batch20');

-- --------------------------------------------------------

--
-- Table structure for table `tmpplayground`
--

CREATE TABLE IF NOT EXISTS `tmpplayground` (
  `playgroundId` int(11) NOT NULL,
  `vName` varchar(255) NOT NULL,
  `vEmail` varchar(255) NOT NULL,
  `vCategory` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tmpplayground`
--

INSERT INTO `tmpplayground` (`playgroundId`, `vName`, `vEmail`, `vCategory`) VALUES
(1, 'test', 'test', ''),
(2, 'm', 'm', ''),
(3, 'p', 'p', '');

-- --------------------------------------------------------

--
-- Table structure for table `tschequedata`
--

CREATE TABLE IF NOT EXISTS `tschequedata` (
  `chequeId` int(11) NOT NULL,
  `staleDate` datetime NOT NULL,
  `clgDate` datetime NOT NULL,
  `PDCDate` datetime NOT NULL,
  `chequeAmount` bigint(10) NOT NULL,
  `payeeName` varchar(255) NOT NULL,
  `MICR` bigint(10) NOT NULL,
  `accountNo` bigint(11) NOT NULL,
  `chequeNo` bigint(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tsdataentry`
--

CREATE TABLE IF NOT EXISTS `tsdataentry` (
  `dataEntryId` int(11) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `processId` int(11) NOT NULL,
  `reasonId` int(11) NOT NULL,
  `TC` int(11) NOT NULL,
  `UDKNo` bigint(25) NOT NULL,
  `chequeId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tsdataentry`
--

INSERT INTO `tsdataentry` (`dataEntryId`, `startDate`, `endDate`, `processId`, `reasonId`, `TC`, `UDKNo`, `chequeId`) VALUES
(1, '2012-09-16 00:00:00', '0000-00-00 00:00:00', 1, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tsimagesbatch`
--

CREATE TABLE IF NOT EXISTS `tsimagesbatch` (
  `imageId` int(11) NOT NULL,
  `batchId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tsuploadcheques`
--

CREATE TABLE IF NOT EXISTS `tsuploadcheques` (
  `UploadChequesId` int(11) NOT NULL,
  `col1` varchar(255) NOT NULL,
  `col2` varchar(255) NOT NULL,
  `col3` varchar(200) NOT NULL,
  `col4` varchar(200) NOT NULL,
  `col5` varchar(200) NOT NULL,
  `col6` varchar(200) NOT NULL,
  `col7` varchar(200) NOT NULL,
  `col8` varchar(200) NOT NULL,
  `col9` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tsuploadcheques`
--

INSERT INTO `tsuploadcheques` (`UploadChequesId`, `col1`, `col2`, `col3`, `col4`, `col5`, `col6`, `col7`, `col8`, `col9`) VALUES
(1, '181020161100100000014100100000320', '123951', '110010000', '001701584307', '31', '000000000007000000', 'SIMRAN ENTERPRISES', 'CTS\\INWARD\\20161018\\000002', '181020161100100000014100100000320'),
(2, '181020161100100000014100100002010', '021329', '110010000', '036305500549', '29', '000000000027950000', 'LONGOWALIA  YARNS LIMIT', 'CTS\\INWARD\\20161018\\000002', '181020161100100000014100100002010'),
(3, '181020161100100000014100100002090', '021328', '110010000', '036305500549', '29', '000000000010000000', 'LONGOWALIA  YARNS LIMIT', 'CTS\\INWARD\\20161018\\000002', '181020161100100000014100100002090'),
(4, '181020161100100000014100100002250', '823314', '110010000', '036305002255', '29', '000000000010000000', 'DEEPAK COSMO LTD', 'CTS\\INWARD\\20161018\\000002', '181020161100100000014100100002250'),
(5, '181020161100100000014158900000850', '054330', '110010000', '057805000776', '29', '000000000005000000', 'SHIVAM PROCESSORS', 'CTS\\INWARD\\20161018\\000002', '181020161100100000014158900000850'),
(6, '181020161100100000014158900000870', '963928', '110010000', '096605500064', '29', '000000000012000000', 'MAHADEV PROCESSORS', 'CTS\\INWARD\\20161018\\000002', '181020161100100000014158900000870'),
(7, '181020161100100000014100100002990', '112887', '110010000', '057805500455', '29', '000000000039732000', 'AG  TRADERS', 'CTS\\INWARD\\20161018\\000002', '181020161100100000014100100002990'),
(8, '181020161100100000014100100003130', '706004', '110010000', '036305001624', '29', '000000000050000000', 'MRTEXTILES', 'CTS\\INWARD\\20161018\\000002', '181020161100100000014100100003130'),
(9, '181020161100100000030200400000130', '008404', '110010000', '677401433914', '31', '000000000025600000', 'CM RSRTC Deluxe Depot J', 'CTS\\INWARD\\20161018\\000002', '181020161100100000030200400000130'),
(10, '181020161100100000030200400000420', '570995', '110010000', '010405200053', '29', '000000000005000000', 'INTER BRANCH REMITTANCE', 'CTS\\INWARD\\20161018\\000002', '181020161100100000030200400000420'),
(11, '181020161100100000030200400001490', '074398', '110010000', '031505006508', '29', '000000000010018300', 'ELITE INDUSTRIAL SECURI', 'CTS\\INWARD\\20161018\\000002', '181020161100100000030200400001490'),
(12, '181020161100100000030200400002810', '081139', '110010000', '031505000694', '29', '000000000015000000', 'SUBH INFOTECH', 'CTS\\INWARD\\20161018\\000002', '181020161100100000030200400002810'),
(13, '181020161100100000031100100000110', '200212', '110010000', '666301524324', '31', '000000000010842300', 'SAMPAT KUMAR  SANCHETI', 'CTS\\INWARD\\20161018\\000002', '181020161100100000031100100000110'),
(14, '181020161100100000031300200000690', '781221', '110010000', '004505009119', '29', '000000000013000000', 'RUPALI  TENT HOUSE', 'CTS\\INWARD\\20161018\\000002', '181020161100100000031300200000690'),
(15, '181020161100100000016200100001860', '123905', '110010000', '663005600141', '29', '000000000005700000', 'RATTAN TYRE', 'CTS\\INWARD\\20161018\\000002', '181020161100100000016200100001860'),
(16, '181020161100100000014158900001830', '768434', '110010000', '631905500577', '29', '000000000010000000', 'KASHMIR WEAVERS', 'CTS\\INWARD\\20161018\\000002', '181020161100100000014158900001830'),
(17, '181020161100100000014100100003410', '026619', '110010000', '159401000633', '31', '000000000010000000', 'NAMAN FASHIONS', 'CTS\\INWARD\\20161018\\000002', '181020161100100000014100100003410'),
(18, '181020161100100000030200100000710', '002114', '110010000', '675201415118', '31', '000000000005200000', 'SAURABH  COMPANY', 'CTS\\INWARD\\20161018\\000002', '181020161100100000030200100000710'),
(19, '181020161100100000061500100001760', '059290', '110010000', '071651000008', '30', '000000000006031400', 'D P  PACKERS', 'CTS\\INWARD\\20161018\\000002', '181020161100100000061500100001760'),
(20, '181020161100100000030200400001030', '068097', '110010000', '167605000354', '29', '000000000006133500', 'SATYA NARAYAN GUPTA HUF', 'CTS\\INWARD\\20161018\\000002', '181020161100100000030200400001030'),
(21, '181020161100100000030200400004350', '000621', '110010000', '674105112567', '29', '000000000005000000', 'PARADISE  AGENCIES PVT', 'CTS\\INWARD\\20161018\\000002', '181020161100100000030200400004350'),
(22, '181020161100100000014158900002640', '023879', '110010000', '664005500214', '29', '000000000005000000', 'KSOSWAL KNITTING IMPE', 'CTS\\INWARD\\20161018\\000002', '181020161100100000014158900002640'),
(23, '181020161100100000030200100000340', '048558', '110010000', '010405555553', '29', '000000000038100800', 'NIRMALA  DEVI', 'CTS\\INWARD\\20161018\\000002', '181020161100100000030200100000340'),
(24, '181020161100100000011037100000490', '030310', '110010000', '628401507262', '31', '000000000005000000', 'HEMLATA', 'CTS\\INWARD\\20161018\\000002', '181020161100100000011037100000490'),
(25, '181020161100290000102261101004001', '000628', '110029000', '628105501161', '29', '000000000015600000', 'KIRAN ENTERPRISES', 'CTS\\INWARD\\20161018\\000002', '181020161100290000102261101004001'),
(26, '181020161100290000102821101002001', '067381', '110029000', '628705001181', '29', '000000000009657325', 'MITTAL DAIRY', 'CTS\\INWARD\\20161018\\000002', '181020161100290000102821101002001'),
(27, '181020161100290000102821101002013', '002975', '110029000', '320901500501', '31', '000000000020000000', 'HI VIEW CONSTRUCTIONS PVT', 'CTS\\INWARD\\20161018\\000002', '181020161100290000102821101002013'),
(28, '181020161100290000102262001002018', '069832', '110029000', '083305001022', '29', '000000000006812500', 'HARSH TECHNOLOGIES', 'CTS\\INWARD\\20161018\\000002', '181020161100290000102262001002018'),
(29, '181020161100290000102262801005003', '795540', '110029000', '000405039853', '29', '000000000025911300', 'R G INFRACITY PRIVATE LIM', 'CTS\\INWARD\\20161018\\000002', '181020161100290000102262801005003'),
(30, '181020161100290000102262801005008', '008373', '110029000', '025201512324', '31', '000000000010000000', 'R G INFRACITY PRIVATE LIM', 'CTS\\INWARD\\20161018\\000002', '181020161100290000102262801005008'),
(31, '181020161100290000102821101001080', '719319', '110029000', '035101000266', '31', '000000000010000000', 'RAMA SHANKER GOYAL', 'CTS\\INWARD\\20161018\\000002', '181020161100290000102821101001080'),
(32, '181020161100290000103021401003090', '163193', '110029000', '675101013512', '31', '000000000020000000', 'BHARAT  AGENCIES', 'CTS\\INWARD\\20161018\\000002', '181020161100290000103021401003090'),
(33, '181020161100290000192050101002002', '509963', '110029000', '015405500247', '29', '000000000016500000', 'MODERN KITCHEN', 'CTS\\INWARD\\20161018\\000002', '181020161100290000192050101002002'),
(34, '181020161100290000175031301002009', '704433', '110029000', '001705002576', '11', '000000000035000000', 'TARLOCHAN SINGH', 'CTS\\INWARD\\20161018\\000002', '181020161100290000175031301002009'),
(35, '181020161100290000192050101008030', '956613', '110029000', '015405002193', '29', '000000000007000000', 'ARIHANT INDUSTRIES', 'CTS\\INWARD\\20161018\\000002', '181020161100290000192050101008030'),
(36, '181020161100290000192050101007037', '519274', '110029000', '042305001839', '29', '000000000008870000', 'RAM TRADERS', 'CTS\\INWARD\\20161018\\000002', '181020161100290000192050101007037'),
(37, '181020161100290000192050101007048', '006405', '110029000', '016005002153', '29', '000000000162119600', 'CLEVUS LIFESCIENCES', 'CTS\\INWARD\\20161018\\000002', '181020161100290000192050101007048'),
(38, '181020161100290000192050101008072', '957193', '110029000', '084205500390', '29', '000000000006000000', 'MICRO FIL UDYOG', 'CTS\\INWARD\\20161018\\000002', '181020161100290000192050101008072'),
(39, '181020161100290000192050101008092', '000935', '110029000', '042305001892', '29', '000000000005000000', 'KUKREJA STEELS', 'CTS\\INWARD\\20161018\\000002', '181020161100290000192050101008092');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alplallocationentry`
--
ALTER TABLE `alplallocationentry`
 ADD PRIMARY KEY (`allocationId`);

--
-- Indexes for table `alplapplications`
--
ALTER TABLE `alplapplications`
 ADD PRIMARY KEY (`applicationId`);

--
-- Indexes for table `alplbatchtype`
--
ALTER TABLE `alplbatchtype`
 ADD PRIMARY KEY (`batchTypeId`);

--
-- Indexes for table `alpllocationmaster`
--
ALTER TABLE `alpllocationmaster`
 ADD PRIMARY KEY (`locationId`);

--
-- Indexes for table `alplprocessusers`
--
ALTER TABLE `alplprocessusers`
 ADD PRIMARY KEY (`processUserId`);

--
-- Indexes for table `alplreasonmaster`
--
ALTER TABLE `alplreasonmaster`
 ADD PRIMARY KEY (`rId`);

--
-- Indexes for table `alplremarkcodemaster`
--
ALTER TABLE `alplremarkcodemaster`
 ADD PRIMARY KEY (`remarkId`);

--
-- Indexes for table `alplremarktype`
--
ALTER TABLE `alplremarktype`
 ADD PRIMARY KEY (`remarkTypeId`);

--
-- Indexes for table `alpluserentry`
--
ALTER TABLE `alpluserentry`
 ADD PRIMARY KEY (`entryId`);

--
-- Indexes for table `alpluserentryremarks`
--
ALTER TABLE `alpluserentryremarks`
 ADD PRIMARY KEY (`remarkId`);

--
-- Indexes for table `alplweblinkmaster`
--
ALTER TABLE `alplweblinkmaster`
 ADD PRIMARY KEY (`Sr_No`);

--
-- Indexes for table `casadoctypemaster`
--
ALTER TABLE `casadoctypemaster`
 ADD PRIMARY KEY (`documentId`);

--
-- Indexes for table `casaimageindextype`
--
ALTER TABLE `casaimageindextype`
 ADD PRIMARY KEY (`indexingId`);

--
-- Indexes for table `casanritype`
--
ALTER TABLE `casanritype`
 ADD PRIMARY KEY (`nriId`);

--
-- Indexes for table `ccagencybatch`
--
ALTER TABLE `ccagencybatch`
 ADD PRIMARY KEY (`batchCreateId`);

--
-- Indexes for table `ccagencymaster`
--
ALTER TABLE `ccagencymaster`
 ADD PRIMARY KEY (`agencyId`);

--
-- Indexes for table `ccallocationentry`
--
ALTER TABLE `ccallocationentry`
 ADD PRIMARY KEY (`allocationId`);

--
-- Indexes for table `cccategorymaster`
--
ALTER TABLE `cccategorymaster`
 ADD PRIMARY KEY (`categoryId`);

--
-- Indexes for table `cccategoryvalue`
--
ALTER TABLE `cccategoryvalue`
 ADD PRIMARY KEY (`categoryValuesId`);

--
-- Indexes for table `cccitymaster`
--
ALTER TABLE `cccitymaster`
 ADD PRIMARY KEY (`cityId`);

--
-- Indexes for table `cccompanymaster`
--
ALTER TABLE `cccompanymaster`
 ADD PRIMARY KEY (`companyId`);

--
-- Indexes for table `ccdataentry`
--
ALTER TABLE `ccdataentry`
 ADD PRIMARY KEY (`entryId`);

--
-- Indexes for table `ccdmamaster`
--
ALTER TABLE `ccdmamaster`
 ADD PRIMARY KEY (`dmaId`);

--
-- Indexes for table `ccdmemaster`
--
ALTER TABLE `ccdmemaster`
 ADD PRIMARY KEY (`dmeId`);

--
-- Indexes for table `ccimageinputtype`
--
ALTER TABLE `ccimageinputtype`
 ADD PRIMARY KEY (`imageTypeId`);

--
-- Indexes for table `ccimagetypemaster`
--
ALTER TABLE `ccimagetypemaster`
 ADD PRIMARY KEY (`imageTypeId`);

--
-- Indexes for table `ccimport`
--
ALTER TABLE `ccimport`
 ADD PRIMARY KEY (`importId`);

--
-- Indexes for table `ccindexedimage`
--
ALTER TABLE `ccindexedimage`
 ADD PRIMARY KEY (`inedexedImageId`);

--
-- Indexes for table `cclogomaster`
--
ALTER TABLE `cclogomaster`
 ADD PRIMARY KEY (`logoId`);

--
-- Indexes for table `ccmasterupload`
--
ALTER TABLE `ccmasterupload`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ccpricemaster`
--
ALTER TABLE `ccpricemaster`
 ADD PRIMARY KEY (`priceId`);

--
-- Indexes for table `ccpromocodemaster`
--
ALTER TABLE `ccpromocodemaster`
 ADD PRIMARY KEY (`promoId`);

--
-- Indexes for table `ccstatemaster`
--
ALTER TABLE `ccstatemaster`
 ADD PRIMARY KEY (`stateId`);

--
-- Indexes for table `coreapps`
--
ALTER TABLE `coreapps`
 ADD PRIMARY KEY (`appId`);

--
-- Indexes for table `corebankmaster`
--
ALTER TABLE `corebankmaster`
 ADD PRIMARY KEY (`bankId`);

--
-- Indexes for table `corebatchmaster`
--
ALTER TABLE `corebatchmaster`
 ADD PRIMARY KEY (`batchId`);

--
-- Indexes for table `corecompany`
--
ALTER TABLE `corecompany`
 ADD PRIMARY KEY (`companyId`);

--
-- Indexes for table `corecontracts`
--
ALTER TABLE `corecontracts`
 ADD PRIMARY KEY (`contractId`);

--
-- Indexes for table `corecontractusers`
--
ALTER TABLE `corecontractusers`
 ADD PRIMARY KEY (`contractuserId`);

--
-- Indexes for table `corefields`
--
ALTER TABLE `corefields`
 ADD PRIMARY KEY (`fieldId`);

--
-- Indexes for table `corefieldtypes`
--
ALTER TABLE `corefieldtypes`
 ADD PRIMARY KEY (`fieldTypeId`);

--
-- Indexes for table `corefieldvalidations`
--
ALTER TABLE `corefieldvalidations`
 ADD PRIMARY KEY (`validationId`);

--
-- Indexes for table `corefiles`
--
ALTER TABLE `corefiles`
 ADD PRIMARY KEY (`fileId`);

--
-- Indexes for table `corefolders`
--
ALTER TABLE `corefolders`
 ADD PRIMARY KEY (`folderId`);

--
-- Indexes for table `corelocations`
--
ALTER TABLE `corelocations`
 ADD PRIMARY KEY (`locationId`);

--
-- Indexes for table `corelotnumber`
--
ALTER TABLE `corelotnumber`
 ADD PRIMARY KEY (`lotNumberId`);

--
-- Indexes for table `coremenu`
--
ALTER TABLE `coremenu`
 ADD PRIMARY KEY (`menuId`);

--
-- Indexes for table `corestatus`
--
ALTER TABLE `corestatus`
 ADD PRIMARY KEY (`statusId`);

--
-- Indexes for table `coreusers`
--
ALTER TABLE `coreusers`
 ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alplallocationentry`
--
ALTER TABLE `alplallocationentry`
MODIFY `allocationId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `alplapplications`
--
ALTER TABLE `alplapplications`
MODIFY `applicationId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `alplbatchtype`
--
ALTER TABLE `alplbatchtype`
MODIFY `batchTypeId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `alplprocessusers`
--
ALTER TABLE `alplprocessusers`
MODIFY `processUserId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `alplremarkcodemaster`
--
ALTER TABLE `alplremarkcodemaster`
MODIFY `remarkId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `alplremarktype`
--
ALTER TABLE `alplremarktype`
MODIFY `remarkTypeId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `alpluserentry`
--
ALTER TABLE `alpluserentry`
MODIFY `entryId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `alpluserentryremarks`
--
ALTER TABLE `alpluserentryremarks`
MODIFY `remarkId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `ccagencybatch`
--
ALTER TABLE `ccagencybatch`
MODIFY `batchCreateId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `ccdataentry`
--
ALTER TABLE `ccdataentry`
MODIFY `entryId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `ccimport`
--
ALTER TABLE `ccimport`
MODIFY `importId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `ccindexedimage`
--
ALTER TABLE `ccindexedimage`
MODIFY `inedexedImageId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `coreapps`
--
ALTER TABLE `coreapps`
MODIFY `appId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `corebatchmaster`
--
ALTER TABLE `corebatchmaster`
MODIFY `batchId` int(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `corecompany`
--
ALTER TABLE `corecompany`
MODIFY `companyId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `corecontracts`
--
ALTER TABLE `corecontracts`
MODIFY `contractId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `corefields`
--
ALTER TABLE `corefields`
MODIFY `fieldId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=602;
--
-- AUTO_INCREMENT for table `corefieldtypes`
--
ALTER TABLE `corefieldtypes`
MODIFY `fieldTypeId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `corefiles`
--
ALTER TABLE `corefiles`
MODIFY `fileId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `corefolders`
--
ALTER TABLE `corefolders`
MODIFY `folderId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `corelocations`
--
ALTER TABLE `corelocations`
MODIFY `locationId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `corelotnumber`
--
ALTER TABLE `corelotnumber`
MODIFY `lotNumberId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `coremenu`
--
ALTER TABLE `coremenu`
MODIFY `menuId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=45;
--
-- AUTO_INCREMENT for table `coreusers`
--
ALTER TABLE `coreusers`
MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=91;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
