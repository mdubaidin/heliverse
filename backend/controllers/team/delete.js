import CustomError from '../../classes/CustomError.js';
import Team from '../../models/Team.js';

export default async function (req, res, next) {
    try {
        const teamId = req.params.id;

        const team = await Team.findById(teamId);

        if (!team) throw new CustomError('Team not found', 404);

        await team.deleteOne();

        res.success({ message: `${team.name} has been deleted` });
    } catch (e) {
        next(e);
    }
}
