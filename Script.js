// JavaScript source code

const BaseMaxNSubs = 59;
const btnfontSize = 30;

var maxNSub = 0,
    maxNTerms = 13,
    minNTerms = 5,
    NTerms = 0,
    maxTermSubs = 9;

var ddd = document.getElementById('Base').getElementsByTagName("button");
var sss = document.getElementById('Base').getElementsByTagName("div");
var infoCanvas = document.getElementById('info');
var infoButtons = document.getElementById('info').getElementsByTagName('button');

var Heights = 100,
    Widths = 200,
    Lefts = 50,
    Tops = 130;

var Hoffset = 10,
    Voffset = 10;

var TermHeights = 1000,
       TermWidths = Widths + Hoffset * 2,
       baseTermLefts = Lefts - Hoffset,
       TermTops = Tops,
       iTerm = 0,
       iLvl = 0;

var infoHeight = 635,
    infoWidth = 800;


var TermShiftLeft = 250,
    SubShiftTop = 120;

var openedSubject; //01 ,02 ,..
var infoDesc ;
var infoHours ;
var infoSubject; //"PHY01";
var infoLecturers ;
var infoTopics;
var infoType; //"core";

var allTerms = new Array(NTerms);
var allSUBs = [];

var DescHeight = 200;
var maxOPacity = 80; //%100
var state = 1; //1>add , -1>delete 

var SUB1 = {
    name: "MATH01",
    root: [null],
    sem: 1,

    type:"core",
    description: "Mathmatics 1",
    hours: 3,
    drs: ["Eslam", "Ahmed"],
    topics: ["PHontics", "OPP", "YES ITS REAL", "NOSOS"],

    Books:"https://www.google.com/ "
   
};

var SUB2 = {
    name: "MATH02",
    root: [01],
    sem: 2,

    type: "core",
    description: "Mathmatics 2",
    hours: 3,
    drs: ["Eslam", "Ahmed"],
    topics: ["PHontics", "OPP"],

    Books: "https://www.google.com/ "

    
};

var SUB3 = {
    name: "MECH01",
    root: [null],
    sem: 1,

    type: "core",
    description: "Mechanics 1",
    hours: 2,
    drs: ["Eslam", "Ahmed"],
    topics: ["PHontics", "OPP"],

    Books: ""
    
};

var SUB4 = {
    name: "MECH02",
    root: [03, 01],
    sem: 3,
    type: "elective",
    description: "Mechanic 3",
    hours: 3,
    drs: ["Eslam", "Ahmed"],
    topics: ["PHontics", "OPP"]

};

var SUB5 = {
    name: "MECH04",
    root: [03, 01],
    sem: 2,
    type: "elective",
    description: "Mechanics 4",
    hours: 4,
    drs: ["Eslam", "Ahmed"],
    topics: ["PHontics", "OPP"]

};
var SUB6 = {
    name: "PHY01",
    root: [03, 01],
    sem: 4,
    type: "core",
    description: "Physics 1",
    hours: 3,
    drs: ["Eslam", "Ahmed"],
    topics: ["PHontics", "OPP"]
};
var SUB7 = {
    name: "PHY02",
    root: [05, 04],
    sem: 4,
    type: "core",
    description: "Physics 2",
    hours: 3,
    drs: ["Eslam","Ahmed"],
    topics: ["PHontics", "OPP"]
};

var SUB8 = {
    name: "PHY03",
    root: [01, 04],
    sem: 7,
    type: "elective",
    description: "Physics 3",
    hours: 3,
    drs: ["Eslam","Ahmed","Mohamed"],
    topics: ["PHontics","OPP"]
};


window.onload= function () 
{
    termDraw(); //have the default N semister 
    coreDraw();    //have the base N subjects element 
    showNames(); //show names of Subjects 
    termSUB(0);  //put subjects in init terms 
    infoDesign();  //design information zone 
    EVENTS(); 


}

function EVENTS()
{

    for (var i = 1; i <= ddd.length ; i++) {

        ddd[i - 1].onmouseover = showRoot; //show the roots of the course 

        ddd[i - 1].ondragend = DragX; //edit course position 

        ddd[i - 1].onclick = showInfo; //show information of course 

        ddd[i - 1].oncontextmenu = editGPA;
    }

    document.getElementById('Back').onmousedown = outFocus;    //Out focus information zone 

    for (var d = 0 ; d < infoButtons.length; d++) infoButtons[d].onclick = goDetails;

    document.getElementById('Base').ondblclick =  newTerm;

    for (var t = 0 ; t < sss.length ; t++) sss[t].ondblclick =  newTerm; 
        
}

