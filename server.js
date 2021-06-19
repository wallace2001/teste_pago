const express = require("express");
const MercadoPago = require("mercadopago");
const app = express();

MercadoPago.configure({
    sandbox: true,
    access_token: "TEST-7422573474416851-051416-1121f00ba3b16193941e4be2ed09b202-380430351"
});

app.use(express.json());

app.get("/buy", async(req, res) => {

    const id = "" + Date.now();

    const dados = {
        items: [
            item = {
                id,
                title: "Sonho veg",
                quantity: 1,
                currency_id: "BRL",
                unit_price: parseFloat(150)
            }
        ],
        payer: {
            email: "12213@outlook.com",
        },
        external_reference: id
    }

    try {
        const pag = await MercadoPago.preferences.create(dados);
        console.log(pag);
        return res.redirect(pag.body.init_point);
    } catch (error) {
        return res.send({error});
    }

});

app.listen(process.env.PORT || 3002, () => console.log("Conectado"));