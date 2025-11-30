import Sectors from "@/views/Sectors";
import { getIPOData } from "@/lib/api";

export const revalidate = 14400; // Revalidate every 4 hours

export default async function SectorsPage() {
    const ipoData = await getIPOData();
    return <Sectors ipoData={ipoData} />;
}
