window.onload = function() {
	var withLastFm = funcOnData('http://159.203.47.33:3000/lastfm/isthisnagee/lastplayed');
	// var withMedium = funcOnData('http://159.203.47.33:3000/isthismedium/lastpublished');
	withLastFm(addToFrontEnd);
	//withMedium(console.log);
	loadColors();
	color(11);
  collapse();
};

function collapse() {
  var collapsible = $('.collapse');
  for (var i = 0; i < collapsible.length; i++) {
    $section = $(collapsible[i]);
    $section.click(function() {
      $section.find('.collapse--this').hide();
    });
  }
}
function loadColors() {
  function makeColorDiv(color,i) {
    var bg = color["background"];
    return '<div onClick={color(' + i + ')} class="w2 bt bb bw2 h2 pointer" style="background-color: ' + bg + '"></div>';
  }

  $('.colors-list').replaceWith(colors
		.map(makeColorDiv)
		.reduce(function(a,b) { 
			return a + b;
		})
	);
}


function funcOnData(url) {
  return function(dataFunc) {
		$.ajax({
			dataType: "json",
			url: url,
			success: function(data) {
				console.log(data);
				dataFunc(data);
			}
		});
	};
}


function addToFrontEnd(lastfm) {
	// get jqeury stuff
	var albumTextDiv = $('#album-text');
	var albumArtDiv = $('#album-art');

  var albumName = lastfm['album']['#text'];
	var songName = lastfm['name'];
	var artistName = lastfm['artist']['#text'];
  var albumArtLink = lastfm['image'][0]['#text']; 	

  var music = '<div class="dib mw5 black"> <img class="db w3 h3 ba b--black-10" alt="album cover" src="' + albumArtLink + '">  <dl class="mt2 f6 lh-copy"> <dt class="clip">Title</dt> <dd class="ml0 fw9 color-text--accent-light">' + songName + '</dd> <dt class="clip">Artist</dt> <dd class="ml0 gray color-text ">' + artistName + '</dd> </dl></div>';
	// put in html
    $('#music').replaceWith(music);

}


function color(i) {
  var colorScheme = colors[i];

		var background = colorScheme["background"];
		var dark       = colorScheme["dark"];
		var text       = colorScheme["text"];
		var accentLight= colorScheme["accentLight"];
		var accentDark = colorScheme["accentDark"];
		var highlight  = colorScheme["highlight"];

		$('.color-text').css('color', text);
        $('.color-text--highlight').css('color', highlight);
		$('.color-bg').css('background-color', background);
        $('.color-text--accent-light').css('color', accentLight);
		$('.color-underline').css('border-color', highlight);
        $('.color-link').css('border-color', accentLight);
		$('.color-date').css('background-color', accentLight);
		$('.color-position').css('background-color', highlight);
		$('.color-entry').css('border-color', dark);
		$('.color-highlight').css('border-color',  highlight);
		$('.color-jokes').css('background-color ', accentDark);

		$('#current .highlight').css('border-color', dark);
		$('.color-a').css('border-color', accentLight);
		$('.color-a').css('color', text);

		$('a').hover(
			function() { 
				$(this).css('background-color', accentDark);
				$(this).css('color', accentLight);
			}, 
			function() {
				$(this).css('color', text);
				$(this).css('background-color', 'transparent');
			}
		);
}

function changeColors(jsonColors){
	console.log('changing colors');
  var colors = jsonColors['colors'];	
	if (colors) {
    randIndex = Math.floor(Math.random() * colors.length);
		console.log('choosing color scheme', randIndex);
		var colorScheme = colors[randIndex];

		var background = colorScheme["background"];
		var dark       = colorScheme["dark"];
		var text       = colorScheme["text"];
		var accentLight= colorScheme["accentLight"];
		var accentDark = colorScheme["accentDark"];
		var highlight  = colorScheme["highlight"];

		$('body').css('color', text);
		$('body').css('background-color', background);
		$('.highlight').css('border-bottom', '5px solid ' + highlight);
		$('.date').css('background-color', accentLight);
		$('.position').css('background-color', highlight);
		$('.entry').css('border-bottom', '1px dotted ' + dark);
		$('p .highlight').css('border-bottom', '2px solid ' + highlight);
		$('.jokes').css('background-color ', accentDark);

		$('#current .highlight').css('border-color', dark);
		$('.a').css('border-bottom', '4px solid ' + accentLight);
		$('.a').css('color', text);

		$('a').hover(
			function() { 
				$(this).css('background-color', accentDark);
				$(this).css('color', accentLight);
			}, 
			function() {
				$(this).css('color', text);
				$(this).css('background-color', 'transparent');
			}
		);

	}
}
