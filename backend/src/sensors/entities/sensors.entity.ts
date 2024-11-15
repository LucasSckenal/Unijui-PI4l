import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('k72623_lo') // Nome da tabela no banco de dados
export class k72623_lo {
  //@PrimaryGeneratedColumn() // Adicione um ID se houver
  //id: number;

  @PrimaryColumn({ type: 'varchar', length: 100})
  deviceName: string;

  @Column({ type: 'float', nullable: true })
  noise: number | null;

  @Column({ type: 'float', nullable: true })
  temperature: number | null;

  @Column({ type: 'float', nullable: true })
  humidity: number | null;

  @Column({ type: 'float', nullable: true })
  pm2_5: number | null;

  @Column({ type: 'timestamptz' }) // Tipo timestamp com fuso horário
  time: Date | null;
}

@Entity('nit2xli')
export class nit2xli {
  //@PrimaryGeneratedColumn()
  //id: number; // Adicionando um ID como chave primária

  @PrimaryColumn({ type: 'varchar', length: 100 })
  deviceName: string;


  @Column({ type: 'float', nullable: true, name: 'emw_rain_lvl' })
  emw_rain_lvl: number | null;

  @Column({ type: 'int', nullable: true, name: 'emw_avg_wind_speed' })
  emw_avg_wind_speed: number | null;

  @Column({ type: 'int', nullable: true, name: 'emw_gust_wind_speed' })
  emw_gust_wind_speed: number | null;

  @Column({ type: 'int', nullable: true, name: 'emw_wind_direction' })
  emw_wind_direction: number | null;

  @Column({ type: 'float', nullable: true, name: 'emw_temperature' })
  emw_temperature: number | null;

  @Column({ type: 'float', nullable: true, name: 'emw_humidity' })
  emw_humidity: number | null;

  @Column({ type: 'float', nullable: true, name: 'emw_luminosity' })
  emw_luminosity: number | null;

  @Column({ type: 'float', nullable: true, name: 'emw_uv' })
  emw_uv: number | null;

  @Column({ type: 'float', nullable: true, name: 'emw_solar_radiation' })
  emw_solar_radiation: number | null;

  @Column({ type: 'float', nullable: true, name: 'emw_atm_pres' })
  emw_atm_pres: number | null;

  @Column({ type: 'timestamptz', nullable: true })
  time: Date | null;
}
