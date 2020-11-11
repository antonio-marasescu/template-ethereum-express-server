import Web3 from 'web3';
import * as TemplateJson from '../ethereum/abis/Template.json';
import * as TruffleConfig from '../../truffle-config';

export class TemplateContractService {
    web3: Web3;
    contractInstance: any;
    accountAddress: string;
    accountPassword: string;

    private get provider(): string {
        return Web3.givenProvider || ('ws://' + TruffleConfig.networks.development.host + ':' + TruffleConfig.networks.development.port);
    }

    async setup(): Promise<void> {
        this.web3 = new Web3(this.provider);
        this.contractInstance = new this.web3.eth.Contract(TemplateJson.abi as any, TemplateJson.networks['5777'].address);
        this.accountAddress = '0x72b670420B9081407c6D86c84EDb133729bEd622';
        this.accountPassword = '2338aece5c8c6fcc869dca2920a9d02558bf85096d317cf77415d180c7e04dc9';
        this.web3.eth.personal.lockAccount(this.accountAddress);
    }

    async getAccounts(): Promise<string[]> {
        return this.web3.eth.personal.getAccounts();
    }

    async contractPing(): Promise<number> {
        return this.contractInstance.methods.ping().call();
    }

    async getNumber(): Promise<number> {
        return this.contractInstance.methods.getNumber().call();
    }

    async setNumber(value: number): Promise<void> {
        this.web3.eth.personal.unlockAccount(this.accountAddress, this.accountPassword, 600);
        await this.contractInstance.methods.setNumber(value).send({from: this.accountAddress});
        this.web3.eth.personal.lockAccount(this.accountAddress);
    }
}

export const TemplateContractServiceInstance = new TemplateContractService();
