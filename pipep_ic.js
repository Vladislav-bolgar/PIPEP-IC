const Mysql = require('sync-mysql')
var http = require('http');
var url = require('url');

var IntellectualCapitalAction = require('./intellectual-capital-action');
var HumanCapitalLooper = require('./intellectual-capital-looper');
var HumanCapitalState = require('./human-capital-state');
var HumanCapitalStrategy = require('./human-capital-strategy');
var OrganizationalCapitalStrategy = require('./organizational-capital-strategy');


var connection = new Mysql({
    host: "localhost",
    user: "root",
    password: "magento2",
    database: 'pipep'
});


var actions = new Array();
var strategies = new Array();

var looper;
var oldHC = 0;
var loopAction = () => { };

var actionCount = 0;
var actionsHistory = "";


function SetActionData(action, actionDatas) {
    actionDatas.forEach(actionData => {
        if (actionData.capital_id == 1) {
            action.salary = actionData.value;
        }
        if (actionData.capital_id == 2) {
            action.education = actionData.value;
        }
        if (actionData.capital_id == 3) {
            action.health = actionData.value;
        }
        if (actionData.capital_id == 4) {
            action.cultural = actionData.value;
        }
        if (actionData.capital_id == 5) {
            action.information = actionData.value;
        }


        if (actionData.capital_id == 6) {
            action.technical = actionData.value;
        }
        if (actionData.capital_id == 7) {
            action.patents = actionData.value;
        }
        if (actionData.capital_id == 8) {
            action.organizationCulture = actionData.value;
        }
        if (actionData.capital_id == 9) {
            action.control = actionData.value;
        }
        if (actionData.capital_id == 10) {
            action.planning = actionData.value;
        }
    });
}



function InitIC() {

    //let capitalsResult = connection.query("SELECT * FROM ic_capital");
    let criterionsResult = connection.query("SELECT * FROM ic_criterion");

    strategies.push(new HumanCapitalStrategy(581, 0.374, criterionsResult[0].value, criterionsResult[1].value, criterionsResult[2].value,
        criterionsResult[3].value, criterionsResult[4].value));

    strategies.push(new OrganizationalCapitalStrategy(581, 0.626, criterionsResult[5].value, criterionsResult[6].value, criterionsResult[7].value,
        criterionsResult[8].value, criterionsResult[9].value));

    let HC = strategies[0];
    let OC = strategies[1];

    //console.log(strategies);

    let actionResult = connection.query("SELECT * FROM ic_actions");
    actionResult.forEach(action => {
        let addedAction = new IntellectualCapitalAction(action.action_id, action.budget, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        let actionData = connection.query(`SELECT * FROM ic_action_capital WHERE action_id = ${action.action_id}`);
        SetActionData(addedAction, actionData);
        actions.push(addedAction);
    });



    // console.log(actions);









    let states = {};
    for (let i = 0; i < 35; i += 0.0001) {
        states[i.toFixed(4)] = new HumanCapitalState(strategies, actions);
    }



    looper = new HumanCapitalLooper(strategies, 25, actions, states);
    loopAction = () => {
        looper.NextStep();
        actionCount++;
        let newHC = looper.CalculateCapital();
        let sql = "";
        if (oldHC < newHC) {
            oldHC = newHC;
            sql = `INSERT INTO ic_results (result, salary, education, health, cultural, information, loop_count, ic_status, technical, patents, organization, control, planning) VALUES ('${newHC}',
            
            ${(HC.salary_capital * HC.coefficient).toFixed(4)},
            ${(HC.education_capital * HC.coefficient).toFixed(4)},
            ${(HC.health_capital * HC.coefficient).toFixed(4)},
            ${(HC.cultural_capital * HC.coefficient).toFixed(4)},
            ${(HC.information_capital * HC.coefficient).toFixed(4)}

            , ${looper.loop_count}, 1,
            
            ${(OC.technical_capital * OC.coefficient).toFixed(4)},
            ${(OC.patents_capital * OC.coefficient).toFixed(4)},
            ${(OC.organization_culture_capital * OC.coefficient).toFixed(4)},
            ${(OC.control_capital * OC.coefficient).toFixed(4)},
            ${(OC.planning_capital * OC.coefficient).toFixed(4)});`;
            // sql = `INSERT INTO pipep.ic_results (result, salary, education, health, cultural, information, loop_count, ic_status) VALUES ('${newHC}', '${looper.strategy.salary_capital}', '${looper.strategy.education_capital
            //     }', '${looper.strategy.health_capital}', '${looper.strategy.cultural_capital
            //     }', '${looper.strategy.information_capital}', ${looper.loop_count}, 1);`;
        } else {
            sql = `INSERT INTO ic_results (result, salary, education, health, cultural, information, loop_count, technical, patents, organization, control, planning) VALUES ('${newHC}', 
            ${(HC.salary_capital * HC.coefficient).toFixed(4)},
            ${(HC.education_capital * HC.coefficient).toFixed(4)},
            ${(HC.health_capital * HC.coefficient).toFixed(4)},
            ${(HC.cultural_capital * HC.coefficient).toFixed(4)},
            ${(HC.information_capital * HC.coefficient).toFixed(4)}
            
            , ${looper.loop_count},
            
            ${(OC.technical_capital * OC.coefficient).toFixed(4)},
            ${(OC.patents_capital * OC.coefficient).toFixed(4)},
            ${(OC.organization_culture_capital * OC.coefficient).toFixed(4)},
            ${(OC.control_capital * OC.coefficient).toFixed(4)},
            ${(OC.planning_capital * OC.coefficient).toFixed(4)}
            
            );`;
        }


        connection.query(sql);
    };


}
InitIC();
setInterval(() => {
    loopAction();
}, 16);