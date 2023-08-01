import Footer from "./Footer";
import Header from "./Header";
import HomeCardComponent from "./HomeCardComponent";
import HomeCarousel from "./HomeCarousel";
import HomeCategory from "./HomeCategory";
import { useEffect, useState,useContext  } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

    const { user } = useContext(UserContext);

    console.log(user);
    const navigate = useNavigate();
     //mounted
     useEffect(() => {
        //console.log(user);
        if (user) {
            if(user.username !== '' && user.role === 'company'){
                navigate('/company/'+user.id+'/home');
            }else if(user.username !== '' && user.role === 'retailer'){
                navigate('/retailer/'+user.id+'/home');
            }
            else{
                navigate('/');
            }
            //navigate
            
        }else{
            navigate('/');
        }
    }, []);

    return (
        <div>
            <Header/>
            <HomeCarousel/>
            <HomeCardComponent/>
            <br/>
            <br/>
            <br/>
            <HomeCategory/>
            <a href="#" className="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"><i
            className="bi bi-arrow-up"></i></a>
            <Footer/>
        </div>
        
    );
}

export default HomePage;