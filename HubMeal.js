var numPeople;
var namePeoples = [];
var usersCosts = [];
var mealCosts = [];
var usersMeals = [];
var numWeeks;

function start() {
    document.getElementById('numPeople').value = "";
    document.getElementById('subNumberPeople').style.display = "inline-block";
    document.getElementById('names').style.display = "none";
    document.getElementById('tblCosts').style.display = "none";
    document.getElementById('tblCosts').innerHTML =""; 
    document.getElementById('tblOutput').style.display = "none";
    document.getElementById("names").innerHTML = "";
    document.getElementById('noWeeks').innerHTML="";
    document.getElementById('noWeeks').style.display="none";
    numPeople = 0;
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
        document.getElementById('names').style.display = "block";
    }
}

function peopleNames(people) {
    document.getElementById("names").innerHTML += '<b>Please enter the names of people in your household: <b> <br>';
    for (i = 0; i < people; i++) {
        var sub = 'person' + (i + 1);
        document.getElementById("names").innerHTML += '<p>Person ' + (i + 1) + ': <input type="text" id="' + sub + '"></p>';
    }
    if (people != 0) {
        document.getElementById("names").innerHTML += '<button id="submitNames" class="btn" onclick="weeksCalc();">Submit Names</button><br><br>';
    }
}

function weeksCalc() {
    document.getElementById('submitNames').style.display = "none";
    document.getElementById('noWeeks').style.display = "block";
    var weeksDiv = document.getElementById('noWeeks');
    var text = '<form action="#"><p><b>Please enter the number of weeks you would like to calculate: </b><input type="number" id="numWeeks" name="numWeeks"  maxlength="2"></p></form><button class="btn" id="subNumberWeeks" onclick="returnNames();">Submit</button>';
    weeksDiv.innerHTML = text;
}

function returnNames() {
    numWeeks = document.getElementById("numWeeks").value;

    if (isNaN(numWeeks)) {
        alert("Please enter in a number! ");
    } else if (numWeeks < 0) {
        alert("Please enter in a value of 1 or higher");
    } else if (numWeeks > 30) {
        alert("Please enter a number less than 30");
    } else {
        document.getElementById("subNumberWeeks").style.display = "none";
        //creates basic table - no names incl.
        createTable();
        for (i = 0; i < numPeople; i++) {
            //adds peoples names to an Array to be used later on for table creation
            var title = 'person' + (i + 1);
            var data = document.getElementById(title).value;
            namePeoples.push(data);
        }

        for (y = (numPeople - 1); y > -1; y--) {
            //creates columns for people????
            createCol(namePeoples[y], y);
        }
        document.getElementById('tblCosts').style.display = "block";

    }

}

