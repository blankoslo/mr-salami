import { Accordion, Typography, AccordionDetails } from "@mui/material"
import { Add } from "@mui/icons-material"
import MuiAccordionSummary, {
    AccordionSummaryProps,
  } from '@mui/material/AccordionSummary';

import WeekPicker from "components/WeekPicker";
import { fetchAllRestaurants } from "queries";
import { useQuery } from "@tanstack/react-query";
import { styled } from "@mui/material";
import { useState } from "react";
import CreateMultiplePizzaEventForm from "components/CreateMultiplePizzaEventForm";

function CreateMultiplePizzaEventsAccordion() {

    const { isLoading, error, data } = useQuery(
        ["restaurants"],
        fetchAllRestaurants
    )

    const [ accordionExpanded, setAccordionExpanded] = useState(false);

    const toggleAccordionExpanded = () => {
        setAccordionExpanded(!accordionExpanded);
    }

    return (
        <Accordion
            expanded={accordionExpanded}
        >
            <AccordionSummary 
                expandIcon={<Add />}
                sx={{ backgroundColor: "primary.light"}}
                aria-controls="panel1a-content"
                id="panel1a-header"
                onClick={toggleAccordionExpanded}
            >
                <Typography>Create multiple pizza events</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: "primary.light"}}>
                <CreateMultiplePizzaEventForm setAccordionStateCallback={setAccordionExpanded}/>
            </AccordionDetails>
      </Accordion>
    )
}

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
      expandIcon={<Add />}
      {...props}
    />
  ))(({ theme }) => ({
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(45deg)',
        },
  }));

export default CreateMultiplePizzaEventsAccordion;