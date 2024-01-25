import chalk from 'chalk';

import type { Summary } from './types';

export const consoleFormat = (summaries: Summary[]) => {
    const formatted = summaries
        .map(
            summary =>
                `${chalk.bold(summary.title)}
${chalk.grey(`by ${summary.author}`)}
${summary.summary}
${chalk.underline(chalk.blue(summary.link))}

`
        )
        .join('');
    return formatted;
};
