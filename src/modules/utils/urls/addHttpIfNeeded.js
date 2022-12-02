function addHttpIfNeeded(url) {
  const reg = /^http.?:\/\//;

  if (url && !reg.test(url)) {
    return `http://${url}`;
  }
  return url;
}

export default addHttpIfNeeded;
