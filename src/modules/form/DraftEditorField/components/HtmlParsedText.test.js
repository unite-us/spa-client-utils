import React from 'react';
import renderer from 'react-test-renderer';
import HtmlParsedText from './HtmlParsedText';

describe('HtmlParsedText', () => {
  it('renders', () => {
    expect(renderer.create(
      <HtmlParsedText value="<div><p>Hello World</p> <a href='https://www.google.com'>yolo</a></div>" />,
    )).toMatchSnapshot();
  });
});
