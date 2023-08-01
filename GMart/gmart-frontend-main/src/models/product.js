export default class Product {
  constructor(productName,mrp,discount,category, description, quantity, image1, id, createTime) {
    this.productName = productName;
    this.mrp = mrp;
    this.discount = discount;
    this.category = category;
    this.description = description;
    this.quantity = quantity;
    this.image1 = image1;
    this.createTime = createTime;
    this.id = id;
    //  this.url = url;
  }
}
