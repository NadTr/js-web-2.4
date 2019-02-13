
// import some polyfill to ensure everything works OK
import "babel-polyfill"

// import bootstrap's javascript part
import 'bootstrap';

/*
  Put the JavaScript code you want below.
*/
// import axios for the API
import axios from 'axios';

//converter of markdown
import {markdown} from 'markdown';
const showdown  = require('showdown');
const converter = new showdown.Converter(); // converter.makeHtml() converter

let  inside = document.querySelector(".inside");
let  modal = document.querySelector('.modal');
let list;
//fonction asynchrone car sinon, il ne recharge pas l'API
async function getCharacters() {
  try {
   let response = await axios.get('https://character-database.becode.xyz/characters') //await attend que la âge soit entièrement chargée
   list=response.data;
   let start=0;
   let length=list.length-1;
   //Display all the list
   for(let i=start;i<length;i++){
     let div=document.createElement("div");
     div.className='border'
     let li = document.createElement("li");
     li.className='column CharCase'+i;
     li.setAttribute('data-toggle', 'modal');
     li.setAttribute('data-target', '.modal');
     li.addEventListener("click",() =>displayDescription(i));
    // li.id=Char[0];
    let h2 = document.createElement("h2");

    let img = new Image();
     img.className="image"
     let p = document.createElement("p");
     let CharName= document.createTextNode(list[i].name);
     let CharDescr= document.createTextNode(list[i].shortDescription);
     let empty=document.createTextNode("      ");
     if(list[i].image)
      img.src = 'data:image/jpg;base64,'+list[i].image;

      let bottom=document.createElement("div");
      bottom.className='bottom'
     let buttonEdit=document.createElement("button");
     buttonEdit.className='btn btn-primary edit';
     let ButtonText= document.createTextNode("Edit");
     buttonEdit.appendChild(ButtonText);
     buttonEdit.setAttribute('data-toggle', 'modal');
     buttonEdit.setAttribute('data-target', '.modal');
     let buttonDelete=document.createElement("button");
     buttonDelete.className='btn btn-primary delete';
     let ButtonTxt= document.createTextNode("Delete");
     buttonDelete.appendChild(ButtonTxt);
     h2.appendChild(CharName);
     p.appendChild(CharDescr);
     li.appendChild(h2);
     li.appendChild(img);
     li.appendChild(p);
     bottom.appendChild(buttonEdit);
     bottom.appendChild(buttonDelete);
     div.appendChild(li);
     div.appendChild(bottom);
     inside.appendChild(div);

     buttonDelete.addEventListener("click",async()=>{
       var result = confirm("Want to delete?");
       if (result) {
         await axios.delete('https://character-database.becode.xyz/characters/'+list[i].id)

       }
       window.location.reload();
     });


     buttonEdit.addEventListener("click",()=>{
       let title = document.createElement("textarea");
       title.value=list[i].name;
       let short_descr = document.createElement("textarea");
       short_descr.value=list[i].shortDescription;
       let description = document.createElement("textarea");
       description.value=list[i].description;
       let image= document.createElement("input");
       image.type="file";
       let buttonSubmit=document.createElement("button");
       buttonSubmit.className='btn btn-primary submit';
       buttonSubmit.setAttribute('data-dismiss', 'modal');
       let ButtonText= document.createTextNode("submit");
       buttonSubmit.appendChild(ButtonText);

       document.querySelector('.modal-title').innerHTML = '';
       document.querySelector('.modal-body').innerHTML = '';
       document.querySelector('.modal-footer').innerHTML = '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
       document.querySelector('.modal-title').appendChild(title);
       document.querySelector('.modal-body').appendChild(short_descr);
       document.querySelector('.modal-body').appendChild(description);
       document.querySelector('.modal-body').appendChild(image);
       document.querySelector('.modal-footer').appendChild(buttonSubmit);


       buttonSubmit.addEventListener("click",async()=>{
           let f=image.files[0];
           let reader = new FileReader();
           reader.addEventListener("load", async(event)=>{
             let imgData = event.target.result;
             console.log(imgData);
             await axios.put('https://character-database.becode.xyz/characters/'+list[i].id, {
             name : title.value ,
             shortDescription :short_descr.value,
             description : description.value,
               image: imgData.slice(imgData.indexOf(',')+1)
             });
             window.location.reload();
           });
           console.log(f);
           if (f===undefined){
             await axios.put('https://character-database.becode.xyz/characters/'+list[i].id, {
             name : title.value ,
             shortDescription :short_descr.value,
             description : description.value,
             image:list[i].image
             });
             window.location.reload();
           }
           else{
             reader.readAsDataURL(f);
           }
         });
       });
    }
  }
  catch(error) {
    console.error(error);
  }
}



function displayDescription(index) {
    let oneChar=document.querySelector(".CharCase"+index);
    let title=markdown.toHTML(list[index].name);
    let body=markdown.toHTML(list[index].description);
    if(index == 0)
      console.log(body);
    document.querySelector('.modal-title').innerHTML = '';
    document.querySelector('.modal-body').innerHTML = '';
    document.querySelector('.modal-footer').innerHTML = '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
    document.querySelector('.modal-title').innerHTML =(title);
    document.querySelector('.modal-body').innerHTML = body;

  }


  document.querySelector('.add').addEventListener("click",()=>{
    let title = document.createElement("textarea");
    title.placeholder='Name';
    let short_descr = document.createElement("textarea");
    short_descr.placeholder='Short description';
    let description = document.createElement("textarea");
    description.placeholder='Long description';
    let image= document.createElement("input");
    image.type="file";
    let button=document.createElement("button");
    button.setAttribute('data-dismiss', 'modal');
    button.className='btn btn-primary addNew';
    let ButtonText= document.createTextNode("Add this character");
    button.appendChild(ButtonText);

    document.querySelector('.modal-title').innerHTML = '';
    document.querySelector('.modal-body').innerHTML = '';
    document.querySelector('.modal-footer').innerHTML = '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
    document.querySelector('.modal-title').appendChild(title);
    document.querySelector('.modal-body').appendChild(short_descr);
    document.querySelector('.modal-body').appendChild(description);
    document.querySelector('.modal-body').appendChild(image);
    document.querySelector('.modal-footer').appendChild(button);

    document.querySelector('.addNew').addEventListener("click",async()=>{
      let f=image.files[0];
      let reader = new FileReader();
      reader.addEventListener("load", async(event)=>{
        let imgData = event.target.result;
        console.log(imgData);
        await axios.post('https://character-database.becode.xyz/characters', {
          name : title.value ,
          shortDescription :short_descr.value,
          description : description.value,
          image: imgData.slice(imgData.indexOf(',')+1)
        });
        window.location.reload();
      });
      console.log(f);
      if (f===undefined){
        await axios.post('https://character-database.becode.xyz/characters', {
          name : title.value ,
          shortDescription :short_descr.value,
          description : description.value,
        });
        window.location.reload();
      }
      else{
        reader.readAsDataURL(f);
      }
  });


  });





//call the function
getCharacters();
