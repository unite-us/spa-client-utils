function getFileIconByContentType(contentType) {
  const typeHas = (str) => {
    const contentTypeTest = `\\b${str}\\b`;
    const regex = new RegExp(contentTypeTest);

    return regex.test(contentType);
  };

  if (typeHas('audio')) {
    return 'IconFileAudioO';
  }

  if (typeHas('document') || typeHas('msword')) {
    return 'FileWord';
  }

  if (typeHas('sheet') || typeHas('excel')) {
    return 'IconFileExcel';
  }

  if (typeHas('image')) {
    return 'IconFileImage';
  }

  if (typeHas('pdf')) {
    return 'IconFilePdf';
  }

  if (typeHas('html') || typeHas('css')) {
    return 'IconFileCodeO';
  }

  if (typeHas('plain') || typeHas('text') || typeHas('rtf')) {
    return 'IconFileTextO';
  }

  if (typeHas('video')) {
    return 'IconFileMovieO';
  }

  if (typeHas('zip')) {
    return 'IconFileArchiveO';
  }

  return 'IconFileO';
}

export default getFileIconByContentType;
