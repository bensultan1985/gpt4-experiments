document
  .getElementById("noteSelect")
  .addEventListener("change", generateAdditionalNotes);
document
  .getElementById("scaleSelect")
  .addEventListener("change", generateAdditionalNotes);

const Types = {
  "Major Triad": {
    defaultSelection: ["Root", "Major 3rd", "Perfect 5th"],
    structure: [
      "Root",
      "Minor 2nd",
      "Major 2nd",
      "Minor 3rd",
      "Major 3rd",
      "Perfect 4th",
      "Diminished 5th",
      "Perfect 5th",
      "Augmented 5th",
    ],
  },
  "Minor Triad": {
    defaultSelection: ["Root", "Minor 3rd", "Perfect 5th"],
    structure: [
      "Root",
      "Minor 2nd",
      "Major 2nd",
      "Minor 3rd",
      "Major 3rd",
      "Perfect 4th",
      "Diminished 5th",
      "Perfect 5th",
    ],
  },
  "Diminished Triad": {
    defaultSelection: ["Root", "Minor 3rd", "Diminished 5th"],
    structure: [
      "Root",
      "Minor 2nd",
      "Major 2nd",
      "Minor 3rd",
      "Major 3rd",
      "Perfect 4th",
      "Diminished 5th",
      "Perfect 5th",
      "Augmented 5th",
    ],
  },
  "Augmented Triad": {
    defaultSelection: ["Root", "Major 3rd", "Augmented 5th"],
    structure: [
      "Root",
      "Minor 2nd",
      "Major 2nd",
      "Minor 3rd",
      "Major 3rd",
      "Perfect 4th",
      "Diminished 5th",
      "Augmented 5th",
    ],
  },
};

function handleChordTypeChange() {
  generateAdditionalNotes();
}

function playSelectedNotes() {
  const noteSelect = document.getElementById("noteSelect");
  const baseFrequency = parseFloat(noteSelect.value);

  const additionalFrequencies = selectedIntervals.map(
    (interval) => baseFrequency * Math.pow(2, interval / 12)
  );

  additionalFrequencies.forEach((frequency, index) => {
    playSineWave(frequency);
  });

  displayChordName();
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
    oscillator.stop(audioContext.currentTime + 1);
  } else {
    alert("Web Audio API not supported in this browser.");
  }
}

function generateAdditionalNotes() {
  const noteSelect = document.getElementById("noteSelect");
  const baseFrequency = parseFloat(noteSelect.value);

  const additionalNotesContainer = document.getElementById("additionalNotes");
  additionalNotesContainer.innerHTML = "";

  const chordType = document.getElementById("scaleSelect").value;
  const structure = Types[chordType].structure.slice().reverse();
  const defaultSelection = Types[chordType].defaultSelection;

  selectedIntervals = [];

  structure.forEach((intervalName, index) => {
    const reverseIndex = structure.length - 1 - index; // Index from the original order

    const noteButton = document.createElement("button");
    noteButton.classList.add("note-button");
    noteButton.textContent = intervalName;
    noteButton.dataset.interval = reverseIndex;

    const noteLabel = document.createElement("td");
    noteLabel.classList.add("note-label");
    noteLabel.textContent = getNoteName(
      noteSelect.options[noteSelect.selectedIndex].text,
      reverseIndex
    );

    const noteButtonCell = document.createElement("td");
    noteButtonCell.appendChild(noteButton);

    const row = document.createElement("tr");
    row.appendChild(noteLabel);
    row.appendChild(noteButtonCell);

    noteButton.addEventListener("click", () => {
      noteButton.classList.toggle("highlighted");
      if (selectedIntervals.includes(reverseIndex)) {
        selectedIntervals = selectedIntervals.filter((i) => i !== reverseIndex);
      } else {
        selectedIntervals.push(reverseIndex);
      }
    });

    if (defaultSelection.includes(intervalName)) {
      noteButton.classList.add("highlighted");
      selectedIntervals.push(reverseIndex);
    }

    additionalNotesContainer.appendChild(row);
  });
}

function displayChordName() {
  const noteSelect = document.getElementById("noteSelect");
  const baseNote = noteSelect.options[noteSelect.selectedIndex].text;

  document.getElementById("chordName").textContent = `${baseNote} ${
    document.getElementById("scaleSelect").value
  }`;
}

function getNoteName(baseNote, interval) {
  const notes = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  const baseIndex = notes.indexOf(baseNote);
  const noteIndex = (baseIndex + interval) % 12;
  return notes[noteIndex];
}

generateAdditionalNotes();
