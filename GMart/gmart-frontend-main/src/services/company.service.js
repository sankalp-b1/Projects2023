import { BASE_API_URL } from '../common/constants';
import axios from 'axios';

const BASE_URL = BASE_API_URL;

class CompanyService {
  login(user) {
    return axios.post(BASE_URL + '/login/company', user);
  }

  register(user) {
    return axios.post(BASE_URL + '/signup/company', user);
  }

  getProducts(id) {
    //console.log('getProduct', id);
    return axios.get(BASE_URL + '/company/' + id + "/");
  }

  deleteProduct(id, prodId) {
   // console.log('deleteProduct', id);
    return axios.delete(BASE_URL + '/company/' + id + "/product/" + prodId);
  }

  saveProduct(id,product) {
    return axios.post(BASE_URL + '/company/' + id + "/add", product);
  }

  editProduct(id,product) {
    return axios.put(BASE_URL + '/company/' + id + '/product/' + product.id , product);
  }

  //upload product image
  uploadProductImage(id, image, productId) {
    let formData = new FormData();
    formData.append('image', image);
    console.log('in upload img ' + formData + ' ' + productId);
    console.log(formData.get('image'));
    return axios
      .post(BASE_URL + '/company/' + id  +'/'+ productId + '/image', formData,  {headers: {'Content-Type': 'multipart/form-data'}})
      .then((response) => response.data);
  }

  getDetails(id){
    return axios.get(BASE_URL + '/company/' + id + '/myAccount');
  }
  
  updateDetails(id, user){
    return axios.put(BASE_URL + '/company/' + id + '/myAccount/edit', user);
  }
  
  deleteDetails(id){
    return axios.delete(BASE_URL + '/company/' + id + '/deleteAccount');
  }

}

export default new CompanyService();
