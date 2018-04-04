#!/usr/bin/env node

import * as yargs from 'yargs';
import * as fs from 'fs';
import * as glob from 'glob-promise';

const FALLBACK = 'fallback'
const CONSTRUCTOR = 'constructor'
const FUNCTION = 'function'
const EVENT = 'event'



try {
    main()
}
catch(err) {
    console.log(err)
}

async function main() {

    console.log('inside of sol-doc')

    const args = yargs
        .option('artifacts', {
            describe: 'Folder where contract artifacts are located ',
            type: 'string',
            demandOption: true,
        })
        .option('output', {
            describe: 'Folder where to put the output files',
            type: 'string',
            demandOption: true,
        }).argv;

    const artifactsDirectory = args.artifacts

    console.log(args)

    // // retrieve all of the contract artifacts
    // const contractArtifacts = await extractContractArtifacts(artifactsDirectory)

    // // for each contract artifact, generate documentation metadata and save to output directory
    // for (const contractArtifact of contractArtifacts) {
    //     const documentationMetadata = await generateDocumentationMetadata(contractArtifact)
    //     await writeDocumentationMetadataToOutputFile(documentationMetadata)
    // }

}


// async function extractContractArtifacts(artifactsDirectory: string) {

//     const contractArtifactFileNames = await glob(`./${artifactsDirectory}/*.json`)
//     let contractArtifacts = []

//     for (const contractArtifactFilename of contractArtifactFileNames){
//         const contractArtifact=JSON.parse(fs.readFileSync(contractArtifactFilename, 'utf8'))
//         contractArtifacts.push(contractArtifact)
//     }

//     return contractArtifacts
// }

// async function generateDocumentationMetadata(contractArtifact: string) {
//     console.log('generating documentation metadata')
//     console.log(contractArtifact)
//     contractArtifact = JSON.parse(contractArtifact)

//     const documentationMetadata = {
//         name: contractArtifact.contract_name,
//         abiDocs: parseAbi(contractArtifact),
//       };

//     return Promise.resolve(documentationMetadata)
// }

// async function parseAbi (contractArtifact){

//     return contractArtifact.abi.map((method) => {
  
//         // // get find relevent docs
//         // const inputParams = method.inputs || [];
//         // const signature = method.name && `${method.name}(${inputParams.map(i => i.type).join(',')})`;
//         // const devDocs = (contract.devdoc.methods || {})[signature] || {};
//         // const userDocs = (contract.userdoc.methods || {})[signature] || {};
//         // // map abi inputs to devdoc inputs
//         // const params = devDocs.params || {};
//         // const inputs = inputParams.map(param => ({ ...param, description: params[param.name] }));
//         // // don't write this
//         // delete devDocs.params;
    
//         // // START HACK workaround pending https://github.com/ethereum/solidity/issues/1277
//         // // TODO map outputs properly once compiler splits them out
//         // // in the meantime, use json array
//         // // parse devDocs.return as a json object
//         // let outputs;
//         // try {
//         //   const outputParams = JSON.parse(devDocs.return);
//         //   outputs = method.outputs.map(param => ({ ...param, description: outputParams[param.name] }));
//         // } catch (e) {
//         //   outputs = method.outputs;
//         // }
//         // // END HACK

//         //TODO: code here to calculate inputs and outputs from deployer output....
//         const inputs = ''
//         const outputs = ''

//         const fileLineNumber = determineFileLineNumberIfExists(method.type, method.name, contractArtifact.name, contractArtifact.source)
    
//         return {
//           fileLineNumber,
//           inputs,
//           outputs,
//         };
//       });
// }

// async function writeDocumentationMetadataToOutputFile(documentationMetadata: string) {
//     console.log('writing documentation to output file')
//     return Promise.resolve()
// }

// function determineFileLineNumberIfExists(methodType, methodName, contractName, source){

//     if (methodType == FALLBACK){
//       return undefined
//     } 
  
//     const sourceByLineArray = source.split("\n")
//     let lineNumber = undefined
  
//     sourceByLineArray.forEach((line, index) => {
//       let isEventDeclaration
//       let isMethodDeclaration
//       let isPropertyDeclaration
//       let isConstructorDeclaration
  
//       switch(methodType) {
//         case EVENT:
//           isEventDeclaration = line.includes(`event ${methodName}(`)
//           break;
//         case FUNCTION:
//           isMethodDeclaration = line.includes(`function ${methodName}(`) 
//           isPropertyDeclaration = line.includes(`public ${methodName}`)
//           break
//         case CONSTRUCTOR:
//           isConstructorDeclaration = line.includes(`function ${contractName}(`)
//           break
//         default:
//           process.stdout.write(`method type "${methodType}" is not supported`);
//       }
  
//       if (isEventDeclaration || isMethodDeclaration || isPropertyDeclaration || isConstructorDeclaration){
//         lineNumber = index + 1
//       }
//     })
  
//     return lineNumber
  
//   }