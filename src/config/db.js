import mongoose from 'mongoose';



const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error al conectar con MongoDB:', error);
  }
};

export default connectDB;
