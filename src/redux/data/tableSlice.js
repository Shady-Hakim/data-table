import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../api/client';

const initialState = {
  data: [],
  dataStatus: 'idle',
  dataError: null,
};
export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await client.get('/a2fbc23e-069e-4ba5-954c-cd910986f40f');
  return response.data;
});

// export const fetchSingleEvent = createAsyncThunk(
//   'events/fetchSingleEvent',
//   async (id) => {
//     const response = await client.get(`/api/events/${id}`);
//     return response.data;
//   }
// );
const selectAllData = (state) => state.data.data;
// const selectEvent = (state) => state.events.event;

const selectDataByItem = (state, name) =>
  state.data.data.map((item) => item[name]);
// console.log(state.data.data.map((item) => item[name]));

export const tableSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    // readEvents: (state, action) => {
    //   state.events = events;
    // },
    // readById: (state, action) => {
    //   state.event = events.find((event) => event.slug === action.payload);
    // },
  },
  extraReducers(builder) {
    builder.addCase(fetchData.pending, (state, action) => {
      state.dataStatus = 'loading';
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.dataStatus = 'succeeded';
      state.data = action.payload.result.auditLog;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.dataStatus = 'failed';
      state.dataError = action.error.message;
    });
  },
});

// Action creators are generated for each case reducer function
// export const { readEvents, readById } = tableSlice.actions;

export { selectAllData, selectDataByItem };

export default tableSlice.reducer;
