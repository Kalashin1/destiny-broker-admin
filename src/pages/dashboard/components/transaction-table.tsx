/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { FC, useEffect, useState } from "react";
import { Transaction, User } from "../../../types";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase-setting";
import { useNavigate } from "react-router-dom";
import { SCREENS } from "../../../navigation/constant";

const Transactions: FC<{ transactions: Transaction[] }> = ({
  transactions,
}) => {
  const navigate = useNavigate();

  const handleUpdate = async (
    action: "approve" | "reject",
    transaction_id: string
  ) => {
    switch (action) {
      case "approve": {
        const docRef = doc(db, "transactions", transaction_id);
        await updateDoc(docRef, {
          status: "COMPLETED",
        });
        break;
      }
      case "reject": {
        const docRef = doc(db, "transactions", transaction_id);
        await updateDoc(docRef, {
          status: "REJECTED",
        });
      }
    }
    alert("transaction status updated");
    navigate(SCREENS.DASHBOARD);
  };

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const set_up = async () => {
      const id = localStorage.getItem("user_id");
      if (id) {
        const userDoc = await getDoc(doc(db, "users", id));
        setUser({ id: userDoc.id, ...userDoc.data() } as User);
      }
    };

    set_up();
  }, []);

  return (
    <div className="mx-auto mt-8 px-6 py-4">
      <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
        <p className="flex-1 text-base font-bold text-gray-900">
          Latest Payments
        </p>

        <div className="mt-4 sm:mt-0">
          <div className="flex items-center justify-start sm:justify-end">
            <div className="flex items-center">
              <label
                htmlFor=""
                className="mr-2 flex-shrink-0 text-sm font-medium text-gray-900"
              >
                {" "}
                Sort by:{" "}
              </label>
              <select
                name=""
                className="sm: mr-4 block w-full whitespace-pre rounded-lg border p-1 pr-10 text-base outline-none focus:shadow sm:text-sm"
              >
                <option className="whitespace-no-wrap text-sm">Recent</option>
              </select>
            </div>

            <button
              type="button"
              className="inline-flex cursor-pointer items-center rounded-lg border border-gray-400 bg-white py-2 px-3 text-center text-sm font-medium text-gray-800 shadow hover:bg-gray-100 focus:shadow"
            >
              <svg
                className="mr-1 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  className=""
                ></path>
              </svg>
              Export to CSV
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border shadow bg-white">
        <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
          <thead className="hidden border-b lg:table-header-group">
            <tr className="">
              <td
                width="50%"
                className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6"
              >
                Invoice
              </td>

              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                Date
              </td>

              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                Amount
              </td>

              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                Status
              </td>
            </tr>
          </thead>

          <tbody className="lg:border-gray-300">
            {transactions.map((transaction) => {
              return (
                <tr className="">
                  <td className="w-6/12 whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                    {transaction.type} Request
                    <div className="mt-1 lg:hidden">
                      <p className="font-normal text-gray-500">
                        {new Date(
                          parseFloat(transaction.createdAt)
                        ).toDateString()}
                      </p>
                    </div>
                  </td>

                  <td className="w-2/12 whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                    {new Date(parseFloat(transaction.createdAt)).toDateString()}
                  </td>

                  <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                    {new Intl.NumberFormat("en-US", {
                      currency: "USD",
                      style: "currency",
                    }).format(transaction.amount)}
                    <div
                      className={`flex mt-1 ml-auto w-fit items-center rounded-full py-2 px-3 text-left text-xs font-medium text-white lg:hidden ${
                        transaction.status === "PENDING"
                          ? "bg-yellow-500"
                          : transaction.status === "COMPLETED"
                          ? "bg-green-700"
                          : "bg-red-600"
                      }`}
                    >
                      {transaction.status}
                    </div>
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                    <div
                      className={`inline-flex items-center rounded-full bg-blue-600 py-2 px-3 text-xs text-white ${
                        transaction.status === "PENDING"
                          ? "bg-yellow-500"
                          : transaction.status === "COMPLETED"
                          ? "bg-green-700"
                          : "bg-red-600"
                      }`}
                    >
                      {transaction.status}
                    </div>
                  </td>
                  {user?.isAdmin && transaction.status === "PENDING" && (
                    <td className="whitespace-no-wrap w-4/12 py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell grid grid-cols-2 mr-4">
                      <button
                        className="rounded-full w-8 h-8 bg-green-600 text-white shadow-md mr-4"
                        type="button"
                        onClick={() => handleUpdate("approve", transaction.id)}
                      >
                        <i className="fas fa-check" />
                      </button>
                      <button
                        type="button"
                        className="rounded-full w-8 h-8 bg-red-600 text-white shadow-md"
                        onClick={() => handleUpdate("reject", transaction.id)}
                      >
                        <i className="fas fa-times" />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