function createTable() {

    var tableToAdd = "";
    document.getElementById('tblCosts').innerHTML = "";

    for (i = 0; i < numWeeks; i++) {
        var weekNo = i + 1;
        tableToAdd += '<h2>Week ' + weekNo + '</h2><table id="costs' + weekNo + '">';
        tableToAdd += '<tr id="w' + weekNo + 'titles"><th>Day of Week</th><th>Cost</th><th>No. People</th><th>Select all as present</th></tr>';
        tableToAdd += '<tr id="w' + weekNo + 'mon"><td>Monday</td><td><input type="currency" placeholder="0.00" size="5" min="0.00" max="10000.00" maxlength="6"step="0.01" name="w' + weekNo + 'cost" id="w' + weekNo + 'cost1"></td><td><p id="w' + weekNo + 'people1" class="w' + weekNo + 'people">0</p></td><td><input type="checkbox" id="w' + weekNo + 'all1" onclick="selectAll('+weekNo+' , 1)">Select All</input></td></tr>';
        tableToAdd += '<tr id="w' + weekNo + 'tues"><td>Tuesday</td><td><input type="currency" placeholder="0.00" size="5" min="0.00" max="10000.00" maxlength="6"step="0.01" name="w' + weekNo + 'cost" id="w' + weekNo + 'cost2"></td><td><p id="w' + weekNo + 'people2" class="w' + weekNo + 'people">0</p></td><td><input type="checkbox" id="w' + weekNo + 'all2" onclick="selectAll('+weekNo+' , 2)">Select All</input></td></tr>';
        tableToAdd += '<tr id="w' + weekNo + 'wed"><td>Wednesday</td><td><input type="currency" placeholder="0.00" size="5" min="0.00" max="10000.00" maxlength="6"step="0.01" name="w' + weekNo + 'cost" id="w' + weekNo + 'cost3"></td><td><p id="w' + weekNo + 'people3" class="w' + weekNo + 'people">0</p></td><td><input type="checkbox" id="w' + weekNo + 'all3" onclick="selectAll('+weekNo+' , 3)">Select All</input></td></tr>';
        tableToAdd += '<tr id="w' + weekNo + 'thurs"><td>Thursday</td><td><input type="currency" placeholder="0.00" size="5" min="0.00" max="10000.00" maxlength="6"step="0.01" name="w' + weekNo + 'cost" id="w' + weekNo + 'cost4"></td><td><p id="w' + weekNo + 'people4" class="w' + weekNo + 'people">0</p></td><td><input type="checkbox" id="w' + weekNo + 'all4" onclick="selectAll('+weekNo+' , 4)">Select All</input></td></tr>';
        tableToAdd += '</table>';

        tableToAdd += ' <br></br>';
    }


    document.getElementById('tblCosts').innerHTML += tableToAdd;


    document.getElementById('tblCosts').innerHTML += '<input type="button" class="btn" value="Submit" onclick="costMeals();" />';
}

function selectAll(week, day){
    var peoplePres = document.getElementsByClassName('w'+week+'present'+day);
   
    if(peoplePres.length !=0){
        for(i=0;i<peoplePres.length;i++){
            peoplePres[i].checked = true;
        }
    }

    updatePeople(day, week);
}

function foodCosts() {
    //per week
    for (y = 0; y < numWeeks; y++) {
        //per day
        for (x = 0; x < 4; x++) {
            var day = "w" + (y + 1) + "cost" + (x + 1);
            var dayCost = (parseFloat(document.getElementById(day).value));
            var costs = "w" + (y + 1) + "people" + (x + 1);
            var peoplePresent = (parseFloat(document.getElementById(costs).innerHTML));

            mealCosts.push(dayCost / peoplePresent);
        }
    }


}

function checkValues(week) {

    for (y = 0; y < 4; y++) {
        var sub = "w" + week + "cost" + (y + 1);
        if (isNaN(document.getElementById(sub).value)) {
            return false;

        }
    }
    return true;
}

