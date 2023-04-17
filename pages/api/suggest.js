// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export const config = {
  runtime: "edge",
};

const plugins = ["currency", "calculate"];

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const question = searchParams.get("question");
  const suggestResponse = await fetch(
    `https://www.google.com/complete/search?client=firefox&q=${question}`
  );
  const suggestions = await suggestResponse.json();

  plugins.forEach(async (plugin) => {
    const answerResponse = await fetch(
      `${process.env.ANSWER_URI}/api/${plugin}?question=${question}`
    );
    const answer = await answerResponse.text();
    if (answer) {
      suggestions[1] = [`${question} = ${answer}`, ...suggestions[1]];
    }
  });

  return new Response(JSON.stringify(suggestions), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
