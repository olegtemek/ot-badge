-- CreateTable
CREATE TABLE "Repository" (
    "id" SERIAL NOT NULL,
    "fullPath" TEXT NOT NULL,
    "visitor" TEXT NOT NULL DEFAULT '0',

    CONSTRAINT "Repository_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Repository_fullPath_key" ON "Repository"("fullPath");
