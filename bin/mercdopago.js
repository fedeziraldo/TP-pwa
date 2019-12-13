const mp = require('mercadopago');

mp.configure({
    sandbox: 'true',
    access_token: 'TEST-5920144375979964-121322-14ddc3e546d4f8453f6c20cd4455d4bd-360193929'
})

async function comprar(preference){
    try {
        return await mp.preferences.create(preference);
    } catch (error) {
        throw error;
    }
}

module.exports = {comprar}