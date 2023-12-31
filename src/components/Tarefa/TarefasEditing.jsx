import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { LocalizationProvider, DateField } from "@mui/x-date-pickers";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { Form, useRouteLoaderData } from "react-router-dom";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Link } from "react-router-dom";

export default function TarefasEditing() {
  const loaderData = useRouteLoaderData("taskLoader");
  // console.log(loaderData);
  const taskDeadline = dayjs(`${loaderData.resDataTask.taskDeadline}`);
  // console.log(loaderData);
  // let projectBeginning = null;
  // if (loaderData.projectBeginning) {
  //   projectBeginning = dayjs(`${loaderData.projectBeginning}`);
  // }
  return (
    <Box>
      <Box component="div" sx={{ mt: "4rem" }}>
        <Form method="patch">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                id="taskName"
                label="Nome da Tarefa"
                name="taskName"
                autoComplete="task-Name"
                autoFocus
                color="secondary"
                defaultValue={loaderData.resDataTask.taskName}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth color="secondary" required>
                <InputLabel id="demo-simple-select-label">
                  Prioridade
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={loaderData.resDataTask.taskPriority}
                  //   value={age}
                  label="taskPriority"
                  name="taskPriority"
                  //   onChange={handleChange}
                >
                  <MenuItem value={"Baixa"}>Baixa</MenuItem>
                  <MenuItem value={"Media"}>Média</MenuItem>
                  <MenuItem value={"Alta"}>Alta</MenuItem>
                  {/* <MenuItem value={"Muita urgencia"}>Muita urgência</MenuItem>
                  <MenuItem value={"Emergencia"}>Emergência</MenuItem> */}
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem>
                  <DateField
                    sx={{ margin: "10px" }}
                    format="DD/MM/YYYY"
                    color="secondary"
                    label="Data de início"
                    name="projectBeginning"
                    // defaultValue={projectBeginning}
                  />
                </DemoItem>
              </LocalizationProvider>
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem>
                  <DateField
                    format="DD/MM/YYYY"
                    color="secondary"
                    label="Prazo de entrega"
                    name="taskDeadLine"
                    defaultValue={taskDeadline}
                  />
                </DemoItem>
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
            >
              Salvar
            </Button>
          </Box>
          <Box component="div">
            <Button variant="contained" component={Link} to="..">
              Voltar
            </Button>
          </Box>
        </Form>
      </Box>
    </Box>
  );
}
