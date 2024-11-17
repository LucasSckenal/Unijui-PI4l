import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: "http://localhost:5173", // Permitir apenas a origem do frontend
    methods: "GET,POST", // Métodos permitidos
    allowedHeaders: "Content-Type", // Cabeçalhos permitidos
  });

  await app.listen(3000);
}
bootstrap();
