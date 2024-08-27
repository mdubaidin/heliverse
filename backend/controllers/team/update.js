import CustomError from '../../classes/CustomError.js';
import Team from '../../models/Team.js';

export default async function (req, res, next) {
    try {
        const teamId = req.params.id;

        const { name, domain, available, avatar, members } = req.body;

        const { acknowledged, matchedCount, modifiedCount } = await Team.updateOne(
            { _id: teamId },
            {
                $set: { name, domain, available, avatar, members },
            }
        );

        if (!acknowledged) throw new CustomError('Something went wrong, cannot update team', 500);

        if (matchedCount === 0) throw new CustomError('No Team found by id ' + teamId);

        if (modifiedCount === 0) return res.success('No changes made in team');

        res.success({ message: 'Team updated' });
    } catch (e) {
        next(e);
    }
}
