// commentaires en français -> commentaires pour expliquer le code dessous (que je t'aurais fait à l'oral)

import { Process } from "./data";



/**
* Function that returns all possible paths for a given process
* @param process : array of process
* @param targetProcessName : name of process target
* @returns an array of all possible path containing target process
*/
export function findAllFullPathByProcessName(processes: Process[], targetProcessName: string) {
  // recherche du processus cible qui correspond à celui de `targetProcessName`
  const targetProcess = processes.find((p) => p.name === targetProcessName);
  // ex: targetProcess = { name: "firefox.exe", pid: 23, ppid: 22 }

  // si on ne trouve pas le processus cible, on quitte la fonction avec un message d'erreur mais on pourrait imaginer autre chose
  if (!targetProcess) {
    console.error(`No process found with "${targetProcessName}" name`);
    return;
  }

  // Retrouver le chemin ascendant 
  const parentProcess = findParentPathByProcess(processes, targetProcess);

  // Retrouver les chemins descendants
  const childrenProcesses = findAllLeafsFromTargetProcess(processes, targetProcess, parentProcess);

  // retourne un tableau de chaine de caractères listant tous les chemins des processus contenant le processus cible
  return childrenProcesses.map(p => p.map(p => p.name).join("->"));
  // ex: 
  // [
  //   'system->wininit->winlogon->explorer->firefox.exe->cmd.exe',
  //   'system->wininit->winlogon->explorer->firefox.exe->Word.exe',
  //   'system->wininit->winlogon->explorer->firefox.exe->Word2.exe'
  // ]
};


/**
 * Function that returns an array of parent process for a given target process
 * @param processes : array of processes
 * @param targetProcess : process target
 * @returns : list of processes with asc order
 */
function findParentPathByProcess(processes: Process[], targetProcess: Process) {
  // Je pars du principe qu'il n'y a qu'un seul chemin ascendant depuis targetProcess
  // parentProcess : est un tableau qui stockera les processus dans l'ordre (du parent le plus haut jusqu'à targetProcess)
  const parentProcess: Process[] = [];

  // ppidToFind est une variable qui est l'id du parent à trouver dans les processus, sa valeur changera au fur et à mesure de la progression dans l'arbre
  let ppidToFind: number = targetProcess.ppid;

  // fonction qui permet de renvoyer vrai ou faux si l'id du processus en paramètre correspond à ppidToFind
  // Je l'utilise par la suite comme argument pour la méthode `find`
  // Ne serait-ce pas une closure? ;)
  function isParent(p: Process) { return p.pid === ppidToFind; }

  // Je créer une boucle while qui va itérer tant que je trouve un parent
  while (true) {
    // A chaque loop : je stock le parent trouvé dans `parent`
    const parent = processes.find(isParent);
    // au début j'avais fait une fonction fléchée dans le callback de la méthode `find` => process.find(p => p.pid === ppidToFind)
    // Mais le linter que j'utilise me donnais l'erreur `Function declared in a loop contains unsafe references to variable(s) 'ppidToFind'.eslintno-loop-func`
    // C'est pour ça que j'ai remplacé la fonction fléché par une fonction régulière

    // Si aucun parent n'est trouvé on sort de la boucle while
    if (!parent) {
      break;
    }

    // sinon on pousse le parent au début du tableau `parentProcess` et on modifie le ppidToFind pour la prochaine itération
    parentProcess?.unshift(parent);
    ppidToFind = parent.ppid;
  }

  return parentProcess;
}

function findAllLeafsFromTargetProcess(processes: Process[], targetProcess: Process, parentProcesses?: Process[]) {

  // Initialisation de childrenProcessesPath qui est le tableau retourné par la fonction
  const childrenProcessesPath: Process[][] = [];

  // fonction récursive qui recherche les enfants des enfants, stocke le chemin dans un tableau et lorsque c'est le dernier enfant trouvé : pousse dans le tableau childrenProcessesPath
  const findLeafs = (currentProcess: Process, currentPath: Process[]) => {
    let isLeaf = true;
    currentPath = currentPath.concat(currentProcess);
    for (let i = 0; i < processes.length; i++) {
      if (processes[i].ppid === currentProcess.pid) {
        isLeaf = false;
        findLeafs(processes[i], currentPath);
      }
    }
    if (isLeaf) {
      childrenProcessesPath.push(currentPath);
    }
  }

  // appel de la fonction à partir de parentProcesses
  findLeafs(targetProcess, parentProcesses ?? []);

  return childrenProcessesPath;
}