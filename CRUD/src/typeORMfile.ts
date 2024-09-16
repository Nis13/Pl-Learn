import { DataSource } from 'typeorm';
import config from './config';
const AppDataSource = new DataSource({
    type: 'postgres',
    host: config.database.host,
    port: +config.database.port,
    username: config.database.user,
    password:config.database.password,
    database:config.database.name
});

export default AppDataSource;