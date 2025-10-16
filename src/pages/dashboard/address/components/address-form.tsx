import { addDoc, collection } from "firebase/firestore";
import { FormEvent, useRef, useState } from "react";
import Select from 'react-select';
import { db } from "../../../../firebase-setting";
import { SCREENS } from "../../../../navigation/constant";
import { useNavigate } from "react-router-dom";

const AddressForm = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [network, setNetwork] = useState('BTC')

  const navigate = useNavigate()
  const handleAddAddress = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading!(true);
    const {
      address: {value: address }
    } = formRef.current!
    await addDoc(collection(db, "address"), {
      address,
      network
    });
    setIsLoading(false)
    alert("Address added");
    navigate(SCREENS.DASHBOARD);
  };
  return (
    <form
      ref={formRef}
      className="form bg-white p-6 my-10 relative"
      onSubmit={handleAddAddress}
    >
      <h3 className="text-2xl text-gray-900 font-semibold">
        Request Withdrawal
      </h3>
      <p className="text-gray-600">Add Address</p>
      <div className="flex space-x-5 mt-3 items-center justify-between">
        <div className="lg:w-1/2">
          <input
            type="text"
            name="address"
            id=""
            placeholder="Enter Address"
            className="border p-2 w-full mt-3"
          />
        </div>
        <div className="lg:w-1/2">
          <Select
          className="lg:relative top-1"
            options={[
              {
                label: "BTC",
                value: "BTC",
              },
              {
                label: "ETH",
                value: "ETH",
              },
              {
                label: "USDT TRON",
                value: "TRX",
              },
            ]}
            onChange={(v) => setNetwork(v?.value as string)}
            placeholder="Select the network"
          />
        </div>
      </div>
      <input
        type="submit"
        value={isLoading ? "...Loading" : "Add Address"}
        disabled={isLoading}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold p-3"
      />
    </form>
  );
};

export default AddressForm