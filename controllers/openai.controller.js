const fs = require('fs');
const { Configuration, OpenAIApi } = require("openai");

const _configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const _openai = new OpenAIApi(_configuration);

const gptChatCompletion = async (prompt) => {

    try {
        let query = {
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "system", "content": `Eres un asistente para ayudar a personas mayores` },
                { "role": "user", "content": prompt }
            ],
            max_tokens: 1000,
            temperature: 1
        }

        const completion = await _openai.createChatCompletion(query);
        const messages = completion.data.choices[0].message;
        const usage = completion.data.usage;

        return { messages, usage };

    } catch (error) {
        res.status(500).send(JSON.stringify(error));
    }

}

const callWhisper = async () => {

    const result = await _openai.createTranscription(
        fs.createReadStream("./voiceFiles/audio.wav"),
        "whisper-1"
    );
    return result.data.text;

}

const handlerRequest = async (req, res) => {
    try {
        const audioFile = req.file;

        fs.rename(audioFile.path, `./voiceFiles/${audioFile.originalname}`, async (error) => {
            error
                ? res.status(500).send(`Error, not possible to save the file ${error}`)
                : res.json("ok");
        });

    } catch (error) {
        res.status(500).send(JSON.stringify(error));
    }
}

module.exports = {
    handlerRequest,
    callWhisper,
    gptChatCompletion
}