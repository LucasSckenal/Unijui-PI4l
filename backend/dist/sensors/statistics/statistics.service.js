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
    constructor(k72623LoRepository, nit2xliRepository) {
        this.k72623LoRepository = k72623LoRepository;
        this.nit2xliRepository = nit2xliRepository;
    }
    async getTemperatureHourlyStatistics_K72623Lo(deviceName, time) {
        const timestamp = new Date(time);
        timestamp.setHours(timestamp.getHours() - 24);
        const result = await this.k72623LoRepository.find({
            select: ['temperature', 'time'],
            where: {
                deviceName,
                time: (0, typeorm_2.MoreThan)(timestamp),
            },
            order: { time: 'ASC' },
        });
        if (result.length === 0)
            return null;
        const groupedByHour = this.groupByHour(result);
        return { deviceName, dataPerHour: groupedByHour };
    }
    async getTemperatureHourlyStatistics_nit2xli(deviceName, time) {
        const timestamp = new Date(time);
        timestamp.setHours(timestamp.getHours() - 24);
        const result = await this.nit2xliRepository.find({
            select: ['emw_temperature', 'time'],
            where: {
                deviceName,
                time: (0, typeorm_2.MoreThan)(timestamp),
            },
            order: { time: 'ASC' },
        });
        if (result.length === 0)
            return null;
        const groupedByHour = this.groupByHour(result.map(item => ({
            temperature: item.emw_temperature,
            time: item.time,
        })));
        return { deviceName, dataPerHour: groupedByHour };
    }
    groupByHour(data) {
        const grouped = {};
        for (const item of data) {
            const hour = item.time.getHours();
            if (!grouped[hour]) {
                grouped[hour] = [];
            }
            grouped[hour].push(item.temperature);
        }
        const result = [];
        for (let i = 0; i < 24; i++) {
            result.push({
                hour: i,
                values: grouped[i] || [],
            });
        }
        return result;
    }
};
StatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sensors_entity_1.k72623_lo)),
    __param(1, (0, typeorm_1.InjectRepository)(sensors_entity_1.nit2xli)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StatisticsService);
exports.StatisticsService = StatisticsService;
//# sourceMappingURL=statistics.service.js.map