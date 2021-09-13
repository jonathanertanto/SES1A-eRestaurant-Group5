import React, { useLayoutEffect, useState, useEffect} from "react";
import context from "react-bootstrap/esm/AccordionContext";
import { Row, Col, Button, Container } from "reactstrap";
import anime from "animejs";
import {Helmet} from "react-helmet";


/*
    anime.timeline()
        .add({
            targets: '.ml5 .line',
            opacity: [0.5,1],
            scaleX: [0, 1],
            easing: "easeInOutExpo",
            duration: 1000
        })
        .add({
            targets: '.ml5 .line',
            duration: 1000,
            easing: "easeOutExpo",
            translateY: (el, i) => (-0.625 + 0.625*2*i) + "em"
        }).add({
            targets: '.ml5 .letters-left',
            opacity: [0,1],
            translateX: ["0.5em", 0],
            easing: "easeOutExpo",
            duration: 1500,
            offset: '-=300'
        }).add({
            targets: '.ml5 .letters-right',
            opacity: [0,1],
            translateX: ["-0.5em", 0],
            easing: "easeOutExpo",
            duration: 1500,
            offset: '-=600'
        }).add({
            targets: '.ml5',
            opacity: 0,
            duration: 2000,
            easing: "easeOutExpo",
            delay: 1000
        });

*/

 
export default props => {
    function App() {
        const animationRef = React.useRef(null);
        React.useEffect(() => {
          animationRef.current = anime({
            targets: ".el",
            translateX: 250,
            delay: function(el, i) {
              return i * 100;
            },
            loop: true,
            direction: "alternate",
            easing: "easeInOutSine"
          });
        }, []);
    }

    function Animation() { 
        anime.timeline({loop: true})
        .add({
            targets: '.ml5 .line',
            opacity: [0.5,1],
            scaleX: [0, 1],
            easing: "easeInOutExpo",
            duration: 1000
        }).add({
            targets: '.ml5 .line',
            duration: 1000,
            easing: "easeOutExpo",
            translateY: (el, i) => (-0.625 + 0.625*2*i) + "em"
        }).add({
            targets: '.ml5 .letters-left',
            opacity: [0,1],
            translateX: ["0.5em", 0],
            easing: "easeOutExpo",
            duration: 1500,
            offset: '-=300'
        }).add({
            targets: '.ml5 .letters-right',
            opacity: [0,1],
            translateX: ["-0.5em", 0],
            easing: "easeOutExpo",
            duration: 1500,
            offset: '-=600'
        }).add({
            targets: '.ml5',
            opacity: 0,
            duration: 2000,
            easing: "easeOutExpo",
            delay: 1000
        });
    }

   
  return (
<>
    
    <header>
        <section>
        <div >
          <h1 className="ml5 App">
              <span className="text-wrapper">
                  <span className="line line1"></span>
                  <span className="letters letters-left">Le Bistrot</span>
                  <span className="letters letters-right">d'Andre</span>
                  <span className="line line2"></span>
              </span>
          </h1>
      </div>
      
      <div>
            <Button
            onClick={_ => {
                props.setPage(1);
              }}
            className = "center booking-btn">
               BOOK A TABLE
            </Button>
     </div>
     </section>
</header>
    <section className = "container-info">
     <div className = "info-box left">

         <img src =  "https://www.crownsydney.com.au/getmedia/ad5ae0e2-2872-4fbe-bf54-601b12baee97/210420-Crown-Sydney-Restaurant-Epicurean-0099-6496x4872.jpg"/>
            <div className ="info-box-text center">
            
                Lunch = 12:00 - 15:00  <br></br>

                 Dinner = 18:00 - 23:00

            </div>
    </div>
     <div className = "info-box right">
        <img src="https://i.pinimg.com/564x/77/c5/e7/77c5e7acb0f6e244bfeed141f19b8b71.jpg"/>
            <div className  = "info-box-text center">
                 Dining 
            </div>
    </div>

    </section>
        
    <section class = "container-about">
    <h2>About</h2>
        <h1>Le Bistrot d'Andre</h1>
        <article>
            Experience a unique French fine dining at Le Bistrot d'Andre, with enlightened “open kitchens” serving you the finest flavours from some of the most exciting cuisines.
            Le Bistrot d'Andre is the all-in-one venue to celebrate moments and create memories.
        </article>
    </section>
    
   
    <footer>
        <div class="footer-widget">

        </div>
    </footer>

    
    
</>
  );
};


/*

class Homepage extends React.Component {
    myRef = React.createRef();
    labelRef = React.createRef();
    
    Animation() { 
        anime.timeline({loop: true})
        .add({
            targets: this.myRef.current,
            opacity: [0.5,1],
            scaleX: [0, 1],
            easing: "easeInOutExpo",
            duration: 1000
        }).add({
            targets: this.labelRef.current,
            duration: 1000,
            easing: "easeOutExpo",
            translateY: (el, i) => (-0.625 + 0.625*2*i) + "em"
        }).add({
            targets: '.ml5 .letters-left',
            opacity: [0,1],
            translateX: ["0.5em", 0],
            easing: "easeOutExpo",
            duration: 1500,
            offset: '-=300'
        }).add({
            targets: '.ml5 .letters-right',
            opacity: [0,1],
            translateX: ["-0.5em", 0],
            easing: "easeOutExpo",
            duration: 1500,
            offset: '-=600'
        }).add({
            targets: '.ml5',
            opacity: 0,
            duration: 2000,
            easing: "easeOutExpo",
            delay: 1000
        });
    }

    render(){
        return (
            <>
            <div className="title">
          <h1 className="ml5">
              <span className="text-wrapper">
                  <span className="line line1"></span>
                  <span className="letters letters-left">Le Bistrot</span>
                  <span className="letters letters-right">d'Andre</span>
                  <span className="line line2"></span>
              </span>
          </h1>
      </div>

      <div className = "">
            <Button
            className = "center booking-btn"
            onClick={_ => {
                this.setPage(1);
              }}>
               BOOK A TABLE
            </Button>
     </div>

    <section className = "container-info">
     <div className = "info-box left">

         <img src =  "https://www.crownsydney.com.au/getmedia/ad5ae0e2-2872-4fbe-bf54-601b12baee97/210420-Crown-Sydney-Restaurant-Epicurean-0099-6496x4872.jpg"/>
            <div className ="info-box-text center">
            
                Lunch = 12:00 - 15:00  <br></br>

                 Dinner = 18:00 - 23:00

            </div>
    </div>
     <div className = "info-box right">
        <img src="https://i.pinimg.com/564x/77/c5/e7/77c5e7acb0f6e244bfeed141f19b8b71.jpg"/>
            <div className  = "info-box-text center">
                 Dining 
            </div>
    </div>

    </section>
        
    <section class = "container-about">
    <h2>About</h2>
        <h1>Le Bistrot d'Andre</h1>
        <article>
            Experience a unique French fine dining at Le Bistrot d'Andre, with enlightened “open kitchens” serving you the finest flavours from some of the most exciting cuisines.
            Le Bistrot d'Andre is the all-in-one venue to celebrate moments and create memories.
        </article>
    </section>
    
    
    <footer>
        <div class="footer-widget">

        </div>
    </footer>

    
    {this.Animation()}

    
            </>
        )
    };
};

export default Homepage;

*/
   // client/static/homepage.html 