import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

});

Meteor.publish('Collection',function(){ return Collection.find();
});

Meteor.publish('barCollection',function(){ return barCollection.find();
});