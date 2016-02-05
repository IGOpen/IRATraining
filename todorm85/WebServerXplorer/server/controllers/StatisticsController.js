var users = require('../services/users');

module.exports = {
    getStatistics: function(req, res){
        users.getLastFive()
            .then(function (users) {
                res.send(users);
            })
    }
};
