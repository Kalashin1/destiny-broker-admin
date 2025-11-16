/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useContext } from "react";
import { Plan } from "../../../../types";
import { SCREENS } from "../../../../navigation/constant";
import { useNavigate } from "react-router-dom";
import { db } from "../../../../firebase-setting";
import { LoaderContext } from "../../../../App";
import { deleteDoc, doc } from "firebase/firestore";

const CurrentInvestment: FC<{ plans: Plan[]; set_up: () => Promise<void> }> = ({
  plans,
  set_up,
}) => {
  const navigate = useNavigate();
  const { setIsLoading } = useContext(LoaderContext);
  const deletePlan = async (id: string) => {
    setIsLoading!(true);
    if (confirm("are you sure you want to delete this plan?")) {
      await deleteDoc(doc(db, "plans", id));
      alert("plan deleted");
      set_up();
    }
    setIsLoading!(false);
  };

  return (
    <div className="min-h-screen md:py-12 py-4 flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 md:gap-6">
        {/* <!-- Pricing Card 1 --> */}
        {plans &&
          plans.map((plan, index) => (
            <div
              className={`bg-white w-full rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 relative`}
              key={index}
            >
              {/* @ts-ignore */}
              <div className={`p-1 bg-blue-200`}></div>
              <button
                className="m-2 cursor-pointer"
                onClick={() => deletePlan(plan.id)}
              >
                <i className="fas fa-trash" />
              </button>
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {plan.title}
                </h2>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <p className="text-4xl font-bold text-gray-800 mb-6">
                  {new Intl.NumberFormat("en-US", {
                    currency: "USD",
                    style: "currency",
                  }).format(parseFloat(plan.price))}
                </p>
                <ul className="text-sm text-gray-600 mb-6">
                  <li className="mb-2 flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Duration: {plan.duration} Days
                  </li>
                  <li className="mb-2 flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    ROI: {plan.ROI}%
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    24/7 Support
                  </li>
                </ul>
              </div>
              <div className="p-4">
                <button
                  onClick={() => navigate(SCREENS.CREATE_INVESTMENT)}
                  className={`w-full bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800`}
                >
                  Add User
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CurrentInvestment;
