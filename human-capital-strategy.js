
module.exports = class HumanCapitalStrategy {



    constructor(budget = 1000, coefficient, creativity = 0, competence = 0,
        purposefulness = 0, communicativeness = 0, motivation = 0) {


        this.coefficient = coefficient;

        this.human_capital = 0;
        this.human_capital_investing = 0;


        this.salary_investing = 0;
        this.education_capital_investing = 0;
        this.health_capital_investing = 0;
        this.cultural_capital_investing = 0;
        this.information_capital_investing = 0;


        this.budget = budget;
        this.creativity = creativity;
        this.communicativeness = communicativeness;
        this.competence = competence;
        this.motivation = motivation;
        this.purposefulness = purposefulness;

        this.start_budget = budget;
        this.start_creativity = creativity;
        this.start_competence = competence;
        this.start_purposefulness = purposefulness;
        this.start_communicativeness = communicativeness;
        this.start_motivation = motivation;

        this.salary_capital = 0;
        this.education_capital = 0;
        this.health_capital = 0;
        this.cultural_capital = 0;
        this.information_capital = 0;


    }


    SetState(creativity = 0, competence = 0, purposefulness = 0, communicativeness = 0, motivation = 0) {
        this.SetCreativity(creativity);
        this.SetCompetence(competence);
        this.SetPurposefulness(purposefulness);
        this.SetCommunicativeness(communicativeness);
        this.SetMotivation(motivation);
    }

    SetCreativity(creativity) {
        this.creativity = creativity;
    }

    SetCompetence(competence) {
        this.competence = competence;
    }

    SetPurposefulness(purposefulness) {
        this.purposefulness = purposefulness;
    }

    SetCommunicativeness(communicativeness) {
        this.communicativeness = communicativeness;
    }

    SetMotivation(motivation) {
        this.motivation = motivation;
    }

    AddSalary(salary) {
        this.salary_investing += salary;
        this.UpdateSalaryInvesting();
    }

    AddEducation(education) {
        this.education_capital_investing += education;
        this.UpdateEducationInvesting();
    }

    AddHealth(health) {
        this.health_capital_investing += health;
        this.UpdateHealthInvesting();
    }

    AddCultural(cultural) {
        this.cultural_capital_investing += cultural;
        this.UpdateCulturalInvesting();
    }

    AddInformation(information) {
        this.information_capital_investing += information;
        this.UpdateInfromationInvesting();
    }

    UpdateTotalCapitalInvesting() {
        this.human_capital_investing =

            this.salary_investing +
            this.education_capital_investing +
            this.health_capital_investing +
            this.cultural_capital_investing +
            this.information_capital_investing;
    }

    UpdateSalaryInvesting() {
        this.UpdateTotalCapitalInvesting();
        if (this.human_capital_investing == 0) {
            return;
        }
        this.salary_capital = this.salary_investing / this.human_capital_investing;
    }

    UpdateEducationInvesting() {
        this.UpdateTotalCapitalInvesting();
        if (this.human_capital_investing == 0) {
            return;
        }
        this.education_capital = this.education_capital_investing / this.human_capital_investing;
    }

    UpdateHealthInvesting() {
        this.UpdateTotalCapitalInvesting();
        if (this.human_capital_investing == 0) {
            return;
        }
        this.health_capital = this.health_capital_investing / this.human_capital_investing;
    }

    UpdateCulturalInvesting() {
        this.UpdateTotalCapitalInvesting();
        if (this.human_capital_investing == 0) {
            return;
        }
        this.cultural_capital = this.cultural_capital_investing / this.human_capital_investing;
    }

    UpdateInfromationInvesting() {
        this.UpdateTotalCapitalInvesting();
        if (this.human_capital_investing == 0) {
            return;
        }
        this.information_capital = this.information_capital_investing / this.human_capital_investing;
    }

    CalculateCapital() {
        return Math.round(

            (this.salary_capital * this.competence * 0.2 +
                this.education_capital * this.creativity * 0.25 +
                this.health_capital * this.motivation * 0.18 +
                this.cultural_capital * this.purposefulness * 0.15 +
                this.information_capital * this.communicativeness * 0.23) * this.human_capital_investing * this.coefficient * 10000

        ) / 10000;
    }

    GetTotalCapitalInvesting() {
        return this.human_capital_investing;
    }

    GetBudget() {
        return this.budget;
    }

    ApplyAction(action) {
        this.AddSalary(action.salary);
        this.AddEducation(action.education);
        this.AddHealth(action.health);
        this.AddCultural(action.cultural);
        this.AddInformation(action.information);
    }

    Reset() {
        this.budget = this.start_budget;
        this.SetCreativity(this.start_creativity);
        this.SetCommunicativeness(this.start_communicativeness);
        this.SetCompetence(this.start_competence);
        this.SetMotivation(this.start_motivation);
        this.SetPurposefulness(this.start_purposefulness);

        this.human_capital = 0;
        this.human_capital_investing = 0;

        this.salary_investing = 0;
        this.education_capital_investing = 0;
        this.health_capital_investing = 0;
        this.cultural_capital_investing = 0;
        this.information_capital_investing = 0;

        this.salary_capital = 0;
        this.education_capital = 0;
        this.health_capital = 0;
        this.cultural_capital = 0;
        this.information_capital = 0;
    }



}
