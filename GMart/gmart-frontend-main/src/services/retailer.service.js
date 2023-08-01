import { BASE_API_URL } from '../common/constants';
import axios from 'axios';

const BASE_URL = BASE_API_URL;

class RetailerService {
  login(user) {
    return axios.post(BASE_URL + '/login/retailer', user);
  }

  register(user) {
    console.log(user);
    return axios.post(BASE_URL + '/signup/retailer', user);
  }

  getOrders(id){
    return axios.get(BASE_URL + '/retailer/' + id + '/myOrder');
  }

  getCategories(categoryName) {
    console.log(categoryName);
    return axios.get(BASE_URL + '/category/'+ categoryName); //change url
  }

  getAddress(id){
    return axios.get(BASE_URL + '/retailer/' + id + '/listOfAddress');
  }

  saveAddress(id, address){
    return axios.post(BASE_URL + '/retailer/' + id + '/addNewAddress', address);
  }

  editAddress(id, address){
    console.log(address);
    return axios.put(BASE_URL + '/retailer/' + id + '/address/' + address.id, address);
  }

  order(id, cart){
    return axios.post(BASE_URL + '/retailer/' + id + '/createAnOrder', cart);
  }
  update(user){
    return axios.put(BASE_URL + '/retailer/'+ user.id +'/myAccount/edit',user);
}
editAddress(address,id){
  return axios.put(BASE_URL + '/retailer/'+id+'/address/'+address.id,address);
}

deleteAddress(addressId,id){
  return axios.delete(BASE_URL + '/retailer/'+id+'/address/'+addressId);
}

deleteAccount(id){
  return axios.delete(BASE_URL + '/retailer/'+id+'/');
}
}

export default new RetailerService();
