import { Controller, Get, Param } from '@nestjs/common';
import { CurrentDataService } from './current-data.service';
import { CurrentDataDTO } from './dto/current-data.dto';

@Controller('sensors')
export class CurrentDataController {
  constructor(private readonly sensor: CurrentDataService) {}

  @Get('current-data/:deviceName')
  async getLastRegister(
    @Param('deviceName') device: string,
  ): Promise<CurrentDataDTO | null> {
    
    const [deviceName, prefixTable] = device.split('_');       

    if(prefixTable === "k"){ // prefixo para a table k72623_lo            
      return await this.sensor.getLastRegByDevice_K72623Lo(deviceName);     ; 
    }else if( prefixTable ==="n"){// prefixo para a table nit2xli
      return await this.sensor.getLastRegByDevice_nit2xli(deviceName);     ;
    }   
  }
}
