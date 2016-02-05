Meteor.startup(function () {

	applyUpdates();
	
	if (Meteor.settings.testdata) {
		createGroupsIfNone();          // Groups     from server/data/testing.groups.js
		createTestRegionsIfNone();     // Regions    from server/data/testing.regions.js
		createCoursesIfNone(Meteor.settings.testdata);
		createLocationsIfNone();       // Locations  from server/data/testing.locations.js
		createEventsIfNone();          // Events     in   server/testing.createnload.data.js (generic)
		loadTestEvents();              // Events     from server/data/testing.events.js
		createCommentsIfNone();        // Comments   in   server/testing.createnload.data.js (generic)
	}

	var serviceConf = Meteor.settings.service;
	if (serviceConf) {
		if (serviceConf.google
			) {
			ServiceConfiguration.configurations.remove({
				service: 'google'
			});
			ServiceConfiguration.configurations.insert({
				service: 'google',
				loginStyle: "popup",
				clientId: serviceConf.google.clientId,
				secret: serviceConf.google.secret
			});
		}
		if (serviceConf.facebook) {
			ServiceConfiguration.configurations.remove({
				service: 'facebook'
			});
			ServiceConfiguration.configurations.insert({
				service: 'facebook',
				loginStyle: "popup",
				appId: serviceConf.facebook.appId,
				secret: serviceConf.facebook.secret
			});
		}
		if (serviceConf.github) {
			ServiceConfiguration.configurations.remove({
				service: "github"
			});
			ServiceConfiguration.configurations.insert({
				service: "github",
				loginStyle: "popup",
				clientId: serviceConf.github.clientId,
				secret: serviceConf.github.secret
			});
		}
	}
	
	if (Meteor.settings.admins) {
		for (name in Meteor.settings.admins) {
			var user = Meteor.users.findOne({ username: Meteor.settings.admins[name]});
			if (user) {
				Meteor.users.update({_id: user._id}, { $addToSet: { privileges: 'admin' }});
			}
		}
	}

	// Keep the nextEvent entry updated
	// On startup do a full scan to catch stragglers
	Meteor.call('updateNextEvent', {}, logAsyncErrors);
	Meteor.setInterval(
		function() {
			// Update nextEvent for courses where it expired
			Meteor.call('updateNextEvent', { 'nextEvent.start': { $lt: new Date() }});
		},
		60*1000 // Check every minute
	);
});
