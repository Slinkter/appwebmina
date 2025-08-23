import React from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DashboardCard from "../components/DashboardCard";

function CDCreateEmployer(props) {
    const { btn_NewEmployer, label, metodo } = props;

    return (
        <DashboardCard
            onClick={btn_NewEmployer}
            label={label}
            value={metodo}
            Icon={GroupAddIcon}
        />
    );
     
  
}

export default CDCreateEmployer;
