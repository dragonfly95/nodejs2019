var Hapi = require('@hapi/hapi');
var routesa = require('./hapi_routes');

const init = async () => {

    const server = Hapi.server({
        port: 4000,
        host: 'localhost'
    });

    server.route(routesa);

/*
    server.route({
        method: 'GET',
        path: '/home',
        handler: (request, h) => {
            return 'hello world';
        }
    })
*/
    await server.start();
    console.log('Server running on %ss', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();

/*
var server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

server.route({
    method: 'GET',
    path: '/home',
    handler: function(req, reply) {
        reply('server is running');
    }
});


server.start(function() {
    console.log('hello, hapi server is running.')
});
*/
