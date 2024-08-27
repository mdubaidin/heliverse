import CustomError from '../../classes/CustomError.js';
import DataSource from '../../classes/DataSource.js';
import Team from '../../models/Team.js';

export default async function (req, res, next) {
    try {
        const teamId = req.params.id;

        if (teamId) {
            const team = await Team.findById(teamId).populate({
                path: 'members',
                select: ['firstName', 'lastName', 'email', 'avatar'],
            });

            if (!team) throw new CustomError('Team not found', 404);

            return res.success({ team });
        }

        const dataSource = new DataSource(Team, req.query);

        const teams = await dataSource.find({}, { members: 0 });

        res.success({ teams, pageData: dataSource.pageData });
    } catch (e) {
        next(e);
    }
}
