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
exports.StatisticsController = void 0;
const common_1 = require("@nestjs/common");
const statistics_service_1 = require("./statistics.service");
let StatisticsController = class StatisticsController {
    constructor(sensor) {
        this.sensor = sensor;
    }
    async getStatisticsByHour(device, time) {
        const [deviceName, prefixTable] = device.split("_");
        if (prefixTable === "k") {
            return await this.sensor.getTemperatureHourlyStatistics_K72623Lo(deviceName, time);
        }
        else if (prefixTable === "n") {
            return await this.sensor.getTemperatureHourlyStatistics_nit2xli(deviceName, time);
        }
        return null;
    }
    async getAllData(deviceName, date) {
        const [name, prefixTable] = deviceName.split("_");
        if (prefixTable === "k") {
            return await this.sensor.getAllData_K72623Lo(name, date);
        }
        else if (prefixTable === "n") {
            return await this.sensor.getAllData_nit2xli(name, date);
        }
        else if (prefixTable === "t") {
            return await this.sensor.getAllData_tabelaCombinada(name, date);
        }
        return [];
    }
};
__decorate([
    (0, common_1.Get)("hourly-statistics/:deviceName/:dateTime"),
    __param(0, (0, common_1.Param)("deviceName")),
    __param(1, (0, common_1.Param)("dateTime")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getStatisticsByHour", null);
__decorate([
    (0, common_1.Get)("all-data/:deviceName/:date"),
    __param(0, (0, common_1.Param)("deviceName")),
    __param(1, (0, common_1.Param)("date")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getAllData", null);
StatisticsController = __decorate([
    (0, common_1.Controller)("sensors"),
    __metadata("design:paramtypes", [statistics_service_1.StatisticsService])
], StatisticsController);
exports.StatisticsController = StatisticsController;
//# sourceMappingURL=statistics.controller.js.map