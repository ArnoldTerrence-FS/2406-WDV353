const middlewares = (app) => {
    //Always used middlewar
    app.set("trust proxy", 1); //trust first proxy
    app.use(json()); //req.body!
    app.use(urlencoded({ extended: true}));
    app.use(morgan("dev"));
};
