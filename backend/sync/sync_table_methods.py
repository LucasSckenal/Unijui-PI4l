from datetime import datetime, timedelta

# Função para obter o timestamp de dois meses atrás
def getTwoMonthsAgoTimestamp():
    return (datetime.utcnow() - timedelta(days=60)).strftime('%Y-%m-%d %H:%M:%S')

# Função para selecionar o último registro de uma tabela local
def selectLastRecord(cursor_pg_local, tableName):
    selectMostRecentRecord_local = f"""
        SELECT "deviceName", "time"
        FROM {tableName} 
        ORDER BY "time" DESC LIMIT 1
    """
    cursor_pg_local.execute(selectMostRecentRecord_local)
    last_record = cursor_pg_local.fetchone()
    
    if last_record:
        # Acessando explicitamente o campo "time" (índice 1)
        return last_record[1]  # Retorna o valor de time
    return None

# Função para selecionar os novos registros de uma tabela remota
def selectNewRecordsFromRemoteDatabase(cursor_pg_remoto, mostRecentTimestamp, tableName, columns):
    if mostRecentTimestamp is None:
        # Se for o primeiro insert, define um timestamp de dois meses atrás
        mostRecentTimestamp = getTwoMonthsAgoTimestamp()
    
    selectAllNewRecords_remoto = f"""
        SELECT {','.join(columns)}
        FROM {tableName}
        WHERE time > %s
        ORDER BY "time" ASC
    """
    cursor_pg_remoto.execute(selectAllNewRecords_remoto, (mostRecentTimestamp,))
    return cursor_pg_remoto.fetchall()

# Função para inserir registros na tabela local com verificação de duplicados
def insertIntoDatabaseLocal(cursor_pg_local, newRecords, tableName, columns, batch_size=1000):
    values_placeholders = ['%s'] * len(columns)
    insert_into_table_local = f"""
        INSERT INTO {tableName} ({','.join(columns)})
        VALUES ({','.join(values_placeholders)})
    """
    inserted_count = 0
    
    # Dividir as inserções em lotes
    for i in range(0, len(newRecords), batch_size):
        batch = newRecords[i:i + batch_size]
        
        # Inserir os registros do lote atual
        for record in batch:
            # Verifica se o registro já existe
            check_query = f"""
                SELECT 1 FROM {tableName}
                WHERE "deviceName" = %s AND "time" = %s
            """
            cursor_pg_local.execute(check_query, (record[0], record[1]))  # Ajuste os índices se necessário
            if cursor_pg_local.fetchone() is None:
                cursor_pg_local.execute(insert_into_table_local, record)
                inserted_count += 1

        # Confirma o lote no banco de dados
        cursor_pg_local.connection.commit()

    #print(f"{tableName} atualizado: {inserted_count} registros adicionados.")
    return f"{tableName} updated: {inserted_count} records added."

# Função para atualizar a tabela local
def update_local_table(cursor_pg_local, cursor_pg_remoto, tableName, columns):
    # Tenta selecionar o último registro na tabela local
    lastRecord = selectLastRecord(cursor_pg_local, tableName)

    # Se a tabela local estiver vazia, define o timestamp inicial como dois meses atrás
    mostRecentTimestamp = lastRecord if lastRecord else getTwoMonthsAgoTimestamp()

    # Seleciona os novos registros a partir do timestamp
    newRecords = selectNewRecordsFromRemoteDatabase(cursor_pg_remoto, mostRecentTimestamp, tableName, columns)
    if newRecords:
        return insertIntoDatabaseLocal(cursor_pg_local, newRecords, tableName, columns)
    else:
        return f"{tableName} está atualizado."

# Função para atualizar a tabela combinada após atualizar as tabelas locais
def update_combined_table(cursor_pg_local, cursor_pg_remoto):

    # Primeiro, atualiza as tabelas locais
    result_nit2xli = update_local_table(cursor_pg_local, cursor_pg_remoto, tableName="k72623_lo", columns=['"deviceName"', 'time', 'noise', 'temperature', 'humidity', 'pm2_5'])
    result_k72623_lo = update_local_table(cursor_pg_local, cursor_pg_remoto, tableName="nit2xli", columns=['"deviceName"', 'time', 'emw_rain_lvl', 'emw_avg_wind_speed', 'emw_gust_wind_speed', 'emw_wind_direction', 'emw_temperature', 'emw_humidity', 'emw_luminosity', 'emw_uv', 'emw_solar_radiation', 'emw_atm_pres'])

    print(result_nit2xli)
    print(result_k72623_lo)
    
    # Após as duas tabelas locais estarem atualizadas, atualiza a tabela combinada
    insert_combined_data(cursor_pg_local)
    print("Tabela combinada atualizada.")

    return "Tabela combinada atualizada."

# Função para inserir ou atualizar dados na tabela combinada
def insert_combined_data(cursor_pg_local):
    # Atualiza a tabela combinada usando os dados da tabela nit2xli
    insert_combined_query_nit2xli = """
    INSERT INTO tabela_combinada(
        "deviceName", 
        time,
        emw_rain_lvl,
        emw_avg_wind_speed,
        emw_gust_wind_speed,
        emw_wind_direction,
        emw_temperature,
        emw_humidity,
        emw_luminosity,
        emw_uv,
        emw_solar_radiation,
        emw_atm_pres
    )
    SELECT 
        "deviceName",
        time,
        emw_rain_lvl,
        emw_avg_wind_speed,
        emw_gust_wind_speed,
        emw_wind_direction,
        emw_temperature,
        emw_humidity,
        emw_luminosity,
        emw_uv,
        emw_solar_radiation,
        emw_atm_pres
    FROM 
        nit2xli
    ON CONFLICT ("deviceName", time) DO UPDATE 
    SET
        emw_rain_lvl = EXCLUDED.emw_rain_lvl,
        emw_avg_wind_speed = EXCLUDED.emw_avg_wind_speed,
        emw_gust_wind_speed = EXCLUDED.emw_gust_wind_speed,
        emw_wind_direction = EXCLUDED.emw_wind_direction,
        emw_temperature = EXCLUDED.emw_temperature,
        emw_humidity = EXCLUDED.emw_humidity,
        emw_luminosity = EXCLUDED.emw_luminosity,
        emw_uv = EXCLUDED.emw_uv,
        emw_solar_radiation = EXCLUDED.emw_solar_radiation,
        emw_atm_pres = EXCLUDED.emw_atm_pres;
    """
    cursor_pg_local.execute(insert_combined_query_nit2xli)
    cursor_pg_local.connection.commit()
    
    # Atualiza a tabela combinada usando os dados da tabela k72623_lo
    insert_combined_query_k72623_lo = """
    INSERT INTO tabela_combinada(
        "deviceName", 
        time,
        noise,
        temperature,
        humidity,
        pm2_5
    )
    SELECT 
        "deviceName",
        time,
        noise,
        temperature,
        humidity,
        pm2_5
    FROM 
        k72623_lo
    ON CONFLICT ("deviceName", time) DO UPDATE 
    SET
        noise = EXCLUDED.noise,
        temperature = EXCLUDED.temperature,
        humidity = EXCLUDED.humidity,
        pm2_5 = EXCLUDED.pm2_5;
    """
    cursor_pg_local.execute(insert_combined_query_k72623_lo)
    cursor_pg_local.connection.commit()