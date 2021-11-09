/* eslint-disable import/no-anonymous-default-export */
import { GET_TABLE_DATA } from "../actions/table";
const INITIAL_STATE = {
  tableData: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_TABLE_DATA:
      return {
        ...state,
        tableData: action.payload,
      };
    default:
      return state;
  }
}
