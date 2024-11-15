import { k72623_lo, nit2xli } from "@app/sensors/entities/sensors.entity";
import { Repository } from "typeorm";
import { HourlyStatisticsDTO } from "@app/sensors/statistics/dto/hourly-statistics.dto";
export declare class StatisticsService {
    private readonly k72623LoRepository;
    private readonly nit2xliRepository;
    constructor(k72623LoRepository: Repository<k72623_lo>, nit2xliRepository: Repository<nit2xli>);
    getTemperatureHourlyStatistics_K72623Lo(deviceName: string, time: string): Promise<HourlyStatisticsDTO | null>;
    getTemperatureHourlyStatistics_nit2xli(deviceName: string, time: string): Promise<HourlyStatisticsDTO | null>;
    getHourAverages(last24h: {
        time: Date;
        temperature: number;
    }[]): {
        hour: number;
        average: number;
    }[] | null;
}
