import React from 'react'
import MenuBar from '../components/MenuBar'
import { Row, } from 'antd'

class Home extends React.Component {
  constructor(props) {
      super(props)
  }

  render() {
    return (
      <div style={{
      backgroundImage: `url("https://media.istockphoto.com/photos/wood-texture-table-top-with-blur-light-gold-bokeh-in-caferestaurant-picture-id1129661826?k=20&m=1129661826&s=612x612&w=0&h=-MUT00Fs2Qj9oZhly0c_EJKzpwkkMArzKv_lxbCDb1I=")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: 800
    }}>
<MenuBar/>

  <br/>
  <br/>
  <br/>
<br/>


  <h1 style={{textAlign:'center', fontFamily: 'Trebuchet MS, sans-serif', fontWeight:900, color:'white'}}> Welcome to our Yelp Project! </h1>
    </div>
    )
  }
}


export default Home
