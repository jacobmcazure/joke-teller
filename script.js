const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

function toggleButton() {
    button.disabled = !button.disabled;
}

function jokeToAudio(joke) {
    VoiceRSS.speech({
        key: 'e858b3ce3ef3474e90843d0f32c54c20',
        src: joke,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

async function getJokes() {
    let joke = "";
    const apiUrl = "https://v2.jokeapi.dev/joke/Any";
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // joke = `${data.setup} ... ${data.delivery}` ? data.setup : joke = data.joke;
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        jokeToAudio(joke);
        toggleButton();
        console.log(joke);
    } catch (error) {
        // error catch
        console.log("Oops!", error);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);