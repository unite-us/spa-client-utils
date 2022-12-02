const formatOptions = results => results.map(result => ({
  ...result,
  id: result.place_id,
  address: result.description,
}));


const getAutoCompleteOptions = (address, callback, google) => {
  if (address.length > 0) {
    const service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions({
      input: address,
      componentRestrictions: { country: 'us' },
    }, (predictions, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK || !predictions) {
        console.warn(`PlacesService was not successful for the following reason: ${status}`);
        return;
      }
      callback(formatOptions(predictions));
    });
  } else {
    callback([]);
  }
};

export default getAutoCompleteOptions;
