"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sensors_entity_1 = require("../entities/sensors.entity");
let StatisticsService = class StatisticsService {
    constructor(tabelaCombinadaRepository) {
        this.tabelaCombinadaRepository = tabelaCombinadaRepository;
    }
    async getLast24HoursData_tabelaCombinada(selectedDate) {
        let calendarDate = new Date();
        if (selectedDate) {
            const userDate = new Date(selectedDate);
            if (!isNaN(userDate.getTime())) {
                calendarDate = userDate;
            }
        }
        const timePrevious24h = new Date(calendarDate);
        timePrevious24h.setHours(timePrevious24h.getHours() - 24);
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
        }, {});
        return Object.keys(groupedByDevice)
            .map((deviceName) => {
            const averagePerHour = groupedByDevice[deviceName];
            return {
                deviceName,
                time: calendarDate,
                emw_rain_lvl: 0,
                emw_avg_wind_speed: 0,
                emw_gust_wind_speed: 0,
                emw_wind_direction: 0,
                emw_temperature: 0,
                emw_humidity: 0,
                emw_luminosity: 0,
                emw_uv: 0,
                emw_solar_radiation: 0,
                emw_atm_pres: 0,
                noise: 0,
                temperature: 0,
                humidity: 0,
                pm2_5: 0,
                averagePerHour,
            };
        })
            .sort((a, b) => b.time.getTime() - a.time.getTime());
    }
};
StatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sensors_entity_1.tabela_combinada)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StatisticsService);
exports.StatisticsService = StatisticsService;
//# sourceMappingURL=statistics.service.js.map