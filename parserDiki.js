'use strict';

var casper = require("casper").create(/*{
    verbose: true,
    logLevel: 'debug'
}*/);

var x = require('casper').selectXPath;

var pathMp3 = './mp3/';
var pathImg = './img/';

var english = casper.cli.get('eng');

var resEng, resPol, resSound, links, resImg, result, sentence;

casper.start('http://www.diki.pl').viewport(1600,1000);

// wpisanie słowa do formularza
casper.thenEvaluate(function(term) {
    document.querySelector('input[name="q"]').setAttribute('value', term);
    document.querySelector('button[type="submit"]').click();
}, english);

// sprawdzenie czy sugeruje jakies inne slowo
casper.then(function(){
	if(this.exists('div[class="suggestions"]')){
		this.click('div[class="suggestions"] > a');
	}
});
/*
casper.then(function() {
    this.wait(2000, function() {
		this.capture(pathImg + english + '.png');
		this.echo('ss. '+ this.getCurrentUrl(), "INFO");
    });
});
*/
casper.then(function() {
    this.wait(500, function() {

    	//pobranie słowa angielskiego
		resEng = casper.getElementInfo('div[class="hws"] > h1 > span[class="hw"]').text.trim();

		// pobranie dźwięku
		resSound = this.evaluate(function() {
	        return 'https://www.diki.pl' + __utils__.findOne('div[class="hws"] > h1 > span[class="recordingsAndTranscriptions"] > span > span').getAttribute('data-audio-url');
	    });



		// pobranie polskiego znaczenia
		resPol = this.evaluate(function() {
			var elements = __utils__.findAll('ol[class="foreignToNativeMeanings"] > li > span[class="hw"] > a[class="plainLink"]');
			// sprawdza czy pobrał tłumaczenie
			if(elements.length > 0){
				return elements.map(function(e) {
					return e.text.trim();
				});
			}
			else{
				// jeśli nie to sprawdza czy może są jakieś wulgarne tłumaczenia
				elements = __utils__.findAll('ol[class="foreignToNativeMeanings"] > li > span > span[class="hw"] > a[class="plainLink"]');
				return elements.map(function(e) {
					return e.text.trim();
				});
			}
	    });

		// pobranie obrazka
		resImg = this.evaluate(function() {
			return 'https://www.diki.pl' + __utils__.findOne('img[class="pict"]').getAttribute('src');
		});

		// pobierz przykladowe zdania z tlumaczeniami
		sentence = this.evaluate(function() {
			return __utils__.findOne('div[class="exampleSentence"]').innerText.trim();
		});

		// zostawienie tylko 3 pierwszych tlumaczeń

			if (resPol.constructor === Array) {
				resPol = eliminateDuplicates(resPol);
				resPol.splice(3, resPol.length);

				var stringResPol = resPol.join(', ');
				resPol = stringResPol.replace(/\s/g, "+");

			}

		/*result = {
			eng: resEng,
			pol: resPol,
			sound: resSound,
			img: resImg
		};*/
		var resSentence = sentence.split(' ').join('+');
		result = {
			searchEnglishWord: english,
			englishWord: resEng,
			polishWords: resPol,
			sound: resSound,
			image: resImg,
			sentence: resSentence
};

    });
});
casper.run(function(){
	this.echo(JSON.stringify(result));
	this.exit();
});


function eliminateDuplicates(arr) {
	var i,
			len=arr.length,
			out=[],
			obj={};

	for (i=0;i<len;i++) {
		obj[arr[i]]=0;
	}
	for (i in obj) {
		out.push(i);
	}
	return out;
}

