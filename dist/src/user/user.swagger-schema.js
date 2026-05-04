"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSwaggerSchema = void 0;
exports.UserSwaggerSchema = {
    createUserBody: {
        description: 'Body for creating user',
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                },
                email: {
                    type: 'string',
                },
                password: {
                    type: 'string',
                },
                phone: {
                    type: 'string',
                },
                role: {
                    type: 'string',
                },
            },
        },
    },
};
//# sourceMappingURL=user.swagger-schema.js.map