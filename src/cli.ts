#!/usr/bin/env node
import { program } from 'commander';
import fs from 'node:fs';
import cliProgress from 'cli-progress';

import { getLinks } from './getLinks';
import { curate } from './curate';
import { consoleFormat } from './consoleFormat';

const helpText = `Examples:
  $ curate -a https://news.ycombinator.com/ -i science space research -m 3
`;
program
    .name('curate')
    .description('Read, select and summarize a list of articles')
    .option('-u, --urls [urls...]', 'Wep pages to curate')
    .option(
        '-uf, --url-file <filename>',
        'Text file containing a list of URLs to curate, one per line'
    )
    .option('-a, --aggregators [urls...]', 'Aggregator web pages to curate')
    .option(
        '-af, --aggregator-file <filename>',
        'Text file containing a list of aggregator URLs to curate, one per line'
    )
    .option('-i, --interests [interests...]', 'List of interests')
    .option('-m, --max <number>', 'Max number of articles to return', '5')
    .addHelpText('after', helpText)
    .showHelpAfterError()
    .action(async options => {
        let urls: string[] = options.urls || [];
        let aggregatorUrls: string[] = options.aggregators || [];
        if (options.aggregatorFile) {
            const aggregatorFile = fs.readFileSync(
                options.aggregatorFile,
                'utf8'
            );
            aggregatorUrls = [...aggregatorUrls, ...aggregatorFile.split('\n')];
        }
        if (!urls.length && !aggregatorUrls.length) {
            program.help();
        }

        // get links from curators
        if (aggregatorUrls.length) {
            const progressBar = new cliProgress.SingleBar(
                {},
                cliProgress.Presets.shades_classic
            );
            progressBar.start(aggregatorUrls.length, 0);
            for (let i = 0; i < aggregatorUrls.length; i++) {
                const newUrls = await getLinks({
                    url: aggregatorUrls[i],
                });
                urls = [...urls, ...newUrls];
                progressBar.update(i + 1);
            }
            progressBar.stop();
        }
        if (options.urlFile) {
            const linkFile = fs.readFileSync(options.urlFile, 'utf8');
            urls = [...urls, ...linkFile.split('\n')];
        }

        // deduplicate urls
        urls = [...new Set(urls)];

        // curate
        const progressBar = new cliProgress.SingleBar(
            {},
            cliProgress.Presets.shades_classic
        );
        progressBar.start(urls.length, 0);
        const summaries = await curate({
            links: urls,
            interests: options.interests,
            max: options.max,
            onProgress: progress => progressBar.update(progress),
        });
        progressBar.stop();

        // print summaries
        console.log();
        console.log(consoleFormat(summaries));
    });

program.parse();
