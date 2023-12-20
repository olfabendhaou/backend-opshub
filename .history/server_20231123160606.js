const express = require("express");
const cors = require("cors");
const swaggerUI = require('swagger-ui-express');

const YAML = require('yamljs');
const app = express();
const swaggerDocument = YAML.load('./swagger.yaml');
app.use(express.json({ extended: false }));

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Authentication Route
app.use("/api/authentication", require("./routes/login"));

// Dashboard Route
app.use("/api/dashboard", require("./routes/dashboard"));

app.use("/api/user", require("./routes/user"));
app.use("/api/settings", require("./routes/webConsole"));
app.use("/api/template", require("./routes/template"));
app.use("/api/systems", require("./routes/connectedsystems"));
app.use('/api/uploads', express.static('uploads'));
app.use('/api/instance', require("./routes/connectedsystemsInstance"));
app.use('/api/integration', require("./routes/integration"));
app.use('/api/licensSettings', require("./routes/licensS

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
