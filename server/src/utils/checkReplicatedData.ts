import Adoption from "../database/models/Adoption";

export default async function checkReplicatedData(data: { email: string, phone: number }): Promise<boolean> {
    const gettedAdoption = await Adoption.findOne({ where: { email: data.email, phone: data.phone } });
    if (gettedAdoption !== null)
        return true;

    return false;
}