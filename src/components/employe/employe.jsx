import React, {useState, useEffect} from 'react';
import classes from "./employe.module.css";

const Employe = (props) => {


    const [employee, setEmployee] = useState(props.employe)

    useEffect(() => {
        setEmployee(props.employe);
    }, [props]);

    return (
        <div className={classes.freindlistdiv}>
            <h2>Специализация</h2>
            <div>{employee.specialization}</div>
            <h4>О себе</h4>
            <div>{employee.aboutMe}</div>
            <div style={{margin: '15px'}}>Дата рождения {employee.age}</div>
            <h2>Места работы</h2>
            <div>
                {employee.placeWorkList?.map((f) =>
                    <div style={{margin: '15px'}}>
                        <div>Название: {f.companyName} </div>
                        <div>Дата начала: {f.dateBegin} </div>
                        <div>Дата окончания: {f.dateEnd} </div>
                        <div>Позиция: {f.position} </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Employe;