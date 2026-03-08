const Address = require("../models/addressModel");

exports.saveAddress = async (req, res) => {
  const userId = req.user.id;

  const addressData = { ...req.body, user: userId };

  let address = await Address.findOne({ user: userId });

  if (address) {
    address.set(addressData);
  } else {
    address = new Address(addressData);
  }

  await address.save();
  res.json({ message: "Address saved", address });
};

// exports.saveAddress = async (req, res) => {
//   const userId = req.user.id;

//   let address = await Address.findOne({ user: userId });
//   if (address) Object.assign(address, req.body);
//   else address = new Address({ ...req.body, user: userId });

//   await address.save();
//   res.json({ message: "Address saved", address });
// };


exports.getAddress = async (req, res) => {
  const address = await Address.findOne({ user: req.user.id });
  res.json(address);
};
