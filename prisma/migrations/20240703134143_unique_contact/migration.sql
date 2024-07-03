/*
  Warnings:

  - A unique constraint covering the columns `[phone,message]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Contact_phone_message_key" ON "Contact"("phone", "message");
