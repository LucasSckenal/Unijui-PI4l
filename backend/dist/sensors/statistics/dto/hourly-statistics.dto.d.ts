export declare class HourlyStatisticsDTO {
    readonly deviceName: string;
    readonly averagePerHour: {
        hour: number;
        average: number;
    }[];
}
