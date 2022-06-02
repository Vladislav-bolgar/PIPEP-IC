
module.exports = class IntellectualCapitalLooper {

    constructor(strategies, lookingHumanCapital, actions, states) {

        this.strategies = strategies;
        this.lookingHumanCapital = lookingHumanCapital;
        this.actions = actions;
        this.states = states;
        this.best_steps_count = 10000000000;
        this.steps_count = 0;
        this.global_loop = 0;
        this.is_new_best_value = false;
        this.normalizationFactor = 0.9;
        this.new_double_of_index = 0;
        this.best_human_capital = 0.0;
        this.index_of_random_action;
        this.index_of_best_action;
        this.global_count_coef = 0;



        this.test1 = 0;
        this.test2 = 0;
        this.test3 = 0;
        this.test4 = 0;
        this.test5 = 0;

        this.current_state = {};
        this.last_action = {};
        this.loop_count = 0;

    }


    NextStep() {

        for (var name in this.states) {
            //console.log(name);
        };


        this.steps_count++;
        this.global_loop++;

        this.index_of_random_action = Math.floor(Math.random() * 6);
        this.index_of_best_action;

        let current_string_of_index = this.GetIndexByStrategy();
        this.current_state = this.states[current_string_of_index.toFixed(4)];


        // console.log(`index_of_random_action: ${this.index_of_random_action}`);

        if (this.index_of_random_action == 2) {
            this.index_of_best_action = Math.floor(Math.random() * this.actions.length);
        }
        else {
            this.index_of_best_action = this.current_state.GetMaxValueIndex();
        }

        let next_action = this.actions[this.index_of_best_action];
        this.last_action = next_action;

        this.strategies.forEach(strategy => {
            strategy.ApplyAction(next_action);
        });




        this.new_double_of_index = this.GetIndexByStrategy();

        let new_state = this.states[this.new_double_of_index.toFixed(4)];




        let reward = this.CheckForMatch(this.lookingHumanCapital) ? 0 : -1;
        let is_end = false;
        if (reward >= 0) {


            let human_capital = this.CalculateCapital();
            is_end = true;


            if (this.GetTotalCapitalInvesting() > this.GetBudget() &&
                this.steps_count >= this.best_steps_count) {

                reward = this.best_human_capital > human_capital &&
                    this.GetTotalCapitalInvesting() > this.GetBudget() ? -1.5 : 0.0;
                this.is_new_best_value = false;

            }
            else {
                reward = 1.0;
                this.best_human_capital = human_capital;
                this.best_steps_count = this.steps_count;
                this.is_new_best_value = true;
            }
        }


        let max_value_for_current_state = this.current_state.GetMaxValue();
        let max_value_for_new_state = new_state.GetMaxValue();
        let new_value = max_value_for_current_state + 0.8 *
            (reward + this.normalizationFactor * max_value_for_new_state - max_value_for_current_state);

        this.current_state.SetNewValue(this.index_of_best_action, new_value);


        if (is_end) {
            this.loop_count++;
            console.log(`Loop: ${this.loop_count}`);
            // 100 000 000
            if (this.global_loop > 100000) {
                this.global_loop = 0;
                this.global_count_coef++;
            }
            this.steps_count = 0;


            this.Reset();

        }
    }

    CalculateCapital() {
        let capital = 0;
        this.strategies.forEach(strategy => {
            //console.log(strategy.CalculateCapital(), strategy.coefficient);
            capital += strategy.CalculateCapital();


        });
        return capital;
    }

    Reset() {
        this.strategies.forEach(strategy => {
            strategy.Reset();
        });
    }

    GetTotalCapitalInvesting() {
        let totalCapitalInvesting = 0;
        this.strategies.forEach(strategy => {
            totalCapitalInvesting += strategy.GetTotalCapitalInvesting();
        });
        return totalCapitalInvesting;
    }

    GetBudget() {
        let budget = 0;
        this.strategies.forEach(strategy => {
            budget += strategy.GetBudget();
        });
        return budget;
    }

    CheckForMatch(lookingHumanCapital) {
        if (this.CalculateCapital() >= lookingHumanCapital) {
            return true;
        }
        else {
            return false;
        }
    }

    GetIndexByStrategy() {
        return this.CalculateCapital();
    }



}

