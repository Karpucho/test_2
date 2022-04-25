import axios from 'axios';
import { setFiles } from '../reducers/fileReducer';

export const getFiles = (dirId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:5000/api/files')
      // alert(response.data.message)
      dispatch(setFiles(response.data.user))
      localStorage.setItem('token', response.data.token)
      // console.log(response.data);
    } catch (error) {
      alert(error.response.data.message)
    }
  }
}
