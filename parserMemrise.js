'use strict';

var casper = require("casper").create({
    /*verbose: true,
     logLevel: 'debug',*/
    pageSettings: {
        webSecurityEnabled: false
    }
});

var pathMp3 = './mp3/';
var pathImg = './img/';


// ARGS //
var eng = casper.cli.get('eng');
var pol = casper.cli.get('pol');
var image = casper.cli.get('image');
var sound = casper.cli.get('sound');
//var sentence = casper.cli.get('sentence');

var login = casper.cli.get('login');
var pass = casper.cli.get('password');
var titleCourse = casper.cli.get('title');

var args = {
    eng: eng,
    pol: pol.replace(/\+/g,' '),
    image: image,
    sound: sound,
    sentence: 'The baby was a boy. (Dziecko było chłopcem.)'
};

console.log('args= ' + JSON.stringify(args));

casper.start('https://www.memrise.com/login/', function () {
    casper.evaluate(function (username, password) {
        document.querySelector('input[name="username"]').value = username;
        document.querySelector('input[name="password"]').value = password;
        document.querySelector('input[type="submit"]').click();
    }, login, pass);
    this.capture(pathImg + 'logowanie.png');
});

casper.then(function () {
    this.wait(1000, function () {

        this.capture(pathImg + '2.png');
        console.log('2. ' + this.getCurrentUrl());

        //klikniecie w kurs
        this.clickLabel(titleCourse, 'a');
    });
});

casper.then(function () {
    this.wait(1000, function () {
        console.log('3. ' + this.getCurrentUrl());
        this.capture(pathImg + '3.png');

        // klikniecie w edytuj kurs
        this.clickLabel('Edytuj Kurs', 'span');

    });
});

//console.log(JSON.stringify(response.data));
casper.then(function () {

    this.wait(1000, function () {

        //this.eachThen(arr, function(response) {
        console.log('4. ' + this.getCurrentUrl());
        this.capture(pathImg + '4.png');

        // wpisanie polskiego i angielskiego slowa
        casper.evaluate(function (eng, pol) {
            document.querySelector('td[data-key="1"] > input[class="wide"]').value = eng;
            document.querySelector('td[data-key="2"] > input[class="wide"]').value = pol;
        }, args.eng, args.pol);

        // klikniecie plusika
        this.click('tr[data-role="add-form"] > td > i');
        console.log('4. Wcisnalem przycisk');

        this.wait(3000, function () {
            if (args.sound) {
                this.download(args.sound, pathMp3 + args.eng + '.mp3');
                this.wait(3000);
                this.page.uploadFile('tbody[class="things"] > tr:last-child > td[class="cell audio column"] > div > div[class="btn btn-mini files-add"] > input[type="file"]', pathMp3 + args.eng + '.mp3');
                console.log('4. uploadowalem muzyke w ' + pathMp3 + args.eng + '.mp3');
            }

            if (args.image) {
                console.log('4. args.image = ' + args.image);
                this.download(args.image, pathImg + args.eng + '.jpg');
                this.wait(3000);
                this.page.uploadFile('tbody[class="things"] > tr:last-child > td[class="cell image column"] > div > div[class="btn btn-mini files-add"] > input[type="file"]', pathImg + args.eng + '.jpg');
                console.log('4. uploadowalem image w ' + pathImg + args.eng + '.jpg');
            }

            // dodanie przykladowego zdania
            if(args.sentence){
                this.wait(3000);
                casper.evaluate(function (sen) {
                    document.querySelector('td[data-key="5"] > input[class="wide"]').value = sen;
                }, args.sentence );
            }

        });

        //});

    });
});


casper.then(function () {
    this.wait(1000, function () {
        console.log('6. ' + this.getCurrentUrl());
        this.capture(pathImg + '6.png');

        // klikniecie zapisz
        this.clickLabel('Zapisz i kontynuuj', 'b');
    });
});

casper.then(function () {
    this.wait(2000, function () {
        console.log('7. ' + this.getCurrentUrl());
        this.capture(pathImg + '7.png');
        console.log('koniec');

    });
});

casper.run(function () {
    casper.echo('koniec');
    this.exit();
});
