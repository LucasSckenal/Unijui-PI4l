import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  k72623_lo,
  nit2xli,
  tabela_combinada,
} from "@app/sensors/entities/sensors.entity";
import { MoreThan, Repository, Between } from "typeorm";
import { Last24HoursDataDTO } from "@app/sensors/statistics/dto/hourly-statistics.dto";

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(k72623_lo)
    private readonly k72623LoRepository: Repository<k72623_lo>,
    @InjectRepository(nit2xli)
    private readonly nit2xliRepository: Repository<nit2xli>,
    @InjectRepository(tabela_combinada)
    private readonly tabelaCombinadaRepository: Repository<tabela_combinada>
  ) {}

  // Função de busca de dados pela data (só para ter como referência)
  async findByDateCombined(date: string) {
    return await this.tabelaCombinadaRepository
    .createQueryBuilder("data")
    .where("DATE(data) = :date", { date })
    .getMany();
  }

  // Função para buscar os dados das últimas 24 horas da tabela tabela_combinada
  async getLast24HoursData_tabelaCombinada(selectedDate?: string): Promise<Last24HoursDataDTO[]> {
    let now = new Date();

    if (selectedDate) {
      const userDate = new Date(selectedDate); 
      if (!isNaN(userDate.getTime())) {
        now = userDate;
      }
    }
  
    const timestamp = new Date(now);
    timestamp.setHours(timestamp.getHours() - 24);

    const result = await this.tabelaCombinadaRepository.find({
      where: { time: Between(timestamp, now) },
      order: { time: "ASC" },
    });
  
    const groupedByDevice = result.reduce((acc, curr) => {
      acc[curr.deviceName] = acc[curr.deviceName] || [];
      acc[curr.deviceName].push(curr);
      return acc;
    }, {} as { [deviceName: string]: Last24HoursDataDTO[] });
  
    const deviceOrder = ["Estação Cruzeiro", "Micropartículas Rótula do Taffarel"];
  
    const response = Object.keys(groupedByDevice).map((deviceName) => {
      const deviceData = groupedByDevice[deviceName];
  
      const averagesPerHour = Array.from({ length: 24 }, (_, hour) => ({
        hour,
        averages: this.initializeSensorData(),
      }));
  
      let lastValidEntry = null;
      deviceData.forEach((entry) => {
        const entryHour = new Date(entry.time).getHours();
        const hourData = averagesPerHour.find((h) => h.hour === entryHour);
  
        if (hourData) {
          lastValidEntry = entry;
          Object.keys(hourData.averages).forEach((key) => {
            if (entry[key] !== null && entry[key] !== undefined) {
              hourData.averages[key] += entry[key];
            }
          });
        }
      });
  
      averagesPerHour.forEach((hourData, hour) => {
        if (!deviceData.some((entry) => new Date(entry.time).getHours() === hour)) {
          if (lastValidEntry) {
            Object.keys(hourData.averages).forEach((key) => {
              hourData.averages[key] = lastValidEntry[key] || 0;
            });
          }
        }
      });
  
      averagesPerHour.forEach((hourData) => {
        Object.keys(hourData.averages).forEach((key) => {
          hourData.averages[key] = hourData.averages[key] || 0;
        });
      });
  
      return {
        deviceName,
        ...deviceData[deviceData.length - 1],
        averagePerHour: averagesPerHour,
      };
    });
  
    response.sort(
      (a, b) => deviceOrder.indexOf(a.deviceName) - deviceOrder.indexOf(b.deviceName)
    );
  
    return response;
  }
  

  // Inicializa os dados dos sensores
  private initializeSensorData(): { [key: string]: number } {
    return {
      emw_rain_lvl: 0,
      emw_avg_wind_speed: 0,
      emw_gust_wind_speed: 0,
      emw_wind_direction: 0,
      emw_temperature: 0,
      emw_humidity: 0,
      emw_luminosity: 0,
      emw_uv: 0,
      emw_solar_radiation: 0,
      emw_atm_pres: 0,
      noise: 0,
      temperature: 0,
      humidity: 0,
      pm2_5: 0,
    };
  }

  // Função para calcular as médias
  calculateAverages(data: any[]): { [key: string]: number | undefined } {
    const keys = Object.keys(this.initializeSensorData());
    const totals = keys.reduce((acc, key) => ({ ...acc, [key]: 0 }), {});
    const counts = keys.reduce((acc, key) => ({ ...acc, [key]: 0 }), {});

    data.forEach((item) => {
      keys.forEach((key) => {
        if (item[key] !== null && item[key] !== undefined) {
          totals[key] += item[key];
          counts[key]++;
        }
      });
    });

    return keys.reduce(
      (acc, key) => ({ ...acc, [key]: counts[key] > 0 ? totals[key] / counts[key] : 0 }),
      {}
    );
  }

  // Agrupa dados por hora com fallback
  groupByHourWithFallback(data: any[], startTimestamp: Date): any[] {
    const grouped: { [hour: number]: any[] } = {};
    let lastValidEntry: any = null;

    data.forEach((item) => {
      const diffInHours = Math.floor(
        (new Date(item.time).getTime() - startTimestamp.getTime()) / (1000 * 60 * 60)
      );
      if (diffInHours >= 0 && diffInHours < 24) {
        grouped[diffInHours] = grouped[diffInHours] || [];
        grouped[diffInHours].push(item);
        lastValidEntry = item;
      }
    });

    return Array.from({ length: 24 }, (_, hour) => ({
      hour,
      data: grouped[hour] || (lastValidEntry ? [lastValidEntry] : []),
    }));
  }

  // Preenche os valores conhecidos mais recentes
  fillWithLastKnownValues(data: any[]): { [key: string]: number | undefined } {
    const lastKnown = data[data.length - 1];
    return this.initializeSensorData();
  }
}
