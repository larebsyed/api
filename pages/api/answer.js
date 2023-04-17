// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require("axios");

export const config = {
  runtime: "edge",
};

export default async function handler(req, res) {
  const answers = await axios.get(
    `https://serpapi.com/search.json?engine=google&q=${req.query.question}&location=Pakistan&google_domain=google.com.pk&gl=pk&hl=en&nfpr=1&api_key=e6e7ace950e132ff8350a014cf431130133c21cb293f4a7c2369b00d885246c6`
  );

  return new Response(JSON.stringify(answers.data?.answer_box?.result), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "public, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
