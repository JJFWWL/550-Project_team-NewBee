import React from 'react';

import {
    Form,
    Input,
    Table,
    Pagination,
    Select,
    Row,
    Col,
    Divider,
    Slider,
    Rate,
    List,
    Avatar,
    Button,
    Switch,
    Skeleton,
    Typography,
    Tag,
    Space
} from 'antd'
import { format } from 'd3-format';

import MenuBar from '../components/MenuBar';
import { getUserByNameAndID, getBusinessByUserID, getUserByBusinessID } from '../fetcher'
import { getSelectUnstyledUtilityClass } from '@mui/base';
import FormItem from 'antd/lib/form/FormItem';
const wideFormat = format('.3r');

const { Column, ColumnGroup } = Table;

class FriendsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loginNameQuery: '',
            loginIDQuery: '',
            userNameQuery: '',
            userIDQuery: '__0cgHc1KI1O7WhflPTZFA',
            businessIDQuery: '',
            loginUserResults: [],
            businessResults: [],
            userResults: [],
            loginVisible: true,
            oneConnection: false,
            twoConnection: false
        }
        this.handleLoginNameQueryChange = this.handleLoginNameQueryChange.bind(this)
        this.handleLoginIDQueryChange = this.handleLoginIDQueryChange.bind(this)
        this.handleUserNameQueryChange = this.handleUserNameQueryChange.bind(this)
        this.handleUserIDQueryChange = this.handleUserIDQueryChange.bind(this)
        this.handleBusinessIDQueryChange = this.handleBusinessIDQueryChange.bind(this)
        // this.handleLoginSuccess = this.handleLoginSuccess.bind(this)
        this.updateLoginResult = this.updateLoginResult.bind(this)
        this.updateBusinessSearchResults = this.updateBusinessSearchResults.bind(this)
        this.updateUserSearchResults = this.updateUserSearchResults.bind(this)
    }

    handleLoginNameQueryChange(event) {
        this.setState({
            loginNameQuery: event.target.value
        })
    }
    handleLoginIDQueryChange(event) {
        this.setState({
            loginIDQuery: event.target.value
        })
    }


    handleUserNameQueryChange(event) {
        this.setState({
            userNameQuery: event.target.value
        })
    }

    handleUserIDQueryChange(event) {
        this.setState({
            userIDQuery: event.target.value
        })
    }

    handleBusinessIDQueryChange(event) {
        this.setState({
            businessIDQuery: event.target.value
        })
    }

    handleLoginSuccess() {
        this.setState({
            loginSuccess: true
        })
    }

    hideLoginRow() {
        this.setState({
            loginVisible: false
        })
    }




    updateLoginResult() {
        getUserByNameAndID(this.state.loginNameQuery, this.state.loginIDQuery, null, null).then(res => {
            this.setState({
                userIDQuery: res.results[0].user_id
            })
        })

        getBusinessByUserID(this.state.userIDQuery, null, null).then(res => {
            this.setState({
                businessResults: res.results
            })
        })


    }


    updateBusinessSearchResults() {
        getBusinessByUserID(this.state.userIDQuery, null, null).then(res => {
            this.setState({
                businessResults: res.results
            })
        })
    }

    updateUserSearchResults() {
        getUserByBusinessID(this.state.businessIDQuery, null, null).then(res => {
            this.setState({
                userResults: res.results
            })
        })
    }



    componentDidMount() {

        getUserByNameAndID(this.state.loginNameQuery, this.state.loginIDQuery, null, null).then(res => {
            this.setState({ loginUserResults: res.results })
        })

        getBusinessByUserID(this.state.login, null, null).then(res => {
            this.setState({ businessResults: res.results })
        })

        getUserByBusinessID(this.state.businessIDQuery, null, null).then(res => {
            this.setState({ userResults: res.results })
        })

    }

    login = () => {
        return (
            <div>
                <Divider orientation="left">
                    <h3>Login</h3>
                </Divider>
                <Row key={"login"}>
                    <Col span={12} offset={3}>
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                                value={this.state.loginNameQuery}
                                onChange={this.handleLoginNameQueryChange}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                                value={this.state.loginIDQuery}
                                onChange={this.handleLoginIDQueryChange}

                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit" onClick={this.updateLoginResult}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }

    // oneConnectionBusiness()


    render() {
        return (

            <div>

                <MenuBar />
                <div className="container" >
                    {this.login()}
                </div>
                <Divider orientation="left">
                    <h3>1-Connection</h3>
                </Divider>

                <div style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <div class="section one" id="section1" style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                        <h5>Favorite Business</h5>
                        <Table dataSource={this.state.businessResults} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}  >
                            {/* RP.business_id,Business.name,Business.address,Business.city,Business.State */}
                            <Column title="Name" dataIndex="name" key="name" />
                            <Column title="Address" dataIndex="address" key="address" />
                            <Column title="City" dataIndex="city" key="city" />
                            <Column title="State" dataIndex="State" key="State" />
                            <Column
                                title="Top Fans"
                                dataIndex="business_id"
                                key="action"
                                onCell={(record) => {
                                    return {
                                        onClick: () => {
                                            getUserByBusinessID(record.business_id, null, null).then(res => {
                                                this.setState({ userResults: res.results })
                                            })
                                        }
                                    }
                                }
                                }
                                render={(text, record) => (
                                    <Space size="middle">
                                        <a href='#section2' >Show Fans</a>
                                    </Space>
                                )}
                            />
                        </Table>
                    </div>
                    <div class="section two" id="section2" style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                        <h5>Top fans</h5>
                        {/* <Form label="One Connection">
                            <Switch defaultChecked checkedChildren="1-Connection ON" unCheckedChildren="1-Connection OFF" onChange={() => { this.setState({ oneConnection: !this.state.oneConnection }) }} />
                        </Form>
                        <Form label="two Connection">
                            <Switch defaultChecked checkedChildren="2-Connection ON" unCheckedChildren="2-Connection OFF" onChange={() => { this.setState({ twoConnection: !this.state.twoConnection }) }} />
                        </Form> */}
                        <Table dataSource={this.state.userResults} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}  >
                            {/* RP.business_id,Business.name,Business.address,Business.city,Business.State */}
                            <Column title="User_ID" dataIndex="user_id" key="user_id" />
                            <Column title="Name" dataIndex="name" key="name" />
                            <Column title="N-Connection" dataIndex="N" key="N"
                                filters={[
                                    { text: '1-connection', value: 1 },
                                    { text: '2-connection', value: 2 },
                                ]}
                                filterMode='tree'
                                filterSearch={true}
                                onFilter={(value, record) => record.N == value}
                            />
                        </Table>
                    </div>


                </div >
            </div >
        )
    }
}

export default FriendsPage

