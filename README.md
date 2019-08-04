# RIS Mappings

Contains derived CSL↔RIS mappings data.

  - `specs/new/props`: CSV sheets with RIS property lists for different types, from the [RIS Format Specifications](https://web.archive.org/web/20120526103719/http://refman.com/support/risformat_intro.asp) zip file
  - `summarize_props.js`: create CSV sheets summary
  - `specs/new/prop_summary.json`\*: summary of the CSV sheets
  - `specs/new/prop_mappings.js`: mappings between RIS property descriptions and CSL properties (with tags for deduplication)
  - `analyze_mappings.js`: prints duplication data on `prop_mappings.js`
  - `match.js`: code to match RIS tags to CSL properties, based on `prop_summary.json` and `prop_mappings.js`
  - `specs/new/index.json`\*: input object for the Citation.js Translator
  - `specs/mixed/additional.json`: mappings to add to the new mappings to create a more complete mapping
  - `generate_additions.js`: format the additions mentioned above based on the existing mappings
  - `specs/mixed/index.json`\*: additional mappings that do not interfere with existing mappings

> \* Generated file

  - `specs/old.js`: hand-crafted input object for the Citation.js Translator supporting the old spec
  - `specs/types.json`: bidirectional type map for both specs
