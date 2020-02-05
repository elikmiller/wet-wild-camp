const { Registration } = require("../../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
    try {
        let dbQueryObj = {};
        if (req.query.displayArchived === "false") {
            dbQueryObj.archived = false;
        }
        let registrations = await Registration.find(dbQueryObj).populate(["user", "camper", "camp"]);
        return res.send(registrations);
    } catch (err) {
        console.error(err);
        return next(Boom.badImplementation());
    }
};
