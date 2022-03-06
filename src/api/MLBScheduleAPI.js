const axios = require("axios");
const Constants = require("../constants");

class MLBScheduleAPI{
    constructor(baseUrl, axiosInstance=axios){
        this.baseUrl = baseUrl;
        this.axiosInstance = axiosInstance;
    }

    getSchedule = async (date, sportId=Constants.DEFAULT_SPORT_ID, language=Constants.DEFAULT_LANGUAGE) => {
        const queryParams = {
            "date": date,
            "sportId": sportId,
            "language": language
        };

        try {
            let response =  await this.axiosInstance.get(`${this.baseUrl}/${Constants.MLB_STATS_API_SCHEDULE_ENDPOINT}`, {
                params: queryParams
            });
            return new Promise((resolve, reject) => {
                if(response.status == 200){
                    resolve(response.data);
                } else {
                    reject(response.data);
                }
            })
        } catch (err) {
            throw err;
        }
    }
}

module.exports = MLBScheduleAPI;