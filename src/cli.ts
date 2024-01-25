import { program } from 'commander';
import fs from 'node:fs';
import { curate } from './curate';
import { consoleFormat } from './consoleFormat';

program
    .command('curate')
    .description('Sum up a list of articles from the web with AI power')
    .argument('<links...>', 'List of article links')
    .option('-i', '--interests <interests...>', 'List of interests')
    .option('-m, --max <number>', 'Max number of articles to return', '5')
    .action(async (links, options) => {
        const summaries = await curate(links, options.interests, options.max)
        console.log(consoleFormat(summaries))
    });

program
    .command('curate-file')
    .description('Sum up a list of articles from the web with AI power')
    .argument(
        '<file>',
        'The file containing the list of article links to sum up'
    )
    .option('-i, --interests <string...>', 'List of interests')
    .option('-m, --max <number...>', 'Max number of articles to return', '5')
    .action(async (file, options) => {
        const linksJSON = fs.readFileSync(file, 'utf8');
        const links = JSON.parse(linksJSON)
        const summaries = await curate(links, options.interests, options.max)
        console.log(consoleFormat(summaries));
    });

program.parse();
