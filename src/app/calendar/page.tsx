import { getIPOData } from "@/lib/api";
import Calendar from "@/views/Calendar";

export const revalidate = 14400; // Revalidate every 4 hours

export default async function CalendarPage() {
    const ipoData = await getIPOData();
    return <Calendar ipoData={ipoData} />;
}
