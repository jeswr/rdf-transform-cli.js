#!/usr/bin/env node

import { createReadStream, createWriteStream } from 'fs';
import { type TransformOptions, transform } from 'rdf-transform';
import { program } from 'commander';

program
  .name('rdf-transform')
  .description('Transform RDF files between different formats')
  .version(require('../package.json').version)
  .argument('<input>', 'Input file path')
  .argument('[output]', 'Output file path (if not specified, writes to stdout)')
  .option('-f, --from <format>', 'Input format (e.g., text/turtle, text/n3, application/ld+json)')
  .option('-t, --to <format>', 'Output format (e.g., text/turtle, text/n3, application/ld+json)')
  .option('--base-iri <iri>', 'Base IRI for parsing')
  .option('--force', 'Force transformation even if formats are compatible')
  .option('--pretty, -p', 'Pretty print the output', false)
  .action(async (input: string, output: string | undefined, options: any) => {
    try {
      const transformOptions: TransformOptions = {
        from: { path: input, contentType: options.from },
        to: { path: output || '', contentType: options.to },
        baseIRI: options.baseIri,
        forceTransform: options.force,
        pretty: options.pretty,
      };

      const inputStream = createReadStream(input);
      const outputStream = transform(inputStream, transformOptions);

      if (output) {
        // Write to file if output path is specified
        const writeStream = createWriteStream(output);
        outputStream.pipe(writeStream);
      } else {
        // Pipe to stdout if no output path is specified
        outputStream.pipe(process.stdout);
      }
    } catch (error) {
      console.error('Error:', error);
      process.exit(1);
    }
  });

program.parse();
