import User from '../../models/User.js';
import CustomError from '../../classes/CustomError.js';

export default async function (req, res, next) {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);

        if (!user) throw new CustomError('User not found', 404);

        await user.deleteOne();

        res.success({ message: `${user.name} has been deleted` });
    } catch (e) {
        next(e);
    }
}
