import axios from 'axios'
const API_URL   = '/api/images'


// Register user 
const uploadData = async (uploadData) => {
    const response = await axios({
        url: API_URL,
        method: 'POST',
        data: uploadData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
    
      

    return response.data
}
const getData = async () => {
  const response = await axios.get(
      API_URL
      
    );
    return response.data;
  
  }



const deleteData = async (id) => {
  const response = await axios({
    url:'http://localhost:5000/api/images/delete', 
    method: 'POST',
    data: {id:id},
    headers: {
      Accept: 'application/json',
    },
  });

  return response.data;
   
    
    }

const editData = async ( data) => {
  const response = await axios({
    url:'http://localhost:5000/api/images/edit', 
    method: 'POST',
    data: data,
    headers: {
      Accept: 'application/json',
    },
  });

  return response.data;
   
    
    }
const authService =  {
 uploadData, getData, deleteData, editData
}
export default authService
