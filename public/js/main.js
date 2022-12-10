// const { generateImage } = require("../controllers/openaiController");

function onSubmit(e) {
    e.preventDefault()
    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;

    if (prompt === ''){
        alert( 'please add some text');
        return
    }


    generateImageRequest(prompt, size)
}
async function generateImageRequest(prompt, size){
  try {
    showSpinner()
    const response = await fetch('/openai/generateimage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          size,
        }),
      });
    
    if(!response.ok){
        hideSpinner()
        throw new Error("THAT IMAGE CAN NOT BE SHOWN")
    }
    //IF NOT
    const data = await response.json();
    console.log(data);
    hideSpinner()
  } catch (error) {
    document.querySelector('.msg').textContent = error
  }
}
function showSpinner(){
    document.querySelector('.spinner').classList.add('show');
}
function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit)