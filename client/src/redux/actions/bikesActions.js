import { message } from 'antd';
import axios from 'axios';
const api = axios.create({
    baseURL: "https://bikeridingventure.onrender.com/",
    // baseURL: "http://localhost:5000",
  });
export const getAllBikes=()=>async dispatch=>{

    dispatch({type: 'LOADING' , payload:true})

    try {
        const response = await api.get('/api/bikes/getallbikes')
        dispatch({type: 'GET_ALL_BIKES', payload:response.data})
        dispatch({type: 'LOADING' , payload:false})
    } catch (error) {
        console.log(error)
        dispatch({type: 'LOADING' , payload:false})
    }

}

export const addBike=(reqObj)=>async dispatch=>{

    dispatch({type: 'LOADING' , payload:true})

    try {
         await api.post('/api/bikes/addbike' , reqObj)
       
         dispatch({type: 'LOADING' , payload:false})
         message.success('New bike added successfully')
         setTimeout(() => {
            window.location.href='/admin'
         }, 500);
    } catch (error) {
        console.log(error)
        dispatch({type: 'LOADING' , payload:false})
    }
      

}

export const editBike=(reqObj)=>async dispatch=>{

    dispatch({type: 'LOADING' , payload:true})

    try {
         await api.post('/api/bikes/editbike' , reqObj)
       
         dispatch({type: 'LOADING' , payload:false})
         message.success('Bike details updated successfully')
         setTimeout(() => {
            window.location.href='/admin'
         }, 500);
    } catch (error) {
        console.log(error)
        dispatch({type: 'LOADING' , payload:false})
    }
      

}

export const deleteBike=(reqObj)=>async dispatch=>{

    dispatch({type: 'LOADING' , payload:true})

    try {
         await api.delete('/api/bikes/deletebike/'+reqObj.bikeid)
       
         dispatch({type: 'LOADING' , payload:false})
         message.success('Bike deleted successfully')
         setTimeout(() => {
            window.location.reload()
         }, 500);
    } catch (error) {
        console.log(error)
        dispatch({type: 'LOADING' , payload:false})
    }
}


