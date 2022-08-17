import { Accordion, Typography, AccordionDetails } from "@mui/material"
import { Add } from "@mui/icons-material"
import MuiAccordionSummary, {
    AccordionSummaryProps,
  } from '@mui/material/AccordionSummary';

import CreatePizzaEventForm from "./CreatePizzaEventForm";
import { useTheme } from "@emotion/react";
import { styled } from "@mui/material";

function CreatePizzaEventAccordion() {
    return (
        <Accordion>
            <AccordionSummary 
                expandIcon={<Add />}
                sx={{ backgroundColor: "primary.light"}}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Create single pizza event</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: "primary.light"}}>
                <CreatePizzaEventForm />
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

export default CreatePizzaEventAccordion;