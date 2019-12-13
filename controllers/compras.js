const comprasModel = require("../models/comprasModel");
const productosModel = require("../models/productosModel").model;
const mp = require('../bin/mercdopago');

module.exports = {
    getAll: async function (req, res, next) {
        try {
            var producto = await comprasModel.paginate({

            }, {
                populate: 'usuario', page: req.query.page
            })
            res.status(200).json({ status: "success", message: "ok", data: producto });
        } catch (err) {
            console.log(err);
            next(err);
        }


    },

    getThisCompras: async function (req, res, next) {
        try {
            var data = await comprasModel.find({ usuario: req.body.userId });
            res.status(200).json({ status: "success", message: "ok", data: data });
        } catch (err) {
            console.log(err);
            next(err);
        }
    },

    getById: async function (req, res, next) {
        try {
            var data = await comprasModel.findById(req.params.id);
            res.status(200).json({ status: "success", message: "ok", data: data });
        } catch (err) {
            console.log(err);
            next(err);
        }
    },

    save: async function (req, res, next) {
        try {
            let prod = await productosModel.findById(req.body.producto);
            if (prod == null || prod.stock < req.body.cantidad) {
                res.status(500).json({ status: "error", message: "no hay stock suficiente del producto" });
            } else {
                prod.stock -= req.body.cantidad;
                await prod.save()
            }

            var compra = new comprasModel({
                producto : prod,
                usuario: req.body.userId,
                forma_pago: req.body.forma_pago,
                cantidad: req.body.cantidad,
                aPagar: req.body.cantidad * (prod.precioOferta ? prod.precioOferta : prod.precio),
                estadoPago: req.body.forma_pago === 'E' ? 'Paga' : 'Pendiente'
            });
            var result = await compra.save();

            var sale_id = result["_id"];

            if (req.body.forma_pago == 'MP'){
                let preference = {
                    items: [
                        {
                            id: sale_id,
                            title: 'Compra Nro. ' + sale_id,
                            quantity: req.body.cantidad,
                            currency_id: 'ARS',
                            unit_price: result["aPagar"]
                        }
                    ],
                    payer: {
                        email: 'enzofab91@gmail.com' //ToDo: obtener email de usuario
                    },
                    notification_url: '' //ToDo: URL??
                }

                let dato_return = await mp.comprar(preference);
                result = dato_return;
            }
            
            //envia mail de orden de compra
            let info = await transporter.sendMail({
                from: process.env.EMAIL_USER, // sender address
                to: req.body.email, // list of receivers
                subject: 'Su compra <b>Nro '+ sale_id + "</b> se ha realizado correctamente", // Subject line
                html: process.env.EMAIL_HTML_COMPRA + ` <br> ${result}` // html body
            });

            res.status(200).json({ status: "success", message: "Compra added successfully!!!", data: result });

        } catch (err) {
            console.log(err);
            next(err);
        }
    },

}
