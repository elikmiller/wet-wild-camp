const { User } = require("../../models");
const Boom = require("boom");
const _ = require("lodash");

module.exports = async (req, res, next) => {
    try {
        let updatedFields = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            primaryContact: req.body.primaryContact,
            secondaryContact: req.body.secondaryContact,
            emergencyContact: req.body.emergencyContact,
            surveyQuestion: req.body.surveyQuestion
        };
        updatedFields = _.omitBy(updatedFields, _.isUndefined);
        let updatedUser = await User.findOneAndUpdate({ _id: req.session.userId }, updatedFields, { new: true });
        return res.send(updatedUser);
    } catch (err) {
        console.error(err);
        return next(Boom.badImplementation());
    }
};
