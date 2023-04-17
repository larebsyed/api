// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require("axios");

export default async function handler(req, res) {
  try {
    const question = req.query.question?.toLowerCase() || "";
    if (!question) {
      res.status(200).send("");
    }

    const calculationResult = eval(question);
    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
    res.status(200).send(calculationResult);
  } catch (e) {
    console.log(e);
    res.status(200).send("");
  }
}
