/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import CurrentInvestment from "../home/components/current-investment";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../firebase-setting";

const Plans = () => {
  const [plans, setPlans] = useState<any[]>([]);

  const set_up = async () => {
    const q = await query(collection(db, "plans"));
    const docSnap = await getDocs(q);
    const _plans = docSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPlans(_plans);
  };

  useEffect(() => {
    set_up();
  }, []);

  return (
    <Layout>
      <div className="px-4 pt-8">
        <h3 className="text-2xl font-bold">Current Investments</h3>
      </div>
      <section className="min-h-screen overflow-y-scroll">
        {plans && <CurrentInvestment set_up={set_up} plans={plans} />}
      </section>
    </Layout>
  );
};

export default Plans;
