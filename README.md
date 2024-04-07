# Processes list

Le programme a pour but de fournir tous les chemins contenant un processus spécifique.

Ici, le programme va afficher tous les chemins de `processes` contenant `firefox.exe` ainsi que tous ceux de `processes2`contenant `5` (voir [jeux de données](#jeux-de-données))

## Pour commencer

### Pré-requis

Cloner le répertoire

### Installation

Une fois le répertoire cloné, exécuter dans un terminal depuis la racine du projet `npm install`

## Démarrage

* Pour exécuter le programme, dans un terminal, à la racine du projet, exécuter `npm start`
* Pour lancer les tests, exécuter `npm run test`

## Jeux de données

### processes1
```bash
system
├── services
│   ├── svchost
│   ├── svchost
│   ├── svchost
│   ├── svchost
├── wininit
│   ├── winlogon
│   │   ├── explorer
│   │   │   ├── firefox.exe
│   │   │   │   ├── cmd.exe
│   │   │   │   ├── Word.exe
│   │   │   │   ├── Word2.exe
│   │   │   ├── notepad.exe
│   │   │   ├── calc.exe
```

### processes2
```bash
p0
├── p1
│   ├── p3
│   ├── p4
│   ├── p5
│   │   ├── p7
│   │   ├── p8
│   │   │   ├── p10
│   │   │   │   ├── p11
│   │   │   ├── p12
│   │   ├── p9
│   ├── p6
├── p2
```