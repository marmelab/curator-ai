#!/usr/bin/env node
import { program } from 'commander';
import fs from 'node:fs';
import cliProgress from 'cli-progress';

import { extractLinks } from './extractLinks';
import { curate } from './curate';
import { consoleFormat } from './consoleFormat';
import { extractRssLink } from './extractRssLink';

const helpText = `Examples:
  $ curate -a https://news.ycombinator.com/ -i science space research -m 3
`;
program
    .name('curate')
    .description('Read, select and summarize a list of articles')
    .option('-u, --urls [urls...]', 'Wep pages to curate')
    .option(
        '-f, --url-file <filename>',
        'Text file containing a list of URLs to curate, one per line'
    )
    .option('-a, --aggregators [urls...]', 'Aggregator web pages to curate')
    .option(
        '-F, --aggregator-file <filename>',
        'Text file containing a list of aggregator URLs to curate, one per line'
    )
    .option('-r, --rss [urls...]', 'RSS feed to curate')
    .option('-i, --interests [interests...]', 'List of interests')
    .option('-m, --max <number>', 'Max number of articles to return', '5')
    .addHelpText('after', helpText)
    .showHelpAfterError()
    .action(async options => {
        // get links from urls
        let urls: string[] = options.urls || [];
        if (options.urlFile) {
            const linkFile = fs.readFileSync(options.urlFile, 'utf8');
            urls = [...urls, ...linkFile.split('\n')];
        }

        // get links from aggregators
        let aggregatorUrls: string[] = options.aggregators || [];
        if (options.aggregatorFile) {
            const aggregatorFile = fs.readFileSync(
                options.aggregatorFile,
                'utf8'
            );
            aggregatorUrls = [...aggregatorUrls, ...aggregatorFile.split('\n')];
        }

        if (options.rss) {
            const progressBar = new cliProgress.SingleBar(
                {},
                cliProgress.Presets.shades_classic
            );
            progressBar.start(options.rss.length, 0);
            for (let i = 0; i < options.rss.length; i++) {
                const feedUrls = await extractRssLink(options.rss[i]);
                urls = [...urls, ...feedUrls];
                progressBar.update(i + 1);
            }
            progressBar.stop();
        }

        if (aggregatorUrls.length) {
            const progressBar = new cliProgress.SingleBar(
                {},
                cliProgress.Presets.shades_classic
            );
            progressBar.start(aggregatorUrls.length, 0);
            for (let i = 0; i < aggregatorUrls.length; i++) {
                const newUrls = await extractLinks({
                    url: aggregatorUrls[i],
                });
                urls = [...urls, ...newUrls];
                progressBar.update(i + 1);
            }
            progressBar.stop();
        }

        // deduplicate urls
        urls = [...new Set(urls)];

        if (!urls.length) {
            program.help();
        }

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
        console.log(consoleFormat(summaries));
    });

program.parse();
