# rdf-transform-cli.js
Template repo for my Typescript projects
[![GitHub license](https://img.shields.io/github/license/jeswr/rdf-transform-cli.js.svg)](https://github.com/jeswr/rdf-transform-cli.js/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/rdf-transform-cli.svg)](https://www.npmjs.com/package/rdf-transform-cli)
[![build](https://img.shields.io/github/actions/workflow/status/jeswr/rdf-transform-cli.js/nodejs.yml?branch=main)](https://github.com/jeswr/rdf-transform-cli.js/tree/main/)
[![Dependabot](https://badgen.net/badge/Dependabot/enabled/green?icon=dependabot)](https://dependabot.com/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)


## Command Line Usage

You can transform RDF files directly from the command line:

```bash
# Transform from Turtle to JSON-LD
rdf-transform-cli input.ttl output.jsonld

# Specify input and output formats explicitly
rdf-transform-cli -f ttl -t jsonld input.ttl output.jsonld

# Force transformation even if formats are compatible
rdf-transform-cli --force input.ttl output.ttl

# Set a base IRI for parsing
rdf-transform-cli --base-iri http://example.org/ input.ttl output.jsonld
```

## License
©2025–present
[Jesse Wright](https://github.com/jeswr),
[MIT License](https://github.com/jeswr/rdf-transform-cli.js/blob/master/LICENSE).
