Template.region_sel.helpers({
	regions: function(){
	  return Regions.find();
	},

	region: function(){
		var region = Regions.findOne(Session.get('region'))
		return region
	}
});

Template.region_sel.events({
	'click a.regionselect': function(e){
		var region_id = this._id ? this._id : 'all'
		localStorage.setItem("region", region_id); // to survive page reload
		Session.set('region', region_id)
		//return false
		e.preventDefault();
	}
})
