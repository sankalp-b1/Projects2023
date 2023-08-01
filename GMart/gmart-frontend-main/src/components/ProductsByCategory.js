import RetailerService from "../services/retailer.service";
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState,useContext } from 'react';
import { UserContext,CartContext } from './UserContext';
import Header from './Header';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';

const ProductsByCategory = () => {

  const { user, setUser } = useContext(UserContext);
  const {cart, setCart} = useContext(CartContext);
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProduct] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortingOrder, setSortingOrder] = useState("ascending");

  const BASE_URL="http://localhost:9090/";


  useEffect(() => {
    //console.log("in category use effect");
    RetailerService.getCategories(categoryName).then((response) => {
      setProduct(response.data);
      setSortedProducts(response.data);
    });
  }, []);



  const handleClick = (product) => {
    //console.log(event.target.value);
    if(user === null){
      navigate("/login/retailer", { state: { from: "homeBuyNow", prod: product } });
    }else{
      if(!addedInCart(product)){
        const newCart = [...cart, {product:product, quantity:1}];
        sessionStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);
      }
      navigate('/retailer/'+user.id+'/cart');
    }
    
  };

  const handleCart = (product) => {
    console.log(product);
    const newCart = [...cart, {product:product, quantity:1}];
    sessionStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);

  };

  const addedInCart = (product) => {
    //console.log(product);
    let flag = false;
    cart.forEach(element => {
      // console.log(element.product.id);
      // console.log(product.id);
      if(element.product.id === product.id ) {
        //console.log("in if condition");
        flag = true;
      }
    });
    return flag;
  };


  const incrementQuantity = (product) => {
    const newCart = [...cart];
    const index = newCart.findIndex((item) => item.product.id === product.id);
    newCart[index].quantity += 1;
    sessionStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };

  const decrementQuantity = (product) => {
    const newCart = [...cart];
    const index = newCart.findIndex((item) => item.product.id === product.id);
    if(newCart[index].quantity > 0){
      newCart[index].quantity -= 1;
    }
    if(newCart[index].quantity === 0){
      newCart.splice(index, 1);
    }
    
    sessionStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };


  const getProductQuantityFromCart = (prodId) => {
    let quantity = 0;
    cart.forEach(element => {
      // console.log(element.product.id);
      // console.log(product.id);
      if(element.product.id === prodId) {
        //console.log("in if condition");
        quantity = element.quantity;
      }
    });
    return quantity;
  };
  const calculatePrice = (price, discount) => {
    //console.log(price)
    return Number.parseFloat(price) - (Number.parseFloat(price) * (Number.parseFloat(discount) / 100));
  }

  const handleSortByName = () => {
    const newSortingOrder = sortingOrder === "ascending" ? "descending" : "ascending";
    const sorted = sortedProducts.sort((a, b) => {
      if (sortingOrder === "ascending") {
        return a.productName.localeCompare(b.productName);
      } else {
        return b.productName.localeCompare(a.productName);
      }
    });
    setSortingOrder(newSortingOrder);
    setSortedProducts(sorted);
  };

  const handleSortByCompany = () => {
    const newSortingOrder = sortingOrder === "ascending" ? "descending" : "ascending";
    const sorted = sortedProducts.sort((a, b) => {
      if (sortingOrder === "ascending") {
        return a.company.companyName.localeCompare(b.company.companyName);
      } else {
        return b.company.companyName.localeCompare(a.company.companyName);
      }
    });
    setSortingOrder(newSortingOrder);
    setSortedProducts(sorted);
  };

  const handleSortByPrice = () => {
    const newSortingOrder = sortingOrder === "ascending" ? "descending" : "ascending";
    const sorted = sortedProducts.sort((a, b) => {
      if (sortingOrder === "ascending") {
        return a.mrp - b.mrp;
      } else {
        return b.mrp - a.mrp;
      }
    });
    setSortingOrder(newSortingOrder);
    setSortedProducts(sorted);
  };


  const handleSortByDiscount = () => {
    const newSortingOrder = sortingOrder === "ascending" ? "descending" : "ascending";
    const sorted = sortedProducts.sort((a, b) => {
      if (sortingOrder === "ascending") {
        return a.discount - b.discount;
      } else {
        return b.discount - a.discount;
      }
    });
    setSortingOrder(newSortingOrder);
    setSortedProducts(sorted);
  };


 


  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <div className="text-center mx-auto" style={{ maxWidth: '600px' }}>
        <p className="d-inline-block border rounded text-primary fw-semi-bold py-1 px-3">Product List</p>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-3 mx-auto">
            <h5>Sort By</h5>
          </div>
          <div className="col-md-2">
            <button type="button" className="btn btn-link text-dark" onClick={handleSortByName}>Product Name <span>&#8593;</span> <span>&#8595;</span></button>
          </div>
          <div className="col-md-2">
            <button type="button" className="btn btn-link text-dark" onClick={handleSortByPrice}>Price <span>&#8593;</span> <span>&#8595;</span></button>
          </div>
          <div className="col-md-2">
            <button type="button" className="btn btn-link text-dark" onClick={handleSortByDiscount} >Discount <span>&#8593;</span> <span>&#8595;</span></button>
          </div>
          <div className="col-md-2">
            <button type="button" className="btn btn-link text-dark" onClick={handleSortByCompany} >Company Name <span>&#8593;</span> <span>&#8595;</span></button>
          </div>
        </div>
      </div>
      <div className="container">
        {sortedProducts.map(product =>
          <div key={product.id} className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img src={BASE_URL +product.id +'/image'}  className="img-fluid rounded-start" style={{width:'225px',height:'225px'}} alt="Product Image" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{product.productName}</h5>
                  <div className="row">
                    <div className="col-md-5">
                      <p className="card-text"><span className="badge text-bg-secondary">Price: <span className="text-warning">Rs. {calculatePrice(product.mrp, product.discount)}</span> <span className="text-info" style={{ textDecoration: 'line-through' }}>{product.mrp}</span></span> </p>
                      <p className="card-text"><span className="badge text-bg-secondary">Discount: <span className="text-warning">{product.discount}</span></span> </p>
                      <p className="card-text"><span className="badge text-bg-secondary">Company: <span className="text-warning">{product.company.companyName}</span></span> </p>

                    </div>
                    <div className="col-md-6">
                      <div className="card-text">
                        {product.description}
                        <br />
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <button onClick={()=>handleClick(product)} className="btn btn-outline-dark col-3  mx-auto" value={product.id}>Buy Now</button>
                    {user !== null && !addedInCart(product) ? <button onClick={()=>handleCart(product)} className="btn btn-outline-dark col-3  mx-auto" value={product.id}>Add to Cart</button>:''}
                    {user !== null && addedInCart(product)  ? <div className="container col-3 mx-auto">
                                                    <div className="row">
                                                        <button onClick={() => decrementQuantity(product)} className="btn btn-danger col-2 h-25 border rounded">-</button>

                                                        <div className="col-3 text-center">
                                                            <span>{getProductQuantityFromCart(product.id)}</span>
                                                        </div>

                                                        <button onClick={() => incrementQuantity(product)} className="btn btn-success h-25 col-2">+</button>

                                                    </div>
                                                </div> :''}
                    
                    <button type="button" className="btn btn-outline-info col-md-3 mx-auto" data-bs-toggle="modal" data-bs-target={`#exampleModal${product.id}`}>Product Details</button>
                   
                    <div  className="modal fade" id={`exampleModal${product.id}`} tabIndex={-1} role="dialog" aria-labelledby={`exampleModalLabel${product.id}`} aria-hidden="true">
                      <div className="modal-dialog modal-dialog-scrollable" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title fs-5" id={`exampleModalLabel${product.id}`}>{product.productName}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                              
                            </button>
                          </div>
                          <div className="modal-body">
                            <p>Price: {product.mrp}</p>
                            <p>Discount: {product.discount}</p>
                            <p>Final Price: {calculatePrice(product.mrp,product.discount)}</p>
                            <p>Description: {product.description}</p>
                           
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* <div className="modal fade" id="myModal" style={{ display: "none" }}>
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modelLabel"></h1>
              <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>&times;</button>
            </div>

            <div className="modal-body" id="modelBody">
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary " data-dismiss="modal" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      </div>
       */}

      <Footer />


    </div>
  );
}

export default ProductsByCategory;