export interface User {
    name: string;
    selectedPortion: Portion;
    completionDate: Date;
}

export interface Portion {
    id: number;
    title: string;
}

export interface CompletionInfo {
    user: User;
    completed: boolean;
}