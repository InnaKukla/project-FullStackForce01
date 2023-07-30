import { createSlice } from '@reduxjs/toolkit';
import newsOperations from './operations';

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    items: [],
    error: null,
    currentPage: 1,
    pattern: '',
    perPage: 6,
    totalPages: 0,
  },
  extraReducers: {
    [newsOperations.fetchNews.fulfilled](state, action) {
      state.error = null;
      const { news, totalCount } = action.payload;
      state.items = news.sort((a, b) => new Date(b.date) - new Date(a.date));
      state.totalPages = Math.ceil(totalCount / state.perPage);
    },
    [newsOperations.setPattern.fulfilled](state, action) {
      state.error = null;
      state.pattern = action.payload;
    },
    [newsOperations.setCurrentPage.fulfilled](state, action) {
      state.error = null;
      state.currentPage = action.payload;
    },
  },
});

export default newsSlice.reducer;
