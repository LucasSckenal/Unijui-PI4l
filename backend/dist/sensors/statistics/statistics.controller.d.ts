import { StatisticsService } from "./statistics.service";
export declare class StatisticsController {
    private readonly sensor;
    constructor(sensor: StatisticsService);
    getLast24HoursData(selectedDate?: string): Promise<import("./dto/hourly-statistics.dto").Last24HoursDataDTO[]>;
}
