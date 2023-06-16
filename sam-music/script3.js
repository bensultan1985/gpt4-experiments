document
  .getElementById("noteSelect")
  .addEventListener("change", generateAdditionalNotes);
document
  .getElementById("scaleSelect")
  .addEventListener("change", generateAdditionalNotes);

selectedIntervals = [0, 4, 7, 12]; // To have the default notes highlighted

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

function generateAdditionalNotes(autoPlay = false) {
  const noteSelect = document.getElementById("noteSelect");
  const baseFrequency = parseFloat(noteSelect.value);

  const additionalNotesContainer = document.getElementById("additionalNotes");
  additionalNotesContainer.innerHTML = "";

  const intervalNames = [
    "Root",
    "Minor 2nd",
    "Major 2nd",
    "Minor 3rd",
    "Major 3rd",
    "Perfect 4th",
    "Diminished 5th",
    "Perfect 5th",
    "Minor 6th",
    "Major 6th",
    "Minor 7th",
    "Major 7th",
    "Octave",
  ];

  const intervals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  selectedIntervals = [0];

  intervals.reverse().forEach((interval, index) => {
    const noteButton = document.createElement("button");
    noteButton.classList.add("note-button");
    noteButton.textContent = intervalNames[intervals.length - index - 1];
    noteButton.dataset.interval = interval;

    const noteLabel = document.createElement("td");
    noteLabel.classList.add("note-label");
    noteLabel.textContent = getNoteName(
      noteSelect.options[noteSelect.selectedIndex].text,
      interval
    );

    const noteButtonCell = document.createElement("td");
    noteButtonCell.appendChild(noteButton);

    const row = document.createElement("tr");
    row.appendChild(noteLabel);
    row.appendChild(noteButtonCell);

    noteButton.addEventListener("click", () => {
      noteButton.classList.toggle("highlighted");
      if (selectedIntervals.includes(interval)) {
        selectedIntervals = selectedIntervals.filter((i) => i !== interval);
      } else {
        selectedIntervals.push(interval);
      }
      if (interval === 0) {
        // Ensuring root note is always played
        noteButton.classList.add("highlighted");
      }
    });

    additionalNotesContainer.appendChild(row);
  });

  if (autoPlay) {
    displayChordName();
    playSelectedNotes();
  }
}

function displayChordName() {
  const noteSelect = document.getElementById("noteSelect");
  const baseNote = noteSelect.options[noteSelect.selectedIndex].text;

  if (JSON.stringify(selectedIntervals.sort()) === JSON.stringify([4, 7, 12])) {
    document.getElementById(
      "chordName"
    ).textContent = `${baseNote} Major Chord`;
  } else if (
    JSON.stringify(selectedIntervals.sort()) === JSON.stringify([3, 6, 12])
  ) {
    document.getElementById(
      "chordName"
    ).textContent = `${baseNote} Diminished Chord`;
  } else {
    document.getElementById("chordName").textContent = "Custom Chord";
  }
}

function getNoteName(baseNote, interval) {
  const notes = [
    "C",
    "Db",
    "D",
    "Eb",
    "E",
    "F",
    "Gb",
    "G",
    "Ab",
    "A",
    "Bb",
    "B",
  ];
  const baseIndex = notes.indexOf(baseNote);
  const noteIndex = (baseIndex + interval) % 12;
  return notes[noteIndex];
}

generateAdditionalNotes();
