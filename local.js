// All required modules
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
// End of required modules

// set environment variables from .env file
if (process.env.PORT === undefined) {
  dotenv.config({ path: "./config.env" });
} else {
  dotenv.config({ path: "/etc/secrets/config.env" });
}
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
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful"));

// server will listen on port 3000 for incoming requests
const port = process.env.PORT || 3000;

//  start the server

app.listen(port, () => {
  console.log(`"Server started on port 3000" ${port}`);
});
