import { program } from 'commander';
import fs from 'node:fs';
import { sumUp } from '.';

program
    .command('sumup-list')
    .description('Sum up a list of articles from the web with AI power')
    .argument('<links...>', 'List of article links')
    .option('-i', '--interests <interests...>', 'List of interests')
    .option('-m, --max <number>', 'Max number of articles to return', '5')
    .action((links, options) => {
        sumUp(links, options.interests, options.max).then(res =>
            console.log(res)
        );
    });

program
    .command('sumup-list-in-file')
    .description('Sum up a list of articles from the web with AI power')
    .argument(
        '<file>',
        'The file containing the list of article links to sum up'
    )
    .requiredOption('-i, --interests <string...>', 'List of interests')
    .option('-m, --max <number...>', 'Max number of articles to return', '5')
    .action((file, options) => {
        const links = fs.readFileSync(file, 'utf8');
        sumUp(JSON.parse(links), options.interests, options.max).then(res =>
            console.log(res)
        );
    });

program.parse();
