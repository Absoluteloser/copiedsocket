const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = "mongodb+srv://new_user_44:c85qJmADw9eepEEG@cluster0.d65wu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDB;