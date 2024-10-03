
const Employee = require("../models/employees");
const dateScalar = require("../scalars/date");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
} = require("graphql");



const EmployeeType = new GraphQLObjectType({
  name: "Employee",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    age: { type: GraphQLInt },
    dateOfJoining: { type: dateScalar },
    title: { type: GraphQLString },
    department: { type: GraphQLString },
    employeeType: { type: GraphQLString },
    currentStatus: { type: GraphQLBoolean },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    employee: {
      type: EmployeeType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Employee.findById(args.id);
      },
    },
    employees: {
      type: new GraphQLList(EmployeeType),
      resolve(parent, args) {
        return Employee.find();
      },
    },
  },
});

// Define the Mutation
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addEmployee: {
      type: EmployeeType,
      args: {
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLInt) },
        dateOfJoining: { type: GraphQLNonNull(dateScalar) },
        title: { type: GraphQLNonNull(GraphQLString) },
        department: { type: GraphQLNonNull(GraphQLString) },
        employeeType: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const newEmployee = new Employee({
          firstName: args.firstName,
          lastName: args.lastName,
          age: args.age,
          dateOfJoining: args.dateOfJoining,
          title: args.title,
          department: args.department,
          employeeType: args.employeeType,
          currentStatus: true, // Assuming currentStatus defaults to true
        });
        return newEmployee.save();
      },
    },
    deleteEmployee: {
      type: EmployeeType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Employee.findByIdAndDelete(args.id);
      },
    },
    updateEmployee: {
      type: EmployeeType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        age: { type: GraphQLInt },
        dateOfJoining: { type: dateScalar },
        title: { type: GraphQLString },
        department: { type: GraphQLString },
        employeeType: { type: GraphQLString },
        currentStatus: { type: GraphQLBoolean },
      },
      resolve(parent, args) {
        return Employee.findByIdAndUpdate(args.id, args, { new: true });
      },
    },
  },
});

// Define the GraphQL schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
