import { ipoData, IPOData } from "@/data/ipos";

export async function getIPOData(): Promise<IPOData[]> {
    // Simulate API delay
    // await new Promise((resolve) => setTimeout(resolve, 100));
    return ipoData;
}

export async function getIPOById(id: string): Promise<IPOData | undefined> {
    // Simulate API delay
    // await new Promise((resolve) => setTimeout(resolve, 100));
    return ipoData.find((ipo) => ipo.id === id);
}
