import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { k72623_lo, nit2xli } from '@app/sensors/entities/sensors.entity';
import { Repository } from 'typeorm';
import { CurrentDataDTO_k72623lo, CurrentDataDTO_nit2xli } from '@app/sensors/current-data/dto/current-data.dto';

@Injectable()
export class CurrentDataService {
  constructor(
    @InjectRepository(k72623_lo)
    private readonly k72623LoRepository: Repository<k72623_lo>,

    @InjectRepository(nit2xli)
    private readonly nit2xliRepository: Repository<nit2xli>,
  ) { }

  // Método para retornar o último registro inserido na tabela k72623_lo
  async getLastRegByDevice_K72623Lo(deviceName: string): Promise<CurrentDataDTO_k72623lo | null> {

    const latestRecord = await this.k72623LoRepository.findOne({
      where: { deviceName },
      order: {
        time: 'DESC',
      },
    });

    if (latestRecord) {
      const currentDataDTO_k72623lo: CurrentDataDTO_k72623lo = {
        deviceName: latestRecord.deviceName,
        noise: latestRecord.noise,
        pm2_5: latestRecord.pm2_5,
        temperature: latestRecord.temperature,
        humidity: latestRecord.humidity,
        timestamp: latestRecord.time,
      };
      return currentDataDTO_k72623lo;
    } else {
      return null;
    }
  }


  // Método para retornar o último registro inserido na tabela nit2xli
  async getLastRegByDevice_nit2xli(deviceName: string): Promise<CurrentDataDTO_nit2xli | null> {

    const latestRecord = await this.nit2xliRepository.findOne({
      where: { deviceName },
      order: {
        time: 'DESC',
      },
    });

    if (latestRecord) {
      const currentDataDTO_nit2xli: CurrentDataDTO_nit2xli = {
        deviceName: latestRecord.deviceName,
        emw_rain_lvl: latestRecord.emw_rain_lvl,
        emw_avg_wind_speed: latestRecord.emw_avg_wind_speed,
        emw_gust_wind_speed: latestRecord.emw_gust_wind_speed,
        emw_wind_direction: latestRecord.emw_wind_direction,
        emw_humidity: latestRecord.emw_humidity,
        emw_temperature: latestRecord.emw_temperature,
        emw_luminosity: latestRecord.emw_luminosity,
        emw_uv: latestRecord.emw_uv,
        emw_solar_radiation: latestRecord.emw_solar_radiation,
        emw_atm_pres: latestRecord.emw_atm_pres,
        time: latestRecord.time,
      };
      return currentDataDTO_nit2xli;
    } else {
      return null;
    }
  }

}
