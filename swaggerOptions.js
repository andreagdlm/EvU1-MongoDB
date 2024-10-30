// swaggerOptions.js
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Tasks',
            version: '1.0.0',
            description: 'API para gestionar tareas\n\n'+
            'Janeth Andrea Guillén de la Mora\n\n'+
            'Cristian Eduardo Plantillas Aguirre\n\n'+
            'Aldo Reymundo Sahagún González\n\n'+
            'Karina Yamilet Macedo Calvillo\n\n' +
            'Links Github\n\n' + 
            'Firebase\n'+
            'https://github.com/andreagdlm/EvU1-Firebase.git\n\n' +
            'MongoDB\n' +
            'https://github.com/andreagdlm/EvU1-MongoDB'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
