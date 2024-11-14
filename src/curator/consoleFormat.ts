import chalk from 'chalk';

import type { Summary } from './types';

const formatSummary = (summary: Summary) => `
${chalk.bold(summary.title)}
${chalk.grey(`by ${summary.author}`)}
${summary.summary}
${chalk.underline(chalk.blue(summary.link))}
`.trim();

export const consoleFormat = (summaries: Summary[]) =>
    summaries.map(formatSummary).join("\n\n");
