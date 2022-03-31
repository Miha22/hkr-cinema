//const React = require('react');
import React, { useEffect, useState } from 'react';
const ReactDOM = require('react-dom');
const { io } = require("socket.io-client");
const socket = io();

//import photos from database or any other information about films from database and pass all values dynamically to Card
//reference to Database here

function App(films){
    return(
        <div className="wrapper">
            {
                films.map(function(film) {
                    // returns Nathan, then John, then Jane
                    return Card({ title: film.title, img: film.img, description: film.description.substring(0, 110) + "..." })
                })
            }
        </div>
    );
}

function Card(params) {
    return(
        <div className='card'>
            <div className="card-body">
            <img src={params.img} className="card-image"/>
                <h2 className="card-title">{params.title}</h2>
                <p className="card-description">{params.description}</p>
            </div>
            <button className="card-btn">Book ticket</button>
        </div>
    );
}

async function getImage(imagename) {
    return await new Promise((resolve, reject) => {
        socket.emit('image-request', imagename);
        // socket.on('image', image => {
        //     // create image with
        //     const img = new Image();
        //     // change image type to whatever you use, or detect it in the backend 
        //     // and send it if you support multiple extensions
        //     img.src = `data:image/jpg;base64,${image}`; 
        //     // Insert it into the DOM
        // });
        socket.on('image-response', function(imagebase64) {
            //console.log('Received image: ' + imagebase64.substring(0, 100));
            if(imagebase64 == null) {
                reject(null);
            }
            //window.scrollTo(0, document.body.scrollHeight);
            resolve(`data:image/jpg;base64, ${imagebase64}`);
        });
    });
}

async function getFilms(page) {
    const res = await fetch(`http://192.168.1.195:3000/films/${page}`);
    const json = await res.json();
    //console.log(json);

    return json;

    // event.preventDefault()
    // fetch("https://jsonplaceholder.typicode.com/todos/1")
    //     .then((response) => response.json())
    //     .then((json) => {
    //     console.log(json)
    //     window.location.reload()
    // })
}

function loadImages(films) {
    return new Promise(async (resolve, reject) => {
        // films.forEach(async (film, index, arr) => {
        //     await getImage(film.img).then(imagebase64 => {
        //         films[index].img = imagebase64;
        //     });
        // });

        for(let i = 0; i < films.length; i++) {
            await getImage(films[i].img).then(imagebase64 => {
                films[i].img = imagebase64;
            });
        }

        resolve(films); 
    });
    reject(null);
}

getFilms(1).then(films => {
    //ReactDOM.render(<App />, document.querySelector("#root"));
    loadImages(films).then(films => {
        console.log('Result: ' + films[0].img);
        ReactDOM.render(App(films), document.querySelector("#root"));
    })
});
// getFilms(1).catch(err => {
//     console.log(err);
//     // do something with the error here
// });

//jquery
// (function() {
//     $.getJSON("films?page=1", {
//       tags: "mount rainier",
//       tagmode: "any",
//       format: "json"
//     })
//       .done(function(data) {
//         $.each( data.items, function( i, item ) {
//           $( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
//           if ( i === 3 ) {
//             return false;
//           }
//         });
//       });
//   })();

{/* <Card 
img="https://image.api.playstation.com/vulcan/img/rnd/202011/0714/vuF88yWPSnDfmFJVTyNJpVwW.png"
title="Marvel: Spiderman 66"
description="Example message here This is a new film came out this year check it out and buy many tickets ok!"
/>
<Card 
img="https://image.api.playstation.com/vulcan/img/rnd/202011/0714/vuF88yWPSnDfmFJVTyNJpVwW.png"
title="Marvel: Spiderman 66"
description="Example message here This is a new film came out this year check it out and buy many tickets ok!"
/>
<Card 
img="https://image.api.playstation.com/vulcan/img/rnd/202011/0714/vuF88yWPSnDfmFJVTyNJpVwW.png"
title="Marvel: Spiderman 66"
description="Example message here This is a new film came out this year check it out and buy many tickets ok!"
/> */}