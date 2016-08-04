# Props and State

React components keep track of data via two important instance variables:
`this.props` and `this.state`. Both are objects representing data that the
component needs in order to render.

## Props

Props are properties of a component that are assigned at the time of
initialization.

```js
<Dog name='Fido' breed='Greyhound'></Dog>

```

`this.props` are then accessible in a component's instance methods.

```js
class Dog extends React.component {
  render () {
    return (
      <div>Name: {this.props.name}, Breed: {this.props.breed}</div>
    );
  }
};

// renders the HTML `<div>Name: Fido, Breed: Greyhound</div>`

```

In the example above, a new instance of `Dog` is passed `name` and `breed`
properties, which can be read inside the component as `this.props.breed` and
`this.props.name`.

### Immutability of Props

Props are immutable, i.e., they cannot be changed by a component itself.
However, a component can receive new props if its parent re-renders. In that
case, the component will re-render with the new props it received from the
parent.

# State

Unlike props, `this.state` represents the properties of a component that can
change over the course of its life-cycle.

Although a component's state can be defined at initialization, it may also reset
its own state at certain points in its lifecycle using `this.setState()`. Every
time `this.setState()` is called, the component is re-rendered with the new
state. 

```javascript
class WordInput extends React.Component {
  
  constructor() {
    super();
    this.state = {word: ""};
  }

  linkState(key) {
    return (event) => this.setState({[key]: event.currentTarget.value});
  },

  render () {
    return (
      <div>
        <input onChange={this.linkState('word')} value={this.state.word}/>
        <span>The word is: {this.state.word}<span>
      </div>
    );
  }
});
```

In this example `WordInput` has an initial state of `{word: ""}`. When it is
rendered, we register an **event listener** on the `input` via its `onChange`
prop. Whenever the `input` changes its value (via user input), it will call
`onChange`, which in this case is set to the function returned by
`linkState('word'). That function, called a **change handler**, calls
`this.setState()` and sets `this.state.word` to the input's current value. The
component then re-renders with the new state, updating the text inside the
`span`.

Note that because `setState()` triggers a re-render, it cannot be called during
a `render()`, as that would trigger an infinite loop. Here, `setState()` works
because the change handler returned by `linkState()` is called by user-input
*after* the element is rendered.

### When to Use State

State should be used whenever a component must keep track of mutable, internal
data. Most of the time, state will be used for form components. If a piece of
information is never going to change or is needed across the entire app (such as
the `currentUser`), props are preferred.
