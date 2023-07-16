import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import { CardHeader, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState } from "react";

interface Employee {
  name: string;
  dependents: string[];
}

// Hard coded employees.
var employees: Employee[] = [
  { name: "Bryan", dependents: ["Abigail", "Joe", "Fred"] },
  { name: "Alex", dependents: ["Felix", "Bob", "Chris"] },
  { name: "Luma", dependents: ["Nick", "Dylan"] },
];

const PricePerEmployee = 1000;
const PricePerChild = 500;
const Discount = 0.1;

const Benefits = () => {
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState("");
  const [expanded, setExpanded] = useState<string | false>(false);

  // Checks if employee can get discount
  const CanGetDiscount = (dependencies: string[], employeeName: string) => {
    if (
      dependencies.find((d) => d.startsWith("a") || d.startsWith("A")) ||
      employeeName.startsWith("a") ||
      employeeName.startsWith("A")
    ) {
      return true;
    } else {
      return false;
    }
  };

  // Calculates the total
  const CalculateTotal = (dependencies: string[], employeeName: string) => {
    var total = PricePerEmployee + PricePerChild * dependencies.length;
    if (CanGetDiscount(dependencies, employeeName)) {
      total = total - total * Discount;
    }
    return total;
  };

  // Function called when save button was pressed
  const Save = (emp: Employee) => {
    setTotal(CalculateTotal(emp.dependents, emp.name));
    if (CanGetDiscount(emp.dependents, emp.name)) {
      setDiscount(`- ${Discount * 100}% discount`);
    } else {
      setDiscount("");
    }
  };

  const handleChange =
    (panel: string, emp: Employee) =>
    (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
      Save(emp);
    };

  return (
    <div>
      <Card sx={{ minWidth: "60vw", backgroundColor: "pink" }}>
        <CardHeader title="Employees" />
        {employees.map((emp, index) => {
          return (
            <Accordion
              style={{ padding: 20 }}
              key={index}
              onChange={handleChange(index.toString(), emp)}
              expanded={expanded === index.toString()}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <TextField defaultValue={emp.name} variant="standard" />
              </AccordionSummary>
              <AccordionDetails>
                <div style={{ float: "left", maxWidth: "50vw" }}>
                  <Typography>Dependents</Typography>
                  {emp.dependents.map((dep, dependentsIndex) => {
                    return (
                      <Stack spacing={4} key={dependentsIndex}>
                        <TextField defaultValue={dep} />
                      </Stack>
                    );
                  })}
                </div>

                <div style={{ float: "none" }}>
                  <Stack>
                    <Typography>Price of Benefits</Typography>
                    <Typography>+ ${PricePerEmployee}</Typography>
                    <Typography>
                      + ${PricePerChild} * {emp.dependents.length} dependents
                    </Typography>
                    <Typography>{discount}</Typography>
                    <Typography>___________________</Typography>
                    <Typography>Total Price: ${total}</Typography>
                  </Stack>
                </div>

                <div style={{ position: "absolute", right: 10, bottom: 10 }}>
                  <Button variant="contained" onClick={() => Save(emp)}>
                    Save
                  </Button>
                </div>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Card>
    </div>
  );
};

export default Benefits;
