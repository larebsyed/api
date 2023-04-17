// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require(axios);

export default function handler(req, res) {
  const suggestions = axios.get(
    `https://www.google.com/complete/search?client=firefox&q=${req.query.question}`
  );
  const answers = axios.get(
    `https://serpapi.com/search.json?engine=google&q=${req.query.question}&location=Pakistan&google_domain=google.com.pk&gl=pk&hl=en&nfpr=1&api_key=e6e7ace950e132ff8350a014cf431130133c21cb293f4a7c2369b00d885246c6`
  );
  if (answers.data) suggestions.data[1].push(answers.data.result);
  res.status(200).json(suggestions.data);
}
