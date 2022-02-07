import logo from './logo.svg';
import './App.css';
import { AppBar, Toolbar, Typography, TextField } from '@mui/material';
import useStateRef from 'react-usestateref';
import axios from 'axios'

function App() {


  const [myText, setMyText, myTextRef] = useStateRef('')

  const [myPic, setMyPic, myPicRef] = useStateRef('https://github.githubassets.com/images/icons/emoji/unicode/1f1ec-1f1f7.png?v8')

  const handleText = (e) => {
    setMyText(e.target.value)
    getResPic(myTextRef.current)
  }


 const  getResPic = text => {
  axios.get('https://api.github.com/emojis').then(result => {
      var json = result.data

      var keys = Object.keys(json)

      var isPresent =  keys.filter(el => el === myTextRef.current)

      if(isPresent.length === 1){
        setMyPic(json[myTextRef.current])
      }
    })
  }




  return (

    <div >
      <AppBar position='fixed'>
        <Toolbar>
          <Typography style={{ fontSize: '25px' }} > GitHub Fun </Typography>
        </Toolbar>
      </AppBar>


      <div style={{ width: '100vw', height: '100vh', backgroundColor: '#FBF8F1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>


        <div style={{ width: '450px', height: '450px', backgroundColor: '#B1D0E0', display: 'flex', flexDirection: 'column' }}>


          <TextField style={{ margin:'20px'  }} label="Type Here " variant="outlined" value={myTextRef.current} onChange={handleText} />


          <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', height: '100%' }}>
            <img alt="loading" style={{ width: '250px', }} src={myPicRef.current} />
          </div>


        </div>
      </div>


    </div>
  );
}

export default App;
