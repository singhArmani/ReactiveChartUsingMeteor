Router.route('/',{
	name:'home',
 template:'home'
});

Router.configure({
	layoutTemplate:'main'
});

//Pie Chart
Router.route('/charts',{
  waitOn:() => Meteor.subscribe('Collection'),
  name:'pieChart',
  template:'charts'
});

//Bar Chart
Router.route('/BarChart',{
    name:'barChart',
    template:'barChart'
});