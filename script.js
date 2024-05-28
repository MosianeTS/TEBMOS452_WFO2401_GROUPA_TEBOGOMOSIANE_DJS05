
const initialState = { value: 0 };

const reducer = (state = initialState, action) => {
  switch (action.type) {   
    case "ADD":
      return { ...state, value: state.value + 1 };
    case "SUBTRACT":
      return { ...state, value: state.value - 1 };
    case "RESET":
      return { ...state, value: 0 };
    default:
      return state;
  }
};

const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  // Initialize state
  dispatch({});

  return { getState, dispatch, subscribe };
};



// Create the store
const store = createStore(reducer);

// Logging the initial state
console.log("Initial state:", store.getState().value);

// Subscribe to store updates
const unsubscribe = store.subscribe(() => {
  console.log("State changed:", store.getState().value);
  document.getElementById('display').textContent = store.getState().value
});

// Dispatching actions
document.getElementById('add').addEventListener('click', () => {store.dispatch({ type: "ADD" })});
document.getElementById('subtract').addEventListener('click', () => {store.dispatch({ type: "SUBTRACT" }); console.log("Yeah")});
document.getElementById('reset').addEventListener('click', () => store.dispatch({ type: "RESET" }));


