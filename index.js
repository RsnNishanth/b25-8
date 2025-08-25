const express = require("express");
const app = express();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(express.json());

app.listen(3000, () => {
  console.log("Server Running at PORT:3000");
});

// ===============================
// GET all products with details & similar products
// ===============================
app.get("/products", async (req, res) => {
  try {
    const allProducts = await prisma.product.findMany({
      include: {
        ProductDetails: {
          include: {
            SimilarProducts: true
          }
        }
      }
    });
    res.json(allProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ===============================
// POST new product
// ===============================
app.post("/new/product", async (req, res) => {
  try {
    const { title, price, image_url, rating } = req.body;

    const NewProduct = await prisma.product.create({
      data: { title, price, image_url, rating }
    });

    res.json({ message: "product added", product: NewProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// ===============================
// POST product details
// ===============================
app.post("/product/detail", async (req, res) => {
  try {
    const {
      product_id,        // must come from req.body
      image_url,
      title,
      style,
      price,
      description,
      brand,
      total_reviews,
      rating,
      availability
    } = req.body;

    if (!product_id) {
      return res.status(400).json({ error: "product_id is required" });
    }

    const newProductDetail = await prisma.productDetails.create({
      data: {
        image_url,
        title,
        style,
        price,
        description,
        brand,
        total_reviews,
        rating,
        availability,
        products: {        // 👈 correct relation field
          connect: { id: parseInt(product_id) }
        }
      }
    });

    res.json({ message: "Product details added", newProductDetail });
  } catch (err) {
    console.error("Error adding product details:", err);
    res.status(500).json({ error: "Failed to add product details", details: err.message });
  }
});



// ===============================
// POST similar product
// ===============================
app.post("/product/similar", async (req, res) => {
  try {
    const {
      productDetailId, // must match existing ProductDetails.product_detail_id
      image_url,
      title,
      style,
      price,
      description,
      brand,
      total_reviews,
      rating,
      availability
    } = req.body;

    const newSimilarProduct = await prisma.similarProducts.create({
      data: {
        productDetailId,
        image_url,
        title,
        style,
        price,
        description,
        brand,
        total_reviews,
        rating,
        availability,
      }
    });

    res.json({ message: "Similar product added", newSimilarProduct });
  } catch (err) {
    console.error("Error adding similar product:", err);
    res.status(500).json({ error: "Failed to add similar product", details: err.message });
  }
});



// ===============================
// GET single product details by product_id
// ===============================
app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const singleProductDetails = await prisma.productDetails.findUnique({
  where: { product_detail_id: parseInt(id) },
  include: { SimilarProducts: true }
});


    if (!singleProductDetails) {
      return res.status(404).json({ error: "Product details not found" });
    }

    res.json({ details: singleProductDetails });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch product details" });
  }
});
