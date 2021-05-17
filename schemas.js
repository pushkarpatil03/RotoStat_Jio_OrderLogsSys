const Joi = require('joi');

module.exports.orderSchema = Joi.object({
    order: Joi.object({
        PostingDate: Joi.string().required(),
        MatName: Joi.string().required(),
        MatCode: Joi.number().required().min(0),
        MatDesc: Joi.string().required(),
        Circle: Joi.string().allow('').max(3),
        RecQuan: Joi.number().required().min(0),
        AccQuan: Joi.number().allow('').min(0),
        RejectQuan: Joi.number().allow('').min(0),
        Status: Joi.string().required(),
        PO: Joi.string().allow(''),
        VendorCode: Joi.number().required().min(0),
        VendorName: Joi.string().required(),
        InvoiceNum: Joi.number().allow(''),
        Ref: Joi.string().allow(''),
        Remarks: Joi.string().allow('')
    }).required()
});