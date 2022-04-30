export function readAsText(file, encoding) {
  return new Promise((resolve, reject) => {
    let fr = new FileReader();
    fr.onload = function (e) {
      resolve(e.target.result);
    };
    fr.onerror = function (e) {
      reject(e.error);
    };
    fr.readAsText(file, encoding);
  });
}
