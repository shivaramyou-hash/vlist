import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: 'en',
  userData: null,
  token: null,
  loading: false,
  error: null,
  isAdmin: false,
  //   apiCall: null,
  //   leaveapiCall: null,
  //   recurringapiCall: null,
  //   sideMenu: [],
};

export const userDetailSlice = createSlice({
  name: 'userDetail',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.token = action.payload.Token;
      state.message = action.payload.message;
      state.userData = action.payload.userData;
      localStorage.setItem('token', action.payload.Token);
      //   localStorage.setItem('orgId', action.payload.userData.orgId);
      //   localStorage.removeItem('email');
    },

    logOut: (state) => {
      state.token = null;
      state.userData = null;
      state.isAdmin = null;
      //   state.apiCall = null;
      //   state.leaveapiCall = null;
      //   state.recurringapiCall = null;
      state.message = null;
      //   state.sideMenu = [];
      localStorage.removeItem('token');
      localStorage.clear();
      //   localStorage.removeItem('orgId');
      //   localStorage.removeItem('email');
      //   localStorage.removeItem('jobId');
    },
    fetchUserData: (state, action) => {
      state.userData = action.payload || {};
    },

    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    // setSideMenu: (state, action) => {
    //   state.sideMenu = action.payload;
    // },
    // setApiCall: (state, action) => {
    //   state.apiCall = action.payload;
    // },
    // setLeaveApiCall: (state, action) => {
    //   state.leaveapiCall = action.payload;
    // },
    // setEarnedApiCall: (state, action) => {
    //   state.recurringapiCall = action.payload;
    // },
  },
  extraReducers: () => {},
});

export const {
  userLogin,
  logOut,
  fetchUserData,
  setIsAdmin,
  //   setApiCall,
  //   setLeaveApiCall,
  //   setEarnedApiCall,
  //   setSideMenu,
} = userDetailSlice.actions;

export default userDetailSlice.reducer;
