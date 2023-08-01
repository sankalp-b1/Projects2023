import { useState, useContext, useEffect } from "react";
import { CartContext,UserContext } from './UserContext';
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Cart = () => {

    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);

    const BASE_URL="http://localhost:9090/";

    useEffect(() => {
       if(!user){
        navigate('/home')
       }
       if(user.role === 'company'){
        navigate('/login/retailer');
       }
       if(!cart || cart.length ===0){
        navigate('/retailer/'+user.id+'/home');
       }

      }, []);

      const handlePlaceOrder = () => {
        navigate('/retailer/'+user.id+'/checkout'); //add retailer id in this endpoint
      }

    const calculatePrice = (price, discount) => {
        console.log(price)
        return Number.parseFloat(price) - (Number.parseFloat(price) * (Number.parseFloat(discount) / 100));
    }

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
        if (newCart[index].quantity > 0) {
            newCart[index].quantity -= 1;
        }
        if (newCart[index].quantity === 0) {
            newCart.splice(index, 1);
        }

        sessionStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);
    };

    const getMrp = () =>{
        let mrp = 0;
        cart.map((item) => {
            mrp += item.product.mrp * item.quantity;
        });
        return mrp;
    };

    const getDiscount = () => {
        let discount = 0;
        cart.map((item) => {
            discount += (item.product.discount/100)*item.product.mrp * item.quantity;
        });
        return discount;
    }
    const getTotalPrice = () => {
        if( getMrp() - getDiscount() > 1000){
            return getMrp() - getDiscount();
        }else{
            return getMrp() - getDiscount() + 50; 
        }
    };

    //const temp = cart.map((cartItem) => console.log(cartItem));

    return (
        <div>
            <Header />
            <br />
            <br />
            <br />
            <div className="container">
                <div className="text-center mx-auto">
                    <h1 className="mx-auto">Cart</h1>
                </div>
                <div className="container">
                    <div className="row">

                        <div className="col-md-7 mx-auto p-2 m-2 border rounded">
                            <div className="text-center">
                                <p className="d-inline-block border rounded text-primary fw-semi-bold py-1 px-3">Product List</p>
                            </div>
                            {/* {temp} */}
                            {cart.map((cartItem) =>
                                <div key={cartItem.product.id} className="card">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <img src={BASE_URL +cartItem.product.id +'/image'} className="img-fluid h-100 rounded-start" alt="Product Image" style={{height:'100px',width:'150px'}} />
                                        </div>
                                        <div className="card-body col-md-7">
                                            <h5 className="card-title">{cartItem.product.productName}</h5>
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <p className="card-text"><span className="badge text-bg-light">Price: <span className="text-success">Rs. {calculatePrice(cartItem.product.mrp, cartItem.product.discount)}</span> <span className="text-info" style={{ textDecoration: 'line-through' }}>{cartItem.product.mrp}</span></span> </p>
                                                    <p className="card-text"><span className="badge text-bg-light">Company: <span className="text-warning">{cartItem.product.company.companyName}</span></span> </p>

                                                </div>
                                                <div className="container col-md-5">
                                                    <div className="row">
                                                        <p className="col-5">Quantity</p>
                                                        <button className="btn btn-danger col-2 h-25 border rounded" onClick={() => decrementQuantity(cartItem.product)}>-</button>

                                                        <div className="col-3 text-center">
                                                            <span>{cartItem.quantity}</span>
                                                        </div>

                                                        <button className="btn btn-success h-25 col-2" onClick={() => incrementQuantity(cartItem.product)}>+</button>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col-md-4 mx-auto text-center p-2 m-2 border rounded" style={{ maxHeight: '400px' }}>
                            <p className="d-inline-block border rounded text-primary fw-semi-bold py-1 px-3">Price Details</p>
                            <div className="card m-1">
                                <div className="card-body">
                                    <div className="row">
                                        <p className="card-text col-8"><span className="ml-6" style={{float:'left'}}>MRP: </span></p>
                                        <p className="card-text col-4"><span className="mr-6" style={{float:'right'}}>Rs. {getMrp()}</span></p>
                                    </div>
                                    <div className="row">
                                    <p className="card-text col-8"><span className="ml-6" style={{float:'left'}}>Product Discount: </span></p>
                                        <p className="card-text col-4"><span className="mr-6" style={{float:'right'}}>Rs. {getDiscount()}</span></p>
                                    </div>
                                    <div className="row">
                                         <p className="card-text col-8"><span className="ml-6" style={{float:'left'}}>Delivery Fee: </span></p>
                                        <p className="card-text col-4"><span className="mr-6" style={{float:'right'}}>{getTotalPrice()>1000 ? <span className="text-success">Free</span>: 'Rs. 50'}</span></p>
                                    </div>

                                    <hr />
                                    <div className="row">
                                        <h5 className="card-text text-dark col-8"><span className="ml-6" style={{float:'left'}}>Total Price: </span></h5>
                                        <p className="card-text col-4"><span style={{float:'right'}}>Rs. {getTotalPrice()}</span></p>
                                    </div>

                                    <hr />
                                    <p className="card-text text-success"><span style={{float:'left'}}>You will save Rs. {getDiscount()} on the order.</span></p>
                                </div>

                            </div>  
                            <button onClick={handlePlaceOrder} className="btn btn-warning w-75">Place Order</button>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
};

export default Cart;