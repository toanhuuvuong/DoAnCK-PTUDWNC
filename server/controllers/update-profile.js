const userBUS = require('../bus/user');

module.exports = {
	put: function(req, res, next) {
    const {id} = req.params;
    const model = req.body;

    userBUS.updateById(id, model)
    .then(function(data) {
			if(data.result.ok !== 1) {
				res.json({ok: false, messageCode: 'update_fail'});
			} else {
				res.json({ok: true, messageCode: 'update_success'});
			}
    })
    .catch(function(err) {
      console.trace(err);
      res.json({ok: false, messageCode: 'update_fail'});
    });
	}
};