#instalar
#pip install psycopg2
#pip install python-dotenv

import psycopg2 as pg
from psycopg2 import Error
from dotenv import load_dotenv
import os
# Carregar as variáveis de ambiente do arquivo .env
load_dotenv()

def close_conn_pg(conn):
    if conn:
        #print("Connection closed successfully.")
        conn.close()

def get_conn_pg(host, port, user, password, database):
     try:       
         conn = pg.connect(
             host = os.getenv(host),
             port = os.getenv(port),
             user = os.getenv(user),
             password = os.getenv(password),
             database = os.getenv(database)
         )
         return conn
     except Error as e:
         print(f"Error connecting to the database: {e}")





