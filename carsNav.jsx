import React,{Component} from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
class  CarsNav extends Component{ 
    state={
        
    }
    render(){ 
        
        return(
            <nav className="navbar navbar-expand-sm navbar-dark text-white bg-danger">
            <Link className="navbar-brand  ms-2" to="/">
            Home
            </Link>
            <div className="">
                <ul className="navbar-nav ml-auto">   
                    <li className="nav-item ">
                        <Link className="nav-link" to={`/cars/add`}>
                            New Car
                        </Link>
                    </li>    
                </ul> 
            </div>
        </nav>
        )
    }

}
export default CarsNav;