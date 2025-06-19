const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const express = require("express");
const { BadParams, DoesNotExist } = require("../middleware/CustomErrors");
const router = express.Router({ mergeParams: true });

const app = express();
app.use(express.json());

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

app.use((err, req, res, next) => {
  if (err instanceof BadParams || err instanceof DoesNotExist) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  res.status(500).json({ error: "Internal Server Error" });
});

// add likes
router.put("/:postId", async (req, res, next) => {
  const postId = parseInt(req.params.postId);
  const currentPost = await prisma.board.findUnique({
    where: {
      id: postId,
    },
  });
  const updatedPost = await prisma.card.update({
    where: { id: postId },
    data: {
      upvotes: { increment: 1 },
    },
  });
  res.json(updatedPost);
});

module.exports = router;

//
