// Plotting chart after receiving data
import React from 'react';
import Highcharts from 'highcharts';
import drilldown from 'highcharts/modules/drilldown';
import HighchartsReact from 'highcharts-react-official';
import PropTypes from 'prop-types';

drilldown(Highcharts);

const DrilldownChart = ({ drilldownChartConfig, subFunctionData, mainFunctionData }) => {
    return (
        <div className="drilldownChart">
            <HighchartsReact
                highcharts={Highcharts}
                options={{
                    ...drilldownChartConfig,
                    series: [
                        {
                            name: '',
                            colorByPoint: true,
                            data: mainFunctionData,
                        },
                    ],
                    drilldown: {
                           activeAxisLabelStyle: {  //to change size, color etc. properties of font
                            textDecoration: 'none',
                            fontStyle: 'italic'
                        },
                        activeDataLabelStyle: {
                            textDecoration: 'none',
                            fontStyle: 'italic'
                        },
                        series: subFunctionData,
                    },
                }}
            />
        </div>
    );
};

DrilldownChart.propTypes = {
    drilldownChartConfig: PropTypes.object.isRequired,
    subFunctionData: PropTypes.array.isRequired,
    mainFunctionData: PropTypes.array.isRequired,
};

export default DrilldownChart;
