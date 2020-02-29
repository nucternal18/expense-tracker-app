// @ts-nocheck
// const Transaction = require('../models/Transaction');
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require('firebase/app');

// Add the Firebase products that you want to use
require('firebase/auth');
require('firebase/firestore');

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API,
    authDomain: 'expense-tracker-2eaf8.firebaseapp.com',
    databaseURL: 'https://expense-tracker-2eaf8.firebaseio.com',
    projectId: 'expense-tracker-2eaf8',
    storageBucket: 'expense-tracker-2eaf8.appspot.com',
    messagingSenderId: '689711273527',
    appId: '1:689711273527:web:78a642071c634b3785d1b2',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();


// @desc GET all transactions
//@route GET /api/v1/transactions
//@access Public
exports.getTransactions = async (req, res, next) => {
    try {
        const transactionRef = await database.collection('transactions').get();
        const transaction = [];
        transactionRef.forEach(
            (doc) => {
                transaction.push({ 
                    id: doc.id,
                    data: doc.data(),
                })
            }
        )
        if (transactionRef.empty) {
            const transactionDocRef = database.collection('transactions').doc();
            await transactionDocRef.set(Transaction);
            return transactionDocRef;
        }
        return res.status(200).json({
            success: true,
            data: transaction,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}


// @desc Add a transactions
//@route POST /api/v1/transactions
//@access Public
exports.addTransactions = async (req, res, next) => {
    let Transaction = {
        text: req.body.text,
        amount: req.body.amount,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    };
    try {
        const setTransactions = await database
            .collection('transactions').add(Transaction);
        const transaction = await setTransactions.get();
        return res.status(200).json({
            success: true,
            id: setTransactions.id,
            data: transaction.data()
        })
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
    
}


// @desc Delete transactions
//@route DELETE /api/v1/transactions/:id
//@access Public
exports.deleteTransactions = async (req, res, next) => {
    try {
        const transaction = await database
          .collection('transactions')
          .doc(req.params.id);

        transaction.get().then(document => {
            if (!document.exists) {
                return res.status(400).json({
                    success: false,
                    error: 'No transaction found'
                })
            }

            const deleteTransaction = transaction.delete();
            return deleteTransaction.then(res.status(200).json({
                success: true
            }))
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
}