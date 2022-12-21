const {v4: uuidv4} = require('uuid');

interface Transaction {
    amount: number;
    date: Date;
}

class Customer {
    private name: string;
    private id: string;
    private transactions: Transaction[];
    private balance: number;

    public constructor(name: string) {
        this.name = name;
        this.transactions = [];
        this.id = uuidv4();
        this.balance = 0;
    }

    public get getName(): string {
        return this.name;
    }

    public get getId(): string {
        return this.id
    }

    public get getTransaction() {
        this.transactions.forEach(x => console.log(`Date: ${x.date.toDateString()} - Amount: ${x.amount}`))
        return this.transactions;
    }

    public getBalance() {
        return this.balance;
    }

    public addTransaction(amount: number): boolean {
        if (this.balance + amount < 0) {
            return false;
        } else {
            this.balance += amount;
            this.transactions.push({amount: amount, date: new Date()})
            return true;
        }
    }
}

class Branch {
    private name: string;
    private customers: Customer[];

    public constructor(name: string) {
        this.name = name;
        this.customers = [];
    }

    public get getName() {
        return this.name;
    }

    public get getCustomers() {
        return this.customers;
    }

    public addCustomer(customer: Customer): boolean {
        if (!this.customers.includes(customer)) {
            return !!this.customers.push(customer);
        } else {
            return false;
        }
    }

    public addCustomerTransaction(customerId: string, amount: number): boolean {
        const customer = this.findCustomer(customerId)
        if (customer) {
            return customer.addTransaction(amount);
        } else {
            return false;
        }
    }

    public findCustomer(customerId: string): Customer | null {
        const filtered = this.customers.filter(x => x.getId == customerId)
        if (filtered.length > 0) {
            return filtered[0];
        } else {
            return null
        }
    }
}


class Bank {
    private name: string;
    private branches: Branch[];

    public constructor(name: string) {
        this.name = name
        this.branches = [];
    }

    public addBranch(branch: Branch): boolean {
        if (!this.branches.includes(branch)) {
            return !!this.branches.push(branch);
        } else {
            return false;
        }
    }

    public addCustomer(branch: Branch, customer: Customer): boolean {
        if (this.checkBranch(branch)) {
            return branch.addCustomer(customer);
        }
        return false;
    }

    public addCustomerTransaction(branch: Branch, customerId: string, amount: number): boolean {
        if (this.checkBranch(branch)) {
            return branch.addCustomerTransaction(customerId, amount);
        }
        return false;
    }

    public findBranchByName(branchName: string): Branch[] | null {
        const filtered = this.branches.filter(x => x.getName === branchName);
        if (filtered.length == 0) {
            return null;
        }
        return filtered;
    }

    public checkBranch(branch: Branch) {
        return this.branches.includes(branch);
    }

    public listCustomers(branch: Branch, hasTransaction: boolean): boolean {
        if (this.checkBranch(branch)) {
            const customers = branch.getCustomers;
            if (hasTransaction) {
                customers.forEach(x=> {
                    console.log(`Customers: ${x.getName}`)
                    x.getTransaction;
                })
            }else{
                customers.forEach(x=> console.log(`Customers: ${x.getName}`));
            }
            return true;
        }
        return false;
    }
}


const arizonaBank = new Bank("Arizona")
const westBranch = new Branch("West Branch")
const sunBranch = new Branch("Sun Branch")
const customer1 = new Customer("John")
const customer2 = new Customer("Anna")
const customer3 = new Customer("John")

arizonaBank.addBranch(westBranch)
arizonaBank.addBranch(sunBranch)
arizonaBank.addBranch(westBranch)

arizonaBank.findBranchByName("bank")
arizonaBank.findBranchByName("sun")

arizonaBank.addCustomer(westBranch, customer1)
arizonaBank.addCustomer(westBranch, customer3)
arizonaBank.addCustomer(sunBranch, customer1)
arizonaBank.addCustomer(sunBranch, customer2)

arizonaBank.addCustomerTransaction(westBranch, customer1.getId, 3000)
arizonaBank.addCustomerTransaction(westBranch, customer1.getId, 2000)
arizonaBank.addCustomerTransaction(westBranch, customer2.getId, 3000)

customer1.addTransaction(-1000)
console.log(customer1.getBalance())
console.log(arizonaBank.listCustomers(westBranch, true))
console.log(arizonaBank.listCustomers(sunBranch,true))