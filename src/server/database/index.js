import dotenv from 'dotenv';
dotenv.config()
import { DatabaseCollectionService } from './database-collection-service';
import { getDocumentClient } from './utility';

const documentClient = getDocumentClient(
  process.env.COSMOSDB_HOST,
  process.env.COSMOSDB_KEY);

export const orderService = new DatabaseCollectionService(documentClient, "AICafe", "Orders");
orderService.init();
