-- AlterTable
ALTER TABLE `transactions` MODIFY `amount` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `wallet` MODIFY `balance` DECIMAL(65, 30) NOT NULL DEFAULT 0.00;
