const path = require('path');
const express = require('express');
require('dotenv').config();

const app = express();

const orderTicketRouter = require('./routers/orderTicketRouter');
const portfolioRouter = require('./routers/portfolioRouter');

const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../client/static')));

app.use('/orderTicket', orderTicketRouter);
app.use('/portfolio', portfolioRouter);

app.use((req, res) => {
  res.status(400).send('This is not where you trade le stonks');
});

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.use((req, res, next, err) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error.',
    status: 500,
    message: { err: 'An error occurred.' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server online, listening on port ${PORT}.`);
});

module.exports = app;
