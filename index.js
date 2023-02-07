got = require('got');

const prompt = `Artist: Kendrick Lamar\n\nLyrics:\n`;

let selectedEngine;
const engines = ({
    ada:'ada',
    davinci:'davinci',
});
selectedEngine = engines.ada;

(async () => {
    const url = 'https://api.openai.com/v1/engines/' + selectedEngine + '/completions';
    const params = {
        "prompt": prompt,
        "max_tokens": 160,
        "temperature": 0.7,
        "frequency_penalty": 0.5
    };
    const headers = {
        'Authorization': `Bearer ${process.env.OPENAI_SECRET_KEY}`,
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
