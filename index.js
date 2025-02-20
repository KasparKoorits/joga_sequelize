const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to the database
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost:3306/joga_sequelize");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// using routes and controllers
const articleRouter = require("./routes/article");
app.use("/", articleRouter);
app.use("/article", articleRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello to sequelize app" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
