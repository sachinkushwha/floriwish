
import {  useParams } from "react-router-dom";
export const Total_super_admin = () => {
    const {count}=useParams();
    return (
        <div>
            {
                count ? (
                    <h1>Total Sujper Admins: {count || 0}</h1>
                ) : ''
            }

        </div>
    )
}