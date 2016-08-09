import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
myPieChart = null;
Template.charts.onRendered(()=>{
	// var ctx = document.getElementById("myChart").getContext("2d");
 //    var ctx2 = document.getElementById("myChart2").getContext("2d");
    drawChart();
    var aman = myPieChart.segments
	console.log(aman);
    Collection.find().observeChanges({
    	changed(id,fields){

    			console.log(fields);
    			aman[0].value= ((getColorValue().red)!=="")? Math.abs(parseInt(getColorValue().red)) : 0;
    		
    			aman[1].value= ((getColorValue().green)!=="")? Math.abs(parseInt(getColorValue().green)) : 0;
    			
    			aman[2].value= ((getColorValue().yellow)!=="")? Math.abs(parseInt(getColorValue().yellow)) : 0;
    			myPieChart.update();
    			
    	}
    });

    
    
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


function getColorValue(fromdate,todate)
{
 
 var filter={update_time:{
 	$gt:fromdate,
 	$lt:todate
 }}  
 
   var valueRed = Collection.find({"colorName":"Red"}).fetch();

   var valueYel = Collection.find({"colorName":"Yellow"}).fetch();
   var valueGreeen = Collection.find({"colorName":"Green"}).fetch();
   return  Object.assign({},{red:valueRed[0].colorValue,yellow:valueYel[0].colorValue, green:valueGreeen[0].colorValue});
}

function random() {
    return Math.floor((Math.random() * 100) + 1);
}

function drawChart(){
	var ctx3 = document.getElementById("myChart3").getContext("2d");
//set the options
// var options = {

//         ///Boolean - Whether grid lines are shown across the chart
//         scaleShowGridLines: true,

//         //String - Colour of the grid lines
//         scaleGridLineColor: "rgba(0,0,0,.05)",

//         //Number - Width of the grid lines
//         scaleGridLineWidth: 1,

//         //Boolean - Whether to show horizontal lines (except X axis)
//         scaleShowHorizontalLines: true,

//         //Boolean - Whether to show vertical lines (except Y axis)
//         scaleShowVerticalLines: true,

//         //Boolean - Whether the line is curved between points
//         bezierCurve: true,

//         //Number - Tension of the bezier curve between points
//         bezierCurveTension: 0.4,

//         //Boolean - Whether to show a dot for each point
//         pointDot: true,

//         //Number - Radius of each point dot in pixels
//         pointDotRadius: 4,

//         //Number - Pixel width of point dot stroke
//         pointDotStrokeWidth: 1,

//         //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
//         pointHitDetectionRadius: 20,

//         //Boolean - Whether to show a stroke for datasets
//         datasetStroke: true,

//         //Number - Pixel width of dataset stroke
//         datasetStrokeWidth: 2,

//         //Boolean - Whether to fill the dataset with a colour
//         datasetFill: true,

//         //String - A legend template
//         legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

//     };

//      var options2 = {
//         //Boolean - Whether to show lines for each scale point
//         scaleShowLine: true,

//         //Boolean - Whether we show the angle lines out of the radar
//         angleShowLineOut: true,

//         //Boolean - Whether to show labels on the scale
//         scaleShowLabels: false,

//         // Boolean - Whether the scale should begin at zero
//         scaleBeginAtZero: true,

//         //String - Colour of the angle line
//         angleLineColor: "rgba(0,0,0,.1)",

//         //Number - Pixel width of the angle line
//         angleLineWidth: 1,

//         //String - Point label font declaration
//         pointLabelFontFamily: "'Arial'",

//         //String - Point label font weight
//         pointLabelFontStyle: "normal",

//         //Number - Point label font size in pixels
//         pointLabelFontSize: 10,

//         //String - Point label font colour
//         pointLabelFontColor: "#666",

//         //Boolean - Whether to show a dot for each point
//         pointDot: true,

//         //Number - Radius of each point dot in pixels
//         pointDotRadius: 3,

//         //Number - Pixel width of point dot stroke
//         pointDotStrokeWidth: 1,

//         //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
//         pointHitDetectionRadius: 20,

//         //Boolean - Whether to show a stroke for datasets
//         datasetStroke: true,

//         //Number - Pixel width of dataset stroke
//         datasetStrokeWidth: 2,

//         //Boolean - Whether to fill the dataset with a colour
//         datasetFill: true,

//         //String - A legend template
//         legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

//     }

//     //set the data
//       var data = {
//         labels: ["January", "February", "March", "April", "May", "June", "July"],
//         datasets: [{
//             label: "My First dataset",
//             fillColor: "rgba(220,220,220,0.2)",
//             strokeColor: "rgba(220,220,220,1)",
//             pointColor: "rgba(220,220,220,1)",
//             pointStrokeColor: "#fff",
//             pointHighlightFill: "#fff",
//             pointHighlightStroke: "rgba(220,220,220,1)",
//             data: [random(), random(), random(), random(), random(), random(), random()]
//         }, {
//             label: "My Second dataset",
//             fillColor: "rgba(151,187,205,0.2)",
//             strokeColor: "rgba(151,187,205,1)",
//             pointColor: "rgba(151,187,205,1)",
//             pointStrokeColor: "#fff",
//             pointHighlightFill: "#fff",
//             pointHighlightStroke: "rgba(151,187,205,1)",
//             data: [random(), random(), random(), random(), random(), random(), random()]
//         }]
//     };

//   var data2 = {
//         labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
//         datasets: [{
//             label: "My First dataset",
//             fillColor: "rgba(220,220,220,0.2)",
//             strokeColor: "rgba(220,220,220,1)",
//             pointColor: "rgba(220,220,220,1)",
//             pointStrokeColor: "#fff",
//             pointHighlightFill: "#fff",
//             pointHighlightStroke: "rgba(220,220,220,1)",
//             data: [random(), random(), random(), random(), random(), random(), random()]
//         }, {
//             label: "My Second dataset",
//             fillColor: "rgba(151,187,205,0.2)",
//             strokeColor: "rgba(151,187,205,1)",
//             pointColor: "rgba(151,187,205,1)",
//             pointStrokeColor: "#fff",
//             pointHighlightFill: "#fff",
//             pointHighlightStroke: "rgba(151,187,205,1)",
//             data: [random(), random(), random(), random(), random(), random(), random()]
//         }]
//     };


     var data3 = [
    {
        value: parseInt(getColorValue().red),
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
    },
    {
        value: parseInt(getColorValue().green),
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: parseInt(getColorValue().yellow),
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
    }
    ]
//draw the chart
// var myLineChart = new Chart(ctx).Line(data,options);
// var myRadarChart = new Chart(ctx2).Radar(data2,options2);

//For pie chart
myPieChart = new Chart(ctx3).Pie(data3,{
	animateScale:true
});

}