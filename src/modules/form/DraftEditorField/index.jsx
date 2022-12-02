import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { fieldProps, getPreferredProp } from '@unite-us/ui';
import {
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import HtmlParsedText from './components/HtmlParsedText';
import InlineStyleControls from './components/InlineStyleControls';
import BlockStyleControls from './components/BlockStyleControls';

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

class DraftEditorField extends Component {
  constructor(props) {
    super(props);

    // We want to initialize the editor with either the field value or the props value,
    // if it is from the props, it is a readOnly display, or a fall back of an empty string
    const contentState = stateFromHTML(getPreferredProp(props, 'value') || '');
    this.state = {
      editorState: EditorState.createWithContent(contentState),
    };

    this.editorInstance = null;

    this.focus = this.focus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.toggleBlockType = this.toggleBlockType.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const nextValue = getPreferredProp(nextProps, 'value');
    const currentValue = getPreferredProp(this.props, 'value');

    if (nextProps.readOnly && nextValue !== currentValue) {
      const contentState = stateFromHTML(nextValue);
      this.setState({
        editorState: EditorState.createWithContent(contentState),
      });
    }
  }

  onChange(editorState) {
    // When the editor's content changes, we need to keep the editorState current
    // as well as the field's value.
    const changeCallback = getPreferredProp(this.props, 'onChange');
    if (changeCallback) {
      const value = stateToHTML(editorState.getCurrentContent());
      changeCallback(value);
    }

    this.setState({ editorState });
  }

  focus() {
    this.editorInstance.focus();
  }

  toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType,
      ),
    );
  }

  toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle,
      ),
    );
  }

  handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  render() {
    const { editorState } = this.state;
    const {
      dataTestId,
      hideError,
      hideLabel,
      id,
      inline,
      label,
      labelStyle,
      readOnly,
      required,
      spellCheck,
    } = this.props;
    const hasError = getPreferredProp(this.props, 'invalid') && getPreferredProp(this.props, 'touched');

    const fieldClass = () => classNames({
      'ui-form-field': true,
      'ui-draft-editor-field': true,
      'ui-form-field--has-error': hasError,
      'ui-form-field--inline': inline,
    });

    const labelClass = () => classNames({
      'ui-form-field__label': true,
      'sr-only top-0': hideLabel,
      'ui-form-field__label--required': required,
    });

    const richEditorClassNames = () => classNames({
      'RichEditor-root': true,
      'read-only': readOnly,
    });

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    const editorControls = (<div className="row">
      <div className="col-sm-8">
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
      </div>
      <div className="col-sm-4">
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
      </div>
    </div>);

    if (readOnly) {
      return (
        <div className={fieldClass()}>
          <label
            className={labelClass()}
            htmlFor={id}
            style={labelStyle}
          >
            {label}
          </label>

          <HtmlParsedText value={this.props.value} />
        </div>
      );
    }

    return (
      <div className={fieldClass()}>
        <label
          className={labelClass()}
          htmlFor={id}
          style={labelStyle}
        >
          {label}
        </label>

        <div>
          <div className={richEditorClassNames()}>
            <div
              className={className}
              data-testid={dataTestId}
              onClick={this.focus}
              role="textbox"
              tabIndex={0}
              id={id}
            >
              <Editor
                ref={(c) => { this.editorInstance = c; }}
                blockStyleFn={getBlockStyle}
                editorState={editorState}
                handleKeyCommand={this.handleKeyCommand}
                onChange={this.onChange}
                spellCheck={spellCheck}
                readOnly={readOnly}
                onBlur={getPreferredProp(this.props, 'onBlur')}
                onFocus={getPreferredProp(this.props, 'onFocus')}
              />
            </div>
            {!readOnly && editorControls}
          </div>
          {
            !hideError &&
            <div className="ui-form-field__error">
              {getPreferredProp(this.props, 'error')}
            </div>
          }
        </div>
      </div>
    );
  }
}

DraftEditorField.propTypes = {
  /** Remove Error element */
  dataTestId: PropTypes.string,
  hideError: PropTypes.bool,
  hideLabel: PropTypes.bool,
  id: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  labelStyle: PropTypes.object,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  spellCheck: PropTypes.bool,
  value: PropTypes.string.isRequired,
  /** See fieldProps doc */
  ...fieldProps,
};

DraftEditorField.defaultProps = {
  dataTestId: '',
  hideError: false,
  hideLabel: false,
  inline: false,
  inputStyle: {},
  labelStyle: {},
  readOnly: false,
  required: false,
  spellCheck: true,
};

export default DraftEditorField;
