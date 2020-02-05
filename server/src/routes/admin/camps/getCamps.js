const { Camp } = require("../../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
    try {
        let dbQueryObj = {};
        if (req.query.displayArchived === "false") {
            dbQueryObj.archived = false;
        }
        let camps = await Camp.find(dbQueryObj, null, {
            sort: {
                startDate: 1
            }
        }).populate("registrations");
        return res.send(camps);
    } catch (err) {
        console.error(err);
        return next(Boom.badImplementation());
    }
};
