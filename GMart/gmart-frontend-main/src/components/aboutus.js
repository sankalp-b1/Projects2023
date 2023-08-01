import React from 'react';
import Header from './Header';

import '../css/style.css';
//import image1 from '../img/about.jpg'; 
import '../lib/animate/animate.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import Footer from './Footer';
const AboutUs = () => {
  return (
    <div>
      
    <Header/>
   

   {/* <!-- About Start --> */}
   <div className="container-xxl py-5  animated slideInDown ">
       <div className="container">
           <div className="row g-4 align-items-end mb-4">
               <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                   <img className="img-fluid rounded" src="..\..\images\about.jpg"/>
               </div>
               <div className="col-lg-6 wow fadeInUp animated slideInDown" data-wow-delay="0.3s">
                   <p className="d-inline-block border rounded text-primary fw-semi-bold py-1 px-3">About Us</p>
                   <h1 className="display-5 mb-4">Contact to Know us more</h1>
                   <p className="mb-4">Join our retail and manufacturer portal to connect with a network of businesses and expand your reach. Increase your visibility and grow your sales with our easy-to-use platform.
                   </p>
                   <div className="border rounded p-4">
                       <nav>
                           <div className="nav nav-tabs mb-3" id="nav-tab" role="tablist">
                               <button className="nav-link fw-semi-bold active " id="nav-story-tab" data-bs-toggle="tab"
                                   data-bs-target="#nav-story" type="button" role="tab" aria-controls="nav-story"
                                   aria-selected="true">Story</button>
                               <button className="nav-link fw-semi-bold" id="nav-mission-tab" data-bs-toggle="tab"
                                   data-bs-target="#nav-mission" type="button" role="tab" aria-controls="nav-mission"
                                   aria-selected="false">Mission</button>
                               <button className="nav-link fw-semi-bold" id="nav-vision-tab" data-bs-toggle="tab"
                                   data-bs-target="#nav-vision" type="button" role="tab" aria-controls="nav-vision"
                                   aria-selected="false">Vision</button>
                           </div>
                       </nav>
                       <div className="tab-content" id="nav-tabContent">
                           <div className="tab-pane fade show active" id="nav-story" role="tabpanel"
                               aria-labelledby="nav-story-tab">
                               <p className="mb-0">Our website was created with the goal of providing a central platform for retail shops and manufacturers to connect and do business. </p>
                              
                               <p className="mb-1">We saw a need for a more streamlined and efficient way to facilitate these connections, and our website was born.</p>

                               <p className="mb-1"> We recognized that there was a need for a more streamlined and efficient way for these businesses to connect and collaborate, and we set out to create a solution. </p>
                               <p className="mb-1">Our website provides a central platform for businesses to connect and expand their networks, with user-friendly tools and resources to make the process easy and effective.</p>
                              
                               
                           </div>
                           <div className="tab-pane fade" id="nav-mission" role="tabpanel"
                               aria-labelledby="nav-mission-tab">
                               <p className="mb-0">Our mission is to empower retail shops and manufacturers by providing a simple, user-friendly platform to connect and do business. </p>
                               <p className="mb-0">We aim to be the go-to resource for businesses looking to expand their networks and grow their sales.</p>
                               <p className="mb-0"> We understand the importance of building strong business networks, and we're committed to helping businesses of all sizes connect with the right partners to achieve their goals. Whether you're a small retailer looking to expand your product offerings or a manufacturer seeking new distribution channels, our website provides the tools and resources you need to succeed.</p>
                           </div>
                           <div className="tab-pane fade" id="nav-vision" role="tabpanel" aria-labelledby="nav-vision-tab">
                               <p className="mb-0"> Our vision is to create a thriving community of retail shops and manufacturers, all connected and doing business through our platform. </p>
                               <p className="mb-1">We believe that by providing a more efficient and effective way for businesses to connect, we can help drive growth and success across the industry.</p>
                               <p className="mb-0">Our vision is to create a vibrant community of retail shops and manufacturers, all connected and collaborating through our platform. We believe that by facilitating these connections, we can help drive innovation, growth, and success across the industry.</p>
                               <p className="mb-1"> We envision a world where businesses of all sizes and types have access to the tools and resources they need to thrive, and where collaboration and partnership are at the heart of every successful venture. With our website, we're committed to making this vision a reality.</p>
                              
                           </div>
                       </div>
                   </div>
               </div>
           </div>
           <div className="border rounded p-4 wow fadeInUp" data-wow-delay="0.1s">
               <div className="row g-4">
                   <div className="col-lg-4 wow fadeIn" data-wow-delay="0.1s">
                       <div className="h-100">
                           <div className="d-flex">
                               <div className="flex-shrink-0 btn-lg-square rounded-circle bg-primary">
                                   <i className="fa fa-times text-white"></i>
                               </div>
                               <div className="ps-3">
                                   <h4>No hidden policies</h4>
                                   <span> There are no hidden rules and costs </span>
                               </div>
                               <div className="border-end d-none d-lg-block"></div>
                           </div>
                           <div className="border-bottom mt-4 d-block d-lg-none"></div>
                       </div>
                   </div>
                   <div className="col-lg-4 wow fadeIn" data-wow-delay="0.3s">
                       <div className="h-100">
                           <div className="d-flex">
                               <div className="flex-shrink-0 btn-lg-square rounded-circle bg-primary">
                                   <i className="fa fa-users text-white"></i>
                               </div>
                               <div className="ps-3">
                                   <h4>Growing community</h4>
                                   <span>Latest and growing community, join us and grow more </span>
                               </div>
                               <div className="border-end d-none d-lg-block"></div>
                           </div>
                           <div className="border-bottom mt-4 d-block d-lg-none"></div>
                       </div>
                   </div>
                   <div className="col-lg-4 wow fadeIn" data-wow-delay="0.5s">
                       <div className="h-100">
                           <div className="d-flex">
                               <div className="flex-shrink-0 btn-lg-square rounded-circle bg-primary">
                                   <i className="fa fa-phone text-white"></i>
                               </div>
                               <div className="ps-3">
                                   <h4>Call us On</h4>
                                   <span>+012 345 67890</span>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   </div>
    <Footer/>
    </div>
  );
};

export default AboutUs;

