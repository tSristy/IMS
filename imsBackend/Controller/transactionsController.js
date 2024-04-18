const TransactionMaster = require('../Model/transactionMasterModel');
const TransactionDetails = require('../Model/transactionDetailsModel');

const addTransaction = async (req, res) => {
    try {
        const {
            docNo,
            refNo,
            mvtDate,
            mvtType,
            companyId,
            quantity,
            createdBy,
            updatedBy,
            createdDate,
            modifiedDate,
            transactionDetails
        } = req.body;

        const newTransactionMaster = await TransactionMaster.create({
            Doc_No: docNo,
            Ref_no: refNo,
            MVT_Date: mvtDate,
            MVT_Type: mvtType,
            Company_Id: companyId,
            Quantity: quantity,
            Created_By: createdBy,
            Created_Date: createdDate,
            Modified_By: updatedBy,
            Modified_Date: modifiedDate,
        });

        const newTransactionDetails = await Promise.all(transactionDetails.map(async detail => {
            const { Transaction_Id, Product_Id, Serial_No, Unit_Price, Total_Price, Warranty, Created_By, Modified_By } = detail;
            return await TransactionDetails.create({
                Transaction_Id,
                Product_Id,
                Serial_No,
                Unit_Price,
                Total_Price,
                Warranty,
                Created_By,
                Created_Date: new Date(), 
                Modified_By,
                Modified_Date: new Date(), 
            });
        }));

        res.status(201).json({ master: newTransactionMaster, details: newTransactionDetails });
    } catch (error) {
        console.error('Error adding transaction:', error);
        res.status(500).json({ error: 'Failed to add transaction' });
    }
};

const getAllTransactionIds = async (req, res) => {
    try {

        const transactionIds = await TransactionMaster.findAll({ attributes: ['Id'] });
        const ids = transactionIds.map(transaction => transaction.Id);
        res.json(ids);
    } catch (error) {
        console.error('Error fetching transaction IDs:', error);
        res.status(500).json({ error: 'Failed to fetch transaction IDs' });
    }
};

module.exports = { addTransaction, getAllTransactionIds };
