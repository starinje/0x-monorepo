#!/usr/bin/env node

import * as depcheck from 'depcheck';
import * as fs from 'fs';
import lernaGetPackages = require('lerna-get-packages');
import * as _ from 'lodash';
import { exec as execAsync } from 'promisify-child-process';

import { constants } from './constants';
import { utils } from './utils';

// For some reason, `depcheck` hangs on some packages. Add them here.
const IGNORE_PACKAGES = ['@0xproject/deployer'];

(async () => {
    utils.log('*** NOTE: Not all deps listed here are actually not required. ***');
    utils.log("*** `depcheck` isn't perfect so double check before actually removing any. ***\n");
    const lernaPackages = lernaGetPackages(constants.monorepoRootPath);
    for (const lernaPackage of lernaPackages) {
        if (_.includes(IGNORE_PACKAGES, lernaPackage.package.name)) {
            continue; // skip
        }
        utils.log(`Checking ${lernaPackage.package.name} for unused deps. This might take a while...`);

        const configs = {};
        const result = await depcheckAsync(lernaPackage.location, configs);
        if (!_.isEmpty(result.dependencies)) {
            _.each(result.dependencies, dep => {
                utils.log(dep);
            });
        }
        utils.log('\n');
    }
})().catch(err => {
    utils.log(err);
    process.exit(1);
});

async function depcheckAsync(path: string, opts: any): Promise<depcheck.Results> {
    return new Promise<depcheck.Results>((resolve, reject) => {
        depcheck(path, opts, (unused: any) => {
            resolve(unused);
        });
    });
}
