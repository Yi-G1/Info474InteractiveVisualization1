import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Box, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import DrilldownChart from './drilldownChart';
import {drilldownChart } from './constants';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        height: 100,
    },
}));

function StructureContent(props) {
    const classes = useStyles();
    const [subFunctionData, setsubFunctionData] = useState([]);
    const [mainFunctionData, setmainFunctionData] = useState([]);

    useEffect(() => {
        const functionSummary = { //data format obtained from backend
            Risk: [
                {
                    count: 8526,
                    sub_function: 'Risk',
                },
            ],
            Unknown: [
                {
                    count: 227,
                    sub_function: 'Unknown',
                },
            ],
            RBB: [
                {
                    count: 5459,
                    sub_function: 'Europe Retail and Business Banking',
                },
                {
                    count: 35568,
                    sub_function: 'UK Retail and Business Banking',
                },
            ],
            Wealth: [
                {
                    count: 7066,
                    sub_function: 'Wealth and Investment Management',
                },
            ],
            'O&T': [
                {
                    count: 2407,
                    sub_function: 'Sourcing',
                },
                {
                    count: 76322,
                    sub_function: 'Operations',
                },
                {
                    count: 4,
                    sub_function: 'Travel',
                },
                {
                    count: 1,
                    sub_function: '9YAQ - Technology and Information Servic',
                },
                {
                    count: 285,
                    sub_function: 'Corporate Security and Investigations',
                },
                {
                    count: 51092,
                    sub_function: 'Technology and Information Services',
                },
                {
                    count: 4187,
                    sub_function: 'Corporate Real Estate Services',
                },
                {
                    count: 229,
                    sub_function: 'Business Continuity Management',
                },
            ],
            'Legal, Compliance & Other': [
                {
                    count: 2022,
                    sub_function: 'Legal',
                },
                {
                    count: 1926,
                    sub_function: 'Corporate Relations',
                },
                {
                    count: 3212,
                    sub_function: 'Compliance',
                },
                {
                    count: 925,
                    sub_function: 'Internal Audit',
                },
                {
                    count: 222,
                    sub_function: 'Infrastructure Management',
                },
            ],
            Corporate: [
                {
                    count: 5986,
                    sub_function: 'Corporate Banking',
                },
            ],
            IB: [
                {
                    count: 13290,
                    sub_function: 'Investment Bank',
                },
                {
                    count: 15,
                    sub_function: 'TestClients Americas',
                },
            ],
            Africa: [
                {
                    count: 42834,
                    sub_function: 'TestClients Africa Group Limited',
                },
                {
                    count: 1,
                    sub_function: 'Unknown',
                },
            ],
            Finance: [
                {
                    count: 290,
                    sub_function: 'Strategy',
                },
                {
                    count: 1012,
                    sub_function: 'Treasury',
                },
                {
                    count: 9025,
                    sub_function: 'Finance',
                },
                {
                    count: 423,
                    sub_function: 'Tax',
                },
            ],
            HR: [
                {
                    count: 5633,
                    sub_function: 'Human Resources',
                },
            ],
            Other: [
                {
                    count: 131,
                    sub_function: 'Group Centre',
                },
            ],
            TestClientcard: [
                {
                    count: 2164,
                    sub_function: 'TestClientcard',
                },
            ],
        };
        //Formatting data according to drillDrown chart
        const mainFunction = [];
        const subFunctionDataValue = [];
        Object.keys(functionSummary).forEach(key => {
            const value = functionSummary[key];
            let i = 0;
            let sum = 0;
            let j = 0;
            const subFunction = [];
            for (i; i < value.length; i += 1) {
                sum += value[i].count;
            }
            mainFunction.push({ name: key, y: sum, drilldown: key });

            for (j; j < value.length; j += 1) {
                subFunction.push([value[j].sub_function, value[j].count]);
            }
            subFunctionDataValue.push({ name: key, id: key, data: subFunction });
        });

        setsubFunctionData(subFunctionDataValue);
        setmainFunctionData(mainFunction);
    }, []);

    return (
        <Box className="structureContent clearFix">
            <div className="graphSection">
                <Grid className={classes.root} container spacing={3}>
                    <Grid item xs={4}>
                        <Grid item xs={12}>
                            <div className="functionalContainer">
                                <div className="fontStyle">NO. OF FUNCTIONS</div>
                                <DrilldownChart
                                    drilldownChartConfig={drilldownChart}
                                    subFunctionData={subFunctionData}
                                    mainFunctionData={mainFunctionData}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </Box>
    );
}

export default StructureContent;
