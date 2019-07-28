# RIS Mappings

Contains derived CSL↔RIS mappings data.

  - `mappings/`: CSV sheets with RIS property lists for different types, from the [RIS Format Specifications](https://web.archive.org/web/20120526103719/http://refman.com/support/risformat_intro.asp) zip file
  - `summarize_mapppings.js`: create CSV sheets summary
  - `mappings_summary.json`: summary of the CSV sheets
  - `props.js`: mappings between RIS property descriptions and CSL properties (with tags for deduplication)
  - `analyze_props.js`: prints duplication data on `props.js`
  - `match.js`: code to match RIS tags to CSL properties, based on `mappings_summary.json` and `props.js`
  - `mappings.json`: input object for the Citation.js Translator