function editGPA()
{
    alert("GPA ZONE " + eval(this.id.replace("Sub", "SUB")).description);
    return false; 
}

function outFocus()
{
        infoCanvas.style.visibility = 'hidden';
        infoCanvas.style.opacity = 0;
        document.getElementById('Back').style.visibility = 'hidden';
        document.getElementById('Back').style.opacity = 0;
}

function newTerm ()
{
  
    if (this.id == "Base") { state = 1; } else state = -1;

    var rect = document.getElementById('BODY').getBoundingClientRect(); //to decleare where the canvas to take pos from
    var root = document.documentElement; //the base page 
    var mouseX = event.clientX - rect.left - root.scrollLeft;
    var mouseY = event.clientY - rect.top - root.scrollTop;

    var iSide = 1;
    var sidediv = 0;
    var d = 1;
    var CONFIRMATION;
   
    //console.log(mouseX);

    for (var i = 1 ; i <= NTerms; i++) {

        if (state == -1) {
            d = 0; iSide = 0; sidediv = TermWidths;
            
        }
        else if (state == 1) {
            d = 1;
            if (i < NTerms) iSide = 1;
            else { iSide = 0; sidediv = TermWidths + Hoffset * 2; }
        }
       

        if (parseInt(mouseX) >= parseInt(document.getElementById("Sem" + i).style.left) + (d) * TermWidths && parseInt(mouseX) <= parseInt(document.getElementById("Sem" + (i + iSide)).style.left) + sidediv)
        {
            if (state == -1) {
                CONFIRMATION = "You want to delete  " + i + " Semister !?";
                Stat("Deleting  Semister " + i);
            }
            else if (state == 1) {
                CONFIRMATION = "You want to add new  " + (i + 1) + " Semister !?";
                Stat("Adding Semister " + (i + 1));
            }

            if (confirm(CONFIRMATION))
            {
                NTerms = NTerms  + state;
                if (NTerms < minNTerms) { NTerms = minNTerms; alert("minNumber of Terms :" + minNTerms); return false; }
                if (NTerms > maxNTerms) { NTerms = minNTerms; alert("maxNumber of Terms :" + maxNTerms); return false; }

                // console.log("TERM" + i);
                //confusion
                if (state == -1) {
                    for (var SubofThis = 0 ; SubofThis < allTerms[i - 1].length; SubofThis++) {
                        //console.log("THIS  "+allTerms[i - 1][SubofThis].name);
                        for (var SubofThat = 0 ; SubofThat < allTerms[i].length; SubofThat++) {
                            //.log("THAT  " + allTerms[i][SubofThat].root);
                            for (var rootofSubThat = 0 ; rootofSubThat < allTerms[i][SubofThat].root.length ; rootofSubThat++) {
                                //console.log("root THAT  " + eval("SUB" + allTerms[i][SubofThat].root[rootofSubThat]).name);
                                if (eval("SUB" + allTerms[i][SubofThat].root[rootofSubThat]).name == allTerms[i - 1][SubofThis].name) {
                                    alert(allTerms[i][SubofThat].name + " is depend with " + allTerms[i - 1][SubofThis].name + "\n (-> move any of them to solve confusion <-)");

                                    return 0;
                                }
                            }
                        }
                    }
                }
                document.getElementById('Base').innerHTML = "";
                termDraw(NTerms); 
                coreDraw();
                termSUB(i);
                showNames();
                EVENTS();

               
            }
            return false; //for if confirmed or not 
        }
       
    }
}

function goDetails() 
{
    //details buttons 
        var s = this.id.valueOf() ; 
        console.log(eval("SUB" + openedSubject)[s]);
        var go = eval("SUB" + openedSubject)[s];
    if(go != "")
        open(go, '_blank');
    else 
        alert("there's nothing here yet !! \n Contact US FOR HELP")
}

