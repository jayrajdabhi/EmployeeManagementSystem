const { GraphQLScalarType, Kind } = require("graphql");


const dateToString = (date) => {
    return new Date(date);
};

const stringToDate = (string) => {
    const parsedDate = new Date(string);
    if (!isNaN(parsedDate.getTime())) {
        return parsedDate;
    }
    return "";
};

const dateScalar = new GraphQLScalarType({
    name: "Date",
    description: "Date Scalar",
    serialize: (value) => {
        return dateToString(value);
    },
    parseValue: (value) => {
        return stringToDate(value);
    },
    parseLiteral: (ast) => {
        if (ast.kind === Kind.STRING) {
            return stringToDate(ast.value);
        }
        throw new Error("Invalid format");
    },
});

module.exports = dateScalar;