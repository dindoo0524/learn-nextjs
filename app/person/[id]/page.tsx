interface FinancialAsset {
  exchange: string;
  ticker: string;
  companyName: string;
  numberOfShares: number;
  sharePrice: number;
  currencyCode: string;
  exchangeRate: number;
  interactive: boolean;
  currentPrice: number;
  exerciseOptionPrice?: number; // Optional property
}

interface Billion {
  id: string;
  state: string;
  city: string;
  name: string;
  country: string;
  position: number;
  industries: string[];
  financialAssets?: FinancialAsset[];
  squareImage: string;
  bio: string[];
  about: string[];
  netWorth: number;
}

async function getBillion(id: string): Promise<Billion> {
  const apiUrl = `https://billions-api.nomadcoders.workers.dev/person/${id}`;
  const response = await fetch(apiUrl);
  const json = await response.json();
  return json;
}

// netWorth 값을 억만 단위로 변환하는 함수
function formatNetWorthToBillion(netWorth: number): string {
  const netWorthInBillions = Math.floor(netWorth / 1_000);
  return `${netWorthInBillions} Billion`;
}

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const billion = await getBillion(id);
  const netWorthInBillions = formatNetWorthToBillion(billion.netWorth);

  return (
    <div>
      <div className="flex p-4">
        <div>
          <img src={billion.squareImage} alt={billion.name} />
        </div>
        <div className="leading-loose p-5">
          <p className="text-4xl">{billion.name}</p>
          <p className="text-3xl text-black bg-yellow-400">
            💰 Networth: {netWorthInBillions}{" "}
          </p>
          <p>Country: {billion.country} </p>
          <p>
            industries:
            {billion.industries.map((industry: string, index: number) => (
              <span className="bg-green-400 text-slate-600" key={index}>
                {industry}
              </span>
            ))}
          </p>
        </div>
      </div>
      <div className="p-4">
        <h4 className="text-green-400 bg-black p-4">ABOUT</h4>
        {billion.about.map((el: string, index: number) => (
          <p className="py-4" key={index}>
            * {el}
          </p>
        ))}
      </div>

      <div className="p-4">
        <h4 className="text-blue-400 bg-black p-4">BIO</h4>
        {billion.bio.map((el: string, index: number) => (
          <p className="py-4" key={index}>
            * {el}
          </p>
        ))}
      </div>

      <div className="p-4">
        <h4 className="text-blue-400 bg-black p-4">Financial Assets</h4>
        <div className="grid grid-cols-2 gap-5 my-10">
          {billion.financialAssets &&
            billion.financialAssets.map((asset, index: number) => (
              <div className="p-10 bg-yellow-500 rounded-3xl" key={index}>
                <p>Ticker: {asset.ticker}</p>
                <p>Company: {asset.companyName}</p>
                <p>SharePrice: {asset.sharePrice}</p>
                <p>CurrentPrice: {asset.currentPrice}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
