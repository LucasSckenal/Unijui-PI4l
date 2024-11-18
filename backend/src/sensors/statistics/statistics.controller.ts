import { Controller, Get, Param } from "@nestjs/common";
import { HourlyStatisticsDTO } from "./dto/hourly-statistics.dto";
import { StatisticsService } from "./statistics.service";

@Controller("sensors")
export class StatisticsController {
  constructor(private readonly sensor: StatisticsService) {}

  @Get("hourly-statistics/:deviceName/:dateTime")
  async getStatisticsByHour(
    @Param("deviceName") device: string,
    @Param("dateTime") time: string
  ): Promise<HourlyStatisticsDTO | null> {
    const [deviceName, prefixTable] = device.split("_");

    if (prefixTable === "k") {
      // prefixo para a tabela k72623_lo
      return await this.sensor.getTemperatureHourlyStatistics_K72623Lo(
        deviceName,
        time
      );
    } else if (prefixTable === "n") {
      // prefixo para a tabela nit2xli
      return await this.sensor.getTemperatureHourlyStatistics_nit2xli(
        deviceName,
        time
      );
    }

    return null; // Caso o prefixo não seja encontrado
  }

  @Get("all-data/:deviceName/:date")
  async getAllData(
    @Param("deviceName") deviceName: string,
    @Param("date") date: string
  ): Promise<any[]> {
    const [name, prefixTable] = deviceName.split("_");

    if (prefixTable === "k") {
      return await this.sensor.getAllData_K72623Lo(name, date); // Se for a tabela K
    } else if (prefixTable === "n") {
      return await this.sensor.getAllData_nit2xli(name, date); // Se for a tabela NIT2XLI
    } else if (prefixTable === "t") {
      return await this.sensor.getAllData_tabelaCombinada(name, date); // Se for a tabela tabela_combinada
    }

    return [];
  }

  @Get("tabela-combinada/last-24-hours")
  async getLast24HoursData() {
    return await this.sensor.getLast24HoursData_tabelaCombinada();
  }
}