function showInfo() {
    //dark background 
    document.getElementById('Back').style.visibility = 'visible';
    document.getElementById('Back').style.height = document.getElementById('Base').style.height;
    document.getElementById('Back').style.width = document.getElementById('Base').style.width;
    document.getElementById('Back').style.left = 0 + "px";
    document.getElementById('Back').style.top = 60 + "px";
    document.getElementById('Back').style.backgroundColor = "black";
    


    var o=0; 
    infoCanvas.style.visibility = 'visible'
       er =  setInterval(
        function () {
            'use strict';
            //console.log(o / 100);
            infoCanvas.style.opacity = o / 100;
            document.getElementById('Back').style.opacity = o/160;
            o++;
            if (o == maxOPacity) clearInterval(er);
        }, 1);
      

        
   // }
    openedSubject = eval(this.id.replace("Sub", "")); //get num 
    infoDesc = eval(this.id.replace("Sub", "SUB")).description;
    infoHours = eval(this.id.replace("Sub", "SUB")).hours;
    infoSubject = eval(this.id.replace("Sub", "SUB")).name;
    infoLecturers = eval(this.id.replace("Sub", "SUB")).drs;
    infoTopics = eval(this.id.replace("Sub", "SUB")).topics;
    infoType = eval(this.id.replace("Sub", "SUB")).type;

    if (parseInt(this.style.left) > parseInt(document.getElementById('Base').style.width) *0.6)
        infoCanvas.style.left = parseInt(this.style.left) - parseInt(infoCanvas.style.width) *0.4 + Widths / 3 + "px";
    else
        infoCanvas.style.left = parseInt(this.style.left) + Widths / 3 + "px";

    //top
    if (parseInt(this.style.top) > parseInt(document.getElementById('Base').style.height) * 0.4)
        //infoCanvas.style.top = parseInt(this.style.top) - parseInt(infoCanvas.style.height) - parseInt(document.getElementById('Base').style.height) + parseInt(this.style.top) + Heights / 3 + "px";
        infoCanvas.style.top = parseInt(this.style.top) - parseInt(infoCanvas.style.height) * 0.6 + Heights / 3 + "px";
    else
        infoCanvas.style.top = parseInt(this.style.top) + Heights / 3 + "px";

    document.getElementById('infoDesc').innerHTML = infoDesc;
    document.getElementById('infoSub').innerHTML = infoSubject;
    document.getElementById('infoHour').innerHTML = infoHours;
    document.getElementById('infoType').innerHTML = infoType;

    document.getElementById('infoDrss').innerHTML = "";
    for (var d = 0 ; d < infoLecturers.length ;d++)
         document.getElementById('infoDrss').innerHTML += "<option>" + infoLecturers[d] ;

    document.getElementById('infoTopics').innerHTML = "";
    for (var d = 0 ; d < infoTopics.length ; d++)
        document.getElementById('infoTopics').innerHTML += "<option>" + infoTopics[d];

    //location.href = "#info";
    
}

