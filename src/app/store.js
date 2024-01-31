import { configureStore } from '@reduxjs/toolkit'
import charactersReducer from '../features/characters/charactersSlice.ts'

export default configureStore({
  reducer: {
    characters: charactersReducer
  }
})