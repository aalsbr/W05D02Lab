const defualtState = {
  List: [],
};

const List = (state = defualtState, { type, payload }) => {
  switch (type) {
    case "Show":
      return { List: payload};
    case "Add":
      return { List: [payload,...state.List ] };
      case "Edit":
        return { List: payload };
    case "Remove":
      return { List: state.List.filter((e) => e.id !== payload.id) };
    default:
      return state;
  }
};
export default List;

export const show = (payload) => {
  return {
    type: "Show",
    payload: payload,
  };
};
export const add = (payload) => {
  return {
    type: "Add",
    payload: payload,
  };
};
export const edit = (payload) => {
  return {
    type: "Edit",
    payload: payload,
  };
};
export const remove = (payload) => {
  return {
    type: "Remove",
    payload: payload,
  };
};
