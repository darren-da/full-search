import React, { Component } from 'react'
import { Row, Col, Card, Button, Tooltip, Select, Modal, message, Typography, Input } from "antd";
import { DragDropContext } from 'react-dnd'
import lodash from 'lodash'
import HTML5Backend from 'react-dnd-html5-backend'
import CubePane from './lib/CubePane';
import LabelRow from './lib/LabelRow'
import ChartTypeBar from './lib/ChartTypeBar'
import DimensionBox from './lib/DimensionBox'
import MeasureBox from './lib/MeasureBox'
import ChartView from './ChartView'
import FilterPanel from './lib/FilterPanel'
import * as ApiUtils from 'services/ApiUtils'
import SavePanel from './lib/SavePanel';

const ButtonGroup = Button.Group;
const Option = Select.Option;
const { Paragraph, Text } = Typography;

@DragDropContext(HTML5Backend)
class ChartDesign extends Component {

    state = {
        id: null,
        pkgId: null,
        dimsRow: [],
        dimsCol: [],
        measures: [],
        queryData: [],
        chartType: 'table',
        queryLoading: false,
        hejiType:'0',
        showFilterPanel: false,
        filterItem: null,
        showSavePanel: false,
        lmctMember: null,
        isLmctFixed: false
    }

    componentDidMount() {
        // ApiUtils.get('/config/dataset/findOne').then(res => {
        //     if(res.data){
        //         this.setState({})
        //     }
        // })
        if(this.props.data){
            let data = this.props.data
            let queryconfig = JSON.parse(data.queryConfig)
            this.setState({
                ...queryconfig,
                id: data.id,
                pkgId: data.pkgId,
                name: data.name,
                chartType: data.chartType
            })
        }
    }

    handleAddBoxItem = (member, boxType) => {
        if (boxType === 'dimsRow' || boxType === 'dimsCol' || boxType === 'measures') {
            let arr = [...this.state[boxType]]

            // if (lodash.includes(this.state.dimsRow, member)
            //     || lodash.includes(this.state.dimsCol, member)
            //     || lodash.includes(this.state.measures, member)) return;
            
            if(this.state.dimsRow.filter(item => item.id === member.id).length > 0
             ||this.state.dimsCol.filter(item => item.id === member.id).length > 0
             ||this.state.measures.filter(item => item.id === member.id).length > 0 ) return;

            arr.push(member)
            let obj = {}
            obj[boxType] = arr;

            //判断是否存在重复列名，如果存在需要修改字段别名
            if(this.state.dimsRow.filter(item => item.columnName === member.columnName).length > 0
             ||this.state.dimsCol.filter(item => item.columnName === member.columnName).length > 0
             ||this.state.measures.filter(item => item.columnName === member.columnName).length > 0 ) {
                 obj.lmctMember = member;
                 obj.lmctMember.asName = null;
                 obj.isLmctFixed = false;
             }

            this.setState(obj)
        }
    }

    handleRowColMoving = (fromBoxType, member, toBoxType) => {
        let arr = [...this.state[fromBoxType]]
        let arr2 = [...this.state[toBoxType]]
        lodash.remove(arr, member)
        arr2.push(member)
        let obj = {}
        obj[fromBoxType] = arr;
        obj[toBoxType] = arr2;
        this.setState(obj)
    }

    handleBoxItemSort = (dragIndex, hoverIndex, boxType) => {
        if (boxType === 'dimsRow' || boxType === 'dimsCol' || boxType === 'measures') {
            // console.log('handleBoxItemSort ? ', dragIndex, hoverIndex, boxType)
            let arr = [...this.state[boxType]]
            let dragItem = arr[dragIndex]
            arr.splice(dragIndex, 1)
            arr.splice(hoverIndex, 0, dragItem)
            let obj = {}
            obj[boxType] = arr;
            this.setState(obj)
        }
    }

    handltemRemove = (boxType, item) => {
        if (boxType === 'dimsRow' || boxType === 'dimsCol' || boxType === 'measures') {
            let arr = [...this.state[boxType]]
            lodash.remove(arr, item)
            let obj = {}
            obj[boxType] = arr;
            this.setState(obj)
        }
    }

    handleQuery = () => {
        this.setState({queryLoading: true});
        let params = {
            dimsRow: this.state.dimsRow,
            dimsCol: this.state.dimsCol,
            measures: this.state.measures,
            hejiType: this.state.hejiType,
        }

        ApiUtils.post('/api/query/getData', params).then(res => {

            if (res.result == 'success') {
                this.setState({ queryData: res.data })
            }
            this.setState({queryLoading: false});
        })
    }

    handleSaveQuery = (value) => {
        // this.setState({queryLoading: true});
        let queryconfig = {
            dimsRow: this.state.dimsRow,
            dimsCol: this.state.dimsCol,
            measures: this.state.measures,
            hejiType: this.state.hejiType,
        }

        let params = {
            name: value.name,
            queryConfig: JSON.stringify(queryconfig),
            chartType: this.state.chartType,
            pkgId: this.state.pkgId
        }

        if(this.state.id) params.id = this.state.id;

        ApiUtils.post('/api/query/save', params).then(res => {

            if (res.result == 'success') {
                this.setState({ id: res.data.id , showSavePanel: false})
                message.success('保存成功');
            }
            // this.setState({queryLoading: false});
        })
    }

    handleDimsMenuAction = (type, dimension) => {
        if(type === 'filter'){
            console.log('filter =====>', dimension)
            this.setState({showFilterPanel: true, filterItem: dimension})
        }
    }

