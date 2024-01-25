#!/usr/bin/env node
import { program } from 'commander';
import fs from 'node:fs';
import { curate } from './curate';
import { consoleFormat } from './consoleFormat';

program
    .name('curate')
    .description('Read, select and summarize a list of articles')
    .option('-l, --links [links...]', 'List of article links')
    .option(
        '-f, --file <filename>',
        'File containing an array of URLs to curate, one per line'
    )
    .option('-i, --interests [interests...]', 'List of interests')
    .option('-m, --max <number>', 'Max number of articles to return', '5')
    .showHelpAfterError()
    .action(async (options) => {
        let finalLinks: string[] = options.links || [];
        if (options.file) {
            const linkFile = fs.readFileSync(options.file, 'utf8');
            finalLinks = linkFile.split('\n');
        }
        if (!finalLinks.length) {
            program.help(); 
        }
        const summaries = await curate(finalLinks, options.interests, options.max)
        console.log(consoleFormat(summaries))
    });

program.parse();
