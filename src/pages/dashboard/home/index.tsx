/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
// import Investments from "../components/investments";
import Layout from "../components/layout";
import Transactions from "../components/transaction-table";
// import CurrentInvestment from "./components/current-investment";
import {
  DocumentData,
  Query,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase-setting";
import { useNavigate } from "react-router-dom";
import { SCREENS } from "../../../navigation/constant";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import {
  Investment,
  // Plan,
  Transaction,
  User,
} from "../../../types";
// import InvestmentTable from "../investment/components/investment-table";
import CurrentEarnings from "./components/current-earnings";
import TradingComponent from "../components/trade-component";
import InvestmentTable from "../investment/components/investment-table";

const Home = () => {
  const [user, setUser] = useState<User>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  // const [plans, setPlans] = useState<Plan[]>([]);

  const navigate = useNavigate();

  const getInvestment = async () => {
    let q: Query<DocumentData, DocumentData>;
    try {
      if (user && user.isAdmin) {
        q = query(collection(db, "investments"));
      } else {
        q = query(
          collection(db, "investments"),
          where("user.id", "==", user?.id)
        );
      }
      const _docRefs = await getDocs(q);
      const _investments = _docRefs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Investment[];
      setInvestments(_investments);
    } catch (error) {
      alert("error getting investments");
    }
  };

  const set_up = async (id: string) => {
    try {
      const docRef = await getDoc(doc(db, "users", id));
      if (docRef.exists()) {
        const _user = { id: docRef.id, ...docRef.data() } as User;
        setUser(_user);
        let q: Query<DocumentData, DocumentData>;
        let q2: Query<DocumentData, DocumentData>;

        if (_user.isAdmin) {
          q = query(collection(db, "transactions"));
          q2 = query(collection(db, "investments"));
        } else {
          q = query(collection(db, "transactions"), where("user.id", "==", id));
          q2 = query(collection(db, "investments"), where("user.id", "==", id));
        }
        const docRefs = await getDocs(q);
        const _transactions = docRefs.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Transaction)
        );
        setTransactions(_transactions);

        const _docRefs = await getDocs(q2);
        const _investments = _docRefs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Investment[];
        setInvestments(_investments);
      }
    } catch (error) {
      alert("error fetching user");
      console.log(error);
      navigate(SCREENS.PROFILE);
    }
  };

  useEffect(() => {
    set_up(localStorage.getItem("user_id")!);
    getInvestment()
  }, [navigate]);

  console.log("user", user);
  if (user?.isAdmin) return (
    <Layout>
     {investments && (<section className="my-4">
        <InvestmentTable investments={investments} getInvestments={getInvestment} />
      </section>)}
       <section className="bg-gray-100 my-4">
        {transactions && <Transactions transactions={transactions} />}
      </section>
    </Layout>
  ) 
  return (
    <Layout>
      {<h3 className="text-2xl px-4 my-6">Your Investments</h3>}

      {investments.length < 1 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mr-2">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Balance</h2>
              <div className="bg-blue-100 p-2 rounded-lg">
                <i className="fas fa-wallet text-blue-500"></i>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-2">$0.00</p>
            <div className="flex items-center text-sm">
              <button
                onClick={() => navigate(SCREENS.CREATE_INVESTMENT)}
                className="text-blue-500 underline cursor-pointer"
              >
                Deposit
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Profit</h2>
              <div className="bg-green-100 p-2 rounded-lg">
                <i className="fas fa-money-bill-wave text-green-500"></i>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-2">$0.00</p>
            <div className="flex items-center text-sm">
              <span className="text-green-500 flex items-center mr-2">
                <i className="fas fa-arrow-up mr-1"></i> 0.0%
              </span>
              <span className="text-gray-500">from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Withdrawal
              </h2>
              <div className="bg-red-100 p-2 rounded-lg">
                <i className="fas fa-credit-card text-red-500"></i>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-2">$0.00</p>
            <div className="flex items-center text-sm">
              <span className="text-red-500 flex items-center mr-2">
                <i className="fas fa-arrow-down mr-1"></i> 0.0%
              </span>
              <span className="text-gray-500">from last month</span>
            </div>
          </div>
        </div>
      ) : (
        user && (
          <section className="bg-gray-100 p-4">
            <CurrentEarnings investments={investments} user_id={user.id} />
          </section>
        )
      )}

      {
        <div className="my-4 p-4">
          <h3 className="text-2xl my-6">Trading View</h3>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-4 lg:justify-between">
            <div className="h-[51rem] xl:w-[45rem] lg:w-[38rem] mr-2">
              <TradingViewWidget
                symbol="BINANCE:BTCUSDT"
                theme={Themes.LIGHT}
                locale="en"
                autosize={true}
              />
            </div>
            <div className="xl:w-[45rem] lg:w-[23rem] flex justify-center items-center md:w-[30rem] w-full mt-8 lg:my-0 relative lg:left-28 xl:left-2 lg:ml-4 lg:block">
              <TradingComponent />
            </div>
          </div>
        </div>
      }

      <div className="flex items-center justify-center p-4"></div>

      <section className="px-6 my mb-8 py-2">
        <h3 className="text-2xl my-6">Your Investments</h3>

        {/* {investments && <CurrentInvestment plans={investments} />} */}
        {/* {investments && (
          <InvestmentTable
            investments={investments}
            getInvestments={getInvestment}
          />
        )} */}
      </section>
      <section className="bg-gray-100">
        {transactions && <Transactions transactions={transactions} />}
      </section>
    </Layout>
  );
};

export default Home;
