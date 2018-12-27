import {connect} from 'react-redux';
import GroupedBarChart from '../components/GroupedBarChart';

const mapStateToProps=state=>{
    const testData=[
        {
            bank:'國泰',
            會員:6000,
            綁定車牌:2500,
            自助計費:2300
        },
        {
            bank:'中信',
            會員:12000,
            綁定車牌:1280,
            自助計費:1990
        },
        {
            bank:'台銀',
            會員:12000,
            綁定車牌:1280,
            自助計費:1990
        },
        {
            bank:'彰銀',
            會員:12000,
            綁定車牌:1280,
            自助計費:1910
        },
        {
            bank:'富邦',
            會員:12222,
            綁定車牌:1280,
            自助計費:1990
        },
        {
            bank:'其他',
            會員:12000,
            綁定車牌:1280,
            自助計費:1990
        }
    ];
    const testAutoPay=[
        {
            bank:'國泰',
            台北市:926,
            新北市:722,
            高雄市:562
        },
        {
            bank:'中信',
            台北市:856,
            新北市:432,
            高雄市:612
        },
        {
            bank:'台銀',
            台北市:856,
            新北市:612,
            高雄市:432
        },
        {
            bank:'彰銀',
            台北市:776,
            新北市:612,
            高雄市:432
        },
        {
            bank:'富邦',
            台北市:432,
            新北市:612,
            高雄市:856
        },
        {
            bank:'其他',
            台北市:856,
            新北市:612,
            高雄市:432
        }
    ]
    return {
        name:'test',
        data:testData,
        autoPay:testAutoPay
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