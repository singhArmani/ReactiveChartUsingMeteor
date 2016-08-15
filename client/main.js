import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import Chart from 'chart.js'

import './main.html';
myPieChart = null; //initializing
myBarChart = null;

//Rendering the pie chart template
Template.charts.onRendered(()=>{

    drawPieChart();
    var myDatasets = myPieChart.data.datasets[0];

    Collection.find().observeChanges({
    	changed(id,fields){

    			console.log(fields);
    			myDatasets.data[0]= ((getColorValue().red)!=="")? Math.abs(parseInt(getColorValue().red)) : 0;

    			myDatasets.data[1]= ((getColorValue().green)!=="")? Math.abs(parseInt(getColorValue().green)) : 0;

    			myDatasets.data[2]= ((getColorValue().yellow)!=="")? Math.abs(parseInt(getColorValue().yellow)) : 0;
    			myPieChart.update();

    	}
    });

});


//Rendering the barChart template
Template.barChart.onRendered(() => {
    console.log("rendering bar ")
    drawBarChart();

});

Template.charts.events({
	'submit #myform': (event)=>{
		event.preventDefault();
		var YellowVal = $("#yellow").val();
		var RedVal  =  $("#red").val();
		var GreenVal = $("#green").val();
		var createdOn = new Date();
		//if all feilds are blanks
		if(YellowVal=="" && RedVal=="" && GreenVal==""){
			Session.set("hasError",true);
			console.log(Session.get("hasError"));
			return;
		}else {
			Session.set("hasError",false);
		}
		console.log(Session.get("hasError"));
		var changedValueObj = Object.assign({},{yellow:YellowVal,red:RedVal,green:GreenVal});
		console.log("new changedValueObject",changedValueObj);

		
		//updating only red color here
		console.log("calling update method here");
		Meteor.call('updateColorValue',changedValueObj);

	}
});



//helpers

Template.charts.helpers({
	isFieldError:() => Session.get('hasError')
});

//getting the color object
function getColorValue()
{
   var valueRed = Collection.find({"colorName":"Red"}).fetch();

   var valueYel = Collection.find({"colorName":"Yellow"}).fetch();
   var valueGreeen = Collection.find({"colorName":"Green"}).fetch();
   return  Object.assign({},{red:valueRed[0].colorValue,yellow:valueYel[0].colorValue, green:valueGreeen[0].colorValue});
}

function getBarValue(){
    // var currentTime = new Date().getTime();
    //
    // var fromDate = new Date(fromDateTime);

    var filter ={'createdOn':{
        //$gte:new Date(new Date().getTime()-day*24*60*60*1000),
        $lte:new Date()
    }};
    var myBarArray = barCollection.find(filter).fetch();
    var myNewArray =[];
    myBarArray.forEach((element)=>{
        myNewArray.push({monthName:element.monthName,monthData:element.monthData,createdOn:element.createdOn});
    })
    return myNewArray;
}

function drawPieChart(){
	var ctx3 = document.getElementById("myChart3").getContext("2d");

    var data = {
        labels: [
            "Red",
            "Green",
            "Yellow"
        ],
        datasets: [
            {
                data: [parseInt(getColorValue().red), parseInt(getColorValue().green), parseInt(getColorValue().yellow)],
                backgroundColor: [
                    "#FF6384",
                    "#A1D490",
                    "#FFCE56"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#A1D490",
                    "#FFCE56"
                ]
            }]
    };

//pie chart
myPieChart = new Chart(ctx3, {
    type:'pie',
    data :data,
    animation:{animateScale:true}
}
);

}

function drawBarChart(){
    var df =getBarValue();
    var barChart = document.getElementById("barChart").getContext("2d");
    console.log(getBarValue());
    //setting up the data
    var data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
                data: [parseInt(df[0].monthData), parseInt(df[1].monthData),
                    parseInt(df[2].monthData), parseInt(df[3].monthData),
                    parseInt(df[4].monthData), parseInt(df[5].monthData),
                    parseInt(df[6].monthData)],
            }
        ]
    };

    myBarChart = new Chart(barChart,{
       type:'bar',
        data:data,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
  // myBarChart = new Chart(barChart).Bar(data);
}

