const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[Modern Suites Server]: Running on http://localhost:${PORT}`);
});
