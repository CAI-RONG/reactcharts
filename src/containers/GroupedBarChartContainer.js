import {connect} from 'react-redux';
import GroupedBarChart from '../components/Charts/BarChart/GroupedBarChart';

const mapStateToProps=state=>{
    const testData=[
        {
            bank:'國泰',
            會員:6000,
            綁定信用卡:3000,
            綁定車牌:2500,
            自助計費:1990
        },
        {
            bank:'中信',
            會員:12000,
            綁定信用卡:7777,
            綁定車牌:1280,
            自助計費:10
        },
        {
            bank:'台銀',
            會員:12000,
            綁定信用卡:7777,
            綁定車牌:1280,
            自助計費:10
        },
        {
            bank:'彰銀',
            會員:12000,
            綁定信用卡:7777,
            綁定車牌:1280,
            自助計費:10
        },
        {
            bank:'富邦',
            會員:12222,
            綁定信用卡:7777,
            綁定車牌:1280,
            自助計費:10
        },
        {
            bank:'其他',
            會員:12000,
            綁定信用卡:7777,
            綁定車牌:1280,
            自助計費:100
        }
    ];
    return {
        name:'test',
        data:testData
    }
}

const mapDispatchToProps=dispatch=>{
    return {

    }
}

const GroupedBarChartContainer=connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupedBarChart);

export default GroupedBarChartContainer;