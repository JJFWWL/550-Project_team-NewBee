import React from 'react'
import MenuBar from '../components/MenuBar'
import { Row, Avatar, Tooltip} from 'antd'

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
      height: 900,
      textAlign: 'center'
    }}>
<MenuBar/>

  <br/>
  <br/>
  <br/>
<br/>


  <h1 style={{fontFamily: 'fantasy', fontWeight:900, color:'white'}}> Welcome to FoodBook! </h1>
<br/>
  <h3 style={{fontFamily: 'fantasy', fontWeight:900, color:'white'}}> By Team NewBee </h3>

  <Tooltip title="Anqi Wang" placement="top">
  <Avatar size='large' src="https://media-exp1.licdn.com/dms/image/C5603AQHUyXY8955Yrw/profile-displayphoto-shrink_100_100/0/1517376536136?e=1655337600&v=beta&t=kPE8Ng1t8AgbKG0jfSMfovNiv3tBRVDQkptxcDck-3c" />
  </Tooltip>
  <Tooltip title="Guihe Li" placement="top">
  <Avatar size='large' src="https://media-exp1.licdn.com/dms/image/C5603AQFGjfq0rlZr_g/profile-displayphoto-shrink_100_100/0/1636671808069?e=1655337600&v=beta&t=HFLK44AZnocgTwgTc_2sxwe11dfk7Srfk7r1sQg9d_k" />
  </Tooltip>
  <Tooltip title="Jinjie Fan" placement="top">
  <Avatar size='large' src="https://media-exp1.licdn.com/dms/image/C5603AQGR566cbBkU5w/profile-displayphoto-shrink_100_100/0/1517820313625?e=1655337600&v=beta&t=cjmPKqViNHhPCoPGocGW_6Vn5ApQ2cI7oQgd05zJobs" />
  </Tooltip>
  <Tooltip title="Yusheng Ding" placement="top">
  <Avatar size='large' src="https://media-exp1.licdn.com/dms/image/C4D03AQE7s3cIUV2xQg/profile-displayphoto-shrink_400_400/0/1603326243216?e=1655337600&v=beta&t=S5suaZrf6kdSYcr3eTl1lWyjvfFjXTHDzxFzZiYozPQ" />
  </Tooltip>

    </div>
    )
  }
}


export default Home
