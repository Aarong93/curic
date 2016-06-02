//TODO remove:
// import SessionActions from './../actions/session_actions';
// import ErrorActions from './../actions/error_actions';

const SessionApiUtil = {
	signIn(user, success, error) {
		$.ajax({
			url: '/api/session',
			type: 'POST',
			data: { user },
			success,
			error(xhr) {
				const errors = xhr.responseJSON;
				error("signin", errors);
			}
		});
	},

	signOut(success) {
		$.ajax({
			url: '/api/session',
			method: 'delete',
			success,
			error: function () {
			  console.log("Logout error in SessionApiUtil#logout");
			}
		});
	},

	signUp(user, success, error) {
		$.ajax({
			url: '/api/user',
			type: 'POST',
			dataType: 'json',
			data: { user },
			success,
			error(xhr) {
				const errors = xhr.responseJSON;
				error("signup", errors);
			}
		});
	},

	fetchCurrentUser(success, complete) {
		$.ajax({
			url: '/api/session',
			method: 'GET',
			success,
			error: function (xhr) {
			  console.log("Error in SessionApiUtil#fetchCurrentUser");
			},
      complete: function(){
				complete();
			}
		});
	}
};

export default SessionApiUtil;
