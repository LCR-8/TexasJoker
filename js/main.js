var valeur = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
var couleur = ['\u2660', '\u2663', '\u2665', '\u2666'];
var deck = [];
var newDeck = [];
var gameState = 0;
//+-------------
function init(){
	newDeck = [];

	var md = $('#mainDiv');

	for (n = 0; n < valeur.length; n++){
		for (i = 0; i < couleur.length; i++){
			newDeck.push('<div class="card c' + valeur[n] + couleur[i] + '"></div>');
		}
	}

	if (deck.length == 0){
		deck = newDeck;
	}

	//md.html(md.html() + '<div>Nouveau Paquet ---> ' + deck + '</div>');

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

	//md.html(md.html() + '<div>Brasser --->          ' + deck + '</div>');
}
//+-------------
function carte(array){
	array.push(deck.splice(0,1));
}
//+-------------
function mainCartes(deal, cartes){
	deal.html(cartes[0] + cartes[1]);
 	deal.find('.card:nth-child(2)').addClass("secondCard");
}
//+-------------
function guru(speak){
	$('#guru').text(speak);
}
//+-------------
function texas(){
	switch (gameState){
		case 0:
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

			mainCartes($('#main1'), main1);
			mainCartes($('#main2'), main2);
			mainCartes($('#main3'), main3);
			mainCartes($('#main4'), main4);
			mainCartes($('#main5'), main5);

			guru('Sélectionnez deux mains...');
		  break;

		case 1:
			//Burn #1
			carte(burn);
			//Flop
			for (i = 0; i < 3; i++){
				carte(cartesCommunes);
			}
		  break;

		case 2:
			//Burn #2
			carte(burn);
			//Turn
			carte(cartesCommunes);
		  break;

		case 3:
			//Burn #3
			carte(burn);
			//River
			carte(cartesCommunes);
		  break;
	}
	
	$('#burn').html('burn: ' + burn);
	$('#cartesCommunes').html('cartesCommunes: ' + cartesCommunes);
	gameState++;
	console.log('gameState ==> ', gameState)
}
//+-------------
$(document).ready(function() {
	init();
	texas();

	$('.main').on({
	  click: function() {
	    switch(gameState){
	    	case 1:
		    	$( this ).toggleClass( "active" );

		    	if($('.active').length == 2){
			    	guru('...rien ne va plus!')
			    	texas();
			    }
			  break;
	    
			case 2:
		    	$( this ).addClass( "oneAndOnly" );

		    	if($('.active').length == 2){
			    	guru('...BE MINE TONIGHT!')
			    	texas();
			    }
		  	  break;
	    }
	  }, 
	  mouseenter: function() {
	    $( this ).addClass( "hover" );
	  }, 
	  mouseleave: function() {
	    $( this ).removeClass( "hover" );
	  }
	});

	$('#reset').on('click', function(){
		init();
	});
});