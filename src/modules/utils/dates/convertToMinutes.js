function convertToMinutes(time = '') {
  if (time.length) {
    const hours = time.split(':')[0];
    const minutes = time.split(':')[1];

    return parseInt(hours * 60, 10) + parseInt(minutes, 10);
  }

  return 0;
}

export default convertToMinutes;