function infoDesign() {

    //maybe vars is unused 
    //Description draw 
    infoCanvas.style.opacity = 0;
    infoCanvas.innerHTML = "Information ZONE" + "</br>";
    infoCanvas.style.height = infoHeight + "px";
    infoCanvas.style.width = infoWidth + "px";
    infoCanvas.style.backgroundColor = "black";
    infoCanvas.style.border = 'dashed';
    infoCanvas.style.borderColor = "white";
    infoCanvas.style.position = "absolute";
    infoCanvas.style.textAlign = "center";
    infoCanvas.style.color = "white";
    infoCanvas.style.fontSize = 27 + "px";

    infoCanvas.innerHTML += "<button id='Books'  style='opacity:1;height:" + 50 + "px; width:" + 80 + "px; background-color:green; position:relative ; left: " + 0 + "px; top: " + 0 + " px; text-align-last:center;color:white;font-size:20px;'>" + "Books" + "</button>";
    infoCanvas.innerHTML += "<button id='Videos'  style='opacity:1;height:" + 50 + "px; width:" + 80 + "px; background-color:green; position:relative; left: " + 0 + "px; top: " + 0 + " px; text-align-last:center;color:white;font-size:20px;'>" + "Videos" + "</button>";
    infoCanvas.innerHTML += "<button id='Notes' style='opacity:1;height:" + 50 + "px; width:" + 80 + "px; background-color:green; position:relative; left: " + 0 + "px; top: " + 0 + " px; text-align-last:center;color:white;font-size:20px;'>" + "Notes" + "</button>";
    infoCanvas.innerHTML += "<button id='Exams' style='opacity:1;height:" + 50 + "px; width:" + 80 + "px; background-color:green; position:relative; left: " + 0 + "px; top: " + 10 + " px; text-align-last:center;color:white;font-size:20px;'>" + "Exams" + "</button>";
    infoCanvas.innerHTML += "<button id='Lectures' style='opacity:1;height:" + 50 + "px; width:" + 90 + "px; background-color:green; position:relative; left: " + 0 + "px; top: " + 10 + " px; text-align-last:center;color:white;font-size:20px;'>" + "Lectures" + "</button> </br> </br>";

    
        //Descriotion
        infoCanvas.innerHTML += "<div id='infoSub' style='opacity:1;height:" + 50  + "px;" +160 + "px;width:" + infoWidth * (0.75) + "px; background-color:white; position:absolute; left:10px; top:90px;text-align:left;color:black;font-size:45px;'>" + infoSubject + " : </br>" + "</div>" ; 
        infoCanvas.innerHTML += "<div id='infoDesc' style='opacity:1;height:" +160 + "px;width:" + infoWidth * (0.75) + "px; background-color:white; position:absolute; left:10px;top:145px;text-align:left;color:red;font-size:40px;'>" + infoDesc + "</div> ";

        //HoursinfoType
        infoCanvas.innerHTML += "<div id='infoType' style='color:red;opacity:1;height:" + 50 + "px; width:" + infoWidth * (0.2) + "px; background-color:white; position:absolute ; left:" + (parseInt(document.getElementById('infoSub').style.width) + 15) + "px;top:90px;font-size:50px;'>" + infoType + "</div>"; // style='top:25px; color:red;font-size:80px;'>" + + "H </br> </div>"; // + "<div style='position:relative;top:5px; color:red;font-size:30px;'>" + "hours" + "</div>" + "</canvas>";
        infoCanvas.innerHTML += "<div id='infoHour' style='color:red;opacity:1;height:" + 160 + "px; width:" + infoWidth * (0.2) + "px; background-color:white; position:absolute ; left:" + (parseInt(document.getElementById('infoSub').style.width) + 15) + "px;top:145px;font-size:150px;'>" + infoHours + "</div>"; // style='top:25px; color:red;font-size:80px;'>" + + "H </br> </div>"; // + "<div style='position:relative;top:5px; color:red;font-size:30px;'>" + "hours" + "</div>" + "</canvas>";

        //Letureers
        infoCanvas.innerHTML += "<div id='infoDr' style='opacity:1; width:" + infoWidth * (0.2) +"px;background-color:red; position:absolute; left:350px;top:" + 310 + "px;text-align:left;color:white;font-size:40px;'> Lecturers : </div>";
        infoCanvas.innerHTML += "<select id='infoDrss' style='width:" + infoWidth * (0.7) + "px;position:absolute;left:10px;top:353px;font-size:30px;' size='3'> </select>";
        
        //Topics
        infoCanvas.innerHTML += "<div id='infoTopic' style='opacity:1; width:" + infoWidth * (0.2) + "px; background-color:red; position:absolute; left:350px;top:" + 470 + "px;text-align:left;color:white;font-size:40px;'> Topics : </div>";
        infoCanvas.innerHTML += "<select id='infoTopics' style='width:" + infoWidth * (0.7) + "px;position:absolute;left:10px;top:515px;font-size:30px;' size='3'> </select>";

}

function PushItems(subjectid, term)
{
    var btnid; 
    if (term >= 0 && term <= NTerms) {
        try 
        {
            

            btnid = subjectid ; //came with "Sub"
            document.getElementById(btnid).style.left = parseInt(document.getElementById("Sem" + term).style.left) + Hoffset + "px";
            document.getElementById(btnid).style.top = allTerms[term - 1].length * SubShiftTop + "px";


        }
        catch (err) { alert("Undefiend Subject Pose ! " + eval(subjectid.replace("Sub","SUB")).name ); }
            
    }
}

function Stat(x) 
{
    document.getElementById('BOTTOM').innerHTML = "Status :" + x + "."; 
}

