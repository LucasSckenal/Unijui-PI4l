"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorsModule = void 0;
const common_1 = require("@nestjs/common");
const current_data_controller_1 = require("./current-data/current-data.controller");
const current_data_service_1 = require("./current-data/current-data.service");
const statistics_service_1 = require("./statistics/statistics.service");
const statistics_controller_1 = require("./statistics/statistics.controller");
const sensors_entity_1 = require("./entities/sensors.entity");
const typeorm_1 = require("@nestjs/typeorm");
let SensorsModule = class SensorsModule {
};
SensorsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([sensors_entity_1.k72623_lo, sensors_entity_1.nit2xli, sensors_entity_1.tabela_combinada]),
        ],
        controllers: [current_data_controller_1.CurrentDataController, statistics_controller_1.StatisticsController],
        providers: [current_data_service_1.CurrentDataService, statistics_service_1.StatisticsService]
    })
], SensorsModule);
exports.SensorsModule = SensorsModule;
//# sourceMappingURL=sensors.module.js.map