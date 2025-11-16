import { useEffect, useState } from "react";
import Layout from "../components/layout";
import TransactionTable from "../components/transaction-table";
import { db } from "../../../firebase-setting";
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
import { Transaction, User } from "../../../types";

const Transactions = () => {
  const user_id = localStorage.getItem("user_id");
  const [, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const set_up = async (user_id: string) => {
      const docRef = await getDoc(doc(db, "users", user_id));

      if (docRef.exists()) {
        const _user = { id: docRef.id, ...docRef.data() } as User;
        setUser(_user);
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
        setTransactions(_transactions);
      }
    };

    set_up(user_id!);
  }, [user_id]);

  return (
    <Layout>
      <section className="md:px-6 px-2 py-2">
        <div className="md:px-12 md:mt-8 mt-2">
          <h3 className="text-2xl font-bold">Your Investments</h3>
        </div>
        <section className="md:px-12 px-2 md:py-6 h-screen">
          <div className="bg-white">
            {transactions && <TransactionTable transactions={transactions} />}
          </div>
        </section>
      </section>
    </Layout>
  );
};

export default Transactions;
