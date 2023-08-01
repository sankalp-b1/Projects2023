import { BASE_API_URL } from '../common/constants';
import axios from 'axios';

const BASE_URL = BASE_API_URL;

class CategoryService {
  
  getCategories(categoryName) {
    console.log(categoryName);
    return axios.get(BASE_URL + '/category/'+ categoryName);
  }

  getNearby(pincode){
    return axios.get(BASE_URL + '/retailStore/'+ pincode);
  }

  // getProductImage(id) {
  //   return axios.get(`${BASE_URL}/${id}/image`, {
  //     responseType: 'blob',
  //   }); //.then(res=>{setPic(URL.createObjectURL(res.data));//console.log(res.data)
  // }
}

export default new CategoryService();
