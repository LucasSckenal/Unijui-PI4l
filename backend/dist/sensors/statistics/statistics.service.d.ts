import { k72623_lo, nit2xli, tabela_combinada } from "@app/sensors/entities/sensors.entity";
import { Repository } from "typeorm";
import { Last24HoursDataDTO } from "@app/sensors/statistics/dto/hourly-statistics.dto";
export declare class StatisticsService {
    private readonly k72623LoRepository;
    private readonly nit2xliRepository;
    private readonly tabelaCombinadaRepository;
    constructor(k72623LoRepository: Repository<k72623_lo>, nit2xliRepository: Repository<nit2xli>, tabelaCombinadaRepository: Repository<tabela_combinada>);
    findByDateCombined(date: string): Promise<tabela_combinada[]>;
    getLast24HoursData_tabelaCombinada(selectedDate?: string): Promise<Last24HoursDataDTO[]>;
    private initializeSensorData;
    calculateAverages(data: any[]): {
        [key: string]: number | undefined;
    };
    groupByHourWithFallback(data: any[], startTimestamp: Date): any[];
    fillWithLastKnownValues(data: any[]): {
        [key: string]: number | undefined;
    };
}
