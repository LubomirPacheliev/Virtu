import { AdvancedChart } from "react-tradingview-embed";

const Chart = props => {
    return ( 
        <article className="chart" id="tradingview_82f39">
            <AdvancedChart widgetProps={props.widgetProps} />
        </article>
    );
}
 
export default Chart;