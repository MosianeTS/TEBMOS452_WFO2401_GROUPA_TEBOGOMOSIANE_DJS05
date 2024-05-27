// Action creators

const add = () => ({ type: "ADD" });
const subtract = () => ({ type: "SUBTRACT" });
const reset = () => ({ type: "RESET" });

// Initial state
const initialState = { count: 0 };

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {   
    case "ADD":
      return { ...state, count: state.count + 1 };
    case "SUBTRACT":
      return { ...state, count: state.count - 1 };
    case "RESET":
      return { ...state, count: 0 };
    default:
      return state;
  }
};

// Create store function
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
console.log("Initial state:", store.getState().count);

// Subscribe to store updates
const unsubscribe = store.subscribe(() => {
  console.log("State changed:", store.getState().count);
});

// Dispatching actions
store.dispatch(add());
store.dispatch(add());
store.dispatch(subtract());
store.dispatch(reset());

// Unsubscribe from store updates
unsubscribe();
