export default class BaseModel {
    repository: any;
    connection: any;
    context: any;

    constructor(connection: any, repository: any, context?: any) {
        this.connection = connection;
        this.repository = repository;
        this.context = context;
    }

    successResponse(data: any) {
        return { status: true, data };
    }

    errorResponse(message: string) {
        return { status: false, message };
    }
}