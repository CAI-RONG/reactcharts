import React from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap/lib';

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
        this.handleCompetitorChange=this.handleCompetitorChange.bind(this);
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

    handleCompetitorChange(e){
        this.props.competitorNumChange(e.target.value);
    }

    render(){
        var dropdown_competitor;
        switch(this.props.duration){
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
        var errorText='';
        if(this.props.duration==='year'){
            if(this.props.competitor==='month')
                if(parseInt(this.props.this.props.competitorNumber)>12)errorText='Out of range!';
            if(this.props.competitor==='week')
                if(parseInt(this.props.competitorNumber)>52)errorText='Out of range!';
        }
        else if(this.props.duration==='month'){
            if(this.props.competitor==='week')
                if(parseInt(this.props.competitorNumber)>4)errorText='Out of range!';
            if(this.props.competitor==='day')
                if(parseInt(this.props.competitorNumber)>30)errorText='Out of range!';
        }
        else if(this.props.duration==='week'){
            if(parseInt(this.props.competitorNumber)>7)errorText='Out of range!';
        }

        return (
            <div>
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
                <input id='competitor' style={{marginLeft:10,width:60}} type="text" onChange={this.handleCompetitorChange} />
                {dropdown_competitor}
                <text style={{color:'#ff0000'}}>{errorText}</text>
            </div>
        )
    }
}