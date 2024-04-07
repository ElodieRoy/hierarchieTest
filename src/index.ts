import { processes1, processes2 } from "./data";
import { findAllFullPathByProcessName } from "./processesFunctions";


const firefoxProcessesPath = findAllFullPathByProcessName(processes1, "firefox.exe");
const p5ProcessesPath = findAllFullPathByProcessName(processes2, "p5");

console.log({ firefoxProcessesPath }, { p5ProcessesPath });