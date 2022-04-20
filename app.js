const express = require('express');
const { Server } = require("socket.io");
//const csurf = require('csurf');
const helmet = require('helmet');
//const flash = require('connect-flash');
const session = require('express-session');
const compression = require('compression');
const exphbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');
//const { MongoClient, ServerApiVersion } = require('mongodb').MongoClient;
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongodb-session')(session);
const cors = require('cors');
const permissionsPolicy = require("permissions-policy");
const homeRoute = require('./routes/home');
const addFilmRoute = require('./routes/addfilm');
const filmsRoute = require('./routes/films');
const newsRoute = require('./routes/news');
const userRouter = require('./routes/user');
const errorMiddleware = require('./middleware/error');
const userModel = require('./models/user');
const { loadFilms } = require('./modules/film-loader');

const config = require('./keys/config');
// const client = new MongoClient(config.MONGODB_URL, { 
//     sslKey: credentials,
//     sslCert: credentials,
//     serverApi: ServerApiVersion.v1
// }); 
// Because using mongoose
const PORT = process.env.PORT || config.PORT;
const credentials = './keys/X509-cert-2922063318586605945.pem';
// const store = MongoStore({
//     collection: 'sessions',
//     uri: config.MONGODB_URL
// });
//conflicts with mongodb certificate connections
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    helpers: require('./utils/hbs-helpers')
});
const app = express();

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    //store
}));
////app.use(csurf());
//app.use(flash());
app.use(
    permissionsPolicy({
      features: {
        fullscreen: ["self"], // fullscreen=()
        vibrate: ["none"], // vibrate=(none)
        payment: ["self"], // payment=(self "example.com")
        syncXhr: [], // syncXhr=()
      },
    })
);
app.use(
    helmet.contentSecurityPolicy({
      useDefaults: false,
      "block-all-mixed-content": true,
      "upgrade-insecure-requests": true,
      directives: {
        "default-src": [
            "'self'"
        ],
        "base-uri": "'self'",
        "font-src": [
            "'self'",
            "https:",
            "data:"
        ],
        "frame-ancestors": [
            "'self'"
        ],
        "img-src": [
            "'self'",
            "data:"
        ],
        "object-src": [
            "'none'"
        ],
        "script-src": [
            "'self'",
            "https://cdnjs.cloudflare.com"
        ],
        "script-src-attr": "'none'",
        "style-src": [
            "'self'",
            "https://cdnjs.cloudflare.com",
            "https://fonts.googleapis.com"
        ],
      },
    }),
    helmet.dnsPrefetchControl({
        allow: true
    }),
    helmet.frameguard({
        action: "deny"
    }),
    helmet.hidePoweredBy(),
    helmet.hsts({
        maxAge: 123456,
        includeSubDomains: false
    }),
    helmet.ieNoOpen(),
    helmet.noSniff(),
    helmet.referrerPolicy({
        policy: [ "origin", "unsafe-url" ]
    }),
    helmet.xssFilter()
);
//app.use('/dashboard', dashboardRoute);
//app.use('/dashboard', dashboardRoute);
app.use('/films', filmsRoute);
app.use('/addfilm', addFilmRoute);
app.use('/news', newsRoute);
app.use('/', homeRoute);
app.use('/user', userRouter);
app.use(errorMiddleware);

start();

const server = app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
});
const io = new Server(server);

io.on('connection', async (socket) => {
    console.log('a user connected');
    socket.on('image-request', async (imagename) => {
        getImage(imagename).then(image => {
            //console.log('Img contents: ' + image);
            socket.emit('image-response', image); // image should be a buffer
        });
        //socket.emit('image-response', image.toString('base64')); // image should be a buffer
    });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});

function getImage(imagename) {
    return new Promise(async (resolve, reject) => {
        const contents = await fs.promises.readFile(`./uploads/${imagename}`, { encoding: 'base64' });

        resolve(contents);
    });
}

async function start(){
    try {    
        await mongoose.connect(config.MONGODB_URL, { 
            sslKey: credentials,
            sslCert: credentials,
            serverApi: ServerApiVersion.v1
        });

        // const server = app.listen(PORT, () => {
        //     console.log("Server is running on port: ", PORT);
        // });

        // return server;
    }
    catch (e) {
        console.log(e);
    }
}