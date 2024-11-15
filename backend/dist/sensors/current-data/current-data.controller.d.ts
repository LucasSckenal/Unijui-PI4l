import { CurrentDataService } from './current-data.service';
import { CurrentDataDTO } from './dto/current-data.dto';
export declare class CurrentDataController {
    private readonly sensor;
    constructor(sensor: CurrentDataService);
    getLastRegister(device: string): Promise<CurrentDataDTO | null>;
}
