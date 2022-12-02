const PHONE_FORMATS = [
  // "+15556667777" or with extension ("+15556667777 1234" or "+155566677771234")
  /^\+[0-9]([0-9]{3})([0-9]{3})([0-9]{4})\s?([0-9]*)/,

  // "5556667777" or with extension
  /^([0-9]{3})([0-9]{3})([0-9]{4})\s?([0-9]*)/,
  //
  // "6667777" minimum 7 digits
  /^([0-9]{3})([0-9]{4})/,
];

function isValidMinimum(match) {
  return match && match[0].length === 7;
}

function formatPhoneNumber(phoneNumber, detailedExtension = false) {
  if (phoneNumber) {
    for (let i = 0; i < PHONE_FORMATS.length; i++) { // eslint-disable-line no-plusplus
      const match = phoneNumber.match(PHONE_FORMATS[i]);

      if (isValidMinimum(match)) {
        return `(---) ${match[1]}-${match[2]}`.trim();
      }
      if (match) {
        if (match[4] && detailedExtension) {
          return `(${match[1]}) ${match[2]}-${match[3]} ext. ${match[4]}`.trim();
        }
        return `(${match[1]}) ${match[2]}-${match[3]} ${match[4]}`.trim();
      }
    }
  }

  return '';
}

export default formatPhoneNumber;
