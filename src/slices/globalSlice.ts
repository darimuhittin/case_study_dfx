import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Client from '../api/API'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await Client.get('/users')
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    status: 'idle',
    error: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        if (action.error.message != null) {
          state.error = action.error.message
        }
      })
  }
})

export default usersSlice.reducer
