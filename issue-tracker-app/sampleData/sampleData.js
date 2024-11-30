const issues = [
    {
        id: "1",
        status: "Pending",
        owner: "Scott",
        effort: 5,
        created: new Date("2024-09-16"),
        due: new Date("2024-09-18"),
        title: "Error whwile creating new entry",
    },
    {
        id: "2",
        status: "New",
        owner: "Cory",
        effort: 10,
        created: new Date("2024-09-15"),
        due: undefined,
        title: "Fix CSS",
    },
];

module.exports = issues;
