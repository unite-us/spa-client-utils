import { NOTE_TYPE_VALUES } from './constants';

function getCollectionFromNoteType(collection_class, values) {
  const { GENERAL, INTERACTION, PROVIDED_SERVICE } = NOTE_TYPE_VALUES;
  const noteValues = values[collection_class];

  switch (collection_class) {
    case GENERAL:
      return {
        interaction: noteValues,
        collection_class,
      };
    case INTERACTION:
      return {
        interaction: noteValues,
        collection_class: noteValues.type,
      };
    case PROVIDED_SERVICE:
      return {
        collection_class,
        provided_service: noteValues,
      };
    default:
      return {};
  }
}

export default getCollectionFromNoteType;
