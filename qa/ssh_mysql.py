import pymysql
import pandas as pd
from sshtunnel import SSHTunnelForwarder

shh_host = 'dev.aivix.com'
ssh_port = 222
ssh_user = 'leo'
ssh_key = '/Users/leo/.ssh/id_rsa'
ssh_password = 'leoleo'
sql_host = 'localhost'
sql_port = 3306
sql_user = 'qa'
sql_password = 'qa_sequre_pa$$'
sql_db = 'tracker_rel'

with SSHTunnelForwarder(
        (shh_host, ssh_port),
        ssh_username=ssh_user,
        ssh_pkey=ssh_key,
        ssh_private_key_password=ssh_password,
        remote_bind_address=(sql_host, sql_port)) as tunnel:
    print('ssh - connected')
    conn = pymysql.connect(host='127.0.0.1', user=sql_user,
            passwd=sql_password, db=sql_db,
            port=tunnel.local_bind_port)
    print('mysql - connected')
    query = '' 'SELECT VERSION();' ''
    data = pd.read_sql_query(query, conn)
    print(data)
    conn.close()
