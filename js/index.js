const selectOpn=document.querySelectorAll('select')
const transbtn=document.querySelector("#btn")
const from=document.querySelector('.from');
const to=document.querySelector('.to');
const leftVol=document.querySelector('#left');
const rightVol=document.querySelector('#right');
const exchng=document.querySelector('.exchange')
let copyText1 =document.querySelector("#copy-left");
let copyText2 =document.querySelector("#copy-right");
let chngMode=document.querySelector(".mode");
selectOpn.forEach((tag,id) =>{
  for(const country_code in countries){
    let defaultVal;
    if(id==0 && country_code=="en-GB"){
      defaultVal="selected"
    }
    if(id==1 && country_code=="hi-IN"){
      defaultVal="selected"
    } 

   let opn=` <option value="${country_code}" ${defaultVal}>${countries[country_code]}</option>`;
   tag.insertAdjacentHTML("beforeend",opn);
   
  }

});
exchng.addEventListener("click",()=>{
  let temp=from.value;
  from.value=to.value;
  to.value=temp;
  let templan=selectOpn[0].value;
  selectOpn[0].value=selectOpn[1].value;
  selectOpn[1].value=templan;
})
let fromVal;
transbtn.addEventListener("click",()=>{
 fromVal=from.value;

 let translateFrom=selectOpn[0].value;
let translateTo=selectOpn[1].value;
console.log(translateFrom)
console.log(translateTo)
let apiUrl = `https://api.mymemory.translated.net/get?q=${fromVal}&langpair=${translateFrom}|${translateTo}`;
fetch(apiUrl).then(response=>response.json())
.then(data=>{
  
const work=data.responseData.translatedText;
to.value=work;
})
})

leftVol.addEventListener("click",()=>{
var msg=new SpeechSynthesisUtterance();
msg.text=from.value;
msg.lang=selectOpn[0].value;
window.speechSynthesis.speak(msg)
})
rightVol.addEventListener("click",()=>{
  var msg=new SpeechSynthesisUtterance();
  msg.text=to.value;
  msg.lang=selectOpn[1].value;
  window.speechSynthesis.speak(msg)
  })
  copyText2.addEventListener("click",()=>{
    var copyText = to.value;
     
    navigator.clipboard.writeText(copyText)
           
        
    })

    copyText1.addEventListener("click",()=>{
      var copyText = from.value;
       
      navigator.clipboard.writeText(copyText)
             
             
      })

  chngMode.addEventListener("click",()=>{
    let chng=document.getElementById("wannaChng")
    chng.classList.toggle("chng");
    let chngHead=document.querySelector(".grey")
    chngHead.classList.toggle("purple");
    let chngMode=document.querySelector(".mode")
    chngMode.classList.toggle("mode2");
    
  })
 