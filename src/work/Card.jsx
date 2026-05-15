import profile  from 'C:/Users/ramua/OneDrive/Desktop/AL/my-react-app/src/assets/spydie.png';


function Card(){
     const styles={
          border:"2px solid rgba(20, 20, 20, 0.312)",
          maxWidth: "250px",
          textAlign: "center",
          boxShadow:"5px 5px 5px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          padding:"10px",
          margin:"20px"
     }
     return(
          <div style={styles}>
               <img src={profile} height="250px" alt="profile"></img>
               <h2>I am Lakshman</h2>
               <p>i am learning React to develop frontend</p>
          </div>
     );
}

export default Card;