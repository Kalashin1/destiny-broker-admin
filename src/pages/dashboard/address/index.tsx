import Layout from "../components/layout";
import AddressForm from "./components/address-form";
import AddressTable from "./components/address-table";

const AddAddress = () => {
  return (
    <Layout>
      <section className="p-6">
        <AddressForm />
      </section>
      <section className="p-6">
        <AddressTable />
      </section>
    </Layout>
  );
};

export default AddAddress;
