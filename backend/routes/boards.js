const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const express = require("express");
const { BadParams, DoesNotExist } = require("../middleware/CustomErrors");
const router = express.Router();

const app = express();

router.get("/:boardId", async (req, res, next) => {
  const boardId = parseInt(req.params.boardId);
  const innerBoard = await prisma.board.findUnique({
    where: {
      id: boardId, // Replace 99 with the actual ID you want to retrieve
    },
  });
  if (innerBoard) {
    res.json(innerBoard);
  } else {
    next(
      new DoesNotExist("This ID does not exist and thus cannot be displayed")
    );
  }
});

// create new board
router.post("/", async (req, res, next) => {
  const { title, category, author } = req.body;
  if (title == null || category == null) {
    next(new BadParams("You must include a title and category"));
  }
  const board = await prisma.board.create({
    data: {
      title,
      category,
      author,
    },
  });
  res.status(201).json(board);
});

// delete all Boards:

router.delete("/:boardId", async (req, res, next) => {
  const boardId = parseInt(req.params.boardId);
  if (boardId == null) {
    next(new DoesNotExist("This ID does not exist and thus cannot be deleted"));
  }
  const deletedBoard = await prisma.board.delete({
    where: { id: boardId },
  });
  res.json(deletedBoard);
});

// GET ALL Boards:

router.get("/", async (req, res) => {
  const Boards = await prisma.board.findMany();
  res.json(Boards);
});

app.use((err, req, res, next) => {
  if (err instanceof BadParams || err instanceof DoesNotExist) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = router;
