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
const phone = async () => {
    const response = await axios.get(API_URL + 'phone')
   
    return response.data
}
const changepassword = async (newPassword) => {
    console.log(newPassword)
    const response = await axios.post(API_URL + 'changePassword', newPassword)
    if(response.data)
    {     console.log(response.data)

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
   signup,logout, login,phone, changepassword
}
export  default authService
