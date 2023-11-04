import React,{Component} from "react";
import http from "./httpService";
class CarsDataDelete extends Component{
    async componentDidMount(){
        const {id}=this.props.match.params;
        if(id){
        let response= await http.deleteApi(`/car/${id}`);
        this.props.history.push("/cars");
        }
        else{
        this.props.history.push("/cars");
        }
    };
    render(){
        return "";
    }

}
export default CarsDataDelete;

   