const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const express = require("express");
const { BadParams, DoesNotExist } = require("../middleware/CustomErrors");
const router = express.Router();
const app = express();
app.use(express.json());

const postRoutes = require("./posts");
app.use("/:boardId/post", postRoutes);

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
  const { title, category, author, imageURL } = req.body;
  if (title == null || category == null) {
    next(new BadParams("You must include a title and category"));
  }
  const board = await prisma.board.create({
    data: {
      title,
      category,
      author,
      imageURL,
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

// Create a post wihtin a Board:
router.post("/:boardId", async (req, res, next) => {
  const boardId = parseInt(req.params.boardId);
  if (boardId == null) {
    next(
      new DoesNotExist("This ID does not exist, so we cannot add to its posts")
    );
  }
  const { author, imageURL, title, description } = req.body;
  if (imageURL == null || title == null || description == null) {
    next(new BadParams("you must defined a GIF, title, and description"));
  }
  const post = await prisma.card.create({
    data: {
      author,
      imageURL,
      upvotes: 0,
      boardId,
      title,
      description,
    },
  });
  res.json(post);
});

// search for boards using author name / title name

router.get("/query/:query", async (req, res, next) => {
  const query = req.params.query;
  const boards = await prisma.board.findMany({
    where: {
      OR: [
        {
          title: { startsWith: query },
        },
        {
          author: { startsWith: query },
        },
      ],
    },
  });
  res.json(boards);
});

// get boards based on category
router.get("/category/:category", async (req, res) => {
  const checkCategory = req.params.category;
  if (checkCategory === "all") {
    res.json(await prisma.board.findMany());
  }
  if (checkCategory === "recent") {
    res.json(
      await prisma.board.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 6,
      })
    );
  } else {
    const boards = await prisma.board.findMany({
      where: {
        category: checkCategory,
      },
    });
    res.json(boards);
  }
});

// populate boards

router.get("/:boardId/posts", async (req, res) => {
  const boardId = parseInt(req.params.boardId);
  if (boardId == null) {
    next(
      new DoesNotExist("This ID does not exist and thus cannot be displayed")
    );
  }
  const cards = await prisma.card.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      boardId: boardId,
    },
  });

  res.json(cards);
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

//
