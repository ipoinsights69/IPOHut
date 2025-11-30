import Home from "@/views/Home";
import { getIPOData } from "@/lib/api";

export const revalidate = 14400; // Revalidate every 4 hours

export default async function HomePage() {
  const ipoData = await getIPOData();
  return <Home ipoData={ipoData} />;
}
