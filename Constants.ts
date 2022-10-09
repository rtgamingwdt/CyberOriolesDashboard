export class SERVER {
    public static PUBLIC = process.env.PUBLIC == "true";
    public static URL = SERVER.PUBLIC ? "https://dashboard.cyberorioles.com" : "http://localhost:3000"
}

export default class Constants {
    public static SERVER = SERVER;
}