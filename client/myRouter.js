Router.route('/',{
	name:'home',
 template:'home'
});

Router.configure({
	layoutTemplate:'main'
});

Router.route('/charts',{
  waitOn:() => Meteor.subscribe('Collection'),
  name:'pieChart',
  template:'charts'
});