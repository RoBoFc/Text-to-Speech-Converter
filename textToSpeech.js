
const voicelist = document.getElementById('voice')
const textarea = document.getElementById('text')
const speechBtn = document.getElementById('submit')
let toSpeak = true;
let synth = speechSynthesis;

function loadVoices() {
    for (let voice of speechSynthesis.getVoices()) {
        option = document.createElement('option')
        option.text = voice.name
        voicelist.add(option);
    }
}
synth.addEventListener('voiceschanged', loadVoices);

function textToSpeech(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    for (let voice of synth.getVoices()) {
        if (textarea.value == voice.name) {
            utterance.voice = voice;
            break;
        }
    }
    speechSynthesis.speak(utterance);
}

speechBtn.addEventListener('click', (e) => {
    src = e.target;
    if (textarea.value != '' && !synth.speaking) {
        textToSpeech(textarea.value);
    }
    if (textarea.value.length > 50) {
        if (toSpeak) {
            synth.resume()
            toSpeak = false
            src.textContent = 'Pause Speech'
        } else {
            synth.pause()
            toSpeak = true
            src.textContent = 'Resume Speech'
        }
        setInterval(() => {
            if (!synth.speaking && !toSpeak) {
                toSpeak = true
                src.textContent = 'Convert To Speech'
            }
        }, 0)
    }
})