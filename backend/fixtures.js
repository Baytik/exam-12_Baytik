const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');
const Gallery = require('./models/Gallery');

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [jack, john] = await User.create({
        username: 'jack',
        password: '123',
        token: '123sadhffhds'
    }, {
        username: 'john',
        password: '123',
        token: 'sadn324nsds'
    });

    await Gallery.create({
        user: jack,
        title: 'Lake',
        image: 'lake.jpeg'
    }, {
        user: john,
        title: 'Big mountains',
        image: 'mountains.jpeg'
    }, {
        user: jack,
        title: 'River',
        image: 'river.jpeg'
    }, {
        user: john,
        title: 'Beautiful sunrise',
        image: 'sunrise.jpeg'
    });

    mongoose.connection.close();
};

run().catch(e => {
    mongoose.connection.close();
    throw e;
});