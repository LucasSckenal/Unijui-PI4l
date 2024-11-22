import { Controller, Get, Query } from "@nestjs/common";
import { StatisticsService } from "./statistics.service";

@Controller("sensors")
export class StatisticsController {
  constructor(private readonly sensor: StatisticsService) {}

  @Get("tabela-combinada/last-24-hours")
  async getLast24HoursData(@Query("selectedDate") selectedDate?: string) {
    return await this.sensor.getLast24HoursData_tabelaCombinada(selectedDate);
  }
}
