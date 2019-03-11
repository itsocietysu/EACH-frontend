function encodeImageFileAsURL(file, callback) {
  const reader = new FileReader();
  reader.onloadend = function() {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

export const toDataURL = url =>
  fetch(url)
    .then(response => response.blob())
    .then(
      blob =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }),
    );

export function URL2Base64(url, callback) {
  toDataURL(url).then(dataUrl => {
    callback(dataUrl);
  });
}

export function File2Base64(file, callback) {
  encodeImageFileAsURL(file, callback);
}
