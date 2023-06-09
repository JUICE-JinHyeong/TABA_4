import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tab_WordCloud from './Tab_WordCloud';
import Tab_ReviewList from './Tab_ReviewList';
import Tab_Map from './Tab_Map';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, maxHeight: '100vh', overflow: 'auto' }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs({ data }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="워드 클라우드" {...a11yProps(0)} />
                    <Tab label="부정" {...a11yProps(1)} />
                    <Tab label="중립" {...a11yProps(2)} />
                    <Tab label="긍정" {...a11yProps(3)} />
                    <Tab label="지도" {...a11yProps(4)} />


                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Tab_WordCloud restId={data.id} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Tab_ReviewList restId={data.id} label="2"  />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Tab_ReviewList restId={data.id} label="1"  />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Tab_ReviewList restId={data.id} label="0"  />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <Tab_Map address={data.address}  />
            </TabPanel>


        </Box>
    );
}
