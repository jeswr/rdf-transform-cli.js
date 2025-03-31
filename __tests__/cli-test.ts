// Warning this file is entirely created by Claude AI

import { execSync } from 'child_process';
import {
  existsSync, mkdirSync, readFileSync, rmdirSync, unlinkSync,
  createReadStream,
} from 'fs';
import { isomorphic } from 'rdf-isomorphic';
import parser from 'rdf-parse';
import { Quad } from '@rdfjs/types';

describe('CLI', () => {
  it('should produce isomorphic RDF output', async () => {
    if (!existsSync('temp')) {
      mkdirSync('temp');
    }

    // Run the CLI command
    execSync('node ./dist/cli.js __tests__/ex.ttl temp/ex.jsonld');

    // Check that ex.jsonld exists
    const exJsonld = readFileSync('temp/ex.jsonld', 'utf-8');
    expect(exJsonld).toBeDefined();

    // Check that the output is valid JSON-LD
    const jsonld = JSON.parse(exJsonld);
    expect(jsonld).toBeDefined();
    expect(jsonld.length).toBeGreaterThan(0);

    // Check that the output is isomorphic to the expected output using rdf-parse
    const outputStream = createReadStream('temp/ex.jsonld');
    const expectedStream = createReadStream('__tests__/ex.jsonld');

    const outputQuads: Quad[] = [];
    const expectedQuads: Quad[] = [];

    const outputParser = parser.parse(outputStream, { contentType: 'application/ld+json' });
    const expectedParser = parser.parse(expectedStream, { contentType: 'application/ld+json' });

    for await (const quad of outputParser) {
      outputQuads.push(quad);
    }

    for await (const quad of expectedParser) {
      expectedQuads.push(quad);
    }

    expect(isomorphic(outputQuads, expectedQuads)).toBe(true);

    // Clean up
    unlinkSync('temp/ex.jsonld');
    rmdirSync('temp');
  });
});
