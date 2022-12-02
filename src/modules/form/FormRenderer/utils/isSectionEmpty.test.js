import isSectionEmpty from './isSectionEmpty';

describe('isSectionEmpty', () => {
  const section = {
    id: 'section-id-1',
    questions: [
      { id: 'qid-1' },
      { id: 'qid-2' },
      { id: 'qid-3' },
      { id: 'qid-4' },
    ],
  };

  it('returns true when no questions', () => {
    expect(isSectionEmpty()).toBeTruthy();
  });

  it('returns false is not all questions are hidden', () => {
    const hiddenFields = ['qid-1', 'qid-2', 'qid-4'];
    expect(isSectionEmpty(section)).toBeFalsy();
    expect(isSectionEmpty(section, hiddenFields)).toBeFalsy();
  });

  it('return true if all questions are hidden', () => {
    const hiddenFields = ['qid-1', 'qid-3', 'qid-2', 'quid-1999', 'qid-4'];
    expect(isSectionEmpty(section, hiddenFields)).toBeTruthy();
  });
});
