import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  Section: [],
  City: [],
  Role: [],
  Events : {
    Cityscape : false
  }
};
const Reducer = createSlice({
  name: "Public",
  initialState,
  reducers: {
    SetPublicData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export default Reducer.reducer;
export const { SetPublicData } = Reducer.actions;
