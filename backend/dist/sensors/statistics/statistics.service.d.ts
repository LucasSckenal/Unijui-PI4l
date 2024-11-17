import { k72623_lo, nit2xli } from "@app/sensors/entities/sensors.entity";
import { Repository } from "typeorm";
export declare class StatisticsService {
    private readonly k72623LoRepository;
    private readonly nit2xliRepository;
    constructor(k72623LoRepository: Repository<k72623_lo>, nit2xliRepository: Repository<nit2xli>);
    getTemperatureHourlyStatistics_K72623Lo(deviceName: string, time: string): Promise<any | null>;
    getTemperatureHourlyStatistics_nit2xli(deviceName: string, time: string): Promise<any | null>;
    groupByHour(data: {
        temperature: number;
        time: Date;
    }[]): {
        hour: number;
        values: number[];
    }[];
}
