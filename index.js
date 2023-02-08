let got = require('got');
let proc = process;

//TODO: hide this secret key!
proc.env.OPENAI_SECRET_KEY = 'sk-*********';
console.log(proc.env.OPENAI_SECRET_KEY);

const prompt = `Artist: Kendrick Lamar\n\nLyrics:\n`;

const engines = ({
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
});
const selectedEngine = engines.GPT3Ada;

/*const engines = ({
    ada:'ada',
    davinci:'davinci',
});*/


(async () => {
    const url = 'https://api.openai.com/v1/engines/' + selectedEngine + '/completions';
    const params = {
        "prompt": prompt,
        "max_tokens": 160,
        "temperature": 0.7,
        "frequency_penalty": 0.5
    };
    const headers = {
        'Authorization': `Bearer ${proc.env.OPENAI_SECRET_KEY}`,
    };

    let output;
    try {
        const response = await got.post(url, {json: params, headers: headers}).json();
        output = `${prompt}${response.choices[0].text}`;
        console.log(output);
    } catch (err) {
        console.log(err);
    }

})();
