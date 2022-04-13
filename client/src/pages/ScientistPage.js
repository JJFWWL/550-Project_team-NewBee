import React from 'react';

import {
    Form,
    Input,
    Table,
    Cascader,
    Select,
    Row,
    Col,
    Divider,
    Space,
    Tabs,
    Button,
    Radio
} from 'antd'
import { SearchOutlined, StarFilled, DollarOutlined, CompassFilled } from '@ant-design/icons';
import { RadialChart } from 'react-vis';
import { format } from 'd3-format';

import MenuBar from '../components/MenuBar';
import {
    getStarDistribution,
    getPriceDistribution,
    getAverageRating,
    getAveragePrice,
    getBusinessPercentage
} from '../fetcher'
import { getSelectUnstyledUtilityClass } from '@mui/base';
import FormItem from 'antd/lib/form/FormItem';
const wideFormat = format('.3r');

const { Column, ColumnGroup } = Table;
const { TabPane } = Tabs;
const { Option } = Select;

class ScientistPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            regionQuery: 'state',
            stateNameQuery: '',
            cityNameQuery: '',
            zipNameQuery: '',
            StarDistribustion: [],

        }

        this.handleRegionQueryChange = this.handleRegionQueryChange.bind(this)
        this.handleStateNameQueryChange = this.handleStateNameQueryChange.bind(this)
        this.handleCityNameQueryChange = this.handleCityNameQueryChange.bind(this)
        this.handleZipNameQueryChange = this.handleZipNameQueryChange.bind(this)

        this.UpdateStarDistribution = this.UpdateStarDistribution.bind(this)

    }

    handleRegionQueryChange(e) {
        this.setState({
            regionQuery: e.target.value
        })
    }

    handleStateNameQueryChange(value) {
        this.setState({
            stateNameQuery: value
        })
    }

    handleCityNameQueryChange(value) {
        this.setState({
            cityNameQuery: value
        })
    }

    handleZipNameQueryChange(value) {
        this.setState({
            zipNameQuery: value
        })
    }

    getRegionTitle(value) {
        if (value === 'state') {
            return 'City'
        } else if (value === 'city') {
            return 'Postal Code'
        }
    }

    getRegionChild(region) {
        if (region === 'state') {
            return 'city'
        } else if (region === 'city') {
            return 'zip'
        }
    }


    UpdateStarDistribution() {
        getStarDistribution(this.state.regionQuery, this.state.stateNameQuery, null, null).then(res => {
            this.setState({
                StarDistribution: res.results
            })
        })

    }

    UpdateCityLevelStarDistribution(value) {
        this.handleCityNameQueryChange(value)
        getStarDistribution("city", this.state.cityQuery, null, null).then(res => {
            this.setState({
                StarDistribution: res.results
            })
        })
    }


    componentDidMount() {
        this.UpdateStarDistribution()
    }

    ratingTabs = () => (
        <div>
            <Row justify='center'>
                <h4>Business Rating</h4>
                <Divider />

                <Radio.Group defaultValue="state" buttonStyle="solid" onChange={this.handleRegionQueryChange} >
                    <Radio.Button value="state">State</Radio.Button>
                    <Radio.Button value="city">City</Radio.Button>
                    <Radio.Button value="zip">Postal Code</Radio.Button>
                </Radio.Group>
                <Divider />
                <Space>
                    <label>Select a state:</label>
                    <Select
                        defaultValue={"MA"}
                        onChange={this.handleStateNameQueryChange}
                    >
                        <Option value="MA">Massachusetts</Option>
                        <Option value="OH">Ohio</Option>
                        <Option value="OR">Oregon</Option>
                        <Option value="TX">Texas</Option>
                        <Option value="WA">Washington</Option>
                    </Select>
                    <Button type="primary" icon={<SearchOutlined />} size="medium" onClick={this.UpdateStarDistribution}>
                        Search
                    </Button>
                </Space>
                <Table dataSource={this.state.StarDistribution} pagination={{ pageSizeOptions: [10, 20], defaultPageSize: 20, showQuickJumper: true }}  >
                    {/* [{"city":"Oregon City",1star_count, 1star_percent} */}
                    <Column title={this.getRegionTitle(this.state.regionQuery)} dataIndex={this.getRegionChild(this.state.regionQuery)} key="action"
                        onCell={(record) => {
                            return {
                                onClick: () => {
                                    if (record.city != null) {
                                        this.handleCityNameQueryChange(record.city)
                                        this.handleRegionQueryChange({ target: { value: 'city' } })
                                    } else {
                                        this.handleZipNameQueryChange(record.zip)
                                        this.handleRegionQueryChange({ target: { value: 'zip' } })
                                    }
                                    this.UpdateStarDistribution()

                                }
                            }
                        }
                        }
                        render={(text, record) => (
                            <Space size="middle">
                                <a href='#section2' >{record.city}</a>
                            </Space>
                        )}
                    />
                    <Column title="1 Star Count" dataIndex="1star_count" key="1star_count" />
                    <Column title="1 Star Percentage" dataIndex="1star_percent" key="1star_percent" />
                    <Column title="2 Star Count" dataIndex="2star_count" key="2star_count" />
                    <Column title="2 Star Percentage" dataIndex="2star_percent" key="2star_percent" />
                    <Column title="3 Star Count" dataIndex="3star_count" key="3star_count" />
                    <Column title="3 Star Percentage" dataIndex="3star_percent" key="3star_percent" />
                    <Column title="4 Star Count" dataIndex="4star_count" key="4star_count" />
                    <Column title="4 Star Percentage" dataIndex="4star_percent" key="4star_percent" />
                    <Column title="5 Star Count" dataIndex="5star_count" key="5star_count" />
                    <Column title="5 Star Percentage" dataIndex="5star_percent" key="5star_percent" />
                </Table>
                <Divider />
                <RadialChart
                    data={[
                        {
                            angle: 20,
                            label: 'deck.gl'
                        },
                        {
                            angle: 20,
                            label: 'math.gl'
                        },
                        {
                            angle: 22,
                            label: 'probe.gl'
                        },
                        {
                            angle: 6,
                            label: 'vis.gl'
                        },
                        {
                            angle: 14,
                            label: 'react-map-gl'
                        }
                    ]}
                    labelsRadiusMultiplier={1.1}
                    labelsStyle={{
                        fontSize: 12
                    }}
                    showLabels
                />
            </Row>

        </div>
    );

    render() {
        return (

            <div>
                <MenuBar />

                <Tabs defaultActiveKey="1" centered type="card" size='large' >
                    <TabPane tab="Rating" key="1">
                        {this.ratingTabs()}
                    </TabPane>
                    <TabPane tab="Price" key="2">
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Map" key="3">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>
            </div >
        )
    }
}

export default ScientistPage
