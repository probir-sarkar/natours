const fs = require("fs");
// All required modules
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// End of required modules
const Tour = require("./../../models/tourModels");

// set environment variables from .env file
dotenv.config({ path: "./config.env" });

// get the database connection string from the environment variables
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// connect to the database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful"));

// Read JSON file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);

// Import data into database
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data successfully loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all data from collection
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data successfully deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
console.log(__dirname);
// deleteData();
// importData();
