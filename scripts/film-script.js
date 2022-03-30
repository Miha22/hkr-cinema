const React = require('react');
const ReactDOM = require('react-dom');

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

ReactDOM.render(<App />, document.querySelector("#root"));