import GMPTracker from "@/views/GMPTracker";
import { getIPOData } from "@/lib/api";

export const revalidate = 14400; // Revalidate every 4 hours

export default async function GMPTrackerPage() {
    const ipoData = await getIPOData();
    return <GMPTracker ipoData={ipoData} />;
}
