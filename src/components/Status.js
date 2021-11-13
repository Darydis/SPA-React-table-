import React from "react";
import "./../styles/Status.scss";

const Status = ({status}) => {
    return <div className="status">
        {status === "completed" &&
            <div className="completed"><span></span>Выполнено</div>}
        {status === "assigned_to" &&
            <div className="assigned_to"><span></span>Назначено</div>}    
        {status === "new" &&
                <div className="new"><span></span>Новое</div>}  
        {status === "started" &&
                <div className="started"><span></span>Начато</div>} 
        {status === "declined" &&
                <div className="declined"><span></span>Отменено</div>}    
    </div>
}

export default Status;