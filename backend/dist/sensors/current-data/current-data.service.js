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
exports.CurrentDataService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const sensors_entity_1 = require("../entities/sensors.entity");
const typeorm_2 = require("typeorm");
let CurrentDataService = class CurrentDataService {
    constructor(k72623LoRepository, nit2xliRepository) {
        this.k72623LoRepository = k72623LoRepository;
        this.nit2xliRepository = nit2xliRepository;
    }
    async getLastRegByDevice_K72623Lo(deviceName) {
        const latestRecord = await this.k72623LoRepository.findOne({
            where: { deviceName },
            order: {
                time: 'DESC',
            },
        });
        if (latestRecord) {
            const currentDataDTO_k72623lo = {
                deviceName: latestRecord.deviceName,
                noise: latestRecord.noise,
                pm2_5: latestRecord.pm2_5,
                temperature: latestRecord.temperature,
                humidity: latestRecord.humidity,
                timestamp: latestRecord.time,
            };
            return currentDataDTO_k72623lo;
        }
        else {
            return null;
        }
    }
    async getLastRegByDevice_nit2xli(deviceName) {
        const latestRecord = await this.nit2xliRepository.findOne({
            where: { deviceName },
            order: {
                time: 'DESC',
            },
        });
        if (latestRecord) {
            const currentDataDTO_nit2xli = {
                deviceName: latestRecord.deviceName,
                emw_rain_lvl: latestRecord.emw_rain_lvl,
                emw_avg_wind_speed: latestRecord.emw_avg_wind_speed,
                emw_gust_wind_speed: latestRecord.emw_gust_wind_speed,
                emw_wind_direction: latestRecord.emw_wind_direction,
                emw_humidity: latestRecord.emw_humidity,
                emw_temperature: latestRecord.emw_temperature,
                emw_luminosity: latestRecord.emw_luminosity,
                emw_uv: latestRecord.emw_uv,
                emw_solar_radiation: latestRecord.emw_solar_radiation,
                emw_atm_pres: latestRecord.emw_atm_pres,
                time: latestRecord.time,
            };
            return currentDataDTO_nit2xli;
        }
        else {
            return null;
        }
    }
};
CurrentDataService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sensors_entity_1.k72623_lo)),
    __param(1, (0, typeorm_1.InjectRepository)(sensors_entity_1.nit2xli)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CurrentDataService);
exports.CurrentDataService = CurrentDataService;
//# sourceMappingURL=current-data.service.js.map