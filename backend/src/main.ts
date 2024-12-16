import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: "http://localhost:5173", // Permitir apenas a origem do frontend
    methods: "GET,POST,PUT,DELETE,OPTIONS", // Métodos HTTP permitidos
    credentials: true, // Permite envio de cookies (se necessário)
  });

  await app.listen(3000);
}
bootstrap();