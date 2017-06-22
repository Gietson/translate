var request = require('request');
var cheerio = require('cheerio');
var async = require('async');

//var url = 'https://www.diki.pl/slownik-angielskiego?q=';

/*
 startProccess(url, function (err, result) {
 console.log(JSON.stringify(result));
 });*/

exports.startProcess = function(url, callback) {
    async.waterfall([
        async.apply(getScrapedPage, 'https://www.diki.pl/slownik-angielskiego?q=' + url, null),
        checkSuggestions,
        getScrapedPage,
        scrapDiki
    ], function (err, result) {
        if (err)return (err, result);
        callback(null, result);
    });
}


function getScrapedPage(url, scrapedPage, callback) {
    if (!scrapedPage) {
        console.log('rozpoczynam skrapowanie url = ' + url);
        request(url, function (error, response, html) {
            if (error)callback(error, null);

            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html, {
                    normalizeWhitespace: true,
                    xmlMode: false,
                    decodeEntities: true
                });
            }
            callback(null, $);
        });
    }
    else {
        console.log('mam scrapedPage')
        callback(null, scrapedPage);
    }
}
function scrapDiki($, callback) {
    var data = [];
    $('div.dictionaryEntity > div.hws').parent().each(function () {
        var translate = $(this).children('.hws').children('h1');

        // pobiera angielskie tlumaczenie
        var title = translate.children('span.hw').text().trim();

        // pobiera nagranie
        var tmpMp3 = translate.children('span.recordingsAndTranscriptions').children('span').children().attr('data-audio-url');
        var mp3 = tmpMp3 ? 'https://www.diki.pl' + tmpMp3 : mp3;

        // pobiera znak fonetyczny
        var phonetic = translate.children('span.recordingsAndTranscriptions').children('span.phoneticTranscription').children('a').children('img').attr('src');

        // pobiera obrazek
        var tmpImage = $(this).children('a').children('img.pict').attr('src');
        var image = tmpImage ? 'https://www.diki.pl' + tmpImage : image;

        // pobieranie czasu mowy
        var partOfSpeech = [];
        $(this).children('div.partOfSpeechSectionHeader').children('span.partOfSpeech').each(function () {
            var arrTranslate = [];

            // pobiera rzeczownik/czasownik/itp
            var name = $(this).text();

            // pobieranie polskich znaczeń
            $(this).parent().next('ol').children('li').each(function () {
                var arrExampleSentence = [];

                // pobieranie polskie tlumaczenie
                var title;
                $(this).find('span.hw').each(function () {
                    if (title) title = title + $(this).text() + ', ';
                    else title = $(this).text() + ', ';
                });

                // pobiera przykladowe zdania
                var english, polish, mp3, tmpMp3;
                $(this).find('div.exampleSentence').each(function () {

                    english = $($(this).contents().get(0)).text().trim();
                    polish = $(this).children('span.exampleSentenceTranslation').text().trim().replace(/^\(|\)$/g, '');

                    // pobiera nagranie
                    tmpMp3 = $(this).children('span.recordingsAndTranscriptions').children('span').children().attr('data-audio-url');
                    mp3 = tmpMp3 ? 'https://www.diki.pl' + tmpMp3 : mp3;

                    arrExampleSentence.push({
                        english: english,
                        polish: polish,
                        mp3: mp3
                    });
                });

                arrTranslate.push({
                    title: title.replace(new RegExp(', $'), ''), // usuwa na końcu kazdego rekordu ", "
                    exampleSentence: arrExampleSentence
                });
            });

            partOfSpeech.push({
                name: name,
                translate: arrTranslate
            });
        });

        data.push({
            title: title,
            mp3: mp3,
            phonetic: phonetic,
            image: image,
            partOfSpeech: partOfSpeech
        });
    });
    callback(null, data);
}

function checkSuggestions($, callback) {
    if ($(".suggestions").length) {
        var urlSuggestionWord = 'https://www.diki.pl' + $('.suggestions').children('a').attr('href');
        console.log('nowy link to: ' + urlSuggestionWord);
        callback(null, urlSuggestionWord, null);
    }
    else {
        console.log('dupa nic nie ma. .suggestions');
        callback(null, null, $);
    }

}