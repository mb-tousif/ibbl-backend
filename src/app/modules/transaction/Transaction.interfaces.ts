export interface ITransaction {
    id?: string;
    userId: string;
    receiverId: string;
    amount: number;
    description: string;
}
