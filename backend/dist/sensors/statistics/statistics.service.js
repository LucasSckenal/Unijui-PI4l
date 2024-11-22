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
const sensors_entity_1 = require("../entities/sensors.entity");
const typeorm_2 = require("typeorm");
let StatisticsService = class StatisticsService {
    constructor(k72623LoRepository, nit2xliRepository, tabelaCombinadaRepository) {
        this.k72623LoRepository = k72623LoRepository;
        this.nit2xliRepository = nit2xliRepository;
        this.tabelaCombinadaRepository = tabelaCombinadaRepository;
    }
    async findByDateCombined(date) {
        return await this.tabelaCombinadaRepository
            .createQueryBuilder("data")
            .where("DATE(data) = :date", { date })
            .getMany();
    }
    async getLast24HoursData_tabelaCombinada(selectedDate) {
        let now = new Date();
        if (selectedDate) {
            const userDate = new Date(selectedDate);
            if (!isNaN(userDate.getTime())) {
                now = userDate;
            }
        }
        const timestamp = new Date(now);
        timestamp.setHours(timestamp.getHours() - 24);
        const result = await this.tabelaCombinadaRepository.find({
            where: { time: (0, typeorm_2.Between)(timestamp, now) },
            order: { time: "ASC" },
        });
        const groupedByDevice = result.reduce((acc, curr) => {
            acc[curr.deviceName] = acc[curr.deviceName] || [];
            acc[curr.deviceName].push(curr);
            return acc;
        }, {});
        const deviceOrder = ["Estação Cruzeiro", "Micropartículas Rótula do Taffarel"];
        const response = Object.keys(groupedByDevice).map((deviceName) => {
            const deviceData = groupedByDevice[deviceName];
            const averagesPerHour = Array.from({ length: 24 }, (_, hour) => ({
                hour,
                averages: this.initializeSensorData(),
            }));
            let lastValidEntry = null;
            deviceData.forEach((entry) => {
                const entryHour = new Date(entry.time).getHours();
                const hourData = averagesPerHour.find((h) => h.hour === entryHour);
                if (hourData) {
                    lastValidEntry = entry;
                    Object.keys(hourData.averages).forEach((key) => {
                        if (entry[key] !== null && entry[key] !== undefined) {
                            hourData.averages[key] += entry[key];
                        }
                    });
                }
            });
            averagesPerHour.forEach((hourData, hour) => {
                if (!deviceData.some((entry) => new Date(entry.time).getHours() === hour)) {
                    if (lastValidEntry) {
                        Object.keys(hourData.averages).forEach((key) => {
                            hourData.averages[key] = lastValidEntry[key] || 0;
                        });
                    }
                }
            });
            averagesPerHour.forEach((hourData) => {
                Object.keys(hourData.averages).forEach((key) => {
                    hourData.averages[key] = hourData.averages[key] || 0;
                });
            });
            return {
                deviceName,
                ...deviceData[deviceData.length - 1],
                averagePerHour: averagesPerHour,
            };
        });
        response.sort((a, b) => deviceOrder.indexOf(a.deviceName) - deviceOrder.indexOf(b.deviceName));
        return response;
    }
    initializeSensorData() {
        return {
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
        };
    }
    calculateAverages(data) {
        const keys = Object.keys(this.initializeSensorData());
        const totals = keys.reduce((acc, key) => ({ ...acc, [key]: 0 }), {});
        const counts = keys.reduce((acc, key) => ({ ...acc, [key]: 0 }), {});
        data.forEach((item) => {
            keys.forEach((key) => {
                if (item[key] !== null && item[key] !== undefined) {
                    totals[key] += item[key];
                    counts[key]++;
                }
            });
        });
        return keys.reduce((acc, key) => ({ ...acc, [key]: counts[key] > 0 ? totals[key] / counts[key] : 0 }), {});
    }
    groupByHourWithFallback(data, startTimestamp) {
        const grouped = {};
        let lastValidEntry = null;
        data.forEach((item) => {
            const diffInHours = Math.floor((new Date(item.time).getTime() - startTimestamp.getTime()) / (1000 * 60 * 60));
            if (diffInHours >= 0 && diffInHours < 24) {
                grouped[diffInHours] = grouped[diffInHours] || [];
                grouped[diffInHours].push(item);
                lastValidEntry = item;
            }
        });
        return Array.from({ length: 24 }, (_, hour) => ({
            hour,
            data: grouped[hour] || (lastValidEntry ? [lastValidEntry] : []),
        }));
    }
    fillWithLastKnownValues(data) {
        const lastKnown = data[data.length - 1];
        return this.initializeSensorData();
    }
};
StatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sensors_entity_1.k72623_lo)),
    __param(1, (0, typeorm_1.InjectRepository)(sensors_entity_1.nit2xli)),
    __param(2, (0, typeorm_1.InjectRepository)(sensors_entity_1.tabela_combinada)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], StatisticsService);
exports.StatisticsService = StatisticsService;
//# sourceMappingURL=statistics.service.js.map