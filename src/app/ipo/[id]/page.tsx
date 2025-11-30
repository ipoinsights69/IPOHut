import IPODetails from "@/views/IPODetails";
import { getIPOData, getIPOById } from "@/lib/api";

export const revalidate = 14400; // Revalidate every 4 hours

export async function generateStaticParams() {
    const ipoData = await getIPOData();
    return ipoData.map((ipo) => ({
        id: ipo.id,
    }));
}

export default async function IPODetailsPage({ params }: { params: { id: string } }) {
    const ipo = await getIPOById(params.id);

    if (!ipo) {
        return <div>IPO not found</div>;
    }

    return <IPODetails ipo={ipo} />;
}
