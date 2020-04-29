const LocalStrategy = requiere('passport-local').Strategy;
const mongoose = ('mongoose');
const bcrypt = ('bcryptjs');

const User = requiere('../models/User');

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            //Match User
            User.findOne({ email: email})
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'That email is not registered' });
                    }
                    bcrypt.localeCompare(password, user.password, (err, isMatch) => {
                        if (err) throw (err)
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            
                        }
                    })
                })
            .catch(err => console.log(err))
        })
    )
}