import React, { useState } from 'react'

import { Form, Input, Table, Row, Col, Divider, BackTop, Button, Space, Spin, Select, Switch } from 'antd'
import { Scatter, Facet } from '@ant-design/plots';
import { format } from 'd3-format';

import MenuBar from '../components/MenuBar';
import { getUserByNameAndID, getBusinessByUserID, getUserByBusinessID } from '../fetcher'
import { getSelectUnstyledUtilityClass } from '@mui/base';


const wideFormat = format('.3r');

const { Column, ColumnGroup } = Table;

const ScatterPlot = (props) => {
    const config = {
        data: props.data,
        xField: 'name',
        yField: 'review_count',
        colorField: 'N',
        size: 5,
        shape: 'circle',
        pointStyle: {
            fillOpacity: 1,
        },
        yAxis: {
            title: { text: 'Review Count' },
            nice: true,
            line: {
                style: {
                    stroke: '#aaa',
                },
            },
            min: 0,
            max: 2500,
        },
        xAxis: {
            title: { text: 'Name' }
        },
        legend: false,

        meta: {
            name: {
                alias: 'Name',
                nice: true,
            },
            review_count: {
                alias: 'Review Count',
                nice: true,
            },
            N: {
                alias: 'Connection Level',
                nice: true,
            },
        },

        brush: {
            enabled: true,
            mask: {
                style: {
                    fill: 'rgba(255,0,0,0.15)',
                },
            },
        },
    };
    return <Scatter {...config
    } />;
};


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
            loading: false,
            showUser: false,
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
            console.log(res.results[0]);
            this.setState({
                userIDQuery: res.results[0].user_id
            })
            getBusinessByUserID(res.results[0].user_id, null, null).then(res1 => {
                console.log("business result" + res1.results);
                this.setState({
                    businessResults: res1.results
                });
                this.setState({ loginVisible: false });
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

        // getUserByNameAndID(this.state.loginNameQuery, this.state.loginIDQuery, null, null).then(res => {
        //     this.setState({ loginUserResults: res.results })
        // })

        // getBusinessByUserID(this.state.login, null, null).then(res => {
        //     this.setState({ businessResults: res.results })
        // })

        // getUserByBusinessID(this.state.businessIDQuery, null, null).then(res => {
        //     this.setState({ userResults: res.results })
        // })

    }

    login = () => {
        return (
            <div>
                <Divider orientation="left">
                    <h3>Login</h3>
                </Divider>
                <Row key={"login"} id={"login"}>
                    <Col span={12} offset={3}>
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Input username (Valid sample name: Don)' }]}
                                value={this.state.loginNameQuery}
                                onChange={this.handleLoginNameQueryChange}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Input password (Valid sample password: CEcCz0Z)' }]}
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
                    {this.state.loginVisible ? this.login() : null}
                </div>
                {this.state.businessResults.length > 0 ?

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
                                                this.setState({
                                                    loading: true,
                                                    userResults: []
                                                });

                                                getUserByBusinessID(record.business_id, null, null).then(res => {
                                                    console.log("userresult returned" + res.results);
                                                    this.setState({
                                                        loading: false,
                                                        userResults: res.results
                                                    })
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
                        {this.state.userResults.length > 0 ?
                            <div class="section two" id="section2" style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>

                                <h5>Top fans</h5>
                                <Table dataSource={this.state.userResults} pagination={{ pageSizeOptions: [10, 50], defaultPageSize: 10, showQuickJumper: true }}  >
                                    {/* RP.business_id,Business.name,Business.address,Business.city,Business.State */}
                                    <Column title="Name" dataIndex="name" key="name" />
                                    <Column title="Review Count" dataIndex="review_count" key="review_count" />
                                    <Column title="Yelping Since" dataIndex="yelping_since" key="yelping_since" />
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
                                <h3>User Scatter Plot </h3>
                                <ScatterPlot data={this.state.userResults} />
                            </div> : this.state.loading ? <Spin size='large' /> : null}
                        <footer><br /><br /><br /><p style={{ textAlign: 'center', fontFamily: 'Trebuchet MS, sans-serif', backgroundColor: '#041527', color: 'white' }}>CIS550 Project ©2022 Created by Team NewBee</p></footer>
                        <BackTop />
                    </div > : null}
            </div >
        )
    }
}

export default FriendsPage

