const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

function toggleButton () {
   button.disabled = !button.disabled;
}

function tellMe (joke) {
   console.log(joke);
   VoiceRSS.speech({
      key: '3229244ff39941c88de3624732012b0c',
      src: joke,
      hl: 'en-us',
      v: 'Linda',
      r: 0, 
      c: 'mp3',
      f: '44khz_16bit_stereo',
      ssml: false
  });
}

async function getJokes() {
   let joke = '';
   const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
   try {
      const response = await fetch (apiUrl); 
      const data = await response.json();
      console.log(data)
      if (data.setup) {
         joke = `${data.setup} ... ${data.delivery}`;
      } else {
         joke = data.joke;
      }
      tellMe(joke);
      toggleButton();
   } catch (error) {
      console.log ("Error: ", error)
   }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);