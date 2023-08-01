import { useEffect, useState,useContext  } from 'react';
import User from '../models/company';
//import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CompanyService from '../services/company.service';
//../../images/nearby.jpg
//import '../css/register.page.css';
import '../css/style.css';
import '../lib/animate/animate.min.css';
import '../css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from './UserContext';

const CompanyLogin = () => {

    const { user, setUser } = useContext(UserContext);

    const [company, setCompany] = useState(new User('', ''));
    const [username, setUsername] = useState(company.username);
    const [password, setPassword] = useState(company.password);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    //const currentCompany = useSelector(state => state.retailer);

    const navigate = useNavigate();

    //const dispatch = useDispatch();
    useEffect(() => {
        if (user) {
            console.log("use effect" + user.username);
          navigate('/company/'+ user.id + '/home');
        }
      }, [user, navigate]);
    

    function handleUsernameChange(event) {
        setUsername(event.target.value);
        setCompany(new User(event.target.value, password));
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
        setCompany(new User(username, event.target.value));
    }
  

    const handleLogin = (e) => {
      e.preventDefault();

      setSubmitted(true);
   //     console.log("in handle login "+company.email+" "+company.password);
      if (!company.username || !company.password) {
          return;
      }

      setLoading(true);
      console.log("username "+company.username+" pwd "+company.password);
      CompanyService.login(company).then(response => {
          console.log("login success "+response.data)
          //set company in session.
          console.log(company.username);
         // console.log(response.data);
          sessionStorage.setItem('user', JSON.stringify({ username: company.username, role: 'company', id: response.data}));
          setUser({ username: company.username, role: 'company',id: response.data });
          
          //dispatch(setCurrentCompany(response.data));
        //  console.log("after dispatch");
        
          //navigate('');
         
      }).catch(error => {
         console.log(error);
         setErrorMessage('username or password is not valid.');
         setLoading(false);
      });
    };
  

    return (
        <div className="container-fluid callback my-5 pt-5">

            <div className="col-lg-7 mx-auto">
                <div className="bg-white border rounded p-4 p-sm-5 wow fadeInUp mx-auto" data-wow-delay="0.5s">
                    <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "600px" }}>

                        <FontAwesomeIcon icon={faUserCircle} className="ms-auto me-auto user-icon" />
                        <h1 className="display-5 mb-5">Company Login</h1>
                        {errorMessage &&
                            <div className="alert alert-danger">
                                {errorMessage}
                            </div>
                        }

                        <form
                            onSubmit={(e) => handleLogin(e)}
                            noValidate
                            className={submitted ? 'was-validated' : ''}
                        >
                            <div className="g-3 m-1 mx-auto">
                                <div className="col-sm-6 col-md-8 mx-auto m-4">
                                    <div className="form-floating">

                                        <input
                                            type="text"
                                            name="username"
                                            className="form-control"
                                            placeholder="Enter Username"
                                            value={username}
                                            onChange={handleUsernameChange}
                                            required
                                        />
                                        <label htmlFor="username">Username:</label>
                                        <div className="invalid-feedback">
                                            User name is required.
                                        </div>
                                    </div>
                                </div>




                                <div class="col-sm-6 col-md-8 mx-auto m-4">
                                    <div className="form-floating">

                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Enter Password"
                                            value={password}
                                            onChange={handlePasswordChange}
                                            required
                                        />
                                        <label htmlFor="password">Password:</label>
                                        <div className="invalid-feedback">
                                            Password is required.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <br />
                            <div className="col-12 text-center">
                                <button className="btn btn-primary w-50 py-3" disabled={loading} >Login</button>
                            </div>

                        </form>

                        <Link to="/signup/company" className="btn btn-link" style={{ color: 'darkgray' }}>
                            Create Account!
                        </Link>

                    </div>

                </div>
            </div >
        </div >
    );
};

export { CompanyLogin };
