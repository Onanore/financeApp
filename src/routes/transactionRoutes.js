const express = require('express');
const { check } = require('express-validator');
const {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction
} = require('../controllers/transactionController');
const { protect } = require('../middleware/auth');
const { validate } = require('../middleware/validation');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getTransactions)
  .post(
    validate([
      check('amount', 'Amount is required').isNumeric(),
      check('type', 'Type must be income or expense').isIn(['income', 'expense']),
      check('category', 'Category is required').not().isEmpty()
    ]),
    createTransaction
  );

router.route('/:id')
  .get(getTransaction)
  .put(
    validate([
      check('amount', 'Amount is required').optional().isNumeric(),
      check('type', 'Type must be income or expense').optional().isIn(['income', 'expense']),
      check('category', 'Category is required').optional().not().isEmpty()
    ]),
    updateTransaction
  )
  .delete(deleteTransaction);

module.exports = router;