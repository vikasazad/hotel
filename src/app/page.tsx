import { getHotelData } from "@/lib/firebase/firestore";
import Header from "./modules/header/components/header";
import Main from "./modules/main/components/main";

export default async function Home() {
  const data: any = await getHotelData();
  console.log("data", data);
  return (
    <div className="p-2">
      <Header data={data.info} />
      <Main />
    </div>
  );
}
