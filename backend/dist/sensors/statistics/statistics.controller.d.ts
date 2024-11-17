import { HourlyStatisticsDTO } from './dto/hourly-statistics.dto';
import { StatisticsService } from './statistics.service';
export declare class StatisticsController {
    private readonly sensor;
    constructor(sensor: StatisticsService);
    getStatisticsByHour(device: string, time: string): Promise<HourlyStatisticsDTO | null>;
}