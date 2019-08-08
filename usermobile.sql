/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80016
 Source Host           : localhost:3306
 Source Schema         : usermobile

 Target Server Type    : MySQL
 Target Server Version : 80016
 File Encoding         : 65001

 Date: 08/08/2019 17:23:00
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for loginaddress
-- ----------------------------
DROP TABLE IF EXISTS `loginaddress`;
CREATE TABLE `loginaddress`  (
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `loginIp` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登录ip',
  `loginTime` datetime(0) NULL DEFAULT NULL COMMENT '登录时间'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of loginaddress
-- ----------------------------
INSERT INTO `loginaddress` VALUES ('1', '::ffff:127.0.0.1', '2019-08-07 17:21:19');
INSERT INTO `loginaddress` VALUES ('1', '::ffff:127.0.0.1', '2019-08-07 17:27:42');
INSERT INTO `loginaddress` VALUES ('1', '::ffff:127.0.0.1', '2019-08-07 17:28:59');
INSERT INTO `loginaddress` VALUES ('7', '::ffff:127.0.0.1', '2019-08-07 17:34:04');
INSERT INTO `loginaddress` VALUES ('2', '::ffff:127.0.0.1', '2019-08-07 17:35:02');
INSERT INTO `loginaddress` VALUES ('12455455445545454', '::ffff:127.0.0.1', '2019-08-07 17:36:46');
INSERT INTO `loginaddress` VALUES ('1', '::ffff:127.0.0.1', '2019-08-07 17:56:58');
INSERT INTO `loginaddress` VALUES ('1', '::ffff:127.0.0.1', '2019-08-08 09:20:34');
INSERT INTO `loginaddress` VALUES ('1', '::ffff:127.0.0.1', '2019-08-08 10:39:49');
INSERT INTO `loginaddress` VALUES ('1', '::ffff:127.0.0.1', '2019-08-08 11:39:43');
INSERT INTO `loginaddress` VALUES ('1', '::ffff:127.0.0.1', '2019-08-08 11:45:53');
INSERT INTO `loginaddress` VALUES ('1', '::ffff:127.0.0.1', '2019-08-08 11:48:29');
INSERT INTO `loginaddress` VALUES ('2', '::ffff:127.0.0.1', '2019-08-08 11:48:57');
INSERT INTO `loginaddress` VALUES ('2', '::ffff:127.0.0.1', '2019-08-08 11:51:43');
INSERT INTO `loginaddress` VALUES ('2', '::ffff:127.0.0.1', '2019-08-08 11:52:05');
INSERT INTO `loginaddress` VALUES ('1', '::ffff:127.0.0.1', '2019-08-08 14:29:39');
INSERT INTO `loginaddress` VALUES ('2', '::ffff:127.0.0.1', '2019-08-08 14:29:47');
INSERT INTO `loginaddress` VALUES ('1', '::ffff:127.0.0.1', '2019-08-08 14:30:11');
INSERT INTO `loginaddress` VALUES ('1', '::ffff:127.0.0.1', '2019-08-08 14:31:59');
INSERT INTO `loginaddress` VALUES ('2', '::ffff:127.0.0.1', '2019-08-08 14:32:07');
INSERT INTO `loginaddress` VALUES ('1', '::ffff:127.0.0.1', '2019-08-08 14:38:57');
INSERT INTO `loginaddress` VALUES ('1', '::ffff:127.0.0.1', '2019-08-08 14:45:49');
INSERT INTO `loginaddress` VALUES ('1', '::ffff:127.0.0.1', '2019-08-08 14:45:59');
INSERT INTO `loginaddress` VALUES ('1', '::ffff:127.0.0.1', '2019-08-08 14:46:07');
INSERT INTO `loginaddress` VALUES ('2', '::ffff:127.0.0.1', '2019-08-08 14:46:18');
INSERT INTO `loginaddress` VALUES ('1', '::ffff:127.0.0.1', '2019-08-08 14:46:30');
INSERT INTO `loginaddress` VALUES ('1', '::ffff:127.0.0.1', '2019-08-08 14:49:23');
INSERT INTO `loginaddress` VALUES ('1', '::ffff:127.0.0.1', '2019-08-08 14:53:28');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(255) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `userName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `creatTime` datetime(6) NULL DEFAULT NULL COMMENT '创建时间',
  `userCreatIp` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户Ip',
  `headerImg` varchar(20000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像',
  `nickName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '昵称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 49 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (47, '1', '1', '2019-08-08 11:51:32.000000', '::ffff:127.0.0.1', NULL, '我');
INSERT INTO `user` VALUES (48, '2', '2', '2019-08-08 11:51:41.000000', '::ffff:127.0.0.1', NULL, '我是');

SET FOREIGN_KEY_CHECKS = 1;
