import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import { get } from 'lodash';
import parse, { domToReact } from 'html-react-parser';

const options = {
  replace: (domNode) => {
    if (get(domNode, 'attribs.href')) {
      return (
        <a
          href={domNode.attribs.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {domToReact(domNode.children)}
        </a>
      );
    }
    return domNode;
  },
};

function HtmlParsedText(props) {
  const {
    className,
    value,
  } = props;

  return (
    <div className={classNames('html-parsed-text', className)}>
      { parse(DOMPurify.sanitize(value), options) }
    </div>
  );
}

HtmlParsedText.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
};

HtmlParsedText.defaultProps = {
  className: '',
};

export default HtmlParsedText;
