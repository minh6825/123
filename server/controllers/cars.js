import { CarModel } from '../models/CarModel.js'; 
import { DetailsContractModel } from '../models/DetailsContractModel.js';

export const getCars = async (req, res) => {
  try {
    const cars = await CarModel.find(); 
    res.status(200).json(cars); 
  } catch (err) { 
    res.status(500).json({ error: err });
  }
};

export const getCar = async (req, res) => {
  try {
    const { _id, userId } = req.body; // Lấy thông tin xe và người dùng từ request body

    // Tìm kiếm thông tin xe dựa trên _id
    const car = await CarModel.findOne({ _id });

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Kiểm tra xem xe này có đang được thuê bởi người dùng hiện tại hay không
    const isCarRented = await DetailsContractModel.findOne({
      carid: _id, // Kiểm tra hợp đồng có liên quan đến xe này
      userId, // Kiểm tra người dùng hiện tại
    });

    // Kết quả trả về với thông tin xe và trạng thái xe có đang được thuê hay không
    res.status(200).json({
      car,
      isRentedByUser: !!isCarRented, // Chuyển kết quả kiểm tra thành true/false
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const createCar = async (req, res) => {
  try {
    const newcar = req.body; 
    const car = new CarModel(newcar); 

    await car.save(); 

    res.status(200).json(car); 
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateCar = async (req, res) => {
  try {
    const updateCar = req.body; 
    const car = await CarModel.findOneAndUpdate(
      { _id: updateCar._id },
      updateCar.carData,  
      { new: true } 
    );
    console.log('[car]',car);
    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};



export const removeCar = async (req, res) => {
  try {
    const updateCar = req.body;

    const car = await CarModel.findByIdAndDelete(
      { _id: updateCar._id } 
      
    );
    console.log('[car]',car);
    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

