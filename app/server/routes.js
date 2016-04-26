//
//
// module.exports = Router({ prefix: '/' })
//     .app.use(Router({ prefix: '/auth' })
//         .post('/login', function *() {
//             var controller = new AuthController(this, new UserService(mongo.db));
//             yield controller.login(this.request.body);
//         })
//         .post('/register', function *() {
//             var controller = new AuthController(this, new UserService(mongo.db));
//             yield controller.register(this.request.body);
//         })
//         .get('/validate/email/:email', function *() {
//             var controller = new AuthController(this, new UserService(mongo.db));
//             yield controller.emailExists(this.params);
//         })
//         .routes())
//     .app.use(fixtureRoute)
//     .app.use(predictionRoute)
//     .app.use(roundRoute)
//     .app.use(Router({ prefix: '/admin' })
//             .use(authMiddleware)
//             .use(adminMiddleware)
//             .use(adminFixtureRoute)
//             .use(adminLeaderTableRoute)
//             .routes())
//     .app.use(leaderTableRoute)
//     .routes();