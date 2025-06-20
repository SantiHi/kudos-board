const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const express = require("express");
const { BadParams, DoesNotExist } = require("../middleware/CustomErrors");
const router = express.Router({ mergeParams: true });

const app = express();
app.use(express.json());

// get all comments!
router.get("/:postId", async (req, res, next) => {
  const postId = parseInt(req.params.postId);
  if (postId == null) {
    next(
      new DoesNotExist("This post ID does not exist and thus cannot be deleted")
    );
  }
  const comments = await prisma.comments.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      cardId: postId,
    },
  });
  res.json(comments);
});

// make a new comment:

// Create a new comment within a post:
router.post("/:postId/comment", async (req, res, next) => {
  const postId = parseInt(req.params.postId);
  if (postId == null) {
    next(
      new DoesNotExist("This ID does not exist, so we cannot add to its posts")
    );
  }
  const { author, comment } = req.body;
  if (comment == null) {
    next(new BadParams("you must defined a GIF, title, and description"));
  }
  const post = await prisma.comments.create({
    data: {
      author,
      comment,
      cardId: postId,
    },
  });
  res.json(post);
});

router.delete("/:postId", async (req, res, next) => {
  const postId = parseInt(req.params.postId);
  if (postId == null) {
    next(
      new DoesNotExist("This post ID does not exist and thus cannot be deleted")
    );
  }
  const deletedPost = await prisma.card.delete({
    where: { id: postId },
  });
  res.json(deletedPost);
});

router.put("/:postId/pin", async (req, res, next) => {
  const postId = parseInt(req.params.postId);
  if (postId == null) {
    next(
      new DoesNotExist("This post ID does not exist and thus cannot be deleted")
    );
  }

  const oldPost = await prisma.card.findUnique({ where: { id: postId } });
  const post = await prisma.card.update({
    where: { id: postId },
    data: { pinned: !oldPost.pinned },
  });
  res.json(post);
});

// add likes
router.put("/:postId", async (req, res, next) => {
  const postId = parseInt(req.params.postId);
  const updatedPost = await prisma.card.update({
    where: { id: postId },
    data: {
      upvotes: { increment: 1 },
    },
  });
  res.json(updatedPost);
});

module.exports = router;

//error handling

app.use((err, req, res, next) => {
  if (err instanceof BadParams || err instanceof DoesNotExist) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  res.status(500).json({ error: "Internal Server Error" });
});
