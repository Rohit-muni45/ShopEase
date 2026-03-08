import { useLocation } from "react-router-dom";

const steps = ["Cart", "Address", "Payment", "Review"];

const CartStepper = () => {
  const location = useLocation();

  const stepIndex = () => {
    if (location.pathname.includes("review")) return 3;
    if (location.pathname.includes("payment")) return 2;
    if (location.pathname.includes("address")) return 1;
    return 0;
  };

  const currentStep = stepIndex();

  return (
    <div className="max-w-5xl mx-auto mt-4 mb-8 px-4">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={step} className="flex items-center w-full">
              {/* Circle */}
              <div
                className={`
                  w-4 h-4 rounded-full border-2 z-10
                  ${isCompleted ? "bg-black border-black" : ""}
                  ${isCurrent ? "bg-white border-black" : ""}
                  ${!isCompleted && !isCurrent ? "bg-gray-300 border-gray-300" : ""}
                `}
              ></div>

              {/* Line (except after last step) */}
              {index !== steps.length - 1 && (
                <div className="flex-1 h-0.5 bg-gray-300 relative">
                  <div
                    className="h-full bg-black transition-all duration-300"
                    style={{
                      width:
                        index < currentStep
                          ? "100%"
                          : index === currentStep
                          ? "0%"
                          : "0%",
                    }}
                  ></div>
                </div>
              )}

              {/* Label */}
              <div className="absolute mt-8 text-xs w-20 text-center -ml-8">
                <span
                  className={`${
                    isCurrent ? "text-black font-semibold" : "text-gray-500"
                  }`}
                >
                  {step}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartStepper;
