/*
  Warnings:

  - Added the required column `Contact` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolEmail` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_School" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "schoolEmail" TEXT NOT NULL,
    "Contact" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL
);
INSERT INTO "new_School" ("address", "city", "id", "imagePath", "name", "state") SELECT "address", "city", "id", "imagePath", "name", "state" FROM "School";
DROP TABLE "School";
ALTER TABLE "new_School" RENAME TO "School";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
