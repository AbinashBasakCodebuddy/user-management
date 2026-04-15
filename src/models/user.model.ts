import { User } from '../types/user.type';

export class UserModel {
    id: string;
    name: string;
    email: string;

    static list: UserModel[] = [];

    constructor({ id, name, email }: User) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    async create() {
        UserModel.list.push(this);
        return this;
    }

    static async getById(id: string): Promise<UserModel | undefined> {
        return UserModel.list.find((user) => user.id === id);
    }

    static findOne(query: Partial<UserModel>): UserModel | undefined {
        return UserModel.list.find((user) => {
            for (const [key, value] of Object.entries(query)) {
                if ((user as any)[key] !== value) {
                    return false;
                }
            }
            return true;
        });
    }

    async save() {
        const index = UserModel.list.findIndex((user) => user.id === this.id);
        if (index !== -1) {
            UserModel.list[index] = this;
        }
    }

    static async deleteById(id: string) {
        UserModel.list = UserModel.list.filter((user) => user.id !== id);
    }

    static async listAll(): Promise<UserModel[]> {
        return UserModel.list;
    }
}
