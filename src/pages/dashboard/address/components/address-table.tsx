import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../firebase-setting";

const AddressTable = () => {
  const [address, setAddress] = useState<
    { address: string; network: string; id: string }[]
  >([]);

  const setup = async () => {
    const q = query(collection(db, "address"));
    const docSnap = await getDocs(q);
    const data = docSnap.docs.map((d) => ({
      id: d.id,
      address: d.data().address,
      network: d.data().network,
    })) as { address: string; network: string; id: string }[];
    setAddress(data);
  };

  useEffect(() => {
    setup();
  }, []);

  const handleDelete = async (id: string) => {
    const docRef = doc(db, "address", id);
    await deleteDoc(docRef);
    alert("Address deleted");
    setup();
  };
  return (
    <div className="mx-auto mt-8 px-6 py-4">
      <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
        <p className="flex-1 text-base font-bold text-gray-900">Address</p>
      </div>

      <div className="mt-6 overflow-scroll rounded-xl border shadow bg-white">
        <table className="min-w-full border-separate border-spacing-y-2 px-6 border-spacing-x-2">
          <thead className="border-b lg:table-header-group">
            <tr className="">
              <td className="whitespace-normal min-w-[20rem] py-4 text-sm font-medium text-gray-500 sm:px-6">
                Addess
              </td>

              <td className="whitespace-normal min-w-[6rem] lg:w-fit  py-4 text-sm font-medium text-gray-500 sm:px-6">
                Network
              </td>

              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6"></td>
            </tr>
          </thead>

          <tbody className="lg:border-gray-300">
            {address.map((ad) => {
              return (
                <tr className="">
                  <td className="w-6/12 whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                    {ad.address}
                  </td>

                  <td className="w-2/12 whitespace-no-wrap py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                    {ad.network}
                  </td>

                  <td className="py-4 px-4 lg:px-0 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell flex justify-center items-center">
                    <button
                      type="button"
                      className="rounded-full flex justify-self-center justify-center items-center w-8 h-8 bg-red-600 text-white shadow-md"
                      onClick={() => handleDelete(ad.id)}
                    >
                      <i className="fas fa-times" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddressTable;
