'use strict';

var casper = require("casper").create({
    /*verbose: true,
     logLevel: 'debug',*/
    pageSettings: {
        webSecurityEnabled: false
    }
});
var x = require('casper').selectXPath;

var pathMp3 = './mp3/';
var pathImg = './img/';


var login = casper.cli.get('login');
var pass = casper.cli.get('password');
var titleCourse = casper.cli.get('title');


var startUrl = 'https://www.memrise.com/login/';
var result;
casper.start(startUrl, function () {
    casper.evaluate(function (username, password) {
        document.querySelector('input[name="username"]').value = username;
        document.querySelector('input[name="password"]').value = password;
        document.querySelector('input[type="submit"]').click();
    }, login, pass);
    this.capture(pathImg + 'logowanie.png');
});


casper.then(function () {
    this.wait(1000, function () {
        if (startUrl !== this.getCurrentUrl()) {
            this.capture(pathImg + 'rozny.png');

        } else {
            this.capture(pathImg + 'takisam.png');
            result = 'Ups, niewłaściwe hasło. Albo login. A może adres e-mail. Spróbujmy jeszcze raz i uważaj na Caps Lock!';
            this.echo(result);
            this.exit();
        }
    });
});
// tworzy nowy kurs
casper.then(function () {
    this.wait(1000, function () {
        if (!casper.exists(x('//a[text()="'+ titleCourse +'"]'))) {
            casper.thenOpen('http://www.memrise.com/course/create/',function(){
                casper.evaluate(function (name) {
                    // wypełnia dane o kursie
                    document.querySelector('input[name="name"]').value = name;
                    $('select[name="target"]').val('6').change();
                    $('select[name="source"]').val('14').change();
                    document.querySelector('input[name="tags"]').value = "tłumacz naukowy";
                    document.querySelector('textarea[name="description"]').value = "tłumacz naukowy";
                    document.querySelector('input[name="short_description"]').value = "tłumacz naukowy";
                    document.querySelector('input[type="submit"]').click();
                }, titleCourse);

                this.capture(pathImg + 'create.png');
            });

            // dodaje kolumne image
            this.wait(2000, function () {

                // klikniecie dodaj kolumne
                this.click('a[data-role="pool-column-add"] > i');

                this.wait(2000, function () {
                    casper.evaluate(function (name) {
                        // wypełnia dane o nowej kolumnie image
                        document.querySelector('input[name="name"]').value = name;
                        document.querySelector('input[name=type][value=image]').setAttribute('checked', true);
                        document.querySelector('a[tabindex="4"]').click();
                    }, 'image');
                });
            });

            // dodaje kolumne sentence
            this.wait(2000, function () {
                // klikniecie dodaj kolumne
                this.click('a[data-role="pool-column-add"] > i');

                this.wait(2000, function () {
                    casper.evaluate(function (name) {
                        // wypełnia dane o nowej kolumnie image
                        document.querySelector('input[name="name"]').value = name;
                        document.querySelector('a[tabindex="4"]').click();
                    }, 'sentence');
                });
            });

            // konfiguracja kolumny sentence
            this.wait(2000, function () {
                this.capture(pathImg + 'konfsenc.png');

                // klikniecie w konfiguracje sentence
                this.click(x('//span[text()="sentence"]'));

                // klikniecice  Zawsze Pokazuj
                this.wait(2000, function () {
                    this.click('#column-editor-always-show');
                    this.capture(pathImg + 'konfsenc1.png');
                });

                this.wait(2000, function () {

                    // przejscie do zakladki Testowanie
                    this.click(x('//a[text()="Testowanie"]'));
                    this.wait(2000);

                    // odznaczenie  Wpisywanie Odpowiedzi Włączone
                    this.click('#column-editor-typing-enabled');

                    // odznaczenie Rozsypanki Włączone
                    this.click('#column-editor-tapping-enabled');

                    // klikniecie przycisku zapisz
                    this.click(x('//a[text()="Zapisz"]'));
                });
            });

        }
    });
});




casper.run(function () {
    //this.echo(result);
    this.exit();
});

