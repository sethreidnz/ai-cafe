import { connector } from '../bot';

export default server => {
  server.post("/api/messages", connector.listen());
}