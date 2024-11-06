"use client";

import { useRouter } from "next/navigation";

interface IBillionProps {
  id: string;
  name: string;
  image_path: string;
  netWorth: number;
  industries: string[];
}

// netWorth 값을 억만 단위로 변환하는 함수
function formatNetWorthToBillion(netWorth: number): string {
  const netWorthInBillions = Math.floor(netWorth / 1_000);
  return `${netWorthInBillions} Billion`;
}

export default function Billion({
  id,
  image_path,
  name,
  netWorth,
  industries,
}: IBillionProps) {
  const router = useRouter();
  const netWorthInBillions = formatNetWorthToBillion(netWorth);
  const onClick = () => {
    router.push(`/billionaires/person/${id}`);
  };

  return (
    <div onClick={onClick} className="flex flex-col items-center">
      <div className="p-4 bg-gray-400">
        <img src={image_path} alt={name} className="w-60" />
      </div>

      <div className="text-xl">{name}</div>
      <div>{netWorthInBillions} Billions</div>
      <div className="my-4">
        {industries.map((industry, index) => (
          <span
            key={index}
            className="bg-yellow-300 p-2 rounded-sm text-gray-900"
          >
            {industry}
          </span>
        ))}
      </div>
    </div>
  );
}