function DragX()
{
    var xName = eval(this.id.replace("Sub", "SUB")).name;
    Stat(xName + " is Dragging ");

    var rect = document.getElementById('BODY').getBoundingClientRect(); //to decleare where the canvas to take pos from
    var root = document.documentElement; //the base page 
    var mouseX = event.clientX - rect.left - root.scrollLeft;
    var mouseY = event.clientY - rect.top - root.scrollTop;
   
    for (var i = 1 ; i <= NTerms; i++) {
        if (mouseX >= parseInt(document.getElementById("Sem" + i).style.left) && mouseX <= parseInt(document.getElementById("Sem" + i).style.left) + TermWidths)
        {
            
            if (!(allTerms[i - 1].indexOf(eval(this.id.replace("Sub", "SUB"))) != -1))
            {//term has not this subject 
                if (allTerms[i - 1].length < maxTermSubs)
                {//term has n number of subject 
                    //restrict push forward :: subject won't over the subjects which he is a root for 
                    //test for what if this subject is root for aone ,,, then prevent to over its positon 
                    //restrict forward
                    for (var s = 1 ; s <= maxNSub; s++) {
                        var xRoots = eval("SUB" + s).root;
                        for (var o = 0 ; o < xRoots.length ; o++) {
                            if (xRoots[o] == this.id.replace("Sub", "")) {
                                if (parseInt(mouseX) >= parseInt(document.getElementById("Sub" + s).style.left) - Hoffset  ) {
                                    alert("You may take " + eval(this.id.replace("Sub", "SUB")).name + " before " + eval("SUB" + s).name);
                                    return 0;
                                }
                         
                            }

                        }
                    }
                    //restrict pull back :: the roots of subject won't over the subjec
                    //restrict backward
                    var fRoots = eval(this.id.replace("Sub", "SUB")).root;
                    //console.log(fRoots);
                    if (fRoots[0] != null) {
                        for (var s = 0 ; s < fRoots.length; s++) {
                            if (parseInt(mouseX) <= parseInt(document.getElementById("Sub" + fRoots[s]).style.left) + parseInt(document.getElementById("Sub" + fRoots[s]).style.width) + Hoffset) {
                                alert("You may take " + eval(this.id.replace("Sub", "SUB")).name + " after " + eval("SUB" + fRoots[s]).name);
                                return 0;
                            }
                        }
                    }
                    eval(this.id.replace("Sub", "SUB")).sem = i;
                    allTerms[i - 1].push(eval(this.id.replace("Sub", "SUB")));

                    PushItems(this.id, i); //psuh id and term to GUI

                    termSUB(0); //redefine subs in terms Array
                    Stat(eval(this.id.replace("Sub", "SUB")).name + "Added In Term " + i);
                 }
                else { alert("term " + i + " has " + allTerms[i - 1].length + " courses \n is reached maxTermSubs: " + maxTermSubs); }

              }
            else { alert(eval(this.id.replace("Sub", "SUB")).name + " is already in Term " + i + "\n or maybe twice dataSet"); }
            
        }
    }
    
   

}

function termSUB(xShift) {

    while (allTerms.length > 0) {
        allTerms.pop();
    }

    for (var i = 0 ; i < NTerms ; i++) {
        allTerms[i] = [];
    }

    

   // for (var i = 1 ; i <= maxNTerm ; i++) {
    for (var s = 1 ; s <= maxNSub; s++)
    {
        if (state == 1 && eval("SUB" + s).sem > xShift && xShift != 0)
            eval("SUB" + s).sem = eval("SUB" + s).sem + 1;

        else if (state == -1 && eval("SUB" + s).sem > xShift && xShift > 1)
            eval("SUB" + s).sem = eval("SUB" + s).sem - 1;

            var i  = parseInt(eval("SUB" + s).sem)  //subject init term 
            if (!(allTerms[i - 1].indexOf(eval("SUB" + s)) != -1)) {//if it added to term data set 
                if (allTerms[i - 1].length < maxTermSubs) { //if this term has space  

                    allTerms[i - 1].push(eval("SUB" + s));

                    
                    //push id and sem 
                    PushItems(("Sub" + s), eval("SUB" + s).sem);

                }
                else { alert("Init.: term " + i + " has " + allTerms[i - 1].length + " courses \n is reached maxTermSubs: " + maxTermSubs); }
            }
            
            else { alert("Init.:" + eval("SUB"+s).name + " is already in Term " + i); }

            }
        
   // }
}

function cleanShow()
{
    for (var i = 1; i <= ddd.length ; i++) { ddd[i - 1].style.backgroundColor = "white"; ddd[i - 1].style.color = "black"; }
    document.getElementById('BOTTOM').innerHTML = "Statues :"
}

