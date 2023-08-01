import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import $ from 'jquery';



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
 

);


// // Spinner
// var spinner = function () {
//     setTimeout(function () {
//         if ($('#spinner').length > 0) {
//             $('#spinner').removeClass('show');
//         }
//     }, 1);
// };
// spinner();





// Fixed Navbar
$(window).scroll(function () {
    if ($(window).width() < 992) {
        if ($(this).scrollTop() > 45) {
            $('.fixed-top').addClass('bg-white shadow');
        } else {
            $('.fixed-top').removeClass('bg-white shadow');
        }
    } else {
        if ($(this).scrollTop() > 60) {
            $('.fixed-top').addClass('bg-white shadow').css('top', 0);
        } else {
            $('.fixed-top').removeClass('bg-white shadow').css('top', 0);
        }
    }
});


// Back to top button
$(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
});
$('.back-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
    return false;
});




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
