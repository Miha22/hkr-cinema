const React = require('react');
const ReactDOM = require('react-dom');

async function getSeats(film) {
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

function App(){
    return(
        <div className="wrapper">
            <Seat/>
        </div>
    );
}

function Seat() {
    return(
        <div className='seat-card-occupied'>
            <div className="seat-card-header-occupied">Occupied</div>
            <div className='seat-card-main'>
                <div className='seat-main-description-occupied'>Price: 9.99$</div>
            </div>
        </div>
    );
}

// getSeats(null).then(seats => {
//     //ReactDOM.render(<App />, document.querySelector("#root"));
//     // loadImages(films).then(films => {
//     //     console.log('Result: ' + films[0].img);
//     //     ReactDOM.render(App(films), document.querySelector("#root"));
//     // })

//     ReactDOM.render(App(films), document.querySelector("#root"));
// });

ReactDOM.render(<Seat/>, document.querySelector("#root"));
