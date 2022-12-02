Draft.js Docs -  https://facebook.github.io/draft-js/docs/api-reference-editor.html#content

stateFromHTML - https://github.com/sstur/draft-js-import-html

stateToHTML   - https://github.com/sstur/draft-js-export-html


```jsx
  const EMPTY_DRAFT_FIELD = '<p><br></p>';

  <ReduxTemplate formId="draftEditorField">
    <Field
      name="editor1"
      component={DraftEditorField}
      props={{
        id: 'editor1',
        label: 'Rich Text Editor',
        required: true,
      }}
      validate={(value) => {
        return validations.isRequired(value === EMPTY_DRAFT_FIELD ? '' : value);
      }}
    />
  </ReduxTemplate>
```

### Editor in read-only mode

```jsx
  <DraftEditorField
    id="editor2"
    label="Read Only Mode"
    value="<div>Updated Description. <a href='https://www.google.com'>123</a>. Date is Dec 2.&nbsp;</div>"
    readOnly
  />
```
