import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ListItem, ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AssistantDirectionIcon from '@mui/icons-material/AssistantDirection';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

export default function ServiceCard(props) {
    const { services, selectedService, currentLocation } = props
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    React.useEffect(() => {
        if (services[selectedService]) {
            setExpanded(selectedService)
        }
    }, [services, selectedService]);
    return (
        <>
            {services[selectedService] &&
                <>
                    <Divider sx={{ m: 5 }}>نتائج البحث</Divider>
                    <Accordion key={selectedService} expanded={expanded === selectedService} onChange={handleChange(selectedService)}>
                        <AccordionSummary
                            dir="rtl"
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography dir="rtl" sx={{ width: '100%', flexShrink: 0 }}>
                                {services[selectedService].name[0]}
                            </Typography>

                        </AccordionSummary>
                        <AccordionDetails>
                            {services[selectedService].name.map((_, i) => {
                                return (
                                    <div key={i}>
                                        <Divider />
                                        <ListItem>
                                            <ListItemText
                                                primary={services[selectedService].address[i]}
                                                secondary={currentLocation.lat != 0.0 && currentLocation.lng != 0.0 ? services[selectedService].distance[i].value + " " + services[selectedService].distance[i].unit : ""}
                                            />
                                            <IconButton key="phonecall" href={"tel:" + services[selectedService].contactNumber[i]} aria-label="phonecall" size="large">
                                                <LocalPhoneIcon />
                                            </IconButton>
                                            <IconButton key="location" href={currentLocation.lat != 0 && currentLocation.lng != 0 ? "https://www.google.com/maps/dir/?api=1&origin=" + currentLocation.lat + "," + currentLocation.lng + "&destination=" + services[selectedService].coordinate[i].lat + ',' + services[selectedService].coordinate[i].lng
                                                : "https://www.google.com/maps/@" + services[selectedService].coordinate[i].lat + ',' + services[selectedService].coordinate[i].lng + ",15z"} aria-label="location" size="large">
                                                <AssistantDirectionIcon />
                                            </IconButton>
                                        </ListItem>
                                    </div>
                                )
                            })}
                        </AccordionDetails>
                    </Accordion>
                    <Divider sx={{ m: 5 }}>جميع الخدمات</Divider>
                </>}
            {Object.values(services).map((service, index) => {
                return (
                    <Accordion key={index} expanded={expanded === 'panel' + (index + 1).toString()} onChange={handleChange('panel' + (index + 1).toString())}>
                        <AccordionSummary
                            dir="rtl"
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography dir="rtl" sx={{ width: '100%', flexShrink: 0 }}>
                                {service.name[0]}
                            </Typography>

                        </AccordionSummary>
                        <AccordionDetails>
                            {service.name.map((_, i) => {
                                return (
                                    <div key={i}>
                                        <Divider />
                                        <ListItem>
                                            <ListItemText
                                                
                                                primary={service.address[i]}
                                                secondary={currentLocation.lat != 0.0 && currentLocation.lng != 0.0 ? service.distance[i].value + " " +  service.distance[i].unit : ""}
                                            />
                                            <IconButton key="phonecall" href={"tel:" + service.contactNumber[i]} aria-label="phonecall" size="large">
                                                <LocalPhoneIcon />
                                            </IconButton>
                                            <IconButton key="location" href={currentLocation.lat != 0 && currentLocation.lng != 0 ? "https://www.google.com/maps/dir/?api=1&origin=" + currentLocation.lat + "," + currentLocation.lng + "&destination=" + service.coordinate[i].lat + ',' + service.coordinate[i].lng
                                                : "https://www.google.com/maps/search/?api=1&query=" + service.coordinate[i].lat + ',' + service.coordinate[i].lng} aria-label="location" size="large">
                                                <AssistantDirectionIcon />
                                            </IconButton>
                                            
                                        </ListItem>
                                    </div>
                                )
                            })}
                        </AccordionDetails>
                    </Accordion>)
            })
            }
        </>
    );
}
