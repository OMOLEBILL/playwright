import * as dotenv from 'dotenv';
import { resolve } from 'path';


const ENV = process.env.ENV || '.env';
const envFilePath = resolve(process.cwd(), ENV);

dotenv.config({ path: envFilePath });

// Make sure that the APP_URL is defined before moving on
if (!process.env.APP_URL) {
    throw new Error('APP_URL is not defined in the environment file');
}
if (!process.env.API_URL) {
    throw new Error('API is not defined in the environment file');
}
export const BASE_URL = process.env.APP_URL;
export const API_URL = process.env.API_URL;