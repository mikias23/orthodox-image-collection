import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import imageService  from './imageService'
// Get user from localStorage 

const initialState = {
uploadedImages: null,
isError:false,
isSuccess:false,
isLoading:false,
message:''
}

// register user 

export const upload = createAsyncThunk('/image/upload', async (uploadData, thunkAPI) => {
    try {
       
        return await imageService.uploadData(uploadData)
    }
    catch(error)
    {
        const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
}
)
export const getImage= createAsyncThunk('/image/getImage', async (_,thunkAPI) => {
    try {
        return await imageService.getData()
    }
    catch(error)
    {
        const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
}
)
export const deleteImage= createAsyncThunk('/image/deleteImage', async (id,thunkAPI) => {
    console.log(id)
    try {
        return await imageService.deleteData(id)
    }
    catch(error)
    {
        const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
}
)
export const editImage= createAsyncThunk('/image/editImage', async (data,thunkAPI) => {
  
    try {
        return await imageService.editData(data)
    }
    catch(error)
    {
        const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
}
)


// login



export  const  imageSlice = createSlice({
name:'image',
initialState,
reducers: {
reset: (state) => {
state.isLoading = false
state.isSuccess = false
state.isError = false
state.message = ''
state.uploadedImages = null

}
},
extraReducers:(builder) => {
  builder
    .addCase(upload.pending, (state) => {
        state.isLoading = true
    })
    .addCase(upload.fulfilled, (state,action)=>{
        state.isLoading =false
        state.isSuccess = true
        state.uploadedImages = action.payload;

    })
    .addCase(upload.rejected, (state,action)=>{
        state.isLoading =false
        state.isSuccess = false
        state.message = action.payload
})
.addCase(getImage.pending, (state) => {
    state.isLoading = true
})
.addCase(getImage.fulfilled, (state,action)=>{
    state.isLoading =false
    state.isSuccess = true
    state.uploadedImages= action.payload

})
.addCase(getImage.rejected, (state,action)=>{
    state.isLoading =false
    state.isSuccess = false
    state.message = action.payload
})
.addCase(deleteImage.pending, (state) => {
    state.isLoading = true
})
.addCase(deleteImage.fulfilled, (state,action)=>{
    state.isLoading =false
    state.isSuccess = true
    state.message = action.payload.id
    console.log(action.payload.id)

})
.addCase(deleteImage.rejected, (state,action)=>{
    state.isLoading =false
    state.isSuccess = false
    state.message = action.payload
})
.addCase(editImage.pending, (state) => {
    state.isLoading = true
})
.addCase(editImage.fulfilled, (state,action)=>{
    state.isLoading =false
    state.isSuccess = true


})
.addCase(editImage.rejected, (state,action)=>{
    state.isLoading =false
    state.isSuccess = false
})
   

}

})

export const {reset}  = imageSlice.actions
export default imageSlice.reducer