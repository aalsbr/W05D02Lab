const defualtState = {
  counter: 0,
};

const counter = (state = defualtState, { payload, type }) => {
  switch (type) {
    case "inc":
      return { counter: state.counter + payload };
    case "dec":
      return { counter: state.counter - payload };
    case "res":
      return { counter: 0 };

    default:
      return state;
  }
};

export default counter;
//Actions
export const increment = (payload) => {
  return {
    type: "inc",
    payload: payload,
  };
};
export const decrement = (payload) => {
  return {
    type: "dec",
    payload: payload,
  };
};
export const reset = () => {
  return {
    type: "res",
  };
};
