const DESC_TO_CSL = {
  AB: {
    Abstract: 'abstract',
    Synopsis: 'abstract',
  },

  AD: {
    'Author Address': false,
    'Editor Address': false,
    'Inventor Address': false,
  },

  AN: {
    'Accession Number': false,
  },

  AU: {
    Author: 'author',
    Artist: 'author',
    'Created By': 'author',
    Attribution: 'author',
    Programmer: 'author',
    Investigators: 'author',
    Editor: 'editor',
    Director: 'director',
    Cartographer: 'author',
    Composer: 'composer',
    Reporter: 'reporter',
    Inventor: 'author',
    Institution: 'author',
  },

  CA: {
    Caption: false,
  },

  CY: {
    City: 'publisher-place',
    'Conference Location': 'event-place',
    'Place Published': 'publisher-place',
    Country: false, // TODO jurisdiction
    'Activity Location': false, // TODO jurisdiction?
  },

  DA: {
    'Date Accessed': 'accessed',
    Date: 'issued',
    'Last Update Date': 'issued',
    'Date Decided': 'issued',
    'Date of Collection': 'issued',
    'Date Released': 'issued',
    'Deadline': 'issued',
    'Date of Code Edition': 'issued',
    'Date Enacted': 'issued',
  },

  DB: {
    'Name of Database': 'source',
  },

  DO: {
    DOI: 'DOI',
  },

  DP: {
    'Database Provider': false,
  },

  ET: {
    'Date Published': 'issued',
    Edition: 'edition',
    Session: false, // session -> chapter-number in Zotero
    'Action of Higher Court': false,
    Version: 'version',
    Requirement: false,
    'Epub Date': false,
    'Description of Material': 'medium',
    'International Patent Classification': false,
    Description: false,
  },

  J2: {
    'Alternate Title': false,
    'Abbreviated Publication': 'container-title-short',
    Abbreviation: 'container-title-short',
    'Alternate Journal': 'container-title-short',
    'Alternate Magazine': 'container-title-short',
  },

  KW: {
    Keywords: 'keyword',
  },

  L1: {
    'File Attachments': false,
    Figure: false
  },

  L4: {
    Figure: false,
    URL: 'URL',
    'File Attachments': false
  },

  LA: {
    Language: 'language',
  },

  LB: {
    Label: 'citation-label',
  },

  M1: {
    'Publication Number': 'number',
    'Text Number': 'number',
    Size: 'dimensions',
    Number: 'number',
    'Bill Number': 'number',
    'Series Volume': 'collection-number',
    Computer: false, // system -> medium in Zotero
    Issue: 'issue',
    Chapter: 'chapter-number',
    Status: 'status',
    'Document Number': 'number',
    'Start Page': 'page-first',
    'Issue Number': 'issue',
    'Folio Number': 'number',
    'Number of Screens': false,
    'Application Number': 'number',
    'Public Law Number': 'number',
    'Access Date': 'accessed',
  },

  M3: {
    'Type of Work': 'genre',
    Type: 'genre',
    'Type of Medium': 'medium',
    'Citation of Reversal': false,
    'Type of Image': 'genre',
    Medium: 'medium',
    'Funding Type': 'genre',
    'Type of Article': 'genre',
    'Form of Item': 'medium',
    'Patent Type': 'genre',
    'Thesis Type': 'genre',
  },

  N1: {
    Notes: 'note',
  },

  OP: {
    'Original Publication': 'original-title',
    Contents: false,
    History: 'references',
    Content: false,
    'Version History': false,
    'Original Grant Number': false,
    'Priority Numbers': false,
  },

  PB: {
    Publisher: 'publisher',
    Court: 'authority',
    Distributor: 'publisher',
    'Sponsoring Agency': 'publisher',
    'Library/Archive': 'archive',
    Assignee: false,
    Institution: 'publisher',
    Source: 'publisher',
    University: 'publisher',
  },

  PY: {
    Year: 'issued',
    'Year Decided': 'issued',
    'Year of Conference': 'event-date',
    'Year Released': 'issued'
  },

  RN: {
    'Research Notes': 'note',
  },

  SE: {
    Screens: false,
    'Code Section': 'section',
    'Message Number': 'number',
    Chapter: 'chapter-number',
    Pages: 'page',
    'Filed Date': 'submitted',
    'Number of Pages': 'number-of-pages',
    'Original Release Date': 'original-date',
    Version: 'version',
    'E-Pub Date': 'issued',
    Section: 'section',
    'Duration of Grant': false,
    'Section Number': 'locator',
    'Start Page': 'page-first',
    'International Patent Number': 'number',
  },

  SN: {
    'ISSN/ISBN': ['ISSN', 'ISBN'],
    ISBN: 'ISBN',
    ISSN: 'ISSN',
    'ISBN/ISSN': ['ISSN', 'ISBN'],
    'Report Number': 'number',
    'Document Number': 'number',
    'Patent Number': 'number',
  },

  SP: {
    Pages: 'page',
    Description: false,
    'Code Pages': 'page',
    'Number of Pages': 'number-of-pages',
    'First Page': 'page-first',
    'Running Time': 'dimensions',
  },

  ST: {
    'Short Title': 'title-short',
    'Abbreviated Case Name': 'title-short',
  },

  T2: {
    'Periodical': 'collection-title',
    'Publication Title': 'container-title',
    Code: 'container-title',
    'Title of WebLog': 'container-title',
    'Book Title': 'container-title',
    'Series Title': 'collection-title',
    'Image Source Program': false,
    'Conference Name': 'event',
    'Dictionary Title': 'container-title',
    'Secondary Title': 'container-title',
    'Periodical Title': 'container-title',
    'Encyclopedia Title': 'container-title',
    Committee: 'committee', // CSL-M
    Journal: 'container-title',
    'Title Number': 'locator',
    Magazine: 'container-title',
    'Collection Title': 'collection-title',
    'Album Title': 'container-title',
    Newspaper: 'container-title',
    'Published Source': 'container-title',
    'Section Title': 'section',
    'Academic Department': 'container-title',
  },

  TA: {
    'Translated Author': 'translated_author', // switch Author with original-author
  },

  TI: {
    Title: 'title',
    'Title of Entry': 'title',
    'Case Name': 'title',
    'Title of Grant': 'title',
    'Name of Act': 'title',
    'Title of Work': 'title',
  },

  TT: {
    'Translated Title': 'translated_title', // switch Title with original-title
  },

  UR: {
    URL: 'URL',
  },

  VL: {
    Volume: 'volume',
    'Code Volume': 'volume',
    'Access Year': 'accessed',
    'Reporter Volume': 'volume',
    'Image Size': 'dimensions',
    Edition: 'edition',
    'Amount Requested': false,
    'Rule Number': 'volume',
    'Volume/Storage Container': 'volume',
    Number: 'number',
    'Patent Version Number': 'version',
    'Code Number': false,
    Degree: false,
  },

  A2: {
    Editor: 'editor',
    Performers: false,
    Sponsor: false,
    'Series Editor': 'collection-editor',
    Reporter: 'reporter',
    Institution: false,
    'Name of File': false,
    Producer: false,
    'Series Director': false,
    'Secondary Author': false,
    Department: false,
    'Issuing Organization': false,
    Recipient: 'recipient',
  },

  A4: {
    Translator: 'translator',
    Counsel: false,
    Sponsor: false,
    'Funding Agency': false,
    Performers: false,
    'Subsidiary Author': false,
    Producer: false,
    'Department/Division': false,
    'Volume Editor': false,
  },

  CN: {
    'Call Number': 'call-number',
  },

  NV: {
    'Number of Volumes': 'number-of-volumes',
    'Extent of Work': false,
    'Reporter Abbreviation': false,
    'Catalog Number': 'number',
    'Study Number': 'number',
    'Document Number': 'number',
    Version: 'version',
    'Amount Received': 'dimensions',
    'Session Number': false,
    Frequency: false,
    'Manuscript Number': 'number',
    'US Patent Classification': false,
    'Communication Number': 'number',
    'Series Volume': 'collection-number',
    'Statute Number': 'number',
  },

  RI: {
    'Reviewed Item': 'reviewed-title',
    'Geographic Coverage': false,
    'Article Number': 'locator',
  },

  RP: {
    'Reprint Edition': false,
    'Review Date': false,
    Notes: 'note',
  },

  T3: {
    'Volume Title': 'collection-title',
    'Series Title': 'collection-title',
    'Legislative Body': false,
    Institution: false,
    Decision: false,
    'Website Title': 'collection-title',
    'Tertiary Title': 'collection-title',
    'Supplement No.': 'number',
    'International Title': false,
    'Paper Number': 'number',
    'International Source': false,
    Department: false,
  },

  Y2: {
    'Access Date': 'accessed',
    'Date Enacted': 'issued',
  },

  C3: {
    'Size/Length': 'dimensions',
    'Title Prefix': false,
    'Proceedings Title': 'container-title',
    'Data Type': false,
    PMCID: 'PMCID',
    'Custom 3': false,
    'Congress Session': false,
    'Contact Phone': false,
    Size: 'dimensions',
    'Music Parts': false,
    'Designated States': 'jurisdiction',
  },

  A3: {
    'Series Editor': 'collection-editor',
    Illustrator: 'illustrator',
    Editor: 'editor',
    'Higher Court': false,
    Producer: false,
    'Tertiary Author': false,
    'International Author': false,
    Publisher: 'publisher',
    Advisor: false,
  },

  C1: {
    Cast: false,
    'Author Affiliation': false,
    Section: 'section',
    'Place Published': 'publisher-place',
    'Time Period': false,
    Term: false,
    'Year Cited': false,
    'Custom 1': false,
    'Government Body': false,
    'Contact Name': false,
    'Legal Note': false,
    'Scale': 'scale',
    'Format of Music': false,
    Column: false,
    'Sender\'s E-Mail': false,
  },

  C2: {
    Credits: false,
    'Year Published': 'issued',
    'Unit of Observation': false,
    'Date Cited': false,
    'Custom 2': false,
    'Congress Number': false,
    'Contact Address': false,
    PMCID: 'PMCID',
    Area: false,
    'Form of Composition': false,
    Issue: 'issue',
    'Issue Date': 'issued',
    'Recieipients E-Mail': false,
    'Report Number': 'number',
  },

  C5: {
    Format: false,
    'Packaging Method': false,
    'Issue Title': false,
    'Last Update Date': 'issued',
    'Custom 5': false,
    'Funding Number': 'number',
    'Accompanying Matter': false,
    'Format/Length': 'dimensions',
    References: 'references',
    Publisher: 'publisher',
  },

  C4: {
    Reviewer: 'reviewer', // switch Author with reviewed-author
    'Dataset(s)': false,
    Genre: false, // not 'genre' :/
    'Custom 4': false,
    'Contact Fax': false,
    'Target Audience': false,
    'Attorney/Agent': false,
  },

  IS: {
    'Number of Volumes': 'number-of-volumes',
    Issue: 'issue',
  },

  SV: {
    'Series Volume': 'collection-number',
  },

  C6: {
    NIHMSID: false,
    'Custom 6': false,
    'CFDA Number': false, // classification
    'Legal Status': 'status',
    Issue: 'issue',
    Volume: 'volume',
  },

  C7: {
    'Article Number': 'number',
    PMCID: 'PMCID',
    'Custom 7': false,
  },

  CT: {
    Caption: false,
  },

  C8: {
    'Custom 8': false,
  },

  M2: {
    'Start Page': 'page-first',
    'Number of Pages': 'number-of-pages'
  }
}

module.exports = DESC_TO_CSL