function showRoot()
{
    //show this subject as red 
    cleanShow();
    this.style.backgroundColor = "red";
    this.style.color = "white";

    //var idString = this.id;
    //idString = idString.replace("Sub",""); //slice(3, 5); 
    //console.log(idString);
    //idString = "SUB" + idString;
    //convert from button Sub to Object SUB

    var xRoot = eval(this.id.replace("Sub","SUB")).root; 
    for (var i = 0 ; i < xRoot.length;i++)
    {//convert form object SUB to bt Sub 
        if (xRoot[i] > 0 && xRoot[i] <= maxNSub) {
            document.getElementById("Sub" + xRoot[i]).style.backgroundColor = "orange";
            document.getElementById("Sub" + xRoot[i]).style.color = "white";
            //roots of root
            var xxRoot = eval("SUB" + xRoot[i]).root;
            for (var j = 0 ; j< xxRoot.length ;j++)
            {
                if (xxRoot[j] > 0 && xxRoot[j] <= maxNSub) {
                    document.getElementById("Sub" + xxRoot[j]).style.backgroundColor = "yellow";
                    document.getElementById("Sub" + xxRoot[j]).style.color = "white";
                }
            }
        }
    }
       
}

function showNames()
{
    for (var i = 1 ; i <= maxNSub; i++) {//edit button HTML  
            document.getElementById("Sub" +i).innerHTML = eval("SUB"+i).name;
    }

}

function coreDraw() 
{

    var s = 0; //current num of sub
    while (allSUBs.length > 0) {
        allSUBs.pop();
    }
    for (var i = 1; i <= BaseMaxNSubs; i++)
    {

        try 
        {
            allSUBs.push(eval("SUB" + i));
            s++; //sum true subjects
        }
        catch(error)
        {
            //console.log("error");
            //num of error subs 
        }

    }
    maxNSub = s;
    //console.log(maxNSub);

    s = 0;
    Lefts = 50;
    for (var i = 1 ; i <= NTerms  ; i++) {
        Tops = 190;
        for (j = 1 ; j <= 6 ; j++) {
            document.getElementById('Base').innerHTML += "<button id='w' draggable=true style='width:" + Widths + "px;height:" + Heights + "px;position:absolute;left:" + Lefts + "px;top:" + Tops + "px;background-color:white;font-size:"+ btnfontSize +"px;'>" + "Sub_" + (j + (i - 1) * 6) + "</button>";

            //Define Ids 
            document.getElementById('Base').getElementsByTagName('button')[j + (i - 1) * 6 - 1].id = "Sub" + (j + (i - 1) * 6);

            //Init. Position 
            document.getElementById('Sub' + (j + (i - 1) * 6)).style.top = Tops + "px";
            document.getElementById('Sub' + (j + (i - 1) * 6)).style.left = Lefts + "px";
            
            Tops += SubShiftTop; //absolute value from the refrence >> the innerHTML 
            s++;
            if (s >= maxNSub) return 0; //limit of gui 
            
        }
        Lefts += TermShiftLeft;
    }



   
}

function termDraw(n)
{
    if (n == null) n = 10;
    else if (n < minNTerms) { n = minNTerms;  }

    NTerms = n;
    iLvl = 0;
    var TermLefts = baseTermLefts; 
    //term draw 
    for (var iTerm = 1 ; iTerm <= NTerms ; iTerm++) {
        document.getElementById('Base').innerHTML += "<div id='Sem1' style='height:" + TermHeights + "px; width:" + TermWidths + "px; background-color:darkcyan; position:absolute; left: " + TermLefts + "px; top: " + TermTops + " px; text-align-last:center;color:white;font-size:27px;'>" + " Level " + iLvl + "00" + " Term " + iTerm + "</div>";

        if (iTerm % 2 == 0) iLvl++;
        document.getElementById('Base').getElementsByTagName('div')[iTerm - 1].id = "Sem" + iTerm;

        document.getElementById('Base').style.height = TermHeights + Voffset + "px";
        document.getElementById('Base').style.width = TermLefts + TermWidths + +Hoffset + "px";
        document.getElementById('BOTTOM').style.width = TermLefts + TermWidths + Hoffset + "px";
        document.getElementById('HEADER').style.width = TermLefts + TermWidths + Hoffset + "px";

        TermLefts += TermShiftLeft;

    }

}
