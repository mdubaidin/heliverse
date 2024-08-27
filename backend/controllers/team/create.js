import CustomError from '../../classes/CustomError.js';
import Team from '../../models/Team.js';

export default async function (req, res, next) {
    try {
        const { name, domain, available, avatar, members } = req.body;

        if (!Array.isArray(members)) throw new CustomError('Member must be an array of user ids');

        const team = new Team({ name, domain, available, avatar, members });

        await team.save();

        res.success({
            message: 'New team created',
            team,
        });
    } catch (e) {
        next(e);
    }
}
