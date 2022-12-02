import React from 'react';
import PropTypes from 'prop-types';
import StyleButton from './StyleButton';

const INLINE_STYLES = [
  { label: 'B', style: 'BOLD' },
  { label: 'I', style: 'ITALIC' },
  { label: 'U', style: 'UNDERLINE' },
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      <div className="btn-group" role="group">
        {INLINE_STYLES.map(type => (
          <StyleButton
            key={type.style}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />),
        )}
      </div>
    </div>
  );
};

InlineStyleControls.propTypes = {
  editorState: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default InlineStyleControls;
