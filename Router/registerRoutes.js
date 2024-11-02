const express=require("express");
const { registerController, registerController2, loginUser, getDistData, adminController, getDistDataController } = require("../controllers/RegisterController");
const { InvoiceController, getInvoiceData, getPharmaData, linkpharmaController, InvoiceReportDefaultController, getInvoiceRDData, getPData, downloadExcelReport, countNotices, getPharmaData2, checkIfLinked, getInvoiceRDDataforDist, updateDefault, getInvoiceRDDataforDistUpdate, disputebyPharma, checkdispute, adminupdate } = require("../controllers/InvoiceController");
const { sendSms } = require("../controllers/sendSMSController");

const router=express.Router();


router.post("/Pharmacyregister",registerController)
router.post("/Distributorregister",registerController2)
router.post("/Invoice/:id",InvoiceController)
router.post("/InvoiceReportDefault/:id",InvoiceReportDefaultController)
router.post("/linkPharma/:id",linkpharmaController)
router.get("/getInvoice/:licenseNo",getInvoiceData)
router.get("/getpharmaData/:licenseNo",getPharmaData)
router.get("/getInvoiceRD/:licenseNo",getInvoiceRDData)
router.get("/getInvoiceRDforDistUpdate/:licenseNo",getInvoiceRDDataforDistUpdate)
router.get("/getPharamaDatainPharma/:id",getPData)
router.post("/login",loginUser)
router.get('/downloadReport/:license/excel', downloadExcelReport);
router.get('/countNotices/:id', countNotices);
router.post("/sendSMS/",sendSms)
router.get('/getdistdatabyphid/:id', getDistData);
router.get("/checkIfLinked/:pharmaId/:distId",checkIfLinked)
router.post("/createAdmin",adminController)
router.get("/getInvoiceRDforDist/:licenseNo/:distId",getInvoiceRDDataforDist)
router.get('/getDistData/:id', getDistDataController);
router.put('/updateReportDefault/:pharmadrugliseanceno/:invoice/:customerId',updateDefault)
router.put('/disputebyPharma/:pharmadrugliseanceno/:invoice/:customerId',disputebyPharma)
router.put('/adminupdate/:pharmadrugliseanceno/:invoice/:customerId',adminupdate)
module.exports=router;