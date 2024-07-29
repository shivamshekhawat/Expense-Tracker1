const express = require('express');
const { addExpense, getIndividualExpenses, getOverallExpenses, getAllExpenses, downloadBalanceSheet } = require('../controllers/expenseController');
const router = express.Router();

router.post('/expenses', addExpense);
router.get('/expenses/user/:id', getIndividualExpenses);
router.get('/expenses', getOverallExpenses);
router.get('/expenses/all', getAllExpenses);
router.get('/expenses/balance-sheet', downloadBalanceSheet); // New route for downloading the balance sheet

module.exports = router;

