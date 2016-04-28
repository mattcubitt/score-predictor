module.exports = function*(next){
    if(this.currentUser.role !== 'admin') {
        this.status = 401;
        this.body = 'Unauthorized';
    } else {
        yield next;
    }
};