import UpcomingIPOs from "@/views/UpcomingIPOs";
import { getIPOData } from "@/lib/api";

export const revalidate = 14400; // Revalidate every 4 hours

export default async function UpcomingIPOsPage() {
    const ipoData = await getIPOData();
    return <UpcomingIPOs ipoData={ipoData} />;
}
