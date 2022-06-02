
module.exports = class OrganizationalCapitalStrategy {



    constructor(budget = 1000, coefficient, productivity = 0, innovation = 0,
        cooperativeness = 0, performance = 0, adaptability = 0) {

        this.coefficient = coefficient;

        this.capital = 0;
        this.capital_investing = 0;

        this.technical_capital_investing = 0;
        this.patents_capital_investing = 0;
        this.organization_culture_capital_investing = 0;
        this.control_capital_investing = 0;
        this.planning_capital_investing = 0;

        this.technical_capital = 0;
        this.patents_capital = 0;
        this.organization_culture_capital = 0;
        this.control_capital = 0;
        this.planning_capital = 0;

        this.budget = budget;
        this.start_budget = budget;

        this.productivity = productivity;
        this.innovation = innovation;
        this.cooperativeness = cooperativeness;
        this.performance = performance;
        this.adaptability = adaptability;

        this.start_productivity = productivity;
        this.start_innovation = innovation;
        this.start_cooperativeness = cooperativeness;
        this.start_performance = performance;
        this.start_adaptability = adaptability;
    }


    SetState(productivity = 0, innovation = 0, cooperativeness = 0, performance = 0, adaptability = 0) {
        this.SetProductivity(productivity);
        this.SetInnovation(innovation);
        this.SetCooperativeness(cooperativeness);
        this.SetPerformance(performance);
        this.SetAdaptability(adaptability);
    }

    SetProductivity(productivity) {
        this.productivity = productivity;
    }

    SetInnovation(innovation) {
        this.innovation = innovation;
    }

    SetCooperativeness(cooperativeness) {
        this.cooperativeness = cooperativeness;
    }

    SetPerformance(performance) {
        this.performance = performance;
    }

    SetAdaptability(adaptability) {
        this.adaptability = adaptability;
    }





    AddTechnical(technical) {
        this.technical_capital_investing += technical;
        this.UpdateTechnicalInvesting();
    }

    AddPatents(patents) {
        this.patents_capital_investing += patents;
        this.UpdatePatentsInvesting();
    }

    AddOrganizationCulture(organization_culture) {
        this.organization_culture_capital_investing += organization_culture;
        this.UpdateOrganizationCultureInvesting();
    }

    AddControl(control) {
        this.control_capital_investing += control;
        this.UpdateControlInvesting();
    }

    AddPlanning(planning) {
        this.planning_capital_investing += planning;
        this.UpdatePlanningInvesting();
    }


    UpdateTotalCapitalInvesting() {
        this.capital_investing =
            this.technical_capital_investing +
            this.patents_capital_investing +
            this.organization_culture_capital_investing +
            this.control_capital_investing +
            this.planning_capital_investing;
    }


    UpdateTechnicalInvesting() {
        this.UpdateTotalCapitalInvesting();
        if (this.capital_investing == 0) {
            return;
        }
        this.technical_capital = this.technical_capital_investing / this.capital_investing;
    }

    UpdatePatentsInvesting() {
        this.UpdateTotalCapitalInvesting();
        if (this.capital_investing == 0) {
            return;
        }
        this.patents_capital = this.patents_capital_investing / this.capital_investing;
    }

    UpdateOrganizationCultureInvesting() {
        this.UpdateTotalCapitalInvesting();
        if (this.capital_investing == 0) {
            return;
        }
        this.organization_culture_capital = this.organization_culture_capital_investing / this.capital_investing;
    }

    UpdateControlInvesting() {
        this.UpdateTotalCapitalInvesting();
        if (this.capital_investing == 0) {
            return;
        }
        this.control_capital = this.control_capital_investing / this.capital_investing;
    }

    UpdatePlanningInvesting() {
        this.UpdateTotalCapitalInvesting();
        if (this.capital_investing == 0) {
            return;
        }
        this.planning_capital = this.planning_capital_investing / this.capital_investing;
    }





    CalculateCapital() {



        return Math.round(

            (this.technical_capital * this.productivity * 0.2 +
                this.patents_capital * this.innovation * 0.25 +
                this.organization_culture_capital * this.cooperativeness * 0.18 +
                this.control_capital * this.performance * 0.15 +
                this.planning_capital * this.adaptability * 0.23) * this.capital_investing * this.coefficient * 10000

        ) / 10000;
    }

    GetTotalCapitalInvesting() {
        return this.capital_investing;
    }

    GetBudget() {
        return this.budget;
    }





    ApplyAction(action) {
        this.AddTechnical(action.technical);
        this.AddPatents(action.patents);
        this.AddOrganizationCulture(action.organizationCulture);
        this.AddControl(action.control);
        this.AddPlanning(action.planning);
    }





    Reset() {
        this.budget = this.start_budget;
        this.SetProductivity(this.start_performance);
        this.SetPerformance(this.start_performance);
        this.SetInnovation(this.start_innovation);
        this.SetAdaptability(this.start_adaptability);
        this.SetCooperativeness(this.start_cooperativeness);

        this.capital = 0;
        this.capital_investing = 0;

        this.technical_capital_investing = 0;
        this.patents_capital_investing = 0;
        this.organization_culture_capital_investing = 0;
        this.control_capital_investing = 0;
        this.planning_capital_investing = 0;

        this.technical_capital = 0;
        this.patents_capital = 0;
        this.organization_culture_capital = 0;
        this.control_capital = 0;
        this.planning_capital = 0;
    }


}
