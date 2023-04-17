// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require("axios");

export default async function handler(req, res) {
  console.log(" => ", process.env.SERPAPI_KEY);

  const answers = await axios.get(
    `https://serpapi.com/search.json?engine=google&q=${req.query.question}&location=Pakistan&google_domain=google.com.pk&gl=pk&hl=en&nfpr=1&api_key=${process.env.SERPAPI_KEY}`
  );
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  res.status(200).send(answers.data?.answer_box?.result);
}
