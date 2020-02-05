const { Payment } = require("../../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
    try {
        let dbQueryObj = {};
        if (req.query.displayArchived === "false") {
            dbQueryObj.archived = false;
        }
        let payments = await Payment.find(dbQueryObj).populate(["user", "deposits", "fullPayments"]);
        return res.send(payments);
    } catch (err) {
        console.error(err);
        return next(Boom.badImplementation());
    }
};
