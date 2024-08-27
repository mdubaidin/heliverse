import User from '../../models/User.js';

export default async function (req, res, next) {
    try {
        const { firstName, lastName, email, gender, domain, available, avatar } = req.body;

        const user = new User({
            firstName,
            lastName,
            email,
            gender,
            domain,
            available,
            avatar,
        });

        await user.save();

        res.success({
            message: 'user created',
            user,
        });
    } catch (e) {
        next(e);
    }
}
