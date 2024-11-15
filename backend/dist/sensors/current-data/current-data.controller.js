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
exports.CurrentDataController = void 0;
const common_1 = require("@nestjs/common");
const current_data_service_1 = require("./current-data.service");
let CurrentDataController = class CurrentDataController {
    constructor(sensor) {
        this.sensor = sensor;
    }
    async getLastRegister(device) {
        const [deviceName, prefixTable] = device.split('_');
        if (prefixTable === "k") {
            return await this.sensor.getLastRegByDevive_K72623Lo(deviceName);
            ;
        }
        else if (prefixTable === "n") {
            return await this.sensor.getLastRegByDevive_nit2xli(deviceName);
            ;
        }
    }
};
__decorate([
    (0, common_1.Get)('current-data/:deviceName'),
    __param(0, (0, common_1.Param)('deviceName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CurrentDataController.prototype, "getLastRegister", null);
CurrentDataController = __decorate([
    (0, common_1.Controller)('sensors'),
    __metadata("design:paramtypes", [current_data_service_1.CurrentDataService])
], CurrentDataController);
exports.CurrentDataController = CurrentDataController;
//# sourceMappingURL=current-data.controller.js.map