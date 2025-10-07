/*
  Warnings:

  - Added the required column `amount` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `amount` DOUBLE NOT NULL;
