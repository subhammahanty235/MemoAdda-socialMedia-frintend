import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = (props) => {
    const navigate = useNavigate()
    const location = useLocation()
    // const {userDetails} = props;
    const [signed, setsigned] = useState(false)
    const checkSigned = () => {
        if (!localStorage.getItem('memoapk_api_auth_token')) {
            setsigned(false)
            navigate('/login')

        }
        else {
            setsigned(true)
            
        }
    }

    const logOut = () => {
        localStorage.removeItem('memoapk_api_auth_token')
        checkSigned()
    }
   
    
   
    useEffect(() => {
        checkSigned()
        // userdetails()
        // console.log(props.imglink)
    }, [])
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light mt-4 mb-3 border border-dark rounded-3" >
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">MemosAdda</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">



                        </ul>
                        <Link to='/login' className={`btn btn-primary ${signed === false ? "" : "d-none"} ${location.pathname === '/login' ? 'd-none' : ''} `}>Log IN</Link>
                        <Link to='/signup' className={`btn btn-primary ${location.pathname === '/login' ? '' : 'd-none'}`}>SignUp</Link>
                        {/* <ul class="navbar-nav me-auto mb-2 mb-lg-0"> */}
                        <ul class="navbar-nav  mb-2 mb-lg-0">


                            <li class={`nav-item dropdown mx-0 mt-0 ${signed === true ? "" : "d-none"} `}>
                                <a class="nav-link  mx-0 mt-0" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img width={"30px"}  src={props.imglink} style={{margin:"0" , padding:"0" ,height:"100%"}} alt="Profile Pic" />
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link class={`dropdown-item  ${location.pathname==='/myprofile' ? 'd-none' : ' '}`} to="/myprofile">View Profile</Link></li>
                                    <li><Link className={`dropdown-item  ${location.pathname==='/' ? 'd-none' : ' '}`}  to="/">Home</Link></li>
                                    {/* <li><a class="dropdown-item" href="#">Post Your Memory</a></li> */}
                                    <li><hr class="dropdown-divider" /></li>
                                    {/* <li><a class="dropdown-item" href="#" onClick={effectT}>turn off effects</a></li> */}
                                    <li><a class="dropdown-item" href="#" onClick={logOut}>Log Out</a></li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}
export default Navbar