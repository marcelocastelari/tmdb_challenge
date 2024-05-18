import { AuthService } from "../services/AuthService";

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async register(username: string, password: string) {
        try {
            console.log(username);
            const message = await this.authService.register(username, password);
            return { status: 201, message }
        } catch (error) {
            return { status: 500, message: error }
        }
    }

    async login(username: string, password: string) {
        try {
            const message = await this.authService.login(username, password);
            return { status: 200, message };
        } catch (error) {
          return { status: 500, message: error };  
        }
    }
}