import React from 'react';
import Header from './Header';

import '../css/style.css';

import '../lib/animate/animate.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import Footer from './Footer';


const PartnerWithUs = () => {
    
return (
    
<div >

<Header />

<br/>
<div className="container-xxl py-5 animated slideInDown">
<div className="container">
  <div className="row g-4 align-items-end mb-4">
    <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
    
    <img className="img-fluid rounded animated slideIn" src="..\..\images\service-1.jpg" />


    </div>

    <div className="col-lg-6 wow fadeInUp animated slideInDown" data-wow-delay="0.3s">
      {/* <p className="d-inline-block border rounded text-primary fw-semi-bold py-1 px-3">About Us</p> */}
      <h1 className="display-5 mb-4">Join us and Grow More </h1>
      <div className="border rounded p-4">
        <nav>
          <div className="nav nav-tabs mb-3" id="nav-tab" role="tablist">

          </div>
        </nav>
        <div className="tab-content " id="nav-tabContent">

          <div className="box ">
            <h4>Benefits of joining:</h4>
            <ul>
              <li>Access to a wide variety of high-quality products from trusted manufacturers</li>
              <li>Competitive pricing and bulk ordering options</li>
              <li>Direct link with manufacturers to ensure a smooth and efficient supply chain</li>
              <li>Opportunities to increase your revenue</li>
            </ul>
          </div>

          <div class="box">
            <p>Our mission is to empower small business owners by providing a platform that streamlines the process of sourcing products. By joining our community, you'll be part of a network of like-minded individuals who are committed to growing their businesses and providing the best products for their customers.</p>
            <p>To join, simply fill out our easy registration form and start browsing our selection of products. We look forward to helping you take your business to the next level.</p>
          </div>
        </div>
      </div>
    </div>
  </div>


  {/* <div><a href='/signup/company' className="btn btn-primary w-200 p animated fadeInUp"  >Click to join</a></div> */}

  <div class="d-flex justify-content-center">
  <a href='/signup/company' className="btn btn-primary btn-lg  my-5 animated fadeInUp" role="button">Click to join</a>
</div>

  
</div>
</div>

<Footer/>
</div>


);
};

export default PartnerWithUs;


