
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
    ) {}

    async getTemperatureHourlyStatistics_K72623Lo(deviceName: string, time: string): Promise<any | null> {
        const timestamp = new Date(time);
        timestamp.setHours(timestamp.getHours() - 24);

        const result = await this.k72623LoRepository.find({
            select: ['temperature', 'time'],
            where: {
                deviceName,
                time: MoreThan(timestamp),
            },
            order: { time: 'ASC' }, // Ordenar por tempo crescente para agrupar facilmente
        });

        if (result.length === 0) return null;

        const groupedByHour = this.groupByHour(result);

        return { deviceName, dataPerHour: groupedByHour };
    }

    async getTemperatureHourlyStatistics_nit2xli(deviceName: string, time: string): Promise<any | null> {
        const timestamp = new Date(time);
        timestamp.setHours(timestamp.getHours() - 24);

        const result = await this.nit2xliRepository.find({
            select: ['emw_temperature', 'time'],
            where: {
                deviceName,
                time: MoreThan(timestamp),
            },
            order: { time: 'ASC' }, // Ordenar por tempo crescente para agrupar facilmente
        });

        if (result.length === 0) return null;

        const groupedByHour = this.groupByHour(
            result.map(item => ({
                temperature: item.emw_temperature,
                time: item.time,
            }))
        );

        return { deviceName, dataPerHour: groupedByHour };
    }

    groupByHour(data: { temperature: number; time: Date }[]): { hour: number; values: number[] }[] {
        const grouped: { [hour: number]: number[] } = {};

        for (const item of data) {
            const hour = item.time.getHours();
            if (!grouped[hour]) {
                grouped[hour] = [];
            }
            grouped[hour].push(item.temperature);
        }

        const result: { hour: number; values: number[] }[] = [];
        for (let i = 0; i < 24; i++) {
            result.push({
                hour: i,
                values: grouped[i] || [], // Preenche com um array vazio caso não haja dados para a hora
            });
        }

        return result;
    }
}
