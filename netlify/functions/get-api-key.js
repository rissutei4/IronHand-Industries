exports.handler = async function () {
    const apiKey = process.env.WEB3FORMS_API_KEY;
    return {
        statusCode: 200,
        body: JSON.stringify({ apiKey }),
    };
};