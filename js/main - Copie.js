var valeur = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
var couleur = ['\u2660', '\u2663', '\u2665', '\u2666'];
var deck = [];
var newDeck = [];
//+-------------
function init(){
	newDeck = [];

	var md = $('#mainDiv');

	for (n = 0; n < valeur.length; n++){
		for (i = 0; i < couleur.length; i++){
			newDeck.push(valeur[n] + couleur[i]);
		}
	}

	if (deck.length == 0){
		deck = newDeck;
	}

	md.html(md.html() + '<div>Nouveau Paquet ---> ' + deck + '</div>');

	brasse();
}
//+-------------
function brasse(){
	var md = $("#mainDiv");

	var orig = newDeck;
	deck = [];

	while (orig.length > 0) {
		var aleaIndex = Math.floor(Math.random() * (orig.length));

		console.log('length: ' + orig.length + ', aleaIndex: ' + aleaIndex, '   extrait: ' + orig[aleaIndex]);
		deck.push(orig.splice(aleaIndex, 1));
	}

	md.html(md.html() + '<div>Brasser --->          ' + deck + '</div>');
}
//+-------------
function carte(array){
	array.push(deck.splice(0,1));
}
//+-------------
function texas(){
	main1 = [];
	main2 = [];
	main3 = [];
	main4 = [];
	main5 = [];
	burn = [];
	cartesCommunes = [];

	//distribution des mains
	for (i = 0; i < 2; i++){
		carte(main1);
		carte(main2);
		carte(main3);
		carte(main4);
		carte(main5);
	}
	//Burn #1
	carte(burn);
	//Flop
	for (i = 0; i < 3; i++){
		carte(cartesCommunes);
	}
	//Burn #2
	carte(burn);
	//Turn
	carte(cartesCommunes);
	//Burn #3
	carte(burn);
	//River
	carte(cartesCommunes);
	$('#main1').html('main1: ' + main1);
	$('#main2').html('main2: ' + main2);
	$('#main3').html('main3: ' + main3);
	$('#main4').html('main4: ' + main4);
	$('#main5').html('main5: ' + main5);
	$('#burn').html('burn: ' + burn);
	$('#cartesCommunes').html('cartesCommunes: ' + cartesCommunes);
}
//+-------------
$(document).ready(function() {
	init();
	texas();
});