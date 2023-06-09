import httpService from "./http.services";
const qualityEndPoint = "quality/";

const qualityService = {
    fetchAll: async () => {
        const { data } = await httpService.get(qualityEndPoint);
        return data;
    }
};

export default qualityService;
