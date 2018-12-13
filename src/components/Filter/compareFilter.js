import React from 'react';
import {DropdownButton, MenuItem, Button, Row, Col, Glyphicon} from 'react-bootstrap/lib';
import Modal from 'react-modal';
import LineChart from '../Charts/LineChart/LineChart';

export default class CompareFilter extends React.Component{
    constructor(){
        super();
        this.state={
            title_duration:'年',
            title_competitor:'週',
            show:false
        }
        this.handleCompetitorClick=this.handleCompetitorClick.bind(this);
        this.handleDurationClick=this.handleDurationClick.bind(this);
        this.handleShow=this.handleShow.bind(this);
        this.handleClose=this.handleClose.bind(this);
    }

    handleDurationClick(filter){
        this.props.compareDurationChange(filter);
        this.setState({title_competitor:filter==='week'?'天':'週'});
        switch(filter){
            case 'year':
                this.setState({title_duration:'年'});
                break;
            case 'month':
                this.setState({title_duration:'月'});
                break;
            case 'week':
                this.setState({title_duration:'週'});
                break;
            default:
                return console.log("Error!");
        }
    }

    handleCompetitorClick(filter){
        this.props.compareCompetitorChange(filter);
        switch(filter){
            case 'month':
                this.setState({title_competitor:'月'});
                break;
            case 'week':
                this.setState({title_competitor:'週'});
                break;
            case 'day':
                this.setState({title_competitor:'天'});
                break;
            default:
                return console.log("Error!");
        }
    }

    handleShow(){
        this.setState({show:true});
        this.props.competitorNumChange(document.getElementById('competitor').value);
    }

    handleClose(){
        this.setState({show:false});
    }

    render(){
        var dropdown_competitor;
        switch(this.props.durationFilter){
            case 'year':
                dropdown_competitor=(
                    <DropdownButton style={{marginLeft:10}} id="compare-competitor" bsStyle="primary" title={this.state.title_competitor} noCaret>
                        <MenuItem onClick={()=>this.handleCompetitorClick('week')}>
                        週</MenuItem>
                        <MenuItem onClick={()=>this.handleCompetitorClick('month')}>
                        月</MenuItem>
                    </DropdownButton>
                );
                break;
            case 'month':
                dropdown_competitor=(
                    <DropdownButton style={{marginLeft:10}} id="compare-competitor" bsStyle="primary" title={this.state.title_competitor} noCaret>
                        <MenuItem onClick={()=>this.handleCompetitorClick('week')}>
                        週</MenuItem>
                        <MenuItem onClick={()=>this.handleCompetitorClick('day')}>
                        天</MenuItem>
                    </DropdownButton>
                );
                break;
            case 'week':
                dropdown_competitor=(
                    <DropdownButton style={{marginLeft:10}} id="compare-competitor" bsStyle="primary" title={this.state.title_competitor} noCaret>
                        <MenuItem onClick={()=>this.handleCompetitorClick('day')}>
                        天</MenuItem>
                    </DropdownButton>
                );
                break;
            default:
                dropdown_competitor=(
                    <DropdownButton style={{marginLeft:10}} id="compare-competitor" bsStyle="primary" title={this.state.title_competitor} noCaret>
                        <MenuItem onClick={()=>this.handleCompetitorClick('month')}>
                        月</MenuItem>
                        <MenuItem onClick={()=>this.handleCompetitorClick('week')}>
                        週</MenuItem>
                    </DropdownButton>
                );
                break;
        }

        return (
            <div style={{display:'inline-flex',alignItems:'center'}}>
                <span>每</span>
                <DropdownButton style={{marginLeft:10}} id="compare-duration" bsStyle="primary" title={this.state.title_duration} noCaret>
                    <MenuItem onClick={()=>this.handleDurationClick('year')}>
                    年</MenuItem>
                    <MenuItem onClick={()=>this.handleDurationClick('month')}>
                    月</MenuItem>
                    <MenuItem onClick={()=>this.handleDurationClick('week')}>
                    週</MenuItem>
                </DropdownButton>
                <span style={{marginLeft:10}}>第</span>
                <input id='competitor' style={{marginLeft:10,width:60}} type="text" />
                {dropdown_competitor}
                <Button style={{marginLeft:30}} bsStyle='primary' onClick={this.handleShow}>GO</Button>
                <Modal style={{overlay:{zIndex:1000},content:{top:'50%',left:'50%',right:'auto',bottom:'auto',marginRight:'-50%',transform:'translate(-50%, -50%)',width:'70%',height:'70%'}}} isOpen={this.state.show} onRequestClose={this.handleClose}>
                    <h2 style={{marginBottom:30}}>Top 10 Banks<Glyphicon glyph='remove' onClick={this.handleClose} style={{float:'right'}}/></h2>
					<Row>
                        <Col lg={3}>
                            <LineChart name="download_compare" data={this.props.data} width='100%' />
                        </Col>
                        <Col lg={3}>
                            <LineChart name="member_compare" data={this.props.data} width='100%' />
                        </Col>
                        <Col lg={3}>
                            <LineChart name="bind_compare" data={this.props.data} width='100%' />
                        </Col>
                        <Col lg={3}>
                            <LineChart name="subscribe_compare" data={this.props.data} width='100%' />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4}>
                            <LineChart name="MAU_compare" data={this.props.data} width='100%' />
                        </Col>
                        <Col lg={4}>
                            <LineChart name="WAU_compare" data={this.props.data} width='100%' />
                        </Col>
                        <Col lg={4}>
                            <LineChart name="DAU_compare" data={this.props.data} width='100%' />
                        </Col>
                    </Row>
					<Button style={{float:'right'}} onClick={this.handleClose}>Close</Button>
                </Modal>
            </div>
        )
    }
}