/*
 * Takes a json object `lastfm` and adds the data in it to
 * the html
 */
const addSong = (lastfm) => {
  // get jqeury stuff
  const albumTextDiv = $('#album-text')
  const albumArtDiv = $('#album-art')

  const albumName = lastfm['album']['#text']
  const songName = lastfm['name']
  const artistName = lastfm['artist']['#text']
  const albumArtLink = lastfm['image'][0]['#text']

  const music = `
      <div class="dib mw5 black">
        <img class="db w3 h3 ba b--black-10" alt="album cover"
                         src="${albumArtLink}">
        <dl class="mt2 f6 lh-copy">
          <dt class="clip">Title</dt>
          <dd class="ml0 f29 color-text--accent-light">${songName}</dd>
          <dt class="clip">Artist</dt>
          <dd class="ml0 gray color-text">${artistName}</dd>
        </dl>
      </div>
  `
  $('#music').replaceWith(music)
}

/*
 * Takes a url `url`, gets the json data it gives,
 * and returns a function that acts on that data
 */
const getDataThen = url => {
  return dataFunc => {
    $.ajax({
      dataType: "json",
      url: url,
      success: data => {
        dataFunc(data)
      }
    })
  }
}

const loadColors = (colors) => {
  const makeColor = (color, i) => {
    var bg = color['background']
    return `<div onClick={color(${i})}
                 class="w2 bt bb bw2 h2 pointer"
                 style="background-color: ${bg}"></div>`
  }

  $('.colors-list')
    .replaceWith(
    colors
      .map(makeColor)
      .reduce((a, b) => a + b)
  )
}

function color(i) {
  const colorScheme = colors[i]

  const background = colorScheme['background']
  const dark = colorScheme['dark']
  const text = colorScheme['text']
  const accentLight = colorScheme['accentLight']
  const accentDark = colorScheme['accentDark']
  const highlight = colorScheme['highlight']

  $('.color-text')
    .css('color', text)
  $('.color-text--highlight')
    .css('color', highlight)
  $('.color-bg')
    .css('background-color', background)
  $('.color-text--accent-light')
    .css('color', accentLight)
  $('.color-underline')
    .css('border-color', highlight)
  $('.color-link')
    .css('border-color', accentLight)
  $('.color-date')
    .css('background-color', accentLight)
  $('.color-bg-highlight')
    .css('background-color', highlight)
  $('.color-entry')
    .css('border-color', dark)
  $('.color-highlight')
    .css('border-color',  highlight)
  $('.color-jokes')
    .css('background-color ', accentDark)

  $('#current .highlight')
    .css('border-color', dark)
  $('.color-a')
    .css('border-color', accentLight)
  $('.color-a')
    .css('color', text)

  $('a').hover(
    () => {
      $(this).css('background-color', accentDark)
      $(this).css('color', accentLight)
    },
    () => {
      $(this).css('color', text)
      $(this).css('background-color', 'transparent')
    }
  )
}


window.onload = () => {
  const url = 'http://159.203.47.33:3000/lastfm/isthisnagee/lastplayed'

  /* add song */

  // not all browsers support fetch. Try to use it.
  try {
    fetch(url)
      .then(data => data.json())
      .then(json => addSong(json))
      .catch(err => console.log('could not get recently played'))
  }
  // this browser doesn't support fetch, use the old method
  catch (err) {
    getDataThen(url)(addSong)
  }

  /* add colors */

  // `colors` is a list located at colors.js
  // add the color bar
  loadColors(colors)

  // set the default color
  color(11)

}
