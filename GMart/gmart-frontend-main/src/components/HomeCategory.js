import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import '../css/style.css';
import '../css/bootstrap.min.css';
import '../lib/animate/animate.min.css';
import '../lib/owlcarousel/assets/owl.carousel.min.css'


function ProductCategoryCarousel() {

      const navigate = useNavigate();

    const renderCategory= (value) =>{
      //event.preventDefault();
      console.log(value);
      navigate('/category/'+value);
    } ;
  return (
   
      
      <div>
            <div className="container-fluid p-0 mb-5 wow fadeIn" data-wow-delay="0.05s">
            <div class="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: '600px'}}>
                <p class="d-inline-block border rounded text-primary fw-semi-bold py-1 px-3">Categories</p>
            </div>
            <br/>
        <div id="category-carousel" className="carousel project-carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="row carousel-item active">
                <div className="project-item mx-auto pe-5 pb-5 col-md-2 " onClick={ () => renderCategory("GROCERY_STAPLES")} value="GROCERY_STAPLES">
                    <div className="project-img mb-3">
                        <img className="img-fluid border rounded" src="..\..\images\grocery.jpg" alt="" style={{height:'150px', width:'200px'}}/>
                        <a><i className="fa fa-link fa-3x text-primary"></i></a>
                    </div>
                    <div className="project-title">
                        <h5 className="mb-0">Grocery Staples</h5>
                    </div>
                </div>
                <div className="project-item mx-auto pe-5 pb-5 col-md-2" onClick={ () => renderCategory("DAILY_ESSENTIALS")} value="DAILY_ESSENTIALS">
                    <div className="project-img mb-3">
                        <img className="img-fluid border rounded" src="..\..\images\categories\daily_essential.jpg" alt="" style={{height:'150px', width:'200px'}}/>
                        <a><i className="fa fa-link fa-3x text-primary"></i></a>
                    </div>
                    <div className="project-title">
                        <h5 className="mb-0">Daily Essentials</h5>
                    </div>
                </div>
                <div className="project-item mx-auto pe-5 pb-5 col-md-2" onClick={ () => renderCategory("ELECTRONICS")} value="ELECTRONICS">
                    <div className="project-img mb-3">
                        <img className="img-fluid border rounded" src="..\..\images\categories\electronics.jpg" alt="" style={{height:'150px', width:'200px'}}/>
                        <a><i className="fa fa-link fa-3x text-primary"></i></a>
                    </div>
                    <div className="project-title">
                        <h5 className="mb-0">Electronics</h5>
                    </div>
                </div>
                <div className="project-item mx-auto pe-5 pb-5 col-md-2" onClick={ () => renderCategory("PERSONAL_CARE")} value="PERSONAL_CARE">
                    <div className="project-img mb-3">
                        <img className="img-fluid border rounded" src="..\..\images\categories\personal_care.jpg" alt="" style={{height:'150px', width:'200px'}}/>
                        <a><i className="fa fa-link fa-3x text-primary"></i></a>
                    </div>
                    <div className="project-title">
                        <h5 className="mb-0">Personal Care</h5>
                    </div>
                </div>
                <div className="project-item mx-auto pe-5 pb-5 col-md-2" onClick={ () => renderCategory("BED_BATH")} value="BED_BATH">
                    <div className="project-img mb-3">
                        <img className="img-fluid border rounded" src="..\..\images\categories\bed.png" alt="" style={{height:'150px', width:'200px'}}/>
                        <a><i className="fa fa-link fa-3x text-primary"></i></a>
                    </div>
                    <div className="project-title">
                        <h5 className="mb-0">Bed and Bath</h5>
                    </div>
                </div>
                </div>
                <div className="row carousel-item">
                <div className="project-item mx-auto pe-5 pb-5 col-md-2 " onClick={ () => renderCategory("HOME_APPLIANCES")} value="HOME_APPLIANCES">
                    <div className="project-img mb-3">
                        <img className="img-fluid border rounded" src="..\..\images\categories\home_appliances.jpg" alt="" style={{height:'150px', width:'200px'}}/>
                        <a><i className="fa fa-link fa-3x text-primary"></i></a>
                    </div>
                    <div className="project-title">
                        <h5 className="mb-0">Home Appliances</h5>
                    </div>
                </div>
                <div className="project-item mx-auto pe-5 pb-5 col-md-2" onClick={ () => renderCategory("CROCKERY")} value="CROCKERY">
                    <div className="project-img mb-3">
                        <img className="img-fluid border rounded" src="..\..\images\categories\crockery.jpg" alt="" style={{height:'150px', width:'200px'}}/>
                        <a><i className="fa fa-link fa-3x text-primary"></i></a>
                    </div>
                    <div className="project-title">
                        <h5 className="mb-0">Crockery</h5>
                    </div>
                </div>
                <div className="project-item mx-auto pe-5 pb-5 col-md-2 " onClick={ () => renderCategory("FOOTWEAR")} value="FOOTWEAR">
                    <div className="project-img mb-3">
                        <img className="img-fluid border rounded" src="..\..\images\categories\footwear.jpg" alt="" style={{height:'150px', width:'200px'}}/>
                        <a><i className="fa fa-link fa-3x text-primary"></i></a>
                    </div>
                    <div className="project-title">
                        <h5 className="mb-0">Footwear</h5>
                    </div>
                </div>
                <div className="project-item mx-auto pe-5 pb-5 col-md-2" onClick={ () => renderCategory("LUGGAGE")} value="LUGGAGE">
                    <div className="project-img mb-3">
                        <img className="img-fluid border rounded" src="..\..\images\categories\luggage.jpg" alt="" style={{height:'150px', width:'200px'}}/>
                        <a><i className="fa fa-link fa-3x text-primary"></i></a>
                    </div>
                    <div className="project-title">
                        <h5 className="mb-0">Luggage</h5>
                    </div>
                </div>
                <div className="project-item mx-auto pe-5 pb-5 col-md-2" onClick={ () => renderCategory("TOYS_GAMES")} value="TOYS_GAMES">
                    <div className="project-img mb-3">
                        <img className="img-fluid border rounded" src="..\..\images\categories\toys.jpg" alt="" style={{height:'150px', width:'200px'}}/>
                        <a><i className="fa fa-link fa-3x text-primary"></i></a>
                    </div>
                    <div className="project-title">
                        <h5 className="mb-0">Toys and Games</h5>
                    </div>
                </div>
                
               
                </div>
                <div className="row carousel-item">
                <div className="project-item mx-auto pe-5 pb-5 col-md-2 " onClick={ () => renderCategory("KID_APPAREL")} value="KID_APPAREL">
                    <div className="project-img mb-3">
                        <img className="img-fluid border rounded" src="..\..\images\categories\kids.jpg" alt="" style={{height:'150px', width:'200px'}}/>
                        <a><i className="fa fa-link fa-3x text-primary"></i></a>
                    </div>
                    <div className="project-title">
                        <h5 className="mb-0">Kid Apparel</h5>
                    </div>
                </div>
                <div className="project-item mx-auto pe-5 pb-5 col-md-2" onClick={ () => renderCategory("WOMEN_APPAREL")} value="WOMEN_APPAREL">
                    <div className="project-img mb-3">
                        <img className="img-fluid border rounded" src="..\..\images\categories\women.jpg" alt="" style={{height:'150px', width:'200px'}}/>
                        <a href=""><i className="fa fa-link fa-3x text-primary"></i></a>
                    </div>
                    <div className="project-title">
                        <h5 className="mb-0">Women Apparel</h5>
                    </div>
                </div>
                <div className="project-item mx-auto pe-5 pb-5 col-md-2 " onClick={ () => renderCategory("MEN_APPAREL")} value="MEN_APPAREL">
                    <div className="project-img mb-3">
                        <img className="img-fluid border rounded" src="..\..\images\categories\men.jpg" alt="" style={{height:'150px', width:'200px'}}/>
                        <a href=""><i className="fa fa-link fa-3x text-primary"></i></a>
                    </div>
                    <div className="project-title">
                        <h5 className="mb-0">Men Apparel</h5>
                    </div>
                </div>
                <div className="project-item mx-auto pe-5 pb-5 col-md-2" onClick={ () => renderCategory("PLASTIC_CONTAINERS")} value="PLASTIC_CONTAINERS">
                    <div className="project-img mb-3">
                        <img className="img-fluid border rounded" src="..\..\images\categories\plastic.jpg" alt="" style={{height:'150px', width:'200px'}}/>
                        <a href=""><i className="fa fa-link fa-3x text-primary"></i></a>
                    </div>
                    <div className="project-title">
                        <h5 className="mb-0">Plastics and Containers</h5>
                    </div>
                </div>
                <div className="project-item mx-auto pe-5 pb-5 col-md-2" onClick={ () => renderCategory("DAIRY_FROZEN")} value="DAIRY_FROZEN">
                    <div className="project-img mb-3">
                        <img className="img-fluid border rounded" src="..\..\images\categories\frozen.jpg" alt="" style={{height:'150px', width:'200px'}}/>
                        <a href=""><i className="fa fa-link fa-3x text-primary"></i></a>
                    </div>
                    <div className="project-title">
                        <h5 className="mb-0">Daily Frozen</h5>
                    </div>
                </div>
                
               
                </div>
  
               
            </div>
            <button className="carousel-control-prev" style={{width: "2rem"}}  type="button" data-bs-target="#category-carousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" style={{width: "2rem"}} type="button" data-bs-target="#category-carousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    </div>
        </div>
   
  );
}

export default ProductCategoryCarousel;
