import Footer from "./Footer";
import Header from "./Header";
import HomeCarousel from "./HomeCarousel";
import CategoryList from "./CategoryList";
import { useEffect, useState, useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';

const RetailerHomePage = () => {

    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    //const dispatch = useDispatch();
    useEffect(() => {
        if (!user || user.role === 'company') {
          navigate('/login/retailer');
        }
      }, [user, navigate]);

    return (
        <div>
            <Header/>
            <HomeCarousel/>
            <br/>
            <br/>
            <br/>
            <CategoryList />
            <a href="#" className="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"><i
            className="bi bi-arrow-up"></i></a>
            <Footer/>
        </div>
        
    );
}

export default RetailerHomePage;