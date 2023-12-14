import React from "react";
import "./css/leftbar.css";
import {BarButton} from "./barbutton";

function Leftbar() {
  return (
    <div className="Leftbar">
        <div className="buttonlist">
          <BarButton 
          id="studentmanager"
          params={{
            path: "/student",
            name: "学生管理",
            icon: "home"
          }
        
        }
          />
          <BarButton 
          id="coursemanager"
          params={{
            path: "/course",
            name: "课程管理",
            icon: "home"
          }
          }
          />
          <BarButton 
          id="coursemanager"
          params={{
            path: "/S-C",
            name: "分数管理",
            icon: "home"
          }
          }
          />
        </div>
    </div>
    )
}

export default Leftbar;