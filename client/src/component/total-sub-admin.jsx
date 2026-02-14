
import {  useParams } from "react-router-dom";
export const Total_sub_admin = () => {
    const {count}=useParams();

    return (
        <div>
            {
                count ? (
                    <h1>Total Sub Admins: {count || 0}</h1>
                ) : ''
            }
        </div>
    );
};