    handFilterSet = (filters) => {
        //遍历维度数组查找对应维度并替换filters
        let dimension = {...this.state.filterItem, filters}
        let dimsCol = this.state.dimsCol.map(item =>  item.id === dimension.id ? dimension : item )
        let dimsRow = this.state.dimsRow.map(item =>  item.id === dimension.id ? dimension : item )
        this.setState({dimsCol: dimsCol, dimsRow: dimsRow, showFilterPanel: false, filterItem: null})
    }

    handleChangeChartType = (chartType) => {
        this.setState({ chartType: chartType });
    }

    handleChangeHeji = (value) => {
        this.setState({ hejiType: value });
    }

    handleLmctFix = (e) => {
        let value = e.target.value;
        let lmctMember = this.state.lmctMember;
        lmctMember.asName = value;

        //判断是否存在重复列名，如果存在需要修改字段别名
        if(value === '' || this.state.dimsRow.filter(item => item.columnName === value).length > 0
                ||this.state.dimsCol.filter(item => item.columnName === value).length > 0
                ||this.state.measures.filter(item => item.columnName === value).length > 0 ) {
            this.setState({isLmctFixed: false})
        }else{
            
            this.setState({lmctMember: lmctMember, isLmctFixed: true})
        }
    }

    render() {
        console.log('hhhhhh measures ', this.state.measures)

        return (
            <div style={{height: '100%'}} >
                <Row gutter={16} >
                    <Col span={5} >
                        <CubePane key="CubeTrees" pkgId={this.state.pkgId} onItemRemove={this.handltemRemove} onPkgChange={(pkgId) => this.setState({pkgId: pkgId})} />
                    </Col>
                    <Col span={19}>
                        <Card type="inner" bodyStyle={{ padding: 16 }}  >
                            <LabelRow lable="展示类型"> <ChartTypeBar onChange={this.handleChangeChartType} selected={this.state.chartType} /></LabelRow>
                            <LabelRow lable="行维(x维)" >
                                <DimensionBox boxType="dimsRow" items={this.state.dimsRow} 
                                    onAddBoxItem={this.handleAddBoxItem} 
                                    onItemSort={this.handleBoxItemSort}
                                    onRowColMoving={this.handleRowColMoving} 
                                    onMenuAction={this.handleDimsMenuAction} />
                            </LabelRow>
                            <LabelRow lable="列维(y维)">
                                <DimensionBox boxType="dimsCol" items={this.state.dimsCol} 
                                    onAddBoxItem={this.handleAddBoxItem} 
                                    onItemSort={this.handleBoxItemSort} 
                                    onRowColMoving={this.handleRowColMoving} 
                                    onMenuAction={this.handleDimsMenuAction} />
                            </LabelRow>
                            <LabelRow lable="指标">
                                <MeasureBox boxType="measures" items={this.state.measures} onAddBoxItem={this.handleAddBoxItem} onItemSort={this.handleBoxItemSort} />
                            </LabelRow>
                            <LabelRow lable="合计">
                                <Select onChange={this.handleChangeHeji} style={{width:200}} defaultValue="0">
                                    <Option value="0">不合计</Option>
                                    <Option value="1">不分组合计</Option>
                                    <Option value="9">分组合计</Option>
                                </Select>
                            </LabelRow>
                            <LabelRow lable="动作">
                                    <Tooltip placement="top" title="查询">
                                        <Button type="primary" icon="caret-right" onClick={this.handleQuery} style={{marginRight:10,fontSize: 20,}} loading={this.state.queryLoading} />
                                    </Tooltip>
                                    <Tooltip placement="top" title="清空">
                                        <Button type="default" icon="close" onClick={this.handleQuery} style={{marginRight:10,fontSize: 20,}}/>
                                    </Tooltip>
                                    <Tooltip placement="top" title="保存">
                                        <Button type="default" icon="save" onClick={() => this.setState({showSavePanel: true})} style={{marginRight:10,fontSize: 20,}}/>
                                    </Tooltip>
                                    <Tooltip placement="top" title="导出">
                                        <Button type="default" icon="export" onClick={this.handleQuery} style={{marginRight:10,fontSize: 20,}}/>
                                    </Tooltip>
                        
                            </LabelRow>
                        </Card>

                        <Card type="inner" bodyStyle={{ padding: 16 }} style={{ marginTop: 16 , height: 'calc(100% - 252px)'}}  >
                            <ChartView data={this.state.queryData} dimsRow={this.state.dimsRow} dimsCol={this.state.dimsCol} mesu={this.state.measures} chartType={this.state.chartType} />
                        </Card>
                    </Col>
                </Row>
                {this.state.showFilterPanel && 
                    <FilterPanel key={this.state.filterItem.id} visible={this.state.showFilterPanel} 
                                dimension={this.state.filterItem} 
                                onOk={this.handFilterSet}
                                onCancel={() => this.setState({showFilterPanel: false, filterItem: null})} />
                }
                
                <SavePanel showSavePanel={this.state.showSavePanel} name={this.state.name}
                        onCancel={() => this.setState({showSavePanel: false})} 
                        onSubmit={this.handleSaveQuery} />

                {this.state.lmctMember!=null && 
                    <Modal title="字段冲突修改" visible={true} 
                        footer={[<Button type="primary" onClick={()=>this.setState({lmctMember: null})} disabled={!this.state.isLmctFixed} >确定</Button>]}
                    >
                        <Typography>
                            <Paragraph>
                                <Text strong>{this.state.lmctMember.memberName}</Text>（字段：<Text code>{this.state.lmctMember.columnName}</Text>）
                                与数据集中其他字段名称冲突,  请修改别名。
                            </Paragraph>
                        </Typography>
                        <Input value={this.state.lmctMember.asName || this.state.lmctMember.columnName} onChange={this.handleLmctFix} />
                    </Modal>
                }
            </div>
        )
    }
}

export default ChartDesign