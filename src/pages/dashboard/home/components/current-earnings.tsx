import { FC } from "react";
import { Investment } from "../../../../types";

const CurrentEarnings: FC<{
  investments: Investment[];
}> = ({ investments }) => {
  const InvestmentComponent: FC<{ investment: Investment }> = ({
    investment,
  }) => {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            {investment.plan.title ?? "Available Balance"}
          </h2>
          <div className="bg-blue-100 p-2 rounded-lg">
            <i className="fas fa-wallet text-blue-500"></i>
          </div>
        </div>
        <p className="text-3xl font-bold text-gray-800 mb-2">
          {new Intl.NumberFormat("en-US", {
            currency: "USD",
            style: "currency",
          }).format(investment.capital ?? 0)}
        </p>
        <div className="flex items-center text-sm">
          <span className="text-green-500 flex items-center mr-2">
            <i className="fas fa-arrow-up mr-1"></i>{" "}
            {new Intl.NumberFormat("en-US", {
              currency: "USD",
              style: "currency",
            }).format(investment.earnings ?? 0)}
          </span>
          <span className="text-gray-500">
            from {investment.plan.title ?? "Available Balance"}
          </span>
        </div>
      </div>
    );
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {/* <!-- Pricing Card 1 --> */}
      {investments &&
        investments.map((investment, index) => (
          <InvestmentComponent key={index} investment={investment} />
        ))}
    </div>
  );
};

export default CurrentEarnings;
