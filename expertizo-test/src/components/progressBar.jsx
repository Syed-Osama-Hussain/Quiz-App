import React, { Component } from 'react';
import '../App.css';

class ProgressBar extends Component {
   
    render() {
          	
      const { readings } = this.props;
      
      return (
        <div className="progressbar">
            <div className="row">
                <div className="col-6 text-left">
                    <span>Score: {readings[1].value}%</span>
                </div>
                
                <div className="col-6 text-right">
                    <span>Max Score: {readings[2].value}%</span>
                </div>
            </div>
            <div
            className="progressVisualFull"
            >
            {readings.map((item, index) => {
            return (
                
                <div
                key={index}
                style={{
                    "width": item.value + "%",
                    'backgroundColor': item.color
                }}
                className="progressVisualPart"
                />
            );
            })}

            </div>
        </div>
      );
    }
  }
  
  
export default ProgressBar;