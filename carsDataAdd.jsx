import React,{Component} from "react";
import http from "./httpService";
class CarsDataAdd extends Component{
    state={
        carsnew:{id:"",price:"",kms:"",year:"",model:"",color:""},
        modelarr:["Swift Dzire VXi","Etios SMi", "City AXi", "Swift DXi", "Etios VXi", "City"],
        edit:false,
    }
    async componentDidMount(){
        this.fetchData();
    }
    async componentDidUpdate(prevProps,prevState){
        if(prevProps!=this.props){
            this.fetchData();
        }
    }
    async fetchData(){
        const {id}=this.props.match.params;
        if(id){
            let response = await http.get(`/car/${id}`);
            let {data}=response;
            this.setState({carsnew:data,edit:true});
        }
        else{
            let carsnew={id:"",name:"",city:"",age:"",gender:"",payment:""};
            this.setState({carsnew:carsnew,edit:false});
        }

    }
    handleChange=(e)=>{
        const {currentTarget:input}=e;
        let s1= {...this.state};
        s1.carsnew[input.name]=input.value;
        this.setState(s1);

    };
    async postData(url,obj){
        let response = await http.post(url,obj);
        this.props.history.push(`cars`);
    }
    async putData(url,obj){
        let response = await http.put(url,obj);
        this.props.history.push(`cars`);
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        let {carsnew,edit}=this.state;
        const {id}=this.props.match.params;
        edit?this.putData(`/car/${carsnew.id}`,carsnew):
        this.postData("/car",carsnew);
    };
   
    render(){
        const {id,price,kms,year,model,color}=this.state.carsnew;
        const {edit,modelarr}=this.state;

        return (
            <div className="container">
                <div className="form-group">
                    <label>Id</label>
                    <input type="text"
                    className="form-control"
                    id="id"
                    name="id"
                    placeholder="Enter id"
                    value={id}
                    onChange={this.handleChange}
                    
                    />
                </div>
                <br/>
                <div className="form-group">
                    <label>Price</label>
                    <input type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    placeholder="Enter price"
                    value={price}
                    onChange={this.handleChange}
        
                    />
                </div>
                <br/>
                <div className="form-group">
                    <label>Mileage</label>
                    <input type="text"
                    className="form-control"
                    id="kms"
                    name="kms"
                    placeholder="Enter Mileage"
                    value={kms}
                    onChange={this.handleChange}
                    readOnly={edit?true:false}
                    />
                </div>
                <br/>
                <div className="form-group">
                    <label>Manufacturing Year</label>
                    <input type="text"
                    className="form-control"
                    id="year"
                    name="year"
                    placeholder="Enter Manufacturing year"
                    value={year}
                    onChange={this.handleChange}
                    readOnly={edit?true:false}
                    />
                </div>
                <br/>
                <div className="form-group">
                    <label>Model</label>
                    <select className="form-control"
                     id="model"
                     name="model"
                     value={model}
                     onChange={this.handleChange}
                     ><option selected >Select model</option>     
                        {
                            modelarr.map((n1)=>(
                                <option>{n1}</option>
                            ))
                        }        
                     </select>
                </div><br/>
                <div className="form-group">
                    <label>Color</label>
                    <input type="text"
                    className="form-control"
                    id="color"
                    name="color"
                    placeholder="Enter color"
                    value={color}
                    onChange={this.handleChange}
                    readOnly={edit?true:false}
                    />
                </div>
                <br/>
                <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }

}
export default CarsDataAdd;