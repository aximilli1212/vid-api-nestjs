-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "Status" DEFAULT 'ACTIVE',
    "phoneNumbers" TEXT[],
    "avatarImageUrl" TEXT,
    "companyId" TEXT,
    "rights" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "activeCompanyId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "detailContent" TEXT,
    "foundingYear" TEXT,
    "geohash" TEXT,
    "geopointLat" DOUBLE PRECISION,
    "geopointLong" DOUBLE PRECISION,
    "headerImageUrl" TEXT,
    "logoImageUrl" TEXT,
    "totalEmployees" INTEGER,
    "dynamicLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_userToCompany" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_activeCompanyId_key" ON "User"("activeCompanyId");

-- CreateIndex
CREATE UNIQUE INDEX "_userToCompany_AB_unique" ON "_userToCompany"("A", "B");

-- CreateIndex
CREATE INDEX "_userToCompany_B_index" ON "_userToCompany"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_activeCompanyId_fkey" FOREIGN KEY ("activeCompanyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userToCompany" ADD CONSTRAINT "_userToCompany_A_fkey" FOREIGN KEY ("A") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userToCompany" ADD CONSTRAINT "_userToCompany_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
