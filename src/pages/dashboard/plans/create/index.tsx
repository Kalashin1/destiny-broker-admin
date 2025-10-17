import Layout from "../../components/layout";
import CreatePlanForm from "./components/create-plan-form";

const CreatePlan = () => {
  return (
    <Layout>
      <div className="py-8">
        <h3 className="text-2xl font-bold">Create Investment Plan</h3>
      </div>
      <section className="px-4 py-6 h-screen">
        <div className="bg-white">
          <CreatePlanForm />
        </div>
      </section>
    </Layout>
  );
};

export default CreatePlan;
