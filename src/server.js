const express = require("express");
// require('dotenv').config;
const cors = require("cors");
// const bodyParser = require("body-parser");
// const fs = require("fs");
// const path = require("path");


const {Configuration, OpenAIApi} = require("openai");

const configuration = new Configuration({
    apiKey: "",
});
const openai = new OpenAIApi(configuration);

// Set up the server
const app = express();
app.use(express.json());
app.use(cors())

// Set up the ChatGPT endpoint
app.post("/chat", async (req, res) => {
    try {
        const { prompt } = req.body;
        // Get the prompt from the request
        // Generate a response with ChatGPT
        const completion = await openai.createCompletion({
            model:  "text-davinci-003",
            prompt: prompt,
            // max_token: 4097,
        });
        console.log(completion);
        res.send(completion.data.choices[0].text);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error"); // Send an appropriate error response
    }
});
//
// // Define the endpoint to handle the download request
// app.get("/download", (req, res) => {
//     // Update the URL with the actual URL from which to download the WebGL file
//     const fileUrl = "https://example.com/webgl/build/index.html";
//
//     // Define the path to save the downloaded file in the public folder
//     const filePath = path.join(__dirname, "public", "webgl", "build", "index.html");
//
//     // Use the fs module to create a write stream to the public folder
//     const file = fs.createWriteStream(filePath);
//
//     // Use the http module to send a request to the file URL and pipe the response to the file stream
//     http.get(fileUrl, (response) => {
//         response.pipe(file);
//         file.on("finish", () => {
//             file.close(() => {
//                 console.log("File downloaded successfully!");
//                 res.send("File downloaded successfully!");
//             });
//         });
//     }).on("error", (err) => {
//         console.error("Error downloading file:", err);
//         res.status(500).send("Error downloading file");
//     });
// });
//
// // Define the endpoint to handle the download request
// app.get("/downloadAudio", (req, res) => {
//     // Update the URL with the actual URL from which to download the audio file
//     const fileUrl = "https://example.com/audio/sample.mp3";
//
//     // Define the path to save the downloaded audio file in the public folder
//     const filePath = path.join(__dirname, "public", "audio", "sample.mp3");
//
//     // Use the fs module to create a write stream to the public folder
//     const file = fs.createWriteStream(filePath);
//
//     // Use the http module to send a request to the file URL and pipe the response to the file stream
//     http.get(fileUrl, (response) => {
//         response.pipe(file);
//         file.on("finish", () => {
//             file.close(() => {
//                 console.log("Audio file downloaded successfully!");
//                 res.send("Audio file downloaded successfully!");
//             });
//         });
//     }).on("error", (err) => {
//         console.error("Error downloading audio file:", err);
//         res.status(500).send("Error downloading audio file");
//     });
// });
//

// Start the server
const port = 5555;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
