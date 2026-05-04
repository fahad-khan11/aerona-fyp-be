"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
function setupSwagger(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('AERONA')
        .setDescription('API for Aerona backend')
        .setVersion('1.0')
        .addTag('AERONA')
        .addBearerAuth()
        .build();
    const documentFactory = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, documentFactory);
}
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=swagger.config.js.map