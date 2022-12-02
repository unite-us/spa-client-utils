### Default
```jsx
<ExpandableContainer
  id="test-expandable"
  header="This is a title"
  collapsedHeight="20px"
>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed varius mi. Vestibulum pharetra,
  est ac pulvinar pulvinar, metus diam tempus odio, quis faucibus nisi nisl non eros.
  Ut mattis quis sem in scelerisque. Nam malesuada id sapien vel commodo. Cras facilisis iaculis accumsan.
  Aliquam euismod felis non pharetra mattis. Mauris consectetur vitae sem at tincidunt. Sed tempus auctor varius.
  Vivamus elementum ac velit at ultricies. Donec ultricies metus vel justo sollicitudin, vel semper ante venenatis.
  Aenean vulputate eros ut ante fringilla finibus. Proin orci velit, porttitor sed enim quis, sollicitudin congue mauris.

  Nunc quis efficitur odio. Nullam tristique nisl diam, a faucibus mauris mollis sed. Quisque rutrum in mi eget consequat.
  Nullam a neque porta, cursus lectus a, egestas augue. Cras vitae ante laoreet, sollicitudin nisi ac, condimentum quam.
  Aliquam ac vehicula tortor, nec euismod augue. Nullam magna ex, pretium a justo sit amet, feugiat porta neque.
  Curabitur accumsan accumsan nisl sed posuere. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
  per inceptos himenaeos. Duis eu dolor sagittis, tempor odio non, molestie quam.
  Duis pretium porta ligula, quis vestibulum ipsum vehicula ut.
  </p>
</ExpandableContainer>
```

### Default With One Line of Text
- if the text fits within the collapsed height, a toggle will not show
```jsx
<ExpandableContainer
  id="test-expandable"
  header="This is a title"
  collapsedHeight="40px"
>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed varius mi.</p>
</ExpandableContainer>
```


### No Header with Toggle on the Right Side
```jsx
<ExpandableContainer
  id="test-expandable-1"
  collapsedHeight="30px"
  lessText="Close it Up"
  moreText="Open it Up"
  togglePosition="right"
  style={{ backgroundColor: '#90ee90' }}
>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed varius mi. Vestibulum pharetra,
  est ac pulvinar pulvinar, metus diam tempus odio, quis faucibus nisi nisl non eros.
  Ut mattis quis sem in scelerisque. Nam malesuada id sapien vel commodo. Cras facilisis iaculis accumsan.
  Aliquam euismod felis non pharetra mattis. Mauris consectetur vitae sem at tincidunt. Sed tempus auctor varius.
  Vivamus elementum ac velit at ultricies. Donec ultricies metus vel justo sollicitudin, vel semper ante venenatis.
  Aenean vulputate eros ut ante fringilla finibus. Proin orci velit, porttitor sed enim quis, sollicitudin congue mauris.
  </p>
</ExpandableContainer>
```

### Top Right Toggle Text
```jsx
<ExpandableContainer
  id="test-expandable-2"
  collapsedHeight="70px"
  lessText="Still Up Top Dude"
  moreText="Up Top Dude"
  togglePosition="top-right"
>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed varius mi. Vestibulum pharetra,
  est ac pulvinar pulvinar, metus diam tempus odio, quis faucibus nisi nisl non eros.
  Ut mattis quis sem in scelerisque. Nam malesuada id sapien vel commodo. Cras facilisis iaculis accumsan.
  Aliquam euismod felis non pharetra mattis. Mauris consectetur vitae sem at tincidunt. Sed tempus auctor varius.
  Vivamus elementum ac velit at ultricies. Donec ultricies metus vel justo sollicitudin, vel semper ante venenatis.
  Aenean vulputate eros ut ante fringilla finibus. Proin orci velit, porttitor sed enim quis, sollicitudin congue mauris.
  </p>
</ExpandableContainer>
```

### Top Left Toggle Text & onToggle Function Example
- It is possible to have the ExpandableContainer in a controlled state, meaning there is an external toggling mechanism
- If the component is controlled and no onToggle is passed in, then hideToggle should be set to true
- If the component is controlled and has an onToggle function, then the toggle text will be read only  
```jsx
initialState = {
  expanded: false,
};
 <div>
   <button onClick={() => setState({ expanded: !state.expanded })}>Click Me I Dare Ya</button>

   <ExpandableContainer
     id="test-expandable-3"
     header="This Is Sick"
     collapsedHeight="20px"
     controlled={true}
     isOpen={state.expanded}
     readOnlyToggleText
   >
     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed varius mi. Vestibulum pharetra,
     est ac pulvinar pulvinar, metus diam tempus odio, quis faucibus nisi nisl non eros.
     Ut mattis quis sem in scelerisque. Nam malesuada id sapien vel commodo. Cras facilisis iaculis accumsan.
     Aliquam euismod felis non pharetra mattis. Mauris consectetur vitae sem at tincidunt. Sed tempus auctor varius.
     Vivamus elementum ac velit at ultricies. Donec ultricies metus vel justo sollicitudin, vel semper ante venenatis.
     Aenean vulputate eros ut ante fringilla finibus. Proin orci velit, porttitor sed enim quis, sollicitudin congue mauris.
     </p>
   </ExpandableContainer>
 </div>
```

### External State Controlling Expansion
```jsx
initialState = {
  expanded: false,
};
const toggleText = () => {
  setState({ expanded: !state.expanded });
};

<div>
  <button onClick={toggleText}>Click Me I Dare Ya</button>

  <ExpandableContainer
    id="test-expandable-4"
    header="This Is Sick"
    collapsedHeight="20px"
    lessText="Still Up Top Dude"
    moreText="Up Top Dude"
    togglePosition="top-left"
    onToggle={toggleText}
    controlled={true}
    isOpen={state.expanded}
  >
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed varius mi. Vestibulum pharetra,
    est ac pulvinar pulvinar, metus diam tempus odio, quis faucibus nisi nisl non eros.
    Ut mattis quis sem in scelerisque. Nam malesuada id sapien vel commodo. Cras facilisis iaculis accumsan.
    Aliquam euismod felis non pharetra mattis. Mauris consectetur vitae sem at tincidunt. Sed tempus auctor varius.
    Vivamus elementum ac velit at ultricies. Donec ultricies metus vel justo sollicitudin, vel semper ante venenatis.
    Aenean vulputate eros ut ante fringilla finibus. Proin orci velit, porttitor sed enim quis, sollicitudin congue mauris.
    </p>
  </ExpandableContainer>
</div>
```

### Short content
```jsx
<ExpandableContainer
  id="test-expandable-short"
  header="This is a title"
  collapsedHeight="100px"
>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed varius mi. Vestibulum pharetra</p>
</ExpandableContainer>
```
