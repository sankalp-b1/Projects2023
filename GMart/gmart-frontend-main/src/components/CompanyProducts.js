import CompanyService from "../services/company.service";
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from './UserContext';
import Product from '../models/product';


const CompanyProducts = () => {

    const { companyId } = useParams();
    const [product, setProduct] = useState(new Product('', '', '', '', '', '', ''));
    const [eproduct, setEproduct] = useState(new Product('', '', '', '', '', '', '', null));
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [sortingOrder, setSortingOrder] = useState("ascending");
    const [image, setImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');
    

    useEffect(() => {
        if (user) {
            if (user.role === 'company') {
                CompanyService.getProducts(companyId).then((response) => {
                    setProducts(response.data);
                    setSortedProducts(response.data);
                })
                    .catch(error => console.error(error));
            }
            else {
                navigate('/company/login');
            }
        } else {
            navigate('/company/login');
        }

    }, []);

    const saveProduct = (e) => {
        e.preventDefault();

        console.log(product);

        if (!product.productName || !product.description || !product.mrp || !product.category || !product.quantity || !product.discount) {
            return;
        }
        //no field validation errs , proceed to saving a product

        CompanyService.saveProduct(companyId, product).then(response => {
            //no errs in saving basic product details --proceed to image upload
            console.log("saved product " + response.data.id + " " + image);
            CompanyService.uploadProductImage(companyId, image, response.data.id).then(data => {
                console.log("Image Uploaded !!");
                setShowModal(false);
                setProducts([...products, product]);
                setSortedProducts([...products, product]);
                setProduct(new Product('', '', '', '', '', '', ''));
            }).catch(error => {
                //    console.error("Error in uploading image")
                console.log(error)
            })

        }).catch(err => {
            console.log(err);
        });
    };

    const handleChange = (e) => {
        
        const { name, value } = e.target;

        setProduct((prevState => {
            return {
                ...prevState,
                [name]: value
            };
        }));
    };

    const editProduct = (e) => {
        e.preventDefault();

        console.log(eproduct);

        if (!eproduct.id || !eproduct.productName || !eproduct.description || !eproduct.mrp || !eproduct.category || !eproduct.quantity || !eproduct.discount) {
            return;
        }
        
        const element = document.querySelector(`#msg`);     

        CompanyService.editProduct(companyId, eproduct).then(response => {
            //no errs in saving basic product details --proceed to image upload
            console.log("updated product ");


            setMessage("Data Updated Successfully");
            element.innerHTML = message;
            setProducts(products.map((product) => {
                if (product.id === eproduct.id) {
                  return eproduct;
                } else {
                  return product;
                }
              }));
              setSortedProducts(sortedProducts.map((product) => {
                if (product.id === eproduct.id) {
                  return eproduct;
                } else {
                  return product;
                }
              }));
            //setShowModal(false);        

        }).catch(err => {
            console.log(err);
            setMessage(err.message);
            element.innerHTML = message;
        });
    };

    const handleEditChange = (event) => {
        const { name, value } = event.target;
        //console.log("in handleEditChange");
        //console.log(eproduct);
        setEproduct((prevState => {
            return {
                ...prevState,
                [name]: value
            };
        }));
        console.log(eproduct);
    };

    function handleCategoryChange(e) {
        console.log('Category updated:', e.target.value);
        setProduct({ ...product, category: e.target.value });
    }

    //handling file change event
    const handleFileChange = (event) => {
        console.log(event.target.files[0]);
        setImage(event.target.files[0]);
    }

    const handleDelete = (prodId) => {
        CompanyService.deleteProduct(companyId, prodId)
            .then((response) => {
                console.log(response.data);
                setProducts(products.filter(product => product.id !== prodId));
                setSortedProducts(products.filter(product => product.id !== prodId));
            })

            .catch(error => console.error(error));

    };
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

    const handleSortByQuantity = () => {
        const newSortingOrder = sortingOrder === "ascending" ? "descending" : "ascending";
        const sorted = sortedProducts.sort((a, b) => {
            if (sortingOrder === "ascending") {
                return a.quantity - b.quantity;
            } else {
                return b.quantity - a.quantity;
            }
        });
        setSortingOrder(newSortingOrder);
        setSortedProducts(sorted);
    };
    const handleSortByCategory = () => {
        const newSortingOrder = sortingOrder === "ascending" ? "descending" : "ascending";
        const sorted = sortedProducts.sort((a, b) => {
            if (sortingOrder === "ascending") {
                return a.category.localeCompare(b.category);
            } else {
                return b.category.localeCompare(a.category);
            }
        });
        setSortingOrder(newSortingOrder);
        setSortedProducts(sorted);

    };

    function handleShowModal() {
        setShowModal(true);
    }
    function handleCloseModal() {
        setShowModal(false);
    }
    return (
        <div className="container">
            <div className="row">
                <h2 className="my-4 col-8">Product List</h2>
                <div className="my-4 col-4" >
                    <button onClick={handleShowModal} className="btn btn-primary w-50" style={{ float: 'right' }}>Add Product</button>
                    <div className={`modal fade ${showModal ? 'show' : ''}`} id="addProduct" tabIndex={-1} role="dialog" style={{ display: showModal ? 'inherit' : 'none' }} aria-labelledby="addProductLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-scrollable" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title fs-5" id="addProductLabel">Product Details</h5>
                                    <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close">

                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={(e) => saveProduct(e)}>
                                        <div className="mb-1 form-group">
                                            <label htmlFor="productName" className="col-form-label">Product Name:</label>
                                            <input
                                                type="text"
                                                name="productName"
                                                placeholder="Product Name"
                                                className="form-control"
                                                value={product.productName}
                                                onChange={(e) => handleChange(e)}
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                Product Name is required.
                                            </div>
                                        </div>
                                        <div className="mb-1 form-group">
                                            <label htmlFor="mrp" className="col-form-label">Price:</label>
                                            <input
                                                type="text"
                                                name="mrp"
                                                placeholder="Price"
                                                className="form-control"
                                                value={product.mrp}
                                                onChange={(e) => handleChange(e)}
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                Price is required and should be greater than 0.
                                            </div>
                                        </div>
                                        <div className="mb-1">
                                            <label htmlFor="category" className="col-form-label">Category:</label>
                                            <select className="form-control" id="category" value={product.category} name="category" onChange={handleCategoryChange} >
                                                <option value="">Select Category</option>
                                                <option value="GROCERY_STAPLES">Grocery Staples</option>
                                                <option value="DAILY_ESSENTIALS">Daily Essential</option>
                                                <option value="ELECTRONICS">Electronics</option>
                                                <option value="PERSONAL_CARE">Personal Care</option>
                                                <option value="BED_BATH">Bed and Bath</option>
                                                <option value="HOME_APPLIANCES">Home Appliances</option>
                                                <option value="CROCKERY">Crockery</option>
                                                <option value="FOOTWEAR">Footwear</option>
                                                <option value="LUGGAGE">Luggage</option>
                                                <option value="TOYS_GAMES">Toys and Games</option>
                                                <option value="HOME_APPLIANCES">Home Appliances</option>
                                                <option value="KID_APPAREL">Kids Apparel</option>
                                                <option value="WOMEN_APPAREL">Women Apparel</option>
                                                <option value="MEN_APPAREL">Men Apparel</option>
                                                <option value="PLASTIC_CONTAINERS">Plastics and Container</option>
                                                <option value="DAIRY_FROZEN">Daily Frozen</option>

                                            </select>
                                        </div>
                                        <div className="mb-1 form-group">
                                            <label htmlFor="discount" className="col-form-label">Discount:</label>
                                            <input
                                                type="text"
                                                name="discount"
                                                placeholder="Discount"
                                                className="form-control"
                                                value={product.discount}
                                                onChange={(e) => handleChange(e)}
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                Discount is required and should be greater or equal to 0.
                                            </div>
                                        </div>
                                        <div className="mb-1 form-group">
                                            <label htmlFor="quantity" className="col-form-label">Stock Quantity:</label>
                                            <input
                                                type="text"
                                                name="quantity"
                                                placeholder="Quantity"
                                                className="form-control"
                                                value={product.quantity}
                                                onChange={(e) => handleChange(e)}
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                Quantity is required and should be greater than or equal to 0.
                                            </div>
                                        </div>
                                        <div className="mb-1 form-group">
                                            <label htmlFor="image1" className="col-form-label">Select Product Image: </label>
                                            <input name="image1" type="file" placeholder='Image Here' className="form-control" onChange={handleFileChange} />
                                        </div>
                                        <div className="mb-1 form-group">
                                            <label htmlFor="description" className="col-form-label">Description:</label>
                                            <textarea
                                                name="description"
                                                placeholder="Add description"
                                                className="form-control"
                                                value={product.description}
                                                onChange={(e) => handleChange(e)}
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                Description is required.
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                                            <button type="submit" className="btn btn-primary">Add Product</button>
                                        </div>
                                    </form>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th onClick={handleSortByName}>Product Name <span>&#8593;</span> <span>&#8595;</span></th>
                        <th onClick={handleSortByPrice}>Price <span>&#8593;</span> <span>&#8595;</span></th>
                        <th onClick={handleSortByDiscount}>Discount <span>&#8593;</span> <span>&#8595;</span></th>
                        <th onClick={handleSortByCategory}>Category <span>&#8593;</span> <span>&#8595;</span></th>
                        <th onClick={handleSortByQuantity}>Quantity <span>&#8593;</span> <span>&#8595;</span></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {sortedProducts.map(product => (
                        <tr key={product.id}>
                            <td>{product.productName}</td>
                            <td>{product.mrp}</td>
                            <td>{product.discount}</td>
                            <td>{product.category}</td>
                            <td>{product.quantity}</td>
                            <td><button className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#exampleModal${product.id}`} onClick={() => setEproduct(product)}>Edit</button>
                                <div className="modal fade" id={`exampleModal${product.id}`} tabIndex={-1} role="dialog" aria-labelledby={`exampleModalLabel${product.id}`} aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-scrollable" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title fs-5" id={`exampleModalLabel${product.id}`}>{product.productName}</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">

                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <form onSubmit={(e) => editProduct(e)}>
                                                    <div className="mb-1 form-group text-info" id="msg"></div>
                                                    <div className="mb-1 form-group">
                                                        <label htmlFor="productName" className="col-form-label">Product Name:</label>
                                                        <input
                                                            type="text"
                                                            name="productName"
                                                            placeholder="Product Name"
                                                            className="form-control"
                                                            value={eproduct.productName}
                                                            required
                                                            disabled
                                                        />
                                                        <div className="invalid-feedback">
                                                            Product Name is required.
                                                        </div>
                                                    </div>
                                                    <div className="mb-1 form-group">
                                                        <label htmlFor="mrp" className="col-form-label">Price:</label>
                                                        <input
                                                            type="text"
                                                            name="mrp"
                                                            placeholder="Price"
                                                            className="form-control"
                                                            value={eproduct.mrp}
                                                            onChange={(e) => handleEditChange(e)}
                                                            required
                                                        />
                                                        <div className="invalid-feedback">
                                                            Price is required and should be greater than 0.
                                                        </div>
                                                    </div>
                                                    <div className="mb-1 form-group">
                                                        <label htmlFor="discount" className="col-form-label">Discount:</label>
                                                        <input
                                                            type="text"
                                                            name="discount"
                                                            placeholder="Discount"
                                                            className="form-control"
                                                            value={eproduct.discount}
                                                            onChange={(e) => handleEditChange(e)}
                                                            required
                                                        />
                                                        <div className="invalid-feedback">
                                                            Discount is required and should be greater or equal to 0.
                                                        </div>
                                                    </div>
                                                    <div className="mb-1 form-group">
                                                        <label htmlFor="quantity" className="col-form-label">Stock Quantity:</label>
                                                        <input
                                                            type="text"
                                                            name="quantity"
                                                            placeholder="Quantity"
                                                            className="form-control"
                                                            value={eproduct.quantity}
                                                            onChange={(e) => handleEditChange(e)}
                                                            required
                                                        />
                                                        <div className="invalid-feedback">
                                                            Quantity is required and should be greater than or equal to 0.
                                                        </div>
                                                    </div>
                                                    <div className="mb-1 form-group">
                                                        <label htmlFor="description" className="col-form-label">Description:</label>
                                                        <textarea
                                                            name="description"
                                                            placeholder="Add description"
                                                            className="form-control"
                                                            value={eproduct.description}
                                                            onChange={(e) => handleEditChange(e)}
                                                            required
                                                        />
                                                        <div className="invalid-feedback">
                                                            Description is required.
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                                                        <button type="submit" className="btn btn-primary">Update Product</button>
                                                    </div>
                                                </form>
                                            </div>

                                        </div>
                                    </div>
                                </div></td>
                            <td><button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CompanyProducts;