import getCollectionFromNoteType from './getCollectionFromNoteType';

describe('getCollectionFromNoteType', () => {
  const noteValues = {
    note: {
      type: 'note',
    },
    interaction: {
      type: 'phone_call',
    },
    provided_service: {
      type: 'my service',
    },
  };

  it('note', () => {
    expect(getCollectionFromNoteType('note', noteValues)).toEqual({
      interaction: noteValues.note,
      collection_class: 'note',
    });
  });

  it('phone_call', () => {
    expect(getCollectionFromNoteType('interaction', noteValues)).toEqual({
      interaction: noteValues.interaction,
      collection_class: 'phone_call',
    });
  });

  it('email', () => {
    const emailInteraction = {
      ...noteValues,
      interaction: {
        type: 'email',
      },
    };

    expect(getCollectionFromNoteType('interaction', emailInteraction)).toEqual({
      interaction: emailInteraction.interaction,
      collection_class: 'email',
    });
  });

  it('meeting', () => {
    const meetingInteraction = {
      ...noteValues,
      interaction: {
        type: 'meeting',
      },
    };

    expect(getCollectionFromNoteType('interaction', meetingInteraction)).toEqual({
      interaction: meetingInteraction.interaction,
      collection_class: 'meeting',
    });
  });

  it('provided_service', () => {
    expect(getCollectionFromNoteType('provided_service', noteValues)).toEqual({
      collection_class: 'provided_service',
      provided_service: noteValues.provided_service,
    });
  });

  it('default', () => {
    expect(getCollectionFromNoteType('invalid-type', noteValues)).toEqual({});
  });
});
