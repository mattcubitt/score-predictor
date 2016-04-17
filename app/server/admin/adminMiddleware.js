module.exports = function*(next){
    try {
        if(this.currentUser.role !== 'admin') {
            this.status = 401;
            this.body = 'Unauthorized';
        } else {
            yield next;
        }
    } catch(ex) {
        this.status = 401;
        this.body = 'Unauthorized';
    }
};