import { k72623_lo, nit2xli, tabela_combinada } from "@app/sensors/entities/sensors.entity";
import { Repository } from "typeorm";
export declare class StatisticsService {
    private readonly k72623LoRepository;
    private readonly nit2xliRepository;
    private readonly tabelaCombinadaRepository;
    constructor(k72623LoRepository: Repository<k72623_lo>, nit2xliRepository: Repository<nit2xli>, tabelaCombinadaRepository: Repository<tabela_combinada>);
    findByDate(date: string): Promise<nit2xli[]>;
    getTemperatureHourlyStatistics_K72623Lo(deviceName: string, time: string): Promise<any | null>;
    getTemperatureHourlyStatistics_nit2xli(deviceName: string, time: string): Promise<any | null>;
    getAllData_K72623Lo(deviceName: string, date: string): Promise<any[]>;
    getAllData_nit2xli(deviceName: string, date: string): Promise<any[]>;
    getAllData_tabelaCombinada(deviceName: string, date: string): Promise<any[]>;
    groupByHour(data: any[]): any[];
}
