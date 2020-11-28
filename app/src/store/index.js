import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import rootReducer from './reducers';

export default configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware()],
});
