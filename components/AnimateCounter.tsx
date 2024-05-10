"use client";

import CountUp from "react-countup/build/CountUp";

const AnimateCounter = ({ amount }: { amount: number }) => {
  return (
    <div className="w-full">
      <CountUp decimal="," prefix="$ " end={amount} decimals={2} />;
    </div>
  );
};
export default AnimateCounter;
