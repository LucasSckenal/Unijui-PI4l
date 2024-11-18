import { Module } from '@nestjs/common';
import { CurrentDataController } from './current-data/current-data.controller';
import { CurrentDataService } from './current-data/current-data.service';
import { StatisticsService } from './statistics/statistics.service';
import { StatisticsController } from './statistics/statistics.controller';
import { k72623_lo, nit2xli, tabela_combinada  } from './entities/sensors.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([k72623_lo, nit2xli, tabela_combinada]), // Importa os repositórios 
  ],
  controllers: [CurrentDataController, StatisticsController],
  providers: [CurrentDataService, StatisticsService]
})
export class SensorsModule {}
