// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export const config = {
  runtime: "edge",
};

const plugins = ["currency", "calculate"];

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    const question = searchParams.get("question");
    const suggestResponse = await fetch(
      `https://www.google.com/complete/search?client=firefox&q=${question}`
    );
    const suggestions = await suggestResponse.json();

    for (const plugin of plugins) {
      const answerResponse = await fetch(
        `${process.env.ANSWER_URI}/api/${plugin}?question=${question}`
      );
      const answer = await answerResponse.text();
      console.log(" => ", answer);

      if (answer) {
        suggestions[1] = [`${question} = ${answer}`, ...suggestions[1]];
      }
    }

    console.log(" => ", suggestions);

    return new Response(JSON.stringify(suggestions), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (e) {
    console.log(e);
  }
}
