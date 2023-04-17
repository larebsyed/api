// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require("axios");

export default async function handler(req, res) {
  console.log(req.query.question);
  const suggestions = await axios.get(
    `https://www.google.com/complete/search?client=firefox&q=${req.query.question}`
  );

  console.log(suggestions.data);

  const answers = await axios.get(
    `https://serpapi.com/search.json?engine=google&q=${req.query.question}&location=Pakistan&google_domain=google.com.pk&gl=pk&hl=en&nfpr=1&api_key=e6e7ace950e132ff8350a014cf431130133c21cb293f4a7c2369b00d885246c6`
  );
  console.log(answers.data);
  if (answers.data?.answer_box?.result)
    suggestions.data[1] = [
      `${req.query.question} = ${answers?.data?.answer_box?.result}`,
      ...suggestions.data[1],
    ];
  res.status(200).json(suggestions.data);
}
