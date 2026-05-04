"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSwaggerSchema = void 0;
exports.authSwaggerSchema = {
    loginBody: {
        description: 'Body for credentials',
        schema: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                },
                password: {
                    type: 'string',
                },
            },
        },
    },
};
//# sourceMappingURL=auth.swagger-schema.js.map