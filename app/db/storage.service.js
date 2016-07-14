'use strict';

app.factory('Storage', function($rootScope) {
	return {
		db: new loki(path.resolve(__dirname, 'app.db')),
		collection: null,
        credentials: null,
		loaded: false,
		init: function () {
			var self = this;
			self.db.loadDatabase({}, function () {
				return new Promise(function (resolve, reject) {
                    if (self.db.getCollection('songs')) {
                        self.collection = self.db.getCollection('songs');
                        self.loaded = true;
                    } else {
                        self.db.addCollection('songs');
                        self.db.saveDatabase();
                        self.collection = self.db.getCollection('songs');
                        self.loaded = true;
                    }

                    if (self.db.getCollection('creds')) {
                        self.credentials = self.db.getCollection('creds');
                        self.loaded = true;
                    } else {
                        self.db.addCollection('creds');
                        self.db.saveDatabase();
                        self.credentials = self.db.getCollection('creds');
                        self.loaded = true;
                    }
                    if (self.loaded) {
                        return resolve(self);
                    } else {
                        reject(new Error('There was a problem loading the db'));
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
					self.db.saveDatabase();
					resolve(self);
				} else {
					reject(new Error('db is not ready'));
				}
			})
		},
        addCreds: function(service, creds) {
            var self = this;
            creds.service = service;
            creds.expires = Date.now() + (creds.expires_in * 1000);
            delete creds.expires_in;
            return new Promise(function(resolve, reject) {
                if (self.loaded && self.db.getCollection('creds')) {
                    self.credentials.removeWhere({'service': service});
                    self.credentials.insert(creds);
                    self.db.saveDatabase();
                    resolve(self);
                } else {
                    reject(new Error('db is not ready'));
                }
            })
        }
	};
});
