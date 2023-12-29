const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const form = document.getElementById("dictionaryForm");

form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission and page refresh

    let inpWord = document.getElementById("input-text").value;

    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            if (data.length > 0 && data[0].phonetics.length > 0) {
                const audioSrc = data[0].phonetics[0].audio;
                if (audioSrc) {
                    sound.src = audioSrc;
                    sound.load(); // Load audio
                    sound.play(); // Play audio
                }
            }

            // Display the word details
            result.innerHTML = `
                <div class="word">
                    <h4>${inpWord}</h4>
                    <button onclick="playAudio()">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic || ""}/</p>
                </div>
                <p class="word-meaning">
                    ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>
            `;
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            result.innerHTML = `<h4 class="error">Couldn't Find The Word</h4>`;
        });
});

function playAudio() {
    if (sound.src) {
        sound.load(); // Load audio
        sound.play(); // Play audio
    }
}
