import React,{Component} from "react";
import {Link} from "react-router-dom";
import queryString from "query-string";
import CarsLeftPannel from "./carsLeftPannel.jsx";
import http from "./httpService.js"; 
class Cars extends Component{
    state={carMaster:[],
        cars:[],
        filterArr:{minprice:"",maxprice:""},
}
    async fetchData(){ 
        let {id}=this.props.match.params;
        let response="";
        let queryParams=queryString.parse(this.props.location.search);
        let searchString = this.makeSearchString(queryParams);
            response = await http.get(`/car?${searchString}`);
            if(id){
                response = await http.get(`/car/${id}`);
            }
            else{
                 response = await http.get(`/car`);
        }
        let {data}=response;      
        this.setState({carMaster:data.carMaster,cars:data.cars});     
    }
    async componentDidMount(){
        this.fetchData();
    } 
    async componentDidUpdate(prevProps,prevState){
     if(prevProps!==this.props) this.fetchData();
    }
    deleteFun(id){
        this.props.history.push(`/cars/${id}/delete`);
     }
     editFun(id){
         this.props.history.push(`/carsDataAdd/${id}/edit`);
     }
     filterParams=(carsMaster=[],cars=[],queryParams)=>{ 
         let {fuel,type,minprice,maxprice}=queryParams;
         cars=this.filterParam(carsMaster,cars,"fuel",fuel);
         cars=this.filterParam(carsMaster,cars,"type",type);
         cars=this.filterParam(carsMaster,cars,"minprice",minprice);
         cars=this.filterParam(carsMaster,cars,"maxprice",maxprice);
         return cars; 
     };
     filterParam=(carsMaster,cars,name,values)=>{
         if(!values) return cars;
         let arr1=cars;
         if(name=="minprice"){
            arr1=cars.filter((n1)=>{
                if(n1.price>= +values){
                    return n1;
                }
            });
         }
         else if(name=="maxprice"){
            arr1=cars.filter((n1)=>{
                console.log(values,n1.price);
                if(n1.price<=values)return n1;
            });
         }
         else{
         let arr=carsMaster.filter((n1)=>{
            if(n1[name]==values)return n1;
        });
         arr1=cars.filter((n1)=>{
            let a1=arr.find((n2)=>{
                if(n2.model==n1.model)return n2;
            });
            if(a1!=undefined){
                return n1;
            }
        });
    }
         return arr1;
     };
     addToQueryString = (str,paramName,paramValue)=>
         paramValue ? 
         str ? `${str}&${paramName}=${paramValue}` : `${paramName}=${paramValue}`: str;
     handleOptionChange=(options)=>{
         this.callURL("/cars",options);
     }  
     callURL=(url,options)=>{
         let searchString = this.makeSearchString(options);
         this.props.history.push({
             pathname:url,
             search:searchString, 
         }); 
     } ;
 
 makeSearchString = (options)=>{
     let {fuel,type,sort,minprice,maxprice}=options;
     let searchStr="";
     searchStr=this.addToQueryString(searchStr,"fuel",fuel);
     searchStr=this.addToQueryString(searchStr,"type",type);
     searchStr=this.addToQueryString(searchStr,"sort",sort);
     searchStr=this.addToQueryString(searchStr,"minprice",minprice);
     searchStr=this.addToQueryString(searchStr,"maxprice",maxprice);
     return searchStr;
 
 }
    makeAllOptions=(arr)=>{
        let json={};
        json.fuel=this.getDifferentValues(arr,"fuel"); 
        json.type=this.getDifferentValues(arr,"type");  
        json.model=this.getDifferentValues(arr,"model");    
        return json;
    }
    getDifferentValues=(arr,name)=> {
      return   arr.reduce((acc,curr)=>acc.find(val=>val===curr[name]) ? acc : [...acc,curr[name]],[]);  
    }
    handleChange=(e)=>{
        let {currentTarget:input}=e;
        let queryParams=queryString.parse(this.props.location.search);
       let s1={...this.state};
       s1.filterArr[input.name]=input.value;
       queryParams[input.name]=input.value;
       this.callURL("/cars",queryParams);
        this.setState(s1);
    };
    render(){
        const {carMaster=[],cars=[],filterArr}=this.state;
        let {minprice,maxprice}=filterArr;
        let queryParams=queryString.parse(this.props.location.search);
        let cars1=this.filterParams(carMaster,cars,queryParams); 
        let allOptions = this.makeAllOptions(carMaster);
        console.log(allOptions);
        return(
            <div className="container">
                <div className="row">
                    <h1 className="text-center">All Cars</h1>
                    <div className="col-2 me-2">
                    <CarsLeftPannel allOptions={allOptions} options={queryParams} onOptionChange={this.handleOptionChange}/></div>
                    <div className="col-9 ms-2">
                     <p>   Price Range : &nbsp;
                    <input type="text"
                    id="minprice"
                    name="minprice"
                    placeholder="MinPrice"
                    value={minprice}
                    onChange={this.handleChange}
                    />&nbsp;
                    <input type="text"
                    id="maxprice"
                    name="maxprice"
                    placeholder="MaxPrice"
                    value={maxprice}
                    onChange={this.handleChange}
                    />
                </p>
                        <div className="row">
                    {
                        cars1.map((n1)=>(
                            <div className="col-3 bg-warning border text-center">
                                <h5>{n1.model}</h5>
                                <h6>Price : {n1.price}</h6>
                                <h6>Color : {n1.color}</h6>
                                <h6>Mileage : {n1.kms}</h6>
                                <h6>Manufactured in : {n1.year}</h6>
                               <div className="row"><div className="col-6"><button className="btn" onClick={()=>this.editFun(n1.id)}><i class="fas fa-edit"></i></button></div>
                               <div className="col-6"><button className="btn" onClick={()=>this.deleteFun(n1.id)}><i class="fa fa-trash" aria-hidden="true"></i></button></div></div>
                         </div>
                        ))             
    }
    </div>
    </div>
            </div>
            </div>
        )
    }
}
export default Cars;