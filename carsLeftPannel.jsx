import React,{Component} from "react";
class CarsLeftPannel extends Component{
    handleChange=(e)=>{
        let {currentTarget:input}=e;
        let options = {...this.props.options}; 
            options[input.name]=input.value;
            this.props.onOptionChange(options);

    };
    updateCBs=(inpValue,checked,value)=>{
        let inpArr = inpValue ? inpValue.split(",") : [];
        if(checked) inpArr.push(value);
        else{
            let index = inpArr.findIndex((ele)=>ele===value);
            if(index>=0) inpArr.splice(index,1);
            
        }
        return inpArr.join(",");
    }  
    makeradios = (arr,values,name,label) =>(  
        <React.Fragment>
           <div className="row border"><h5 className="bg-light p-2">{label}</h5></div>
            {   
                arr.map((opt)=>(
                    <div className="row border p-2">
                    <div className="form-check" key={opt}>
                        <input className="form-check-input bg-light" value={opt} type="radio" name={name}
                        checked={opt==values}
                        onChange={this.handleChange}/>
                        <label className="form-check-label">{opt}</label>
                    </div>
                    </div>
                ))
            }
        </React.Fragment>
    );
    render(){
        let {fuel="",type="",sort=""}=this.props.options;
        let {allOptions}=this.props;
        const sortarr=["kms","price","year"];
        return(
            <React.Fragment>
            <div className="row">
                 
               <div className="col-12 mb-5">
                   {this.makeradios(allOptions.fuel,fuel,"fuel","Fuel")}
               </div>
               <div className="col-12 mb-5">
                   {this.makeradios(allOptions.type,type,"type","Type")}
               </div>
               <div className="col-12 ">
                   {this.makeradios(sortarr,sort,"sort","Sort")}
               </div>
            </div>
            </React.Fragment>
       )
    }

}
export default CarsLeftPannel;