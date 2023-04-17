// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require("axios");

export default async function handler(req, res) {
  try {
    const question = req.query.question?.toLowerCase() || "";
    if (!question) {
      res.status(200).send("");
    }
    console.log(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${question
        .replace(/to/g, "/")
        .replace(/\s/g, "")
        .replace(/\d*/, "")}.json`
    );
    const answers = await axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${question
        .replace(/to/g, "/")
        .replace(/\s/g, "")
        .replace(/\d*/, "")}.json`
    );

    if (!answers.ok) {
      res.status(400).send("");
    }

    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
    res.status(200).send(answers.data?.pkr);
  } catch (e) {
    res.status(200).send("")
  }
}
