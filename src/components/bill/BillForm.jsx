import React, { useContext, useState } from "react";
import "./BillForm.css";
import toast from "react-hot-toast";
import axios from "axios";
import { Context, server } from "../../main";

const BillForm = ({ projectId, fetchPaymentArray }) => {
  const [amount, setAmount] = useState();
  const [date, setDate] = useState();

  const { loading, setLoading } = useContext(Context);

  const addPayment = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(
        `${server}/payment/${projectId}`,
        {
          amount,
          date,
        },{
            withCredentials: true,
        }
      );

      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to add Payment");
    } finally {
        setLoading(false);
        fetchPaymentArray();
    }
  };

  return (
    <div className="billForm_maindiv">
      <form onSubmit={addPayment}>
        <input
          type="number"
          placeholder="Enter amount"
          onChange={(e) => setAmount(e.target.value)}
        />
        <input type="date" onChange={(e) => setDate(e.target.value)} />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default BillForm;
