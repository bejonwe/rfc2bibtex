import test from 'ava';
import rfc2bibtex from './index.js';

test('Exceptions', async t => {
	await t.throwsAsync(async () => {
		await rfc2bibtex(4634);
	}, {
		instanceOf: TypeError,
		message: 'Expected a string, got number'
	});

	await t.throwsAsync(async () => {
		await rfc2bibtex('NOTARFCNUMBER');
	}, {
		instanceOf: EvalError,
		message: 'Could not get any information. Is NOTARFCNUMBER a valid RFC number?'
	});
});

test('Output', async t => {
	t.is(await rfc2bibtex('4634'), `@techreport{rfc4634,
  AUTHOR = {Eastlake 3rd, D. and Hansen, T.},
  TITLE = {US Secure Hash Algorithms (SHA and HMAC-SHA)},
  TYPE= {RFC},
  NUMBER= 4634,
  YEAR = {2006},
  MONTH = {July},
  doi = {10.17487/RFC4634}
}`);

	t.is(await rfc2bibtex('4634', '\t'), `@techreport{rfc4634,
\tAUTHOR = {Eastlake 3rd, D. and Hansen, T.},
\tTITLE = {US Secure Hash Algorithms (SHA and HMAC-SHA)},
\tTYPE= {RFC},
\tNUMBER= 4634,
\tYEAR = {2006},
\tMONTH = {July},
\tdoi = {10.17487/RFC4634}
}`);
});

