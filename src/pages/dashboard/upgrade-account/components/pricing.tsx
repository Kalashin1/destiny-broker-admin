import { Link } from "react-router-dom";
import { SCREENS } from "../../../../navigation/constant";

const Pricing = ({ name, amount }: { name: string; amount: string }) => {
  return (
    <div className="bg-yellow-50 rounded-xl p-8 transition-all shadow-md mt-4 duration-300 card-hover">
      <div className="text-center mb-6">
        <i className="fas fa-crown text-4xl text-purple-400 mb-4"></i>
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <div className="text-blue-400 text-xl font-medium">{amount}</div>
      </div>
      <ul className="space-y-3 mb-8">
        <li className="flex items-center">
          <i className="fas fa-check-circle text-green-400 mr-2"></i>
          <span>1 PH/s+ Mining Power</span>
        </li>
        <li className="flex items-center">
          <i className="fas fa-check-circle text-green-400 mr-2"></i>
          <span>Real-time Payouts</span>
        </li>
        <li className="flex items-center">
          <i className="fas fa-check-circle text-green-400 mr-2"></i>
          <span>Custom Mining Pool</span>
        </li>
        <li className="flex items-center">
          <i className="fas fa-check-circle text-green-400 mr-2"></i>
          <span>24/7 VIP Support</span>
        </li>
        <li className="flex items-center">
          <i className="fas fa-check-circle text-green-400 mr-2"></i>
          <span>Dedicated Account Manager</span>
        </li>
      </ul>
      <div className="w-full flex justify-center items-center">
        <Link
          to={SCREENS.CREATE_INVESTMENT}
          className="w-full text-center bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-medium hover:opacity-90 transition"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Pricing;
