import { InfoViewModel } from "../models/view-models/info.view-model";
import { prisma } from "../data/db";
import { infoConverter } from "../converters/info.converter";

export const createInfoService = () => {

    const getInfo = async (): Promise<InfoViewModel> => {
        const info = await prisma.info.findFirstOrThrow();
        return infoConverter.modelToViewModel(info);
    }
    
    return {
        getInfo
    }
}