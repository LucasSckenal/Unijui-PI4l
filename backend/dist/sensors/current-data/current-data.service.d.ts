import { k72623_lo, nit2xli } from '@app/sensors/entities/sensors.entity';
import { Repository } from 'typeorm';
import { CurrentDataDTO_k72623lo, CurrentDataDTO_nit2xli } from '@app/sensors/current-data/dto/current-data.dto';
export declare class CurrentDataService {
    private readonly k72623LoRepository;
    private readonly nit2xliRepository;
    constructor(k72623LoRepository: Repository<k72623_lo>, nit2xliRepository: Repository<nit2xli>);
    getLastRegByDevive_K72623Lo(deviceName: string): Promise<CurrentDataDTO_k72623lo | null>;
    getLastRegByDevive_nit2xli(deviceName: string): Promise<CurrentDataDTO_nit2xli | null>;
}
