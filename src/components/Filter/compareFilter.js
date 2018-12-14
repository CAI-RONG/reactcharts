import React from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap/lib';

export default class CompareFilter extends React.Component{
    constructor(){
        super();
        this.state={
            title_duration:'年',
            title_competitor:'週',
            duration:'year',
            competitor:'week',
            competitorNum:undefined
        }
        this.handleCompetitorClick=this.handleCompetitorClick.bind(this);
        this.handleDurationClick=this.handleDurationClick.bind(this);
        this.handleCompetitorChange=this.handleCompetitorChange.bind(this);
    }

    validate(){
        if(this.state.duration==='year'){
            if(this.state.competitor==='month'){
                if(parseInt(this.state.competitorNum)>12){return false;}
            }
            else if(this.state.competitor==='week'){
                if(parseInt(this.state.competitorNum)>52){return false;}
            }
        }
        else if(this.state.duration==='month'){
            if(this.state.competitor==='week'){
                if(parseInt(this.state.competitorNum)>4){return false;}
            }
            else if(this.state.competitor==='day'){
                if(parseInt(this.state.competitorNum)>30){return false;}
            }
        }
        else if(this.state.duration==='week'){
            if(parseInt(this.state.competitorNum)>7){return false;}
        }
        return true;
    }

    unitTransform(unit){
        switch(unit){
            case 'year':
                return '年';
            case 'month':
                return '月';
            case 'week':
                return '週';
            case 'day':
                return '天';
            default:
                return console.log("Error");
        }
    }

    handleDurationClick(filter){
        this.setState({title_competitor:filter==='week'?'天':'週'});
        this.setState({title_duration:this.unitTransform(filter),duration:filter,competitorNum:''});
        document.getElementById('competitor').value='';
        this.props.competitorNumChange(1);
        this.props.compareDurationChange(filter);
    }

    handleCompetitorClick(filter){
        this.setState({title_competitor:this.unitTransform(filter),competitor:filter,competitorNum:''});
        document.getElementById('competitor').value='';
        this.props.competitorNumChange(1);
        this.props.compareCompetitorChange(filter);
    }

    handleCompetitorChange(e){
        this.setState({competitorNum:e.target.value});
        if(this.validate())
            this.props.competitorNumChange(parseInt(e.target.value));
    }

    render(){
        var dropdown_competitor;
        switch(this.state.duration){
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
        if(!this.validate())
            errorText='Out of range!';

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
                <input id='competitor' style={{marginLeft:10,width:60}} type="text" onBlur={this.handleCompetitorChange} />
                {dropdown_competitor}
                <text style={{color:'#ff0000'}}>{errorText}</text>
            </div>
        )
    }
}