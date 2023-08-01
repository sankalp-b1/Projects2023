import RAddressDto from './RAddressDto';
export default class User{
    constructor(username, password,fullName,  contactNumber, email,alternateMobNumber,rAddress = new RAddressDto('', '', '', '', '', ''), token, id) {
       
        this.fullName = fullName;
        this.username = username;
        this.password = password;
        this.contactNumber = contactNumber;
        this.email = email;
        this.alternateMobNumber = alternateMobNumber;
        this.token = token;
        this.rAddress = new RAddressDto(rAddress.shopNo, rAddress.streetName, rAddress.locality, rAddress.city, rAddress.state, rAddress.pincode);
        this.id = id;
    }

    setAddr(newAddress) {
        this.rAddress = {...this.rAddress, ...newAddress}
      }
    
      
  }

