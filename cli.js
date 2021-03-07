#!/usr/bin/env node
'use strict';
import meow from 'meow';
import rfc2bibtex from './index.js';

const cli = meow(`
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
	  
	  $ rfc2bibtex 2818 -i "\\t"
	  @techreport{rfc2818,
      \tAUTHOR = "Rescorla, E.",
	  \tTITLE = "{HTTP Over TLS}",
	  \tTYPE="{RFC}",
	  \tNUMBER=2818,
	  \tYEAR = {2000},
	  \tMONTH = {May},
	  \tdoi = {10.17487/RFC2818}
	  }
`, {
	flags: {
		indentation: {
			type: 'string',
			alias: 'i',
			default: '  '
		}
	}
});

async function output() {
	console.log(await rfc2bibtex(cli.input[0] || '2818', cli.flags.indentation));
}

output();
