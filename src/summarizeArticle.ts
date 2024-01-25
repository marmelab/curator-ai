import { getCompletion } from './getCompletion';
import type { Summary } from './types';

interface SummarizeArticleOptions {
    text: string;
    link: string;
    interests: string[];
}

export const summarizeArticle = async ({
    text,
    link,
    interests = [],
}: SummarizeArticleOptions): Promise<Summary | undefined> => {
    const interestsTip = interests.length
        ? `The more the article talks about ${interests.join(
              ' or '
          )}, the more it is relevant.`
        : '';
    const prompt = `
You will be provided with a technical article, and your task is to summarize the article as follows:

- summarize the main takeaways knowing I'm a developer. The summary should start with the most important information, not with an introduction like "The article discusses...".
- rate it by relevancy from 1 to 10. ${interestsTip}
- Shape your answer in JSON format, not in markdown or HTML. Do not include a JSON header. Include the following fields:
  - title: the article title
  - author: the article's author
  - summary: the summary of the article.
  - relevancy_score: the relevancy score

The summary should be at most 3 sentences long.
`;

    const completion = await getCompletion({ messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: text },
    ]});
    if (!completion.message.content) return;
    try {
        return { ...JSON.parse(completion.message.content), link };
    } catch (e) {
        console.error(e);
        return;
    }
};
