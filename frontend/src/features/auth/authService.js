import axios from 'axios'
const API_URL   = '/api/admin/'
// Register user 
const signup = async (userData ) => {
    const response = await axios.post(API_URL, userData)
    if(response.data)
    { 
        localStorage.setItem('user', JSON.stringify(response.data))

    }

    return response.data
}

// login

const login = async (userData ) => {
    const response = await axios.post(API_URL + 'login', userData)
    if(response.data)
    { 
        localStorage.setItem('user', JSON.stringify(response.data))

    }

    return response.data
}

const logout = async () => {
    console.log('cleared')
    localStorage.removeItem('user')
    return 1;
}

const authService =  {
   signup,logout, login,
}
export  default authService
