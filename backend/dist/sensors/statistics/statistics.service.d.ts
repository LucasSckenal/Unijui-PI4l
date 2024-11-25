import { Repository } from "typeorm";
import { tabela_combinada } from "@app/sensors/entities/sensors.entity";
import { Last24HoursDataDTO } from "@app/sensors/statistics/dto/hourly-statistics.dto";
export declare class StatisticsService {
    private readonly tabelaCombinadaRepository;
    constructor(tabelaCombinadaRepository: Repository<tabela_combinada>);
    getLast24HoursData_tabelaCombinada(selectedDate?: string): Promise<Last24HoursDataDTO[]>;
}
