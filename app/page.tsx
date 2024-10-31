import Billion from "@/components/billion";

interface Billion {
  id: string;
  name: string;
  squareImage: string;
  netWorth: number;
  industries: string[];
}

async function getBillions(): Promise<Billion[]> {
  const apiUrl = "https://billions-api.nomadcoders.workers.dev/";
  const response = await fetch(apiUrl);
  const json = await response.json();
  return json;
}

export default async function HomePage() {
  const billions = await getBillions();
  return (
    <div>
      <div className="grid grid-cols-4 gap-5">
        {billions.map((billion) => (
          <Billion
            key={billion.id}
            id={billion.id}
            image_path={billion.squareImage}
            name={billion.name}
            netWorth={billion.netWorth}
            industries={billion.industries}
          />
        ))}
      </div>
    </div>
  );
}
