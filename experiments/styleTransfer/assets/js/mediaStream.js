// setup media stream
var constraints = {
  video: {width: {exact: 256}, height: {exact: 256}}
};

function hasGetUserMedia() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

function handleSuccess(stream) {
  $$('#screenshot-video').srcObject = stream;
}

function handleError(error) {
  console.log("media access rejected", error)
  $$(".webcam_input").className += " disabled";
  $$(".webcam_input .pretty_button").className += " disabled";
  $$(".webcam_input .pretty_button").setAttribute("disabled", true)
}

if (hasGetUserMedia()) {
  navigator.mediaDevices.getUserMedia(constraints)
  .then(handleSuccess)
  .catch(handleError);
} else {
  console.log('getUserMedia() is not supported by your browser');
}
