import User from '../../models/User.js';
import CustomError from '../../classes/CustomError.js';

export default async function (req, res, next) {
    try {
        const userId = req.params.id;

        const { firstName, lastName, email, gender, domain, available, avatar } = req.body;

        const { acknowledged, matchedCount, modifiedCount } = await User.updateOne(
            { _id: userId },
            {
                $set: {
                    firstName,
                    lastName,
                    email,
                    gender,
                    domain,
                    available,
                    avatar,
                },
            }
        );

        if (!acknowledged) throw new CustomError('Something went wrong, cannot update user', 500);

        if (matchedCount === 0) throw new CustomError('No User found by id ' + userId);

        if (modifiedCount === 0) return res.success('No changes made in user');

        res.success({ message: 'user updated' });
    } catch (e) {
        next(e);
    }
}
