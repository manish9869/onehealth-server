import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as bodyParser from "body-parser";
import rateLimit from "express-rate-limit";
import { ValidationPipe } from "@nestjs/common";
import { ResponseHandlerInterceptor } from "./helpers/ResponseHandlerInterceptor";
import { AllExceptionsFilter } from "./filters/all-exceptions.filter";
import helmet from "helmet";
import * as dotenv from "dotenv";
import path from "path";
import serveStatic from "serve-static";
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["log", "error", "warn", "debug"],
  });

  // middlewares, express specific
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.use(
    helmet({
      crossOriginEmbedderPolicy: true,
    })
  );
  const templateDirectory = path.join(__dirname, `./templates`);

  const expressApp = app.getHttpAdapter().getInstance();

  // Set EJS as the view engine
  expressApp.set("views", templateDirectory); // Set the views directory

  expressApp.set("view engine", "ejs");

  app.setGlobalPrefix(`/api/${process.env.API_PREFIX}`);

  app.use(
    rateLimit({
      windowMs: 150 * 60 * 1000, // 15 minutes
      max: 150, // limit each IP to 100 requests per windowMs
    })
  );
  app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

  app.enableCors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    credentials: true,
  });

  app.enableCors(); // Optional: Enable CORS if needed
  app.useGlobalPipes(new ValidationPipe()); // If using validation
  app.useGlobalInterceptors(new ResponseHandlerInterceptor());

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Enable automatic transformation of payloads
      whitelist: true,
      forbidNonWhitelisted: true, // Strip properties that do not have decorators
    })
  );
  // swagger integration
  const options = new DocumentBuilder()
    .setTitle("Aviation Service")
    .setDescription("Aviation service")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`api/${process.env.API_PREFIX}/swagger`, app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
