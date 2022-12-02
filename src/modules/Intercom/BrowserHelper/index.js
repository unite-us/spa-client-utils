// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API

const BrowserHelper = {
  storageAvailable(type) {
    let storage;

    try {
      storage = window[type];
      const TEST_ITEM = '__storage_test__';
      storage.setItem(TEST_ITEM, TEST_ITEM);
      storage.removeItem(TEST_ITEM);

      return true;
    } catch (e) {
      return e instanceof DOMException && (
      // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        (storage && storage.length !== 0);
    }
  },
};

export default BrowserHelper;
