class mlbScheduleApi{
    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }

    getByDate(date){
        return `schedule for ${date}`
    }
}