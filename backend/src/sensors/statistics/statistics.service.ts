import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  k72623_lo,
  nit2xli,
  tabela_combinada,
} from "@app/sensors/entities/sensors.entity";
import { MoreThan, Repository, Between } from "typeorm";
import { HourlyStatisticsDTO } from "@app/sensors/statistics/dto/hourly-statistics.dto";

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

  // Função de busca de dados pela data
  async findByDate(date: string) {
    return await this.nit2xliRepository
      .createQueryBuilder("data")
      .where("DATE(data.timestamp) = :date", { date })
      .getMany();
  }

  // Função para obter estatísticas horárias da temperatura da tabela k72623_lo
  async getTemperatureHourlyStatistics_K72623Lo(
    deviceName: string,
    time: string
  ): Promise<any | null> {
    const timestamp = new Date(time);
    timestamp.setHours(timestamp.getHours() - 24);

    const result = await this.k72623LoRepository.find({
      select: ["temperature", "time"],
      where: {
        deviceName,
        time: MoreThan(timestamp),
      },
      order: { time: "ASC" },
    });

    if (result.length === 0) return null;

    const groupedByHour = this.groupByHour(result);

    return { deviceName, dataPerHour: groupedByHour };
  }

  // Função para obter estatísticas horárias da temperatura da tabela nit2xli
  async getTemperatureHourlyStatistics_nit2xli(
    deviceName: string,
    time: string
  ): Promise<any | null> {
    const timestamp = new Date(time);
    timestamp.setHours(timestamp.getHours() - 24);

    const result = await this.nit2xliRepository.find({
      select: ["emw_temperature", "time"],
      where: {
        deviceName,
        time: MoreThan(timestamp),
      },
      order: { time: "ASC" },
    });

    if (result.length === 0) return null;

    const groupedByHour = this.groupByHour(
      result.map((item) => ({
        temperature: item.emw_temperature,
        time: item.time,
      }))
    );

    return { deviceName, dataPerHour: groupedByHour };
  }

  // Função para buscar todos os dados da tabela k72623_lo
  async getAllData_K72623Lo(deviceName: string, date: string): Promise<any[]> {
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0); // Começo do dia em UTC
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999); // Fim do dia em UTC

    // Faz a consulta considerando o fuso horário corretamente
    const result = await this.k72623LoRepository.find({
      where: {
        deviceName,
        time: Between(startOfDay, endOfDay),
      },
      order: {
        time: "ASC", // Ordenando pela hora
      },
    });

    return this.groupByHour(result); // Retorna dados agrupados por hora
  }

  // Função para buscar todos os dados da tabela nit2xli
  async getAllData_nit2xli(deviceName: string, date: string): Promise<any[]> {
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0); // Começo do dia em UTC
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999); // Fim do dia em UTC

    // Faz a consulta considerando o fuso horário corretamente
    const result = await this.nit2xliRepository.find({
      where: {
        deviceName,
        time: Between(startOfDay, endOfDay),
      },
      order: {
        time: "ASC", // Ordenando pela hora
      },
    });

    return this.groupByHour(result); // Retorna dados agrupados por hora
  }

  // Função para buscar todos os dados da tabela tabela_combinada
  async getAllData_tabelaCombinada(
    deviceName: string,
    date: string
  ): Promise<any[]> {
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0); // Começo do dia em UTC
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999); // Fim do dia em UTC

    // Faz a consulta considerando o fuso horário corretamente
    const result = await this.tabelaCombinadaRepository.find({
      where: {
        time: Between(startOfDay, endOfDay), // Aqui você pode escolher qual campo de tempo usar
      },
      order: {
        time: "ASC", // Ordenando pela hora da tabela k72623 (ou o campo de tempo de sua escolha)
      },
    });

    console.log("Data de início:", startOfDay);
    console.log("Data de fim:", endOfDay);

    console.log("Raw data from DB:", result);

    return result; // Retorna dados agrupados por hora
  }

  // Função para agrupar os dados por hora
  groupByHour(data: any[]): any[] {
    const grouped: { [hour: number]: any[] } = {};

    // Agrupa os dados pela hora
    data.forEach((item) => {
      const dateTime = new Date(item.time);
      if (!isNaN(dateTime.getTime())) {
        const hour = dateTime.getUTCHours(); // Obtém a hora em UTC
        if (!grouped[hour]) {
          grouped[hour] = [];
        }
        grouped[hour].push(item); // Adiciona o item ao grupo correspondente
      }
    });

    // Monta a lista final, garantindo que todas as horas sejam representadas
    return Array.from({ length: 24 }, (_, hour) => ({
      hour,
      data: grouped[hour] || [], // Caso não haja dados para a hora, retorna vazio
    }));
  }
}
