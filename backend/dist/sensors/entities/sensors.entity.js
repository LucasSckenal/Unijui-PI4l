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
Object.defineProperty(exports, "__esModule", { value: true });
exports.tabela_combinada = exports.nit2xli = exports.k72623_lo = void 0;
const typeorm_1 = require("typeorm");
let k72623_lo = class k72623_lo {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], k72623_lo.prototype, "deviceName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], k72623_lo.prototype, "noise", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], k72623_lo.prototype, "temperature", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], k72623_lo.prototype, "humidity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], k72623_lo.prototype, "pm2_5", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], k72623_lo.prototype, "time", void 0);
k72623_lo = __decorate([
    (0, typeorm_1.Entity)('k72623_lo')
], k72623_lo);
exports.k72623_lo = k72623_lo;
let nit2xli = class nit2xli {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: "deviceName", type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], nit2xli.prototype, "deviceName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true, name: 'emw_rain_lvl' }),
    __metadata("design:type", Number)
], nit2xli.prototype, "emw_rain_lvl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, name: 'emw_avg_wind_speed' }),
    __metadata("design:type", Number)
], nit2xli.prototype, "emw_avg_wind_speed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, name: 'emw_gust_wind_speed' }),
    __metadata("design:type", Number)
], nit2xli.prototype, "emw_gust_wind_speed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, name: 'emw_wind_direction' }),
    __metadata("design:type", Number)
], nit2xli.prototype, "emw_wind_direction", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true, name: 'emw_temperature' }),
    __metadata("design:type", Number)
], nit2xli.prototype, "emw_temperature", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true, name: 'emw_humidity' }),
    __metadata("design:type", Number)
], nit2xli.prototype, "emw_humidity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true, name: 'emw_luminosity' }),
    __metadata("design:type", Number)
], nit2xli.prototype, "emw_luminosity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true, name: 'emw_uv' }),
    __metadata("design:type", Number)
], nit2xli.prototype, "emw_uv", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true, name: 'emw_solar_radiation' }),
    __metadata("design:type", Number)
], nit2xli.prototype, "emw_solar_radiation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true, name: 'emw_atm_pres' }),
    __metadata("design:type", Number)
], nit2xli.prototype, "emw_atm_pres", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], nit2xli.prototype, "time", void 0);
nit2xli = __decorate([
    (0, typeorm_1.Entity)('nit2xli')
], nit2xli);
exports.nit2xli = nit2xli;
let tabela_combinada = class tabela_combinada {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], tabela_combinada.prototype, "deviceName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], tabela_combinada.prototype, "noise", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], tabela_combinada.prototype, "temperature", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], tabela_combinada.prototype, "humidity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], tabela_combinada.prototype, "pm2_5", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], tabela_combinada.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true, name: 'emw_rain_lvl' }),
    __metadata("design:type", Number)
], tabela_combinada.prototype, "emw_rain_lvl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, name: 'emw_avg_wind_speed' }),
    __metadata("design:type", Number)
], tabela_combinada.prototype, "emw_avg_wind_speed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, name: 'emw_gust_wind_speed' }),
    __metadata("design:type", Number)
], tabela_combinada.prototype, "emw_gust_wind_speed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, name: 'emw_wind_direction' }),
    __metadata("design:type", Number)
], tabela_combinada.prototype, "emw_wind_direction", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true, name: 'emw_temperature' }),
    __metadata("design:type", Number)
], tabela_combinada.prototype, "emw_temperature", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true, name: 'emw_humidity' }),
    __metadata("design:type", Number)
], tabela_combinada.prototype, "emw_humidity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true, name: 'emw_luminosity' }),
    __metadata("design:type", Number)
], tabela_combinada.prototype, "emw_luminosity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true, name: 'emw_uv' }),
    __metadata("design:type", Number)
], tabela_combinada.prototype, "emw_uv", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true, name: 'emw_solar_radiation' }),
    __metadata("design:type", Number)
], tabela_combinada.prototype, "emw_solar_radiation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true, name: 'emw_atm_pres' }),
    __metadata("design:type", Number)
], tabela_combinada.prototype, "emw_atm_pres", void 0);
tabela_combinada = __decorate([
    (0, typeorm_1.Entity)('tabela_combinada')
], tabela_combinada);
exports.tabela_combinada = tabela_combinada;
//# sourceMappingURL=sensors.entity.js.map