const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res) => {
  const transactions = await Transaction.find({ user: req.user._id }).sort({ date: -1 });
  res.json(transactions);
};

exports.getTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  
  if (!transaction) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  
  if (transaction.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ error: 'Not authorized to access this transaction' });
  }
  
  res.json(transaction);
};

exports.createTransaction = async (req, res) => {
  req.body.user = req.user._id;
  
  const transaction = await Transaction.create(req.body);
  
  res.status(201).json(transaction);
};

exports.updateTransaction = async (req, res) => {
  let transaction = await Transaction.findById(req.params.id);
  
  if (!transaction) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  
  if (transaction.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ error: 'Not authorized to update this transaction' });
  }
  
  transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  res.json(transaction);
};

exports.deleteTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  
  if (!transaction) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  
  if (transaction.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ error: 'Not authorized to delete this transaction' });
  }
  
  await transaction.remove();
  
  res.json({ message: 'Transaction removed' });
};