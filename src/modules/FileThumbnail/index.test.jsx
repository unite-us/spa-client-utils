import React from 'react';
import { shallow } from 'enzyme';
import FileThumbnail from '../FileThumbnail';

const style = { width: '10px' };

const testCases = [
  { contentType: 'audio', icon: 'IconFileAudioO', style },
  { contentType: 'document', icon: 'FileWord', style },
  { contentType: 'msword', icon: 'FileWord', style },
  { contentType: 'image', icon: 'IconFileImage', style },
  { contentType: 'pdf', icon: 'IconFilePdf', style },
  { contentType: 'plain', icon: 'IconFileTextO', style },
  { contentType: 'sheet', icon: 'IconFileExcel', style },
  { contentType: 'excel', icon: 'IconFileExcel', style },
  { contentType: 'video', icon: 'IconFileMovieO', style },
  { contentType: 'zip', icon: 'IconFileArchiveO', style },
  { contentType: 'bogusdefault', icon: 'IconFileO', style },
];

describe('FileThumbnail', () => {
  describe('render each icon', () => {
    testCases.forEach((testCase) => {
      it(`renders ${testCase.icon}`, () => {
        const wrapper = shallow(
          <FileThumbnail
            contentType={testCase.contentType}
            style={testCase.style}
          />,
        );
        expect(wrapper.find('Icon').prop('icon')).toBe(testCase.icon);
        expect(wrapper.find('a')).toHaveLength(0);
      });
    });
  });

  it('wraps the icon in <a> tag if onThumbnailClick prop is passed', () => {
    const wrapper = shallow(
      <FileThumbnail
        contentType={testCases[0].contentType}
        onThumbnailClick={jest.fn()}
      />,
    );

    expect(wrapper.find('a')).toHaveLength(1);
    expect(wrapper.find('Icon')).toHaveLength(1);
  });
});
