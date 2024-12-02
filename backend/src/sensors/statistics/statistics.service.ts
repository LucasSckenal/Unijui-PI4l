import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { tabela_combinada } from "@app/sensors/entities/sensors.entity";
import { Last24HoursDataDTO } from "@app/sensors/statistics/dto/hourly-statistics.dto";

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(tabela_combinada)
    private readonly tabelaCombinadaRepository: Repository<tabela_combinada>
  ) {}

  async getLast24HoursData_tabelaCombinada(
    selectedDate?: string
  ): Promise<Last24HoursDataDTO[]> {
    let calendarDate = new Date();

    if (selectedDate) {
      const userDate = new Date(selectedDate);
      if (!isNaN(userDate.getTime())) {
        calendarDate = userDate;
      }
    }

    const timePrevious24h = new Date(calendarDate);
    timePrevious24h.setHours(timePrevious24h.getHours() - 24);

    // Usando Query Builder
    const rawData = await this.tabelaCombinadaRepository
      .createQueryBuilder("tabela")
      .select("tabela.deviceName", "deviceName")
      .addSelect("DATE_PART('hour', tabela.time)", "hour")
      .addSelect("AVG(tabela.emw_rain_lvl)", "emw_rain_lvl")
      .addSelect("AVG(tabela.emw_avg_wind_speed)", "emw_avg_wind_speed")
      .addSelect("AVG(tabela.emw_gust_wind_speed)", "emw_gust_wind_speed")
      .addSelect("AVG(tabela.emw_wind_direction)", "emw_wind_direction")
      .addSelect("AVG(tabela.emw_temperature)", "emw_temperature")
      .addSelect("AVG(tabela.emw_humidity)", "emw_humidity")
      .addSelect("AVG(tabela.emw_luminosity)", "emw_luminosity")
      .addSelect("AVG(tabela.emw_uv)", "emw_uv")
      .addSelect("AVG(tabela.emw_solar_radiation)", "emw_solar_radiation")
      .addSelect("AVG(tabela.emw_atm_pres)", "emw_atm_pres")
      .addSelect("AVG(tabela.noise)", "noise")
      .addSelect("AVG(tabela.temperature)", "temperature")
      .addSelect("AVG(tabela.humidity)", "humidity")
      .addSelect("AVG(tabela.pm2_5)", "pm2_5")
      .where("tabela.time BETWEEN :start AND :end", {
        start: timePrevious24h,
        end: calendarDate,
      })
      .groupBy("tabela.deviceName, DATE_PART('hour', tabela.time)")
      .orderBy("tabela.deviceName, hour")
      .getRawMany();

    // Organizando no formato DTO
    const groupedByDevice = rawData.reduce((acc, curr) => {
      const deviceName = curr.deviceName;
      acc[deviceName] = acc[deviceName] || [];
      acc[deviceName].push({
        hour: parseInt(curr.hour),
        averages: {
          emw_rain_lvl: parseFloat(curr.emw_rain_lvl),
          emw_avg_wind_speed: parseFloat(curr.emw_avg_wind_speed),
          emw_gust_wind_speed: parseFloat(curr.emw_gust_wind_speed),
          emw_wind_direction: parseFloat(curr.emw_wind_direction),
          emw_temperature: parseFloat(curr.emw_temperature),
          emw_humidity: parseFloat(curr.emw_humidity),
          emw_luminosity: parseFloat(curr.emw_luminosity),
          emw_uv: parseFloat(curr.emw_uv),
          emw_solar_radiation: parseFloat(curr.emw_solar_radiation),
          emw_atm_pres: parseFloat(curr.emw_atm_pres),
          noise: parseFloat(curr.noise),
          temperature: parseFloat(curr.temperature),
          humidity: parseFloat(curr.humidity),
          pm2_5: parseFloat(curr.pm2_5),
        },
      });
      return acc;
    }, {} as { [deviceName: string]: { hour: number; averages: any }[] });

    // Lista de prioridade fixa
    const fixedOrder = [
      "Estação Cruzeiro",
      "Micropartículas Rótula do Taffarel",
    ];

    // Retorno no formato DTO
    return Object.keys(groupedByDevice)
      .map((deviceName) => {
        const averagePerHour = groupedByDevice[deviceName];
        return {
          deviceName,
          time: calendarDate,
          averagePerHour, // Média calculada para cada hora
        } as Last24HoursDataDTO;
      })
      .sort((a, b) => {
        // Ordenação fixa para as duas estações
        const indexA = fixedOrder.indexOf(a.deviceName);
        const indexB = fixedOrder.indexOf(b.deviceName);

        if (indexA !== -1 && indexB === -1) return -1; // `a` está na lista fixa, `b` não
        if (indexA === -1 && indexB !== -1) return 1; // `b` está na lista fixa, `a` não
        if (indexA !== -1 && indexB !== -1) return indexA - indexB; // Ambos estão na lista fixa

        // Para os outros dispositivos, ordenar por `time`
        return b.time.getTime() - a.time.getTime();
      });
  }
}
