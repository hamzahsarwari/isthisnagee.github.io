// function getA11yColor(rgb) {
//   const r = rgb.r; const g = rgb.g; const b = rgb.b
//   const a = [r, g, b].map(v => v / 255 < 0.03928 ? v / 12.92 : Math.pow(
// }

// yay a global :(
let prevColor = {
  text: "black",
  bg: "white"
};
/*
 * Takes a json object `lastfm` and adds the data in it to
 * the html
 */
const addSong = lastfm => {
  // get jqeury stuff
  const albumTextDiv = $("#album-text");
  const albumArtDiv = $("#album-art");

  const albumName = lastfm["album"]["#text"];
  const songName = lastfm["name"];
  const artistName = lastfm["artist"]["#text"];
  const albumArtLink = lastfm["image"][0]["#text"];

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
  `;
  $("#music").replaceWith(music);
};

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
        dataFunc(data);
      }
    });
  };
};

const loadColors = colors => {
  const makeColor = (color, i) => {
    const bg = color["background"];
    const dark = color["dark"];
    const text = color["text"];
    const accentLight = color["accentLight"];
    const accentDark = color["accentDark"];
    const highlight = color["highlight"];
    return `<div onClick={color(${i})}
                 class="dib w2 bt bb bw2-ns b--black h2 pointer nagee-me"
                 data-bg="${bg}"
                 data-text="${text}"
                 data-dark="${dark}"
                 data-accent-light="${accentLight}"
                 data-accent-dark="${accentDark}"
                 style="background-color: ${bg}"></div>`;
  };

  const defaultColors = `
            <div onClick={color(-1)}
                 class="dib w2 bt bb bw2-ns b--black h2 pointer nagee-me bl"
                 data-bg="white"
                 data-text="black"
                 data-dark="#444"
                 data-accent-light="blue"
                 data-accent-dark="gray"
                 style="background-color: white"></div>`;

  $(".color-list").replaceWith(
    [defaultColors, ...colors.map(makeColor)].reduce((a, b) => a + b)
  );
};

function color(i) {
  let text = "black";
  let bg = "white";

  if (i >= 0) {
    const colorScheme = colors[i];
    bg = colorScheme["background"];
    text = colorScheme["text"];
  }

  changeColor(text, bg);
  prevColor.text = text;
  prevColor.bg = bg;
}

function changeColor(text, bg) {
  $(".nagee").css("color", text);
  $(".bg--nagee").css("background-color", bg);
}

window.onload = () => {
  // `colors` is a list located at colors.js
  // add the color bar
  loadColors(colors);

  // set the default color
  color(11);
  // get prev state
  // add hover temporarily
  // THE BELOW IS REALLY ANNOYING: changing color on hover
  // $(".nagee-me")
  //   .mouseenter(function() {
  //     const $this = $(this);
  //     const text = $this.attr("data-text");
  //     const bg = $this.attr("data-bg");
  //     changeColor(text, bg);
  //   })
  //   .mouseleave(function() {
  //     changeColor(prevColor.text, prevColor.bg);
  //   });
};
