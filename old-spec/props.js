import CONVERTERS from '../converters'

export default [
  { source: 'TY', target: 'type', convert: CONVERTERS.TYPE },
  { source: 'ID', target: 'id', convert: CONVERTERS.ID },

  { source: ['T1', 'TI', 'CT'], target: 'title', convert: CONVERTERS.ANY },
  {
    source: 'BT',
    target: 'title',
    when: {
      source: {
        type: ['BOOK', 'UNPB'],
        T1: false,
        TI: false,
        CT: false
      },
      target: false
    }
  },
  { source: 'T2', target: 'container-title' },
  {
    source: 'BT',
    when: {
      source: {
        type: ['ABST', 'ADVS', 'ART', 'BILL', 'CASE', 'CHAP', 'COMP', 'CONF',
          'CTLG', 'DATA', 'ELEC', 'GEN', 'HEAR', 'ICOMM', 'INPR', 'JFULL', 'JOUR',
          'MAP', 'MGZN', 'MPCT', 'MUSIC', 'NEWS', 'PAMP', 'PAT', 'PCOMM', 'RPRT',
          'SER', 'SLIDE', 'SOUND', 'STAT', 'THES', 'UNBILL', 'VIDEO'],
        T2: false
      }
    }
  },
  { source: 'T3', target: 'collection-title' },

  { source: ['A1', 'AU'], target: 'author', convert: CONVERTERS.NAME },
  { source: ['A2', 'ED'], target: 'editor', convert: CONVERTERS.NAME },
  { source: 'A3', target: 'collection-editor', convert: CONVERTERS.NAME },

  { source: ['Y1', 'PY'], target: 'issued', convert: CONVERTERS.DATE },
  { source: 'Y2', target: 'accessed', convert: CONVERTERS.DATE },
  { source: ['N1', 'AB'], target: 'abstract', convert: CONVERTERS.ANY },
  { source: 'N2', target: 'abstract' },

  { source: 'KW', target: 'keyword', convert: CONVERTERS.KEYWORD },
  // RP - reprint edition

  { source: ['JF', 'JO'], target: 'containter-title', convert: CONVERTERS.ANY },
  { source: ['JA', 'J1', 'J2'], target: 'container-title-short', convert: CONVERTERS.ANY },

  { source: 'VL', target: 'volume' },
  { source: ['IS', 'CP'], target: 'issue', convert: CONVERTERS.ANY },
  { source: 'SP', target: 'page-first' },
  { source: ['SP', 'EP'], target: 'page', convert: CONVERTERS.PAGE },
  // CY - publication place (not publisher-place)
  { source: 'PB', target: 'publisher' },
  { source: 'SN', target: ['ISSN', 'ISBN'], convert: CONVERTERS.ISBN },

  // AV, M1-3, U1-6, L1-4
  { source: 'UR', target: 'URL' }
]
