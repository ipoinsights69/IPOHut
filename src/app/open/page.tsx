import OpenIPOs from "@/views/OpenIPOs";
import { getIPOData } from "@/lib/api";

export const revalidate = 14400; // Revalidate every 4 hours

export default async function OpenIPOsPage() {
    const ipoData = await getIPOData();
    return <OpenIPOs ipoData={ipoData} />;
}
