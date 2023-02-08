//PANDA: index page.

const _got = require('got');
require('dotenv').config();


//TODO: create a config file for those selections:
let userConfig = {
    engines: {
        GPT3TextDavinci003: "text-davinci-003",
        GPT3TextDavinci002: "text-davinci-002",
        GPT3TextCurie001: "text-curie-001",
        GPT3TextBabbage001: "text-babbage-001",
        GPT3TextAda001: "text-ada-001",
        GPT3TextDavinci001: "text-davinci-001",
        GPT3DavinciInstructBeta: "davinci-instruct-beta",
        GPT3Davinci: "davinci",
        GPT3CurieInstructBeta: "curie-instruct-beta",
        GPT3Curie: "curie",
        GPT3Ada: "ada",
        GPT3Babbage: "babbage"
    },
    selectedEngine: undefined,
    //TODO: get and inject the prompt from the DOM (from user button event):
    prompt: `Hello, may I ask you why the sky is blue?\n`
};

userConfig.selectedEngine = userConfig.engines.GPT3Ada;

(async () => {
    const url = `https://api.openai.com/v1/engines/${userConfig.selectedEngine}/completions`;
    const params = {
        "prompt": userConfig.prompt,
        "max_tokens": 160,
        "temperature": 0.7,
        "frequency_penalty": 0.5
    };
    const headers = {
        'Authorization': `Bearer ${process.env.OPENAI_SECRET_KEY}`,
    };

    let output;
    try {
        const response = await _got.post(url, { json: params, headers: headers }).json();
        output =
            `=================================
             \n=> USER PROMPT: ${userConfig.prompt}\n=================================
             \n=> RESPONSE FROM THE AI: ${response.choices[0].text}\n=================================\n
        `;

        console.log(output);

    } catch (err) {
        console.log(err);
    }

})();
