'use strict';

app.factory('Storage', function($rootScope) {
	return {
		db: new loki(path.resolve(__dirname, 'app.db')),
		collection: null,
		loaded: false,
		init: function () {
			var self = this;
			self.db.loadDatabase({}, function () {
				return new Promise(function (resolve, reject) {
					if (self.db.collections.length) {
						self.collection = self.db.getCollection('songs');
						self.loaded = true;
						return resolve(self);
					} else {
						self.db.addCollection('songs');
						self.db.saveDatabase();
						self.collection = self.db.getCollection('songs');
						self.loaded = true;
						return resolve(self)
					}
				})
				.then(function () {
						$rootScope.$emit('dbLoaded');
					})
				.catch(function (err) {
						console.log(err);
					})
			})
		},
		addSongs: function(songs) {
			var self = this;
			return new Promise(function(resolve, reject) {
				if (self.loaded && self.db.getCollection('songs')) {
					self.collection.insert(songs);
					console.log(self);
					self.db.saveDatabase();
					resolve(self);
				} else {
					reject(new Error('db is not ready'));
				}
			})
		}
	};
});