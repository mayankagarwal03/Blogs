import Conf from "../Conf/Conf";
import {Client,Account,ID} from "appwrite"

const cors=require('cors');

export class AuthService{
    client=new Client();
    account;
    //done in class when a new object of it is made
    constructor(){

        this.client
            .use(cors())
            .setEndpoint(Conf.appwriteUrl)
            .setProject(Conf.appwriteProjectId);
        this.account=new Account(this.client);
    }
    async createAccount({email,password,name}){
        try{
            const userAccount=await this.account.create(ID.unique(),email,password,name);
            if(userAccount) return this.login({email,password})
            else return userAccount;
        }catch(error){
            throw error;
        }
    }
    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password);
        }catch(error){
            throw error;
        }
    }
    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(error)
        {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
    }
    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService=new AuthService();

export default authService