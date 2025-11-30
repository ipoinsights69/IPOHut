import GMPLanding from "@/views/GMPLanding";
import { getIPOData } from "@/lib/api";

export const revalidate = 14400; // Revalidate every 4 hours

export default async function GMPLandingPage() {
    const ipoData = await getIPOData();
    return <GMPLanding ipoData={ipoData} />;
}
