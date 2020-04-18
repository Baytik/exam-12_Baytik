const path = require('path');
const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    database: 'mongodb://localhost/ingredients',
    databaseOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    facebook: {
        appId: '3109373302426478',
        appSecret: '3a7b147c259531d784f0f642cf70d702'
    }
};