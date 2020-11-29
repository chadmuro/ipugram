const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// add admin role
exports.addAdminRole = functions.https.onCall((data, context) => {
	// can only be called from admin role
	if (context.auth.token.admin !== true) {
		return { error: 'Only admins can add other admins!' };
	}

	return admin
		.auth()
		.getUserByEmail(data.email)
		.then(user => {
			return admin.auth().setCustomUserClaims(user.uid, {
				admin: true,
			});
		})
		.then(() => {
			return { message: `Success! ${data.email} has been made an admin` };
		})
		.catch(err => {
			return err;
		});
});

// auth trigger to create user in firestore on signup
exports.newUserSignup = functions.auth.user().onCreate(user => {
	return admin.firestore().collection('users').doc(user.uid).set({
		likedImages: [],
	});
});

// auth triffer to delete user in firestore
exports.userDeleted = functions.auth.user().onDelete(user => {
	const doc = admin.firestore().collection('users').doc(user.uid);
	return doc.delete();
});
