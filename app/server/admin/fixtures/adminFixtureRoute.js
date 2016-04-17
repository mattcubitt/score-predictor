var Router = require('koa-router');

module.exports = Router({ prefix: '/fixtures' })
    .post('/', function *() {
        var fixture = this.request.body;

        var id = this.fixtureService.insert(fixture);

        this.body = id;
        this.status = 200;
    })
    .delete('/:fixtureId', function *() {
        this.fixtureService.remove(parseInt(this.params.fixtureId));

        this.status = 200;
    })
    .put('/', function *() {
        var fixture = this.request.body;
        
        this.fixtureService.update(fixture);

        this.status = 200;
    })
    .routes();
