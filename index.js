const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/search', async (req, res) => {
    const query = req.query.query;
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

    try {
        const response = await axios.get(searchUrl);
        const $ = cheerio.load(response.data);

        // Extract and process the search results here
        // For simplicity, we'll just return the entire HTML content
        const searchResults = $('body').html();
        
        res.send(searchResults);
        let text = [];
        $('.BNeawe.vvjwJb.AP7Wnd').each((index, element) => {
            text.push(element.children[0].data);
            console.log(element.children[0].data)
        });
        // console.log(text);
        // res.send(text);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
