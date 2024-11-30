const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
} = require("graphql");

const dateScalar = require("../scalars/date");
const Issue = require("../models/Issue");

const IssueType = new GraphQLObjectType({
    name: "Issue",
    fields: () => ({
        id: { type: GraphQLID },
        status: { type: GraphQLString },
        owner: { type: GraphQLString },
        effort: { type: GraphQLInt },
        created: { type: dateScalar },
        due: { type: dateScalar },
        title: { type: GraphQLString },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        issue: {
            type: IssueType,
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => {
                return Issue.findById(args.id);
            },
        },
        issues: {
            type: new GraphQLList(IssueType),
            resolve: () => {
                return Issue.find();
            },
        },
    },
});

const mutations = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        // Add an issue
        addIssue: {
            type: IssueType,
            args: {
                status: { type: GraphQLNonNull(GraphQLString) },
                owner: { type: GraphQLNonNull(GraphQLString) },
                effort: { type: GraphQLNonNull(GraphQLInt) },
                created: { type: GraphQLNonNull(dateScalar) },
                due: { type: dateScalar },
                title: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (parent, args) => {
                const newIssue = new Issue({
                    status: args.status,
                    owner: args.owner,
                    effort: args.effort,
                    created: args.created,
                    due: args.due,
                    title: args.title,
                });
                return newIssue.save();
            },
        },
        filterIssues: {
            type: new GraphQLList(IssueType),
            args: {
                status: { type: GraphQLString },
                owner: { type: GraphQLString },
            },
            resolve: (parent, args) => {
                if (args.status === "" && args.owner !== "") {
                    return Issue.find({
                        owner: args.owner,
                    });
                } else if (args.status !== "" && args.owner === "") {
                    return Issue.find({ status: args.status });
                } else if (args.owner !== "" && args.status !== "") {
                    return Issue.find({
                        owner: args.owner,
                        status: args.status,
                    });
                } else {
                    return Issue.find();
                }
            },
        },
        updateIssue: {
            type: IssueType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                status: { type: GraphQLNonNull(GraphQLString) },
                owner: { type: GraphQLNonNull(GraphQLString) },
                effort: { type: GraphQLNonNull(GraphQLInt) },
                created: { type: GraphQLNonNull(dateScalar) },
                due: { type: dateScalar },
                title: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (parent, args) => {
                return Issue.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            status: args.status,
                            owner: args.owner,
                            effort: args.effort,
                            created: args.created,
                            due: args.due,
                            title: args.title,
                        },
                    },
                    {
                        new: true,
                    }
                );
            },
        },
        deleteIssue: {
            type: IssueType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve: (parent, args) => {
                return Issue.findByIdAndDelete(args.id);
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutations,
});
