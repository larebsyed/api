// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require("axios");

export default async function handler(req, res) {
  try {
    const question = req.query.question?.toLowerCase() || "";
    console.log(question);
    if (!question) {
      res.status(200).send("");
    }

    const currencyPath = question
      .replace(/to/g, "/")
      .replace(/\s/g, "")
      .replace(/\d*/, "");
    console.log(currencyPath);

    const currencies = currencyPath.match(/^(\w{3})\/(\w{3})$/);
    console.log(currencies);
    if (!currencies) {
      res.status(200).send("");
      return;
    }
    const answers = await axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currencies[0]}.json`
    );

    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
    res.status(200).send(answers.data?.[currencies[2]]);
  } catch (e) {
    console.log(e);
    res.status(200).send("");
  }
}
