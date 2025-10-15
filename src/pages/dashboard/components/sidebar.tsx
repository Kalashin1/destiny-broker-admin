import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  // SheetTitle,
} from "../../../components/ui/sheet";

import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { SCREENS } from "../../../navigation/constant";
import { getDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../../firebase-setting";
import { User } from "../../../types";

const Sidebar = () => {
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

  const navigate = useNavigate();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <i className="fas fa-bars" />
        </Button>
      </SheetTrigger>
      <SheetContent className="lg:w-3/12 bg-gray-800 text-white" side="left">
        <SheetHeader>
          <img
            src="/jtrw_logo-removebg-preview (1).png"
            width={50}
            height={50}
          />
        </SheetHeader>
        <nav className="flex flex-col gap-1 p-2 font-sans text-base font-normal text-white mt-4">
          <div
            role="button"
            tabIndex={0}
            onClick={() => navigate(SCREENS.DASHBOARD)}
            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
          >
            <div className="grid place-items-center mr-4">
              <i className="fas fa-house-user" />
            </div>
            Dashboard
          </div>
          {user?.isAdmin && (
            <div
              role="button"
              tabIndex={0}
              onClick={() => navigate(SCREENS.CREATE_INVESTMENT)}
              className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
            >
              <div className="grid place-items-center mr-4">
                <i className="fa-solid fa-square-plus"></i>
              </div>
              Create Investment
            </div>
          )}
          <div
            role="button"
            tabIndex={0}
            onClick={() => navigate(SCREENS.INVESTMENTS)}
            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
          >
            <div className="grid place-items-center mr-4">
              <i className="fa-solid fa-seedling"></i>
            </div>
            Investments
          </div>
          {user?.isAdmin && (
            <div
              role="button"
              tabIndex={0}
              onClick={() => navigate(SCREENS.PLANS)}
              className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
            >
              <div className="grid place-items-center mr-4">
                <i className="fa-solid fa-paper-plane"></i>
              </div>
              Plans
            </div>
          )}
          {user?.isAdmin && (
            <div
              role="button"
              tabIndex={0}
              onClick={() => navigate(SCREENS.CREATE_PLAN)}
              className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
            >
              <div className="grid place-items-center mr-4">
                <i className="fa-regular fa-calendar-plus"></i>
              </div>
              Create Plan
            </div>
          )}
          {user?.isAdmin && (
            <div
              role="button"
              tabIndex={0}
              onClick={() => navigate(SCREENS.USERS_TABLE)}
              className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
            >
              <div className="grid place-items-center mr-4">
                <i className="fas fa-table"></i>
              </div>
              Users
            </div>
          )}
          <div
            role="button"
            tabIndex={0}
            onClick={() => navigate(SCREENS.TRANSACTIONS)}
            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
          >
            <div className="grid place-items-center mr-4">
              <i className="fa-solid fa-arrow-down-up-across-line"></i>
            </div>
            Transactions
          </div>
          {!user?.isAdmin && (
            <div
              role="button"
              tabIndex={0}
              onClick={() => navigate(SCREENS.WITHDRAWAL)}
              className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
            >
              <div className="grid place-items-center mr-4">
                <i className="fa-solid fa-money-bill-transfer"></i>
              </div>
              Withdraw{" "}
              {/* <div className="grid place-items-center ml-auto justify-self-end">
              <div
                className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-blue-500/20 text-blue-900 py-1 px-2 text-xs rounded-full"
                style={{ opacity: 1 }}
              >
                <span className="">14</span>
              </div>
            </div> */}
            </div>
          )}
          {!user?.isAdmin && (
            <div
              role="button"
              tabIndex={0}
              onClick={() => navigate(SCREENS.PROFILE)}
              className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
            >
              <div className="grid place-items-center mr-4">
                <i className="fas fa-user" />
              </div>
              Profile
            </div>
          )}
          <div
            role="button"
            tabIndex={0}
            onClick={() => navigate(SCREENS.LOGIN)}
            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
          >
            <div className="grid place-items-center mr-4">
              <i className="fa-solid fa-right-from-bracket"></i>
            </div>
            Logout
          </div>
          {/* <div
            role="button"
            tabIndex={0}
            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
          >
            <div className="grid place-items-center mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            Settings
          </div> */}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
