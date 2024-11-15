export interface CurrentDataDTO {
    deviceName: string;
}
export declare class CurrentDataDTO_k72623lo implements CurrentDataDTO {
    readonly deviceName: string;
    readonly noise: number;
    readonly temperature: number;
    readonly humidity: number;
    readonly pm2_5: number;
    readonly timestamp: Date;
}
export declare class CurrentDataDTO_nit2xli implements CurrentDataDTO {
    readonly deviceName: string;
    readonly emw_rain_lvl: number;
    readonly emw_avg_wind_speed: number;
    readonly emw_gust_wind_speed: number;
    readonly emw_wind_direction: any;
    readonly emw_humidity: number;
    readonly emw_temperature: number;
    readonly emw_luminosity: number;
    readonly emw_uv: number;
    readonly emw_solar_radiation: number;
    readonly emw_atm_pres: number;
    readonly time: Date;
}
