// عناصر DOM
const startRecordButton = document.getElementById("startRecord");
const stopRecordButton = document.getElementById("stopRecord");
const downloadButton = document.getElementById("downloadAudio");
const audioPlayback = document.getElementById("audioPlayback");

let mediaRecorder;
let audioChunks = [];

// بدء التسجيل
startRecordButton.addEventListener("click", async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.start();
  audioChunks = [];
  mediaRecorder.addEventListener("dataavailable", (event) => {
    audioChunks.push(event.data);
  });

  startRecordButton.disabled = true;
  stopRecordButton.disabled = false;
  downloadButton.disabled = true;
  audioPlayback.hidden = true;

  console.log("بدأ التسجيل...");
});

// إيقاف التسجيل
stopRecordButton.addEventListener("click", () => {
  mediaRecorder.stop();

  mediaRecorder.addEventListener("stop", () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
    const audioUrl = URL.createObjectURL(audioBlob);

    audioPlayback.src = audioUrl;
    audioPlayback.hidden = false;

    downloadButton.href = audioUrl;
    downloadButton.download = "recording.wav";
    downloadButton.disabled = false;

    console.log("تم إيقاف التسجيل.");
  });

  startRecordButton.disabled = false;
  stopRecordButton.disabled = true;
});
