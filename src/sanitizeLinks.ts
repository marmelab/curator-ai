import { getCompletion } from './getCompletion';

export interface SanitizeLinksOptions {
    links: string[];
    maxContentSize?: number;
}

/**
 * Remove navigation and social media links from a list of links with OpenAI's GPT-3 engine
 *
 * @return  Promise<string[] | undefined> The sanitized list of links
 */
const sanitizeLinks = async ({
    links,
    maxContentSize = 12000,
}: SanitizeLinksOptions): Promise<string[] | undefined> => {
    const prompt = `
  You will be provided with the HTML code of a list of links found in a web page.
  Extract the external links from the page.
  Do not include the navigation links (e.g. About, Contact, etc.) nor the links to the social media profiles.
  Only the links in the content section should be included.
  Shape your answer in JSON format, not in markdown or HTML. Do not include a JSON header.
  
  Example output:
  [
      "https://www.example1.com/foo/bar",
      "https://linkedin.com/in/example2"
  ]
  `;
    const content = links.join('\n').substring(0, maxContentSize);

    const completion = await getCompletion({
        messages: [
            { role: 'system', content: prompt },
            { role: 'user', content: content },
        ],
        // @ts-ignore
        response_format: { type: 'json_object' },
    });
    if (!completion.message.content) return;

    try {
        return JSON.parse(completion.message.content);
    } catch (e) {
        console.error(e);
        return;
    }
};
