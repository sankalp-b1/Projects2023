export default class Feed {
    constructor( id, name, emailId, phoneNo, role, rating, description) {
      this.emailId = emailId;
      this.phoneNo = phoneNo;
      this.name = name;
      this.role = role;
      this.rating = rating;
      this.description = description;
      this.id = id;
    }
  }