import User from '../../models/User.js';
import CustomError from '../../classes/CustomError.js';
import DataSource from '../../classes/DataSource.js';

export default async function (req, res, next) {
    try {
        const userId = req.params.id;

        if (userId) {
            const user = await User.findById(userId);

            if (!user) throw new CustomError('User not found', 404);

            return res.success({ user });
        }

        if (Object.hasOwn(req.query, 'available'))
            req.query.available = JSON.parse(req.query.available);

        const dataSource = new DataSource(User, req.query, ['domain', 'available', 'gender']);

        const users = await dataSource.find({});

        res.success({ users, pageData: dataSource.pageData });
    } catch (e) {
        next(e);
    }
}
