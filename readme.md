# rfc2bibtex

> Generate a BibTeX reference for a given RFC number.

## CLI

```
$ npm install --global rfc2bibtex
```

```
$ rfc2bibtex --help

  Usage
    $ rfc2bibtex [rfc number]

  Options
    --indentation, -i The characters used as indentation. Default is two spaces.

  Examples
    $ rfc2bibtex 2818 --indentation "  "
    @techreport{rfc2818,
      AUTHOR = "Rescorla, E.",
      TITLE = "{HTTP Over TLS}",
      TYPE="{RFC}",
      NUMBER=2818,
      YEAR = {2000},
      MONTH = {May},
      doi = {10.17487/RFC2818}
    }
  
    $ rfc2bibtex 2818 -i "\t"
    @techreport{rfc2818,
        AUTHOR = "Rescorla, E.",
        TITLE = "{HTTP Over TLS}",
        TYPE="{RFC}",
        NUMBER=2818,
        YEAR = {2000},
        MONTH = {May},
        doi = {10.17487/RFC2818}
    }
```

## Install

```
$ npm install rfc2bibtex
```

## Usage

```js
import rfc2bibtex from 'rfc2bibtex';

rfc2bibtex('2818', {indentation: '  '});
//=> @techreport{rfc2818,
//    AUTHOR = "Rescorla, E.",
//    TITLE = "{HTTP Over TLS}",
//    TYPE="{RFC}",
//    NUMBER=2818,
//    YEAR = {2000},
//    MONTH = {May},
//    doi = {10.17487/RFC2818}
//  }
```

## API

### rfc2bibtex(rfc, options?)

#### rfc

Type: `string`

Number of the RFC, e.g. 2818.

#### options

Type: `object`

##### indentation

Type: `string`
Default: `  `

The characters used as indentation. Default is two spaces.
