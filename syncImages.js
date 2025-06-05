const fs = require("fs");
const path = require("path");

const frontendImagesPath = path.join(
  __dirname,
  "..",
  "next-ecommerce-store",
  "public",
  "images"
); // adjust if needed
const backendImagesPath = path.join(__dirname, "public", "images");

const serverURL = "http://localhost:5000"; // change this when deployed

// Make sure backend images folder exists
if (!fs.existsSync(backendImagesPath)) {
  fs.mkdirSync(backendImagesPath, { recursive: true });
}

// Get all .jpg images from frontend
const imageFiles = fs
  .readdirSync(frontendImagesPath)
  .filter((file) => file.endsWith(".jpg"));

// Copy each image
imageFiles.forEach((file) => {
  const src = path.join(frontendImagesPath, file);
  const dest = path.join(backendImagesPath, file);

  fs.copyFileSync(src, dest);
  console.log(`Copied: ${file}`);
});

// Generate sample product objects
const products = imageFiles.map((filename) => {
  const name = filename
    .replace(/[-_]/g, " ")
    .replace(/\.[^.]+$/, "")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    name,
    price: 49.99,
    description: `This is a ${name}.`,
    image: `${serverURL}/images/${filename}`,
  };
});

console.log("\n📦 Updated Products List:\n");
console.log(JSON.stringify(products, null, 2));
