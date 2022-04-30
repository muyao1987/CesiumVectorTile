export function GetExtension(fname) {
  let start = fname.lastIndexOf(".");
  if (start >= 0) {
    return fname.substring(start, fname.length);
  }
  return "";
}

export function GetFileName(fname) {
  let start = fname.lastIndexOf("/");
  if (start < 0) {
    return fname;
  }
  return fname.substring(start + 1, fname.length);
}

export function GetDirectoryName(fname) {
  let start = fname.lastIndexOf("/");
  if (start < 0) {
    return "";
  }
  return fname.substring(0, start);
}

export function Combine(dir, fname) {
  return dir + fname;
}
export function ChangeExtension(fname, newExt) {
  return fname.replace(GetExtension(fname), newExt);
}
