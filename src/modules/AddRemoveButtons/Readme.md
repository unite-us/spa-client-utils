```jsx
function randomInteger(max) {
  return Math.floor(Math.random() * Math.floor(max))
}
function makeLine() {
  const randomNumber = randomInteger(1000000);
  return {
    label: randomNumber,
    id: randomNumber,
  };
}

initialState = {
  lines: [makeLine()],
};

<div className="add-remove-buttons-examples">
  {
    state.lines.map((line, index) => (
      <div
        key={`line-${line.id}`}
        style={{
          lineHeight: '30px',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        <div style={{ width: '60px' }}>{line.label}</div>
        <AddRemoveButtons
          onAddClick={() => {
            setState({
              lines: [...state.lines, makeLine()],
            });
          }}
          onRemoveClick={(indexToRemove) => {
            setState({
              lines: [
                ...state.lines.slice(0, indexToRemove),
                ...state.lines.slice(indexToRemove + 1),
              ],
            });
          }}
          index={index}
          length={state.lines.length}
        />
      </div>
    ))
  }
</div>

```
