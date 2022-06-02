
module.exports = class HumanCapitalState {
    constructor(strategies, actions) {
        this.strategies = strategies;
        this.actions = actions;
        this.values = [];
        this.currentMax;
        this.arg_max;

        for (let i = 0; i < actions.length; i++) {
            this.values[i] = 0;
        }
    }


    GetMaxValueIndex() {
        for (var firstKey in this.values) break;
        let arg_max = firstKey;
        let currentMax = this.values[arg_max];


        this.values.forEach((value, index) => {
            if (value > currentMax) {
                arg_max = index;
                currentMax = value;
            }
        });


        return Number(arg_max);
    }
    GetMaxValue() {
        for (var firstKey in this.values) break;
        let arg_max = firstKey;
        let currentMax = this.values[arg_max];

        this.values.forEach((value, index) => {
            if (value > currentMax) {
                arg_max = index;
                currentMax = value;
            }
        });

        return Number(currentMax);
    }

    SetNewValue(index, value) {
        this.values[index] = value;
    }



}
