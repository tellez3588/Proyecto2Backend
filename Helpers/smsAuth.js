

const generateSMS = async (phone) => {

  

  const code = Math.floor(Math.random() * 10000);
  
  try {
    // Enviar el código de verificación por SMS utilizando Twilio
    await client.messages.create({
      body: `Tu código de verificación es ${code}`,
      from: fromPhone,
      to: phone
    });
    return code;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo enviar el mensaje");
  }
}

module.exports = { generateSMS };

