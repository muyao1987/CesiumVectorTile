export function readAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    let fr = new FileReader();
    fr.onload = function (e) {
      resolve(e.target.result);
    };
    fr.onerror = function (e) {
      reject(e.error);
    };
    fr.readAsArrayBuffer(file);
  });
}
