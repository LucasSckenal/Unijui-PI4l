export declare class HourlyStatisticsDTO {
    readonly deviceName: string;
    readonly averagePerHour: {
        hour: number;
        average: number;
    }[];
}
export declare class Last24HoursDataDTO {
    readonly deviceName: string;
    readonly time: Date;
    readonly emw_rain_lvl: number;
    readonly emw_avg_wind_speed: number;
    readonly emw_gust_wind_speed: number;
    readonly emw_wind_direction: number;
    readonly emw_temperature: number;
    readonly emw_humidity: number;
    readonly emw_luminosity: number;
    readonly emw_uv: number;
    readonly emw_solar_radiation: number;
    readonly emw_atm_pres: number;
    readonly noise: number;
    readonly temperature: number;
    readonly humidity: number;
    readonly pm2_5: number;
    readonly averagePerHour?: {
        hour: number;
        averages: {
            emw_rain_lvl?: number;
            emw_avg_wind_speed?: number;
            emw_gust_wind_speed?: number;
            emw_wind_direction?: number;
            emw_temperature?: number;
            emw_humidity?: number;
            emw_luminosity?: number;
            emw_uv?: number;
            emw_solar_radiation?: number;
            emw_atm_pres?: number;
            noise?: number;
            temperature?: number;
            humidity?: number;
            pm2_5?: number;
        };
    }[];
}
export declare class HourlyTotalStatisticsDTO {
    readonly deviceName: string;
    readonly dataPerHour: {
        hour: number;
        averages: {
            emw_rain_lvl?: number;
            emw_avg_wind_speed?: number;
            emw_gust_wind_speed?: number;
            emw_wind_direction?: number;
            emw_temperature?: number;
            emw_humidity?: number;
            emw_luminosity?: number;
            emw_uv?: number;
            emw_solar_radiation?: number;
            emw_atm_pres?: number;
            noise?: number;
            temperature?: number;
            humidity?: number;
            pm2_5?: number;
        };
    }[];
}
