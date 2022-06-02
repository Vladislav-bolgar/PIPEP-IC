
module.exports = class IntellectualCapitalAction {

    constructor(id, budget = 1000, salary = 0, education = 0,
        health = 0, cultural = 0, information = 0, technical = 0,
        patents = 0, organizationCulture = 0, control = 0, planning = 0) {


        this.id = id;
        this.budget = budget;

        this.salary = salary;
        this.education = education;
        this.health = health;
        this.cultural = cultural;
        this.information = information;

        this.technical = technical;
        this.patents = patents;
        this.organizationCulture = organizationCulture;
        this.control = control;
        this.planning = planning;

    }

}

