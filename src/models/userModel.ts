export class UserModel {
  id        String   @id @default(uuid())
  username  String   @unique
  email     String   @unique
  password  String
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @default(now()) @updatedAt @map("updated_at")
  isDeleted Boolean  @default(false) @map("is_deleted")
  isActive  Boolean  @default(false) @map("is_active")
  role      String   @default("user")
}