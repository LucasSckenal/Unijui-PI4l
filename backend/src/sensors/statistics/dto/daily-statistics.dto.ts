export class DailyStatisticsDTO {
    readonly deviceName: string;
    readonly temperatureStatistics: { day: number; max: number; min: number; average: number }[];
}