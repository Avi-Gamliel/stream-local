const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const axios = require('axios')

app.use(express.json())

app.post('/get-chat', async(req,res)=>{
const {promt_body} = req.body

console.log(req.body)
console.log(promt_body)
    try{
    // Can you give me short html template, and output yuor answer with only the html. without any explaintion from you only the answer. please do not output answer only the html 
    // Make the POST request and get the response stream
        const response = await axios.post('http://localhost:11434/api/generate', {
            model: 'llama3',
            prompt: promt_body 
        }, {
            responseType: 'stream' // Important to get the response as a stream
        });

        let fullResponse = '';

        // Collect data chunks and concatenate them
        response.data.on('data', chunk => {
            // console.log(chunk.toString())
            // console.log(JSON.parse(chunk.toString()).response)
            res.write(chunk.toString())
            fullResponse += JSON.parse(chunk.toString()).response;
        });

        // Once the stream ends, log the complete response
        response.data.on('end', () => {
            console.log('Full response:', fullResponse);
            // res.json({answer:fullResponse})
            res.end()

        });

        // Optionally, handle errors
        response.data.on('error', err => {
            console.error('Stream error:', err);
        });

    } catch (error) {
        console.error('Error making request:', error);
    }
    
})

const port = process.env.PORT || 4000
server.listen(port, ()=>console.log(`server is running on port: ${port}`))