function isOneChecked(week) {
    var chefsSelected = false;
    for (y = 0; y < 4; y++) {
        chefsSelected = false;
        var chx = document.getElementsByName(('w' + week + 'chef' + (y + 1)));
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
    var allCostNums = true;
    for (i = 0; i < numWeeks; i++) {
        if (checkValues((i + 1)) == false) {
            allCostNums = false;
            break;
        }
    }

    var chefsCook = true;
    for (i = 0; i < numWeeks; i++) {
        if (isOneChecked((i + 1)) == false) {
            chefsCook = false;
            break;
        }
    }

    if (allCostNums && chefsCook) {
        usersCosts = [];
        mealCosts = [];
        usersMeals = [];
        foodCosts();
        calcPerPerson();
        generateTableOutput();
    } else if(!allCostNums){
        alert("Please check that all costs are numbers");
    } else if(!chefsCook){
        alert("Please check to ensure a chef is selected for each day");
    } else{
        alert("Hm. There seems to be another issues, refresh the page and start again");
    }
}

function calcPerPerson() {

    for (y = 0; y < numPeople; y++) {
        var userSpent = 0;
        var userMealCosts = 0;

        //per week
        var z = 1;
        var totalnum = parseInt(numWeeks);
        var a = totalnum + 1;
        var counter = 1;
        while (z < a) {
            //per day
            for (x = 0; x < 4; x++) {
                var userChef = false;
                var userPresent = false;
                if (document.getElementById(('w' + z + 'chef' + (x + 1) + namePeoples[y])).checked) {
                    userChef = true;
                }
                if (userChef == true) {
                    userSpent += parseFloat(document.getElementById(('w' + z + 'cost' + (x + 1))).value);
                }
                if (document.getElementById(('w' + z + 'present' + (x + 1) + namePeoples[y])).checked) {
                    userPresent = true;
                }
                //correct meal costs for that week
                if (userPresent == true) {
                    userMealCosts += mealCosts[(((z - 1) * 4) + x)];
                }
                counter++;
            }
            z++;
        }

        usersCosts.push(userSpent);
        usersMeals.push(userMealCosts);
    }
}

function createCol(name, num) {
    var y = 0;
    while (y < numWeeks) {
        //gets name of row w1titles - Week 1 Titles of table
        var rowName = "w" + (y + 1) + "titles";
        var row = document.getElementById(rowName);
        //inserts new column at end of table (adds empty column)
        var x = row.insertCell(3);

        //adds name of person
        x.innerHTML = '<b style="color:black;">' + name + '</b>';

        //gets row titles - to use
        var days = [("w" + (y + 1) + "mon"), ("w" + (y + 1) + "tues"), ("w" + (y + 1) + "wed"), ("w" + (y + 1) + "thurs")];

        for (i = 0; i < 4; i++) {
            //gets row ID
            row = document.getElementById(days[i]);
            //inserts cell in that row
            var x = row.insertCell(3);
            //inserts chef and or present into cell as options
            x.innerHTML += '<br><input type="radio" name="w' + (y + 1) + 'chef' + (i + 1) + '" value="w' + (y + 1) + 'chef' + (i + 1) + '" onclick="selectPres(' + num + ',' + (i + 1) + ', ' + (y + 1) + ');" id="w' + (y + 1) + 'chef' + (i + 1) + name + '"/>Chef?';
            x.innerHTML += '<br><input type="checkbox" name="w' + (y + 1) + 'present' + (i + 1) + '" value="w' + (y + 1) + 'present' + (i + 1) + '" onclick="updatePeople(' + (i + 1) + ', ' + (y + 1) + ');" id="w' + (y + 1) + 'present' + (i + 1) + name + '" class="w' + (y + 1) + 'present' + (i + 1)+'"/>Present?';
        }
        y++;
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
        cell1.innerHTML = '£' + ((usersCosts[y]).toFixed(2));

        cell1 = row.insertCell(2);
        cell1.innerHTML = '£' + ((usersMeals[y]).toFixed(2));

        cell1 = row.insertCell(3);
        var cell2 = row.insertCell(4);
        cell1.innerHTML = "";
        cell2.innerHTML = "";

        var usersMoney = usersCosts[y] - usersMeals[y];

        if (usersMoney < 0) {
            cell1.innerHTML = '£' + ((Math.abs(usersMoney)).toFixed(2));
            cell2.innerHTML = '<span class="owes"> OWES</span>';
        } else if (usersMoney > 0) {
            cell1.innerHTML = '£' + ((Math.abs(usersMoney)).toFixed(2));
            cell2.innerHTML = '<span class="owed"> OWED</span>';
        } else if (usersMoney == 0) {
            cell1.innerHTML = '£' + 0;
        }
    }
}

function selectPres(num, day, week) {
    var identify = "w" + week + "present" + day + namePeoples[num];
    document.getElementById(identify).checked = true;
    updatePeople(day, week);
}

function updatePeople(presDay, week) {
    var identify = 'w' + week + 'present' + presDay;
    var identify2 = 'w' + week + 'people' + presDay; 

    var chx = document.getElementsByName(identify);

    var numTicked = 0;
    for (var i = 0; i < chx.length; i++) {
        if (chx[i].type == 'checkbox' && chx[i].checked) {
            numTicked++;
        }
    }
    document.getElementById(identify2).innerHTML = numTicked;
}
