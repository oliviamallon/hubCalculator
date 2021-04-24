var numPeople;
var namePeoples = [];
var usersCosts = [];
var mealCosts = [];
var usersMeals = [];

function start() {
    document.getElementById('tblCosts').style.display = "none";
    document.getElementById('tblOutput').style.display = "none";
    namePeoples = [];
    usersCosts = [];
    mealCosts = [];
    usersMeals = [];
}

function noPeople() {

    numPeople = document.getElementById("numPeople").value;

    if (numPeople == null || numPeople == "") {
        numPeople = 0;
    } else if (isNaN(numPeople)) {
        alert("Please enter in a Number");
    } else {
        peopleNames(numPeople);
        document.getElementById('subNumberPeople').style.display = "none";
    }
}

function peopleNames(people) {
    for (i = 0; i < people; i++) {
        var sub = 'person' + (i + 1);
        document.getElementById("names").innerHTML += '<p>Person ' + (i + 1) + ': <input type="text" id="' + sub + '"></p>';
    }
    if (people != 0) {
        document.getElementById("names").innerHTML += '<button id="submitNames" class="btn" onclick="returnNames();">Submit Name</button><br><br>';
    }
}

function returnNames() {
    document.getElementById("submitNames").style.display = "none";
    for (i = 0; i < numPeople; i++) {
        var title = 'person' + (i + 1);
        var data = document.getElementById(title).value;
        namePeoples.push(data);
    }

    document.getElementById('here').innerHTML += '<br>';

    for (y = (numPeople - 1); y > -1; y--) {
        createCol(namePeoples[y], y);
    }
    document.getElementById('tblCosts').style.display = "block";

}


function foodCosts() {
    mealCosts = [];
    for (x = 0; x < 4; x++) {
        var day = "cost" + (x + 1);
        var dayCost = (parseFloat(document.getElementById(day).value));
        var costs = "people" + (x + 1);
        var peoplePresent = (parseFloat(document.getElementById(costs).value));

        mealCosts.push(dayCost / peoplePresent);
    }
}

function checkValues() {

    for (y = 0; y < 4; y++) {
        var sub = "cost" + (y + 1);
        if (isNaN(document.getElementById(sub).value)) {
            return false;

        }
    }
    return true;
}

function isOneChecked() {
    var chefsSelected = false;
    for (y = 0; y < 4; y++) {
        chefsSelected = false;
        var chx = document.getElementsByName(('chef' + (y + 1)));
        for (var i = 0; i < chx.length; i++) {
            if (chx[i].type == 'radio' && chx[i].checked) {
                chefsSelected = true;
                break;
            }
        }
    }
    return chefsSelected;
}

function costMeals() {
    var allCostNums = checkValues();
    var chefsCook = isOneChecked();

    if (allCostNums && chefsCook) {
        foodCosts();
        calcPerPerson();
        generateTableOutput();
    } else {
        alert("Please check that all costs are numbers");
    }
}

function calcPerPerson() {
    usersCosts = [];
    var x = document.getElementById("costs").rows[0].cells.length;
    document.getElementById('here').innerHTML = "";

    for (y = 0; y < numPeople; y++) {
        var userSpent = 0;
        var userMealCosts = 0;
        for (x = 0; x < 4; x++) {
            var userChef = false;
            var userPresent = false;
            if (document.getElementById(('chef' + (x + 1) + namePeoples[y])).checked) {
                userChef = true;
            }
            if (userChef == true) {
                userSpent += parseFloat(document.getElementById(('cost' + (x + 1))).value);
            }
            if (document.getElementById(('present' + (x + 1) + namePeoples[y])).checked) {
                userPresent = true;
            }
            if (userPresent == true) {
                userMealCosts += mealCosts[x];
            }
        }
        usersCosts.push(userSpent);
        usersMeals.push(userMealCosts);
    }
}

function createCol(name, num) {
    var row = document.getElementById("titles");
    var x = row.insertCell(3);
    x.innerHTML = name;
    var days = ["mon", "tues", "wed", "thurs"];

    for (i = 0; i < 4; i++) {
        row = document.getElementById(days[i]);
        var x = row.insertCell(3);
        x.innerHTML += '<br><input type="radio" name="chef' + (i + 1) + '" value="chef' + (i + 1) + '" onclick="selectPres(' + num + ',' + (i + 1) + ');" id="chef' + (i + 1) + name + '"/>Chef?';
        x.innerHTML += '<br><input type="checkbox" name="present' + (i + 1) + '" value="present' + (i + 1) + '" onclick="updatePeople(' + (i + 1) + ');" id="present' + (i + 1) + name + '"/>Present?';
    }
}

function generateTableOutput() {
    var x = document.getElementById("outputTable").rows.length;
    if (x > 1) {
        for (y = 0; y < (x - 1); y++) {
            document.getElementById("outputTable").deleteRow(1);
        }
    }

    document.getElementById('tblOutput').style.display = "block";
    var table = document.getElementById("outputTable");

    for (y = 0; y < numPeople; y++) {
        var row = table.insertRow(1);

        var cell1 = row.insertCell(0);
        cell1.innerHTML = namePeoples[y];

        cell1 = row.insertCell(1);
        cell1.innerHTML = usersCosts[y];

        cell1 = row.insertCell(2);
        cell1.innerHTML = usersMeals[y];

        cell1 = row.insertCell(3);
        var cell2 = row.insertCell(4);
        cell1.innerHTML = "";
        cell2.innerHTML = "";

        var usersMoney = usersCosts[y] - usersMeals[y];

        if (usersMoney < 0) {
            cell1.innerHTML = Math.abs(usersMoney);
            cell2.innerHTML = '<span class="owes"> OWES</span>';
        } else if (usersMoney > 0) {
            cell1.innerHTML = Math.abs(usersMoney);
            cell2.innerHTML = '<span class="owed"> OWED</span>';
        }
    }
}

function selectPres(num, day) {
    var identify = "present" + day + namePeoples[num];
    document.getElementById(identify).checked = true;
    updatePeople(day);
}

function updatePeople(presDay) {
    var identify = 'present' + presDay;
    var identify2 = 'people' + presDay;
    var chx = document.getElementsByName(identify);

    var numTicked = 0;
    for (var i = 0; i < chx.length; i++) {
        if (chx[i].type == 'checkbox' && chx[i].checked) {
            numTicked++;
        }
    }
    document.getElementById(identify2).value = numTicked;
}