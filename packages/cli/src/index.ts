import { program } from 'commander';
import { sumUp } from '@ai-powered-reader/core';
program.requiredOption('-l, --links <strings...>', 'Artiles links');

program.parse();

const options = program.opts();
const links = options.links;

sumUp(links).then(res => console.log(res));
