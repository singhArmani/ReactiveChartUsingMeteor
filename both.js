Collection = new Mongo.Collection('chart');
barCollection = new Mongo.Collection('barChart');

Meteor.methods({
	'updateColorValue':(colorValueObj) =>{
		Collection.find().fetch().forEach((element)=>{
			console.log(element.colorValue,colorValueObj);
			switch(element.colorName){
				case "Red": 
							Collection.update({_id:element._id},{$set:{"colorValue":colorValueObj.red}});
							break;
				case "Yellow": 
							Collection.update({_id:element._id},{$set:{"colorValue":colorValueObj.yellow}});
							break;
				case "Green": 
							Collection.update({_id:element._id},{$set:{"colorValue":colorValueObj.green}});
							break;
			}
			
		}); }
		
});


