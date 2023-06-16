document
  .getElementById("noteSelect")
  .addEventListener("change", () => generateAdditionalNotes(true));
document
  .getElementById("scaleSelect")
  .addEventListener("change", () => generateAdditionalNotes(true));

let selectedIntervals = [];

function playSelectedNotes() {
  const noteSelect = document.getElementById("noteSelect");
  const baseNote = noteSelect.options[noteSelect.selectedIndex].text;
  const baseFrequency = parseFloat(noteSelect.value);

  playSineWave(baseFrequency); // Play the base note

  const additionalFrequencies = selectedIntervals.map(
    (interval) => baseFrequency * Math.pow(2, interval / 12)
  );

  additionalFrequencies.forEach((frequency) => {
    playSineWave(frequency); // Play the selected notes
  });

  displayChordName(baseNote);
}

function playSineWave(frequency) {
  if (
    typeof AudioContext !== "undefined" ||
    typeof webkitAudioContext !== "undefined"
  ) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();

    const oscillator = audioContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1); // Play note for 1 second
  } else {
    alert("Web Audio API not supported in this browser.");
  }
}

function generateAdditionalNotes(autoPlay = false) {
  const noteSelect = document.getElementById("noteSelect");
  const baseFrequency = parseFloat(noteSelect.value);
  const scale = document.getElementById("scaleSelect").value;

  const additionalNotesContainer = document.getElementById("additionalNotes");
  additionalNotesContainer.innerHTML = "";

  const intervalNames =
    scale === "major"
      ? [
          "Major 7th",
          "Major 6th",
          "Perfect 5th",
          "Perfect 4th",
          "Major 3rd",
          "Major 2nd",
        ]
      : [
          "Minor 7th",
          "Minor 6th",
          "Diminished 5th",
          "Perfect 4th",
          "Minor 3rd",
          "Minor 2nd",
        ];
  const intervals =
    scale === "major" ? [11, 9, 7, 5, 4, 2] : [10, 8, 6, 4, 3, 1];

  selectedIntervals = scale === "major" ? [4, 7, 12] : [3, 6, 12];

  intervalNames.push("Octave");
  intervals.push(12);

  intervals.forEach((interval, index) => {
    const noteButton = document.createElement("button");
    noteButton.classList.add("note-button");
    noteButton.textContent = intervalNames[index];
    noteButton.dataset.interval = interval;
    noteButton.addEventListener("click", () => {
      noteButton.classList.toggle("highlighted");
      if (selectedIntervals.includes(interval)) {
        selectedIntervals = selectedIntervals.filter((i) => i !== interval);
      } else {
        selectedIntervals.push(interval);
      }
      displayChordName(noteSelect.options[noteSelect.selectedIndex].text);
    });
    additionalNotesContainer.appendChild(noteButton);
  });

  if (autoPlay) {
    displayChordName(noteSelect.options[noteSelect.selectedIndex].text);
    applyHighlights();
    playSelectedNotes();
  }
}

function displayChordName(baseNote) {
  console.log(Tonal);
  const notes = ["1P"].concat(
    selectedIntervals.map((interval) => interval + "P")
  ); // Using Perfect Intervals for simplicity
  const chord = Tonal.Chord.detect(notes);

  if (chord.length > 0) {
    document.getElementById("chordName").textContent =
      baseNote + " " + chord[0];
  } else {
    document.getElementById("chordName").textContent = "Unknown Chord";
  }
}

function applyHighlights() {
  document.querySelectorAll(".note-button").forEach((button) => {
    button.classList.remove("highlighted");
  });
  selectedIntervals.forEach((interval) => {
    document
      .querySelector(`.note-button[data-interval="${interval}"]`)
      .classList.add("highlighted");
  });
}

generateAdditionalNotes(true);
