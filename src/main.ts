import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';

async function bootstrap() {
  const PORT = Number(process.env.PORT) || 4000;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const docPath = join(__dirname, '..', 'doc', 'api.yaml');
  const doc = await readFile(docPath, 'utf-8');
  const swaggerDoc = parse(doc);
  SwaggerModule.setup('doc', app, swaggerDoc);

  await app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`API documentation available at http://localhost:${PORT}/doc`);
  });
}

bootstrap();
