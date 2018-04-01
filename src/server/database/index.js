import dotenv from 'dotenv';
dotenv.config()
import { DATABASE_NAME, ORDERS_COLLECTION_NAME, RESERVATIONS_COLLECTION_NAME } from './contants'
import { DatabaseCollectionService } from './database-collection-service';
import { getDocumentClient } from './utility';

const documentClient = getDocumentClient(
  process.env.COSMOSDB_HOST,
  process.env.COSMOSDB_KEY);

export const orderService = new DatabaseCollectionService(documentClient, DATABASE_NAME, ORDERS_COLLECTION_NAME);
orderService.init();

export const reservationService = new DatabaseCollectionService(documentClient, DATABASE_NAME, RESERVATIONS_COLLECTION_NAME);
reservationService.init();
