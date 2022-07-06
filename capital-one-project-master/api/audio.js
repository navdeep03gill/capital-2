const axios = require("axios"); 
const fs = require("fs");
let uploadUrl;
const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
        authorization: "8cd10441da28402b8a3db787388257cd",
        "content-type": "application/json",
        "transfer-encoding": "chunked",
    },
});
// downloaded audio file location
const file = "../../../../../../Downloads/test1 (3).wav";
fs.readFile(file, (err, data) => {
    if (err) return console.error(err);

    assembly
        .post("/upload", data)
        .then((res) => {
            console.log(res.data)
            uploadUrl = res.data.upload_url;
            getTranscript(uploadUrl);
            console.log("Returned!")})
        .catch((err) => console.error(err)); 
    })
  
const APIKey = "8cd10441da28402b8a3db787388257cd"
const refreshInterval = 5000

// Setting up the AssemblyAI headers
const assembly2 = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: APIKey,
    "content-type": "application/json",
  },
})

const getTranscript = async (uploadUrl) => {
  // Sends the audio file to AssemblyAI for transcription
  const response = await assembly2.post("/transcript", {
    audio_url: uploadUrl,
  })

  // Interval for checking transcript completion
  const checkCompletionInterval = setInterval(async () => {
    const transcript = await assembly2.get(`/transcript/${response.data.id}`)
    const transcriptStatus = transcript.data.status

    if (transcriptStatus !== "completed") {
      console.log(`Transcript Status: ${transcriptStatus}`)
    } else if (transcriptStatus === "completed") {
      console.log("\nTranscription completed!\n")
      let transcriptText = transcript.data.text
      console.log(`Your transcribed text:\n\n${transcriptText}`)
      clearInterval(checkCompletionInterval)
    }
  }, refreshInterval)
}