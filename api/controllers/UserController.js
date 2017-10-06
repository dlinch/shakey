/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `UserController.login()`
   */
  login: function (req, res) {
     User.attemptLogin({
      email: req.param('email'),
			password: req.param('password'),
			successRedirect: '/welcome',
			invalidRedirect: '/login'
    }, function(err, user) {
			if (err) return res.negotiate(err);
			if (!user) return res.redirect('/');
			
			req.session.me = user.id

			if (req.wantsJSON) {
				return res.ok('Logged in successfully!');
			}

			return res.redirect('/welcome');
		});
  },


  /**
   * `UserController.logout()`
   */
  logout: function (req, res) {
		req.session.me = null;

		if (req.wantsJSON) {
			return res.ok('Logged out successfully!');
		}

    return res.redirect('/');
  },


  /**
   * `UserController.signup()`
   */
  signup: function (req, res) {
    User.signup({
			name: req.param('name'),
			email: req.param('email'),
			password: req.param('password')
		}, function(err, user) {
			if (err) return res.negotiate(err);

			req.session.me = user.id

			if (req.wantsJSON) {
				return res.ok('Signup successful!');
			}

			return res.redirect('/welcome');
		})
  }
};
