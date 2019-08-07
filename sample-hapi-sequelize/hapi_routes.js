module.exports = [
    {
        method: 'GET',
        path:'/',
        handler: function (req, reply) {
            return 'hello world';
        }
    },
    {
        method: 'GET',
        path:'/hello/{name}',
        handler: function (req, reply) {
            return ('hello ' + req.params.name);
        }
    }
]
