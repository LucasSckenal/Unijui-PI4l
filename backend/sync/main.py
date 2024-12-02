from connect import get_conn_pg, close_conn_pg
from sync_table_methods  import update_combined_table
import logging, time

logging.basicConfig(
    filename='./sync.log',        # Nome do arquivo onde os logs serão armazenados
    filemode='a',                                       # 'a' para anexar ao arquivo, 'w' para sobrescrever
    format='%(asctime)s - %(levelname)s - %(message)s', # Formato da mensagem de log
    level=logging.INFO                                  # Nível de log (INFO para logs gerais)
)

def main():    
    # criar as conexões com os bancos de dados (local e remoto)
    conn_pg_remoto = get_conn_pg('DB_HOST_rm_by_ext', 'DB_PORT_rm', 'DB_USER_rm', 'DB_PASSWORD_rm', 'DB_NAME_rm')
    conn_pg_local = get_conn_pg('DB_HOST_lc', 'DB_PORT_lc', 'DB_USER_lc', 'DB_PASSWORD_lc', 'DB_NAME_lc')

    # obter o cursor de cada conexão.
    cursor_pg_rm =  conn_pg_remoto.cursor()
    cursor_pg_lc = conn_pg_local.cursor()

    tables = [
        ["k72623_lo", ['"deviceName"', 'time', 'noise', 'temperature', 'humidity', 'pm2_5'] ],
        ["nit2xli", ['"deviceName"', 'time', 'emw_rain_lvl', 'emw_avg_wind_speed', 'emw_gust_wind_speed', 'emw_wind_direction', 'emw_temperature', 'emw_humidity', 'emw_luminosity', 'emw_uv', 'emw_solar_radiation', 'emw_atm_pres'] ]
    ] 
        
    
    result = update_combined_table(cursor_pg_local=cursor_pg_lc, cursor_pg_remoto=cursor_pg_rm)
    # registrar logs
    if result.startswith("Error:"):            
        logging.warning(f"{result}")            
    else:
        logging.info(f"{result}")        

        
    conn_pg_local.commit()

    close_conn_pg(conn_pg_remoto)
    close_conn_pg(conn_pg_local) 
    

def isError(s):
    return s.startswith('E')


if __name__ == "__main__":
    try: 
        while True:
            logging.info("Iniciando atualização.")
            print("Inicializando atualização.")
            main()
            print("Esperando intervalo de 5 minutos...")
            time.sleep(300)
    
    except KeyboardInterrupt:
            print("Interrompendo processo.")
            logging.info("Interrompendo processo.")
        

