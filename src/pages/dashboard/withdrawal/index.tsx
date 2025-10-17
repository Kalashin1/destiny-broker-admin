import Layout from "../components/layout";
import WithdrawalForm from "./components/withdrawal-form";

const Withdrawal = () => {
  return (
    <Layout>
      <section className="px-2 py-2">
        <div className="px-4 mt-8">
          <h3 className="text-2xl font-bold">Make a withdrawal</h3>
        </div>
        <section className="px-4 py-6 h-screen">
          <div className="bg-white">
            <WithdrawalForm />
          </div>
        </section>
      </section>
    </Layout>
  );
};

export default Withdrawal;
