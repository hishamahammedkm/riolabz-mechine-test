-- CreateTable
CREATE TABLE "User" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" TEXT,
    "id" TEXT NOT NULL,
    "lastName" TEXT,
    "password" TEXT NOT NULL,
    "roles" TEXT[],
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "asuNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT,
    "experience" TEXT,
    "hospital" TEXT,
    "id" TEXT NOT NULL,
    "location" TEXT,
    "loginId" TEXT,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "photo" TEXT,
    "qualifications" TEXT,
    "slug" TEXT,
    "speciality" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "about" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "founders" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "members" TEXT NOT NULL,
    "office" TEXT NOT NULL,
    "other" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_asuNumber_key" ON "Doctor"("asuNumber");

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_loginId_fkey" FOREIGN KEY ("loginId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
