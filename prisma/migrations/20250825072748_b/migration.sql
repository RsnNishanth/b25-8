-- CreateTable
CREATE TABLE "public"."Product" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductDetails" (
    "product_detail_id" SERIAL NOT NULL,
    "image_url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "style" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "total_reviews" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "availability" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "ProductDetails_pkey" PRIMARY KEY ("product_detail_id")
);

-- CreateTable
CREATE TABLE "public"."SimilarProducts" (
    "id" SERIAL NOT NULL,
    "image_url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "style" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "total_reviews" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "availability" TEXT NOT NULL,
    "productDetailId" INTEGER NOT NULL,

    CONSTRAINT "SimilarProducts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductDetails_product_id_key" ON "public"."ProductDetails"("product_id");

-- AddForeignKey
ALTER TABLE "public"."ProductDetails" ADD CONSTRAINT "ProductDetails_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SimilarProducts" ADD CONSTRAINT "SimilarProducts_productDetailId_fkey" FOREIGN KEY ("productDetailId") REFERENCES "public"."ProductDetails"("product_detail_id") ON DELETE RESTRICT ON UPDATE CASCADE;
