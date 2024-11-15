
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { k72623_lo, nit2xli } from "@app/sensors/entities/sensors.entity";
import { MoreThan, Repository } from "typeorm"
import { HourlyStatisticsDTO } from "@app/sensors/statistics/dto/hourly-statistics.dto";
// import { HourlyTemperatureStatistics } from "./models";

@Injectable()
export class StatisticsService {
    constructor(
        @InjectRepository(k72623_lo)
        private readonly k72623LoRepository: Repository<k72623_lo>,

        @InjectRepository(nit2xli)
        private readonly nit2xliRepository: Repository<nit2xli>,
    ) { }

    // Método para retornar o historico das 24 horas tabela k72623_lo - apenas temperatura
    async getTemperatureHourlyStatistics_K72623Lo(deviceName: string, time: string): Promise<HourlyStatisticsDTO | null> {

        const timestamp = new Date(time);
        timestamp.setHours(timestamp.getHours() - 24);

        let result = await this.k72623LoRepository.find({
            select: ['temperature', 'time'],
            where: {
                deviceName,
                time: MoreThan(timestamp),
            },
            order: {
                time: 'DESC',
            },
        });


        // Converter 'result' para um vetor de objetos compostos com 'temperature' e 'time'
        const resultVector: { time: Date; temperature: number }[] = result.map(item => ({
            temperature: item.temperature,  // Renomeando 'emw_temperature' para 'temperature'
            time: item.time
        }));

        const temperatureAverage = this.getHourAverages(resultVector)

        return { deviceName: deviceName, averagePerHour: temperatureAverage };
    }

    // Método para retornar o historico das 24 horas tabela nit2xli - apenas temperatura
    async getTemperatureHourlyStatistics_nit2xli(deviceName: string, time: string): Promise<HourlyStatisticsDTO | null> {

        const timestamp = new Date(time);
        // console.log("hora atual: "+timestamp.getHours())
        timestamp.setHours(timestamp.getHours() - 24);
        // console.log("24h ago: "+timestamp.getHours())

        const result = await this.nit2xliRepository.find({
            select: ['emw_temperature', 'time'],
            where: {
                deviceName,
                time: MoreThan(timestamp),
            },
            order: {
                time: 'DESC',
            },
        });

        // Converter 'result' para um vetor de objetos compostos com 'temperature' e 'time'
        const resultVector: { time: Date; temperature: number }[] = result.map(item => ({
            temperature: item.emw_temperature,  // Renomeando 'emw_temperature' para 'temperature'
            time: item.time
        }));

        const temperatureAverage = this.getHourAverages(resultVector)

        return { deviceName: deviceName, averagePerHour: temperatureAverage };

    }


    getHourAverages(last24h: { time: Date; temperature: number }[]): { hour: number; average: number }[] | null {

        const hourlyTemperatureStatistics: { hour: number; average: number }[] = [];

        let sum: number = 0;
        let count: number = 0;
        let hourRef: number = last24h[0].time.getHours();

        const k_length = last24h.length;
        for (let i = 0; i < k_length; i++) {
            if (last24h[i].time.getHours() === hourRef) {
                sum += last24h[i].temperature
                count++;
            } else {
                hourlyTemperatureStatistics.push({ hour: hourRef, average: sum / count })

                hourRef = last24h[i].time.getHours();
                count = 1;
                sum = last24h[i].temperature;
            }
        }        
        return hourlyTemperatureStatistics;
    }
}