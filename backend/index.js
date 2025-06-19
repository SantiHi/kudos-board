const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

const boardRoutes = require("./routes/boards");

app.use("/boards", boardRoutes);
app.use("/posts", require("./routes/posts"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//
