//const React = require('react');
import React, { useEffect, useState } from 'react';
const ReactDOM = require('react-dom');
const { io } = require("socket.io-client");
const socket = io();

//import photos from database or any other information about films from database and pass all values dynamically to Card
//reference to Database here

function App(){
    return(
        <div className="wrapper">
            <Card 
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
            />
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

async function getFilms(page) {
    //const res = await fetch(`http://192.168.1.195/films/${page}`);
    const res = await fetch(`http://192.168.1.195:3000/films/1`);
    const json = await res.json();
    console.log(json);

    // event.preventDefault()
    // fetch("https://jsonplaceholder.typicode.com/todos/1")
    //     .then((response) => response.json())
    //     .then((json) => {
    //     console.log(json)
    //     window.location.reload()
    // })
}

ReactDOM.render(<App />, document.querySelector("#root"));
getFilms(1).catch(err => {
    console.log(err);
    // do something with the error here
});

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