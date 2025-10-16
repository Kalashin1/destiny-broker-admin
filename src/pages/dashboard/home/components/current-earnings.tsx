import { FC, useEffect, useState } from "react";
import { Investment, Transaction, User } from "../../../../types";
import {
  getDoc,
  doc,
  Query,
  DocumentData,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../../firebase-setting";
import { useNavigate } from "react-router-dom";
import { SCREENS } from "../../../../navigation/constant";

const CurrentEarnings: FC<{
  investments: Partial<Investment>[];
  user_id: string;
}> = ({ investments, user_id }) => {
  const [transactionTotal, setTransactionTotal] = useState(0);
  const set_up = async (user_id: string) => {
    const docRef = await getDoc(doc(db, "users", user_id));

    if (docRef.exists()) {
      const _user = { id: docRef.id, ...docRef.data() } as User;
      let q: Query<DocumentData, DocumentData>;
      if (_user.isAdmin) {
        q = query(collection(db, "transactions"));
      } else {
        q = query(
          collection(db, "transactions"),
          where("user.id", "==", user_id)
        );
      }
      const docRefs = await getDocs(q);
      const _transactions = docRefs.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Transaction)
      );
      const price = _transactions
        ?.filter((t) => t.status === "COMPLETED")
        ?.map((t) => t.amount)
        ?.reduce((a, b) => a + b);
      setTransactionTotal(price);
    }
  };

  useEffect(() => {
    set_up(user_id!);
  }, [user_id]);

  const navigate = useNavigate();

  const InvestmentComponent: FC<{
    investment: {
      title: string;
      amount: number;
      isDeposit?: boolean;
    };
  }> = ({ investment }) => {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            {investment.title ?? "Available Balance"}
          </h2>
          <div className="bg-blue-100 p-2 rounded-lg">
            <i className="fas fa-wallet text-blue-500"></i>
          </div>
        </div>
        <p className="text-3xl font-bold text-gray-800 mb-2">
          {new Intl.NumberFormat("en-US", {
            currency: "USD",
            style: "currency",
          }).format(investment.amount ?? 0)}
        </p>
        {investment.isDeposit && (
          <div className="flex items-center text-sm">
            <button
              className="underline text-blue-500 cursor-pointer"
              onClick={() => navigate(SCREENS.CREATE_INVESTMENT)}
            >
              Deposit
            </button>
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {/* <!-- Pricing Card 1 --> */}
      <InvestmentComponent
        investment={{
          amount: investments[0].capital ?? 0,
          title: "Balance",
          isDeposit: true,
        }}
      />
      <InvestmentComponent
        investment={{ amount: investments[0].earnings ?? 0, title: "Profit" }}
      />
      <InvestmentComponent
        investment={{
          amount: transactionTotal ?? 0,
          title: "Total Withdrawal",
        }}
      />
    </div>
  );
};

export default CurrentEarnings;
