import toast from "react-hot-toast";
import "./BillPatti.css";
import { Context, server } from "../../main";
import axios from "axios";
import { useContext } from "react";

const BillPatti = ({ amount, date, id, fetchPaymentArray }) => {
  const { setLoading } = useContext(Context);

  //Delete Bill Patti
  const deleteBillPatti = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(`${server}/payment/${id}`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      fetchPaymentArray();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to delete Payment");
    }finally{
        setLoading(false);
    }
  };

  return (
    <div className="billpatti_main">
      <div>₹{amount}</div>
      <div>{new Date(date).toLocaleDateString()}</div>
      <button onClick={deleteBillPatti}>Delete</button>
    </div>
  );
};

export default BillPatti;
