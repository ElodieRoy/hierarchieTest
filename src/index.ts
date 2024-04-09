import { processes1, processes2, tree1, tree2 } from "./data";
import { findAllFullPathByProcessName } from "./processesFunctions";
import { findAllFullPathByProcessName2 } from "./processesFunctions2";


const firefoxProcessesPath = findAllFullPathByProcessName(processes1, "firefox.exe");
const p5ProcessesPath = findAllFullPathByProcessName(processes2, "p5");

console.log('---test1---');
console.log({ firefoxProcessesPath }, { p5ProcessesPath });


const firefoxProcessesPath2 = findAllFullPathByProcessName2(tree1, "firefox.exe");
const p5ProcessesPath2 = findAllFullPathByProcessName2(tree2, "p5");

console.log('---test2---');
console.log({ firefoxProcessesPath2 }, { p5ProcessesPath2 });