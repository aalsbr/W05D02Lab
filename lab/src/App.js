import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./App.css";
import { decrement, increment, reset } from "./Reducer/Counter";
import { add, remove, show, edit } from "./Reducer/List";
function App() {
  //Add input text
  const [vlaue, setValue] = useState("");
  //Edit input text
  const [evlaue, seteValue] = useState("");
  //Index to store index value  for edting
  const [index, seteIndex] = useState([]);

  //open , close input box for edting
  const [display, setDisplay] = useState(true);
  // To use the function insaid Counter.js
  const dispatcher = useDispatch();
  //to read the value of the data insaid Counter.js state tree > Reducer file > the state
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
  //Add Button Clicked
  const handelAdd = () => {
    if (vlaue == "") return alert("Enter Title ");
    dispatcher(add({ id: mystate.List.length + 1, title: vlaue }));
    setValue("");
  };
  //Change Button Clicked
  const handelEdit = () => {
    if (index !== null) {
      let temp = [...mystate.List];
      temp[index].title = evlaue;
      dispatcher(edit(temp));
      seteIndex(null);
      setDisplay(true);
      seteValue("");
    }
  };
  //get the data from api and store it in redux store
  const fetchApi = async () => {
    const data = await axios.get("https://jsonplaceholder.typicode.com/todos/");
    dispatcher(show(data.data));
  };
  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="App">
      <h1>Counter</h1>
      <h1>{mystate.counter}</h1>
      <button onClick={() => inc()}>+</button>
      <button onClick={() => dec()}>-</button>
      <button onClick={() => res()}>Reset</button>
      <hr />
      <h1>To Do List</h1>
      <input
        type="text"
        placeholder="Enter List"
        value={vlaue}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => handelAdd()}>Add</button>
      <input
        type="text"
        placeholder="Choos a  List"
        readOnly={display}
        value={evlaue}
        onChange={(e) => seteValue(e.target.value)}
      />
      <button onClick={() => handelEdit()}>edit</button>

      <div className="mycontainer">
        {mystate.List.map((e, i) => (
          <div className="chield">
            <h4 className="h4Gap" key={e.id}>
              {e.title}
            </h4>
            <hr />
            <button
              onClick={() => (
                seteIndex(i), seteValue(e.title), setDisplay(false)
              )}
            >
              Edit{" "}
            </button>
            <button onClick={() => dispatcher(remove(e))}>Remove </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
