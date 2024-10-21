const screenVideo = document.getElementById("screenVideo");
const cameraVideo = document.getElementById("cameraVideo");
const shareScreenButton = document.getElementById("shareScreen");
const toggleCameraButton = document.getElementById("toggleCamera");

let cameraStream = null;

// Function to share the screen
async function startScreenShare() {
  try {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
    screenVideo.srcObject = screenStream;

    // Stop screen share when the user stops it
    screenStream.getVideoTracks()[0].addEventListener("ended", () => {
      screenVideo.srcObject = null;
    });
  } catch (err) {
    console.error("Error sharing screen:", err);
  }
}

// Function to start/stop the camera
async function toggleCamera() {
  if (cameraStream) {
    cameraStream.getTracks().forEach((track) => track.stop());
    cameraStream = null;
    cameraVideo.srcObject = null;
  } else {
    try {
      cameraStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      cameraVideo.srcObject = cameraStream;
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  }
}

// Event listeners
shareScreenButton.addEventListener("click", startScreenShare);
toggleCameraButton.addEventListener("click", toggleCamera);

setInterval(show_time, 1000);
function show_time() {
  let d = new Date();
  let hrs = d.getHours();
  let min = d.getMinutes();
  let sec = d.getSeconds();
  if (hrs <= 12) {
    hrs = "0" + hrs;
    min = "0" + min;
  } else {
    hrs = hrs - 12;
  }
  document.getElementById("hrs").textContent = hrs;
  document.getElementById("min").textContent = min;
  document.getElementById("sec").textContent = sec;
}
