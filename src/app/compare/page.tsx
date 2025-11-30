import Compare from "@/views/Compare";
import { getIPOData } from "@/lib/api";

export const revalidate = 14400; // Revalidate every 4 hours

export default async function ComparePage() {
    const ipoData = await getIPOData();
    return <Compare ipoData={ipoData} />;
}
