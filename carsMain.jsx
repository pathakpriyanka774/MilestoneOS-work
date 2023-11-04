import React,{Component} from "react";
import {Route,Switch,Redirect} from "react-router-dom";
import CarsNav from "./carsNav";
import Cars from "./cars";
import CarsDataAdd from "./carsDataAdd";
import CarsDataDelete from "./carsDataDelete";
class CarsMain extends Component{
    render(){  
        return(
            <div className="container"> 
                <CarsNav />
                <Switch>
                <Route path="/cars/add" component={CarsDataAdd} />
                    <Route path="/cars/:id/delete"   render={(props)=><CarsDataDelete {...props} />} />
                    <Route path="/carsDataAdd/:id/edit"   render={(props)=><CarsDataAdd {...props} />} />
                    <Route path="/cars" render={(props)=><Cars {...props}   />} /> 
                    <Redirect from="/" to="/cars"/>
                </Switch>
            </div>
        )
    }

}
export default CarsMain;