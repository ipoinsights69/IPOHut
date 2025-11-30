import ListedIPOs from "@/views/ListedIPOs";
import { getIPOData } from "@/lib/api";

export const revalidate = 14400; // Revalidate every 4 hours

export default async function ListedIPOsPage() {
    const ipoData = await getIPOData();
    return <ListedIPOs ipoData={ipoData} />;
}
