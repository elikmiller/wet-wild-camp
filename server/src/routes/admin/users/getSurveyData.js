const { User } = require("../../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
    try {
        let users = await User.find({});
        let surveyTotals = {
            previousCamper: 0,
            internet: 0,
            friendRelative: 0,
            campFair: 0,
            newspaperMagazine: 0,
            other: 0
        };
        users.forEach(user => {
            if (user.surveyQuestion) surveyTotals[user.surveyQuestion]++;
        });
        res.send(surveyTotals);
    } catch (err) {
        console.error(err);
        return next(Boom.badImplementation());
    }
};
