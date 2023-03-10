import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IP_ADDRESS } from "../ip";
export const userSlice = createSlice({
  name: "usersgetprofile",
  initialState: {
    list: {}
  },
  reducers: {
    // action
    setProfileData: (state, action) => {
      state.list = action.payload;
    }
  }
});

export const { setProfileData } = userSlice.actions;

export const getprofileData = () => (dispatch) => {
    let accessToken=localStorage.getItem('prodymeApiToken')
  axios
    .get(`${IP_ADDRESS}getprofile/`,{
        headers: { Authorization: `Token ${accessToken}` }
    })
    .then((response) => {
      dispatch(setProfileData(response.data.data));
    })
    .catch((error) => console.log(error));
};

export default userSlice.reducer;
