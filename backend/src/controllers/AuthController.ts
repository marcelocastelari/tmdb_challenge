import { AuthService } from "../services/AuthService";

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async register(email: string, password: string) {
        try {
            const message = await this.authService.register(email, password);
            return { status: 201, message }
        } catch (error) {
            return { status: 400, message: error }
        }
    }

    async login(email: string, password: string) {
        try {
            const result = await this.authService.login(email, password);
            return { status: 200, token: result };
        } catch (error) {
          return { status: 500, message: error };  
        }
    }
}