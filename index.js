import {XMLHttpRequest} from 'xmlhttprequest';
import {DOMParser} from 'xmldom';

async function rfc2bibtex(input, indentation = '  ') {
	if (typeof input !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof input}`);
	}

	const x = new XMLHttpRequest();
	const parser = new DOMParser();

	x.open('GET', 'https://www.rfc-editor.org/refs/bibxml/reference.RFC.' + input + '.xml', false);
	x.send(null);

	if (x.status !== 200) {
		throw new EvalError(`Could not get any information. Is ${input} a valid RFC number?`);
	}

	const doc = parser.parseFromString(x.responseText, 'text/xml');

	const title = doc.getElementsByTagName('title')[0].textContent;
	let authors = '';
	let rfc = '';
	let doi = '';
	let year = '';
	let month = '';

	const date = doc.getElementsByTagName('date');
	if (date.length > 0) {
		year = date[0].getAttribute('year');
		month = date[0].getAttribute('month');
	}

	const info = doc.getElementsByTagName('seriesInfo');
	for (let i = 0; i < info.length; i++) {
		switch (info[i].getAttribute('name')) {
			case 'RFC':
				rfc = info[i].getAttribute('value');
				break;

			case 'DOI':
				doi = info[i].getAttribute('value');
				break;

			default:
				break;
		}
	}

	const authorsXml = doc.getElementsByTagName('author');
	const authorsArray = new Array(authorsXml.length);
	for (let i = 0; i < authorsXml.length; i++) {
		authorsArray[i] = authorsXml[i].getAttribute('surname') + ', ' + authorsXml[i].getAttribute('initials');
	}

	authors = authorsArray.join(' and ');

	indentation = indentation.replace('\\t', '\t');

	return `@techreport{rfc${rfc},
${indentation}AUTHOR = {${authors}},
${indentation}TITLE = {${title}},
${indentation}TYPE= {RFC},
${indentation}NUMBER= ${rfc},
${indentation}YEAR = {${year}},
${indentation}MONTH = {${month}},
${indentation}INSTITUTION = "{RFC Editor}",
${indentation}doi = {${doi}}
}`;
}

export default rfc2bibtex;
