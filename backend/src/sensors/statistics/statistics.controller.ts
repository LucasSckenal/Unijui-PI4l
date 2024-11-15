import { Controller, Get, Param } from '@nestjs/common';
import { HourlyStatisticsDTO } from './dto/hourly-statistics.dto';
import { StatisticsService } from './statistics.service';


@Controller('sensors')
export class StatisticsController {
    constructor(private readonly sensor: StatisticsService) { }

 
    @Get('hourly-statistics/:deviceName/:dateTime')
    async getStatisticsByHour(
      @Param('deviceName') device: string,
      @Param('dateTime') time: string
    ): Promise<HourlyStatisticsDTO | null> {
       
        const [deviceName, prefixTable] = device.split('_');

        if (prefixTable === "k") { // prefixo para a table k72623_lo            
            return await this.sensor.getTemperatureHourlyStatistics_K72623Lo(deviceName, time);
        } else if (prefixTable === "n") {// prefixo para a table nit2xli
            return await this.sensor.getTemperatureHourlyStatistics_nit2xli(deviceName, time);
        }

    }
}