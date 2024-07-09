const app = require("./index"); // Import the configured Express app
const { sequelize } = require("./models");
require("dotenv").config();

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    await sequelize.sync(); // Ensure models are synchronized with the database
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
