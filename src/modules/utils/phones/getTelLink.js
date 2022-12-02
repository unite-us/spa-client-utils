const getTelLink = (phoneNumber, includeExtension = false) => {
  if (!phoneNumber) return '#';

  const cCode = phoneNumber.country_code;
  const country = (cCode === '01') ? '1' : cCode;
  const fullNumber = phoneNumber.phone_number ? phoneNumber.phone_number : '';
  const city = fullNumber.slice(0, 3);
  const number = fullNumber.slice(3, 10);
  const extension = phoneNumber.extension ? phoneNumber.extension : '';

  if (includeExtension && !!extension) {
    return `tel:+${country}${city}${number},${extension}`;
  }

  if (country && city && number) {
    return `tel:+${country}${city}${number}`;
  }

  return '#';
};

export default getTelLink;
