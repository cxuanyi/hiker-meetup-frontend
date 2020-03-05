import JSZip from "jszip";
import JSZipUtils from "jszip-utils";

const readZipFile = path =>
  new JSZip.external.Promise(function(resolve, reject) {
    JSZipUtils.getBinaryContent(path, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  }).then(function(data) {
    return JSZip.loadAsync(data);
  });

export { readZipFile };
