const wordRouter = require("express").Router();
const Word = require("../models/word");

wordRouter.get("/", async (request, response) => {
  //const word = await Word.find({})
  const word = await Word.find({});
});

wordRouter.get("/:word", async (request, response) => {
  const word = await Word.find({
    $expr: { $lt: [{ $strLenCP: "$word" }, request.params.word.length + 1] },
  });
  const inputWord = request.params.word;
  const filtered = [];
  word.forEach((word) => {
    if (
      word.word
        .split("")
        .every(
          (val) =>
            inputWord.split("").includes(val) &&
            word.word.split("").filter((el) => el === val).length <=
              inputWord.split("").filter((el) => el === val).length
        )
    ) {
      filtered.push(word);
    }
  });

  response.json(filtered);
});
module.exports = wordRouter;
