import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react-dom/test-utils";

 export interface CharacterType{
    name: string,
    height: string,
    mass: string,
    hair_color: string
}

export interface StateType{
    characterList: CharacterType[],
    status: string,
    currentPage: number,
    count: number
}


const apiUrl = process.env.REACT_APP_API_URL || '';

const initialState = {characterList: [], status:'idle', currentPage:1, count:0 } as StateType

export const fetchPosts = createAsyncThunk('characters/fetchCharacters', async (page: number) => {
    const response = await axios.get(`${apiUrl}/people/?page=${page}`);
    console.log(response.data.results)
    return  response.data.results
})

export const fetchCount = createAsyncThunk('characters/fetchCharactersCount', async () => {
    const response = await axios.get(`${apiUrl}/people/`);
    console.log("count:", response.data.count)
    return  response.data.count
})

export const charactersSlice = createSlice({
    name:'characters',
    initialState,
    reducers: {
        increment: (state) => {
            state.currentPage += 1
            state.status = 'loading'
        },
        decrement: (state) => {
            state.currentPage -= 1
            state.status = 'loading'
        },
        setPageNumber: (state, action) => {
            state.currentPage = action.payload
            state.status = 'loading'
        },
    },
    extraReducers(builder) {
        builder
          .addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.characterList=(action.payload)
          })
          .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
          })
          .addCase(fetchCount.fulfilled, (state, action) => {
            state.count=(action.payload)
          })
      }
})

export default charactersSlice.reducer

export const { increment, decrement, setPageNumber } = charactersSlice.actions

export const selectAllCharacters = (state: {characters : StateType}) => state.characters.characterList
export const selectStatus = (state: {characters : StateType}) => state.characters.status
export const selectPageNumber = (state: {characters : StateType}) => state.characters.currentPage
export const selectCount = (state: {characters : StateType}) => state.characters.count


