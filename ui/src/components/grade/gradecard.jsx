
import React from "react";

function GradeCard(props) {
  return (
    <div className="formcard">
        <div className="innercontainer">
            <div className="card-header">
                <h3 className="card-title">
                    成绩单修改
                </h3>
            </div>
            <input className="formbtn" 
                    type="button" 
                    value="确定" 
                    
                    style={{
                        background:"#aed1ffab",
                        color:"#000",
                    }}/>
                    <input 
                    className="formbtn" 
                    type="button" 
                    value="取消" 
                    
                    style={{
                        background:"#aed1ffab",
                        color:"#000",
                    }}/>
        </div>
       
    </div>    
    );
}
export default GradeCard;