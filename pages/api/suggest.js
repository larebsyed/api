// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require("axios");

export const config = {
  runtime: "edge",
};

export default async function handler(req, res) {
  console.log(req.query.question);
  const suggestions = await axios.get(
    `https://www.google.com/complete/search?client=firefox&q=${req.query.question}`
  );

  const answers  = await axios.get(
    `https://api-playground-pink.vercel.app/api/answer?question=${req.query.question}`
  );

  console.log(suggestions.data);

  if (answers.data)
    suggestions.data[1] = [
      `${req.query.question} = ${answers?.data}`,
      ...suggestions.data[1],
    ];

  return new Response(JSON.stringify(suggestions.data), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
