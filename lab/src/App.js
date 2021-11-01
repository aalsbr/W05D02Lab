import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./App.css";
import { decrement, increment, reset } from "./Reducer/Counter";
import { remove, show } from "./Reducer/List";
function App() {
  // To use the function insaid Counter.js
  const dispatcher = useDispatch();
  //to read the value of the data insaid Counter.js
  const mystate = useSelector((state) => {
    return {
      counter: state.counter.counter,
      List: state.List.List,
    };
  });
  //increment use the increment func insaid Counter.js
  const inc = () => {
    dispatcher(increment(1));
  };
  //Decrement use the decrement func insaid Counter.js
  const dec = () => {
    dispatcher(decrement(1));
  };
  //Reset use the reset func insaid Counter.js
  const res = () => {
    dispatcher(reset());
  };

  useEffect(() => {
    axios .get("https://jsonplaceholder.typicode.com/todos/") .then((res) => {
        dispatcher(show(res.data));
      })
  }, []);

  return (
    <div className="App">
      <h1>{mystate.counter}</h1>

      <button onClick={() => inc()}>Increment</button>
      <button onClick={() => dec()}>Decrement</button>
      <button onClick={() => res()}>Reset</button>

      {mystate.List.map((e) => (
        <div>
          <li key={e.id}>{e.title}</li>
          <button onClick={() => dispatcher(remove(e))}>Remove </button>
        </div>
      ))}
    </div>
  );
}

export default App;
