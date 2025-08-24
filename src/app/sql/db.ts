import { DatabaseDesktop } from "./desktop/db";
import { DatabaseWeb } from "./web/db";


// Tauri detection utility
const isTauri = typeof window !== 'undefined' && '__TAURI__' in window;


// Main database class to abstract platform-specific database access
class DB {
	public desktop: DatabaseDesktop;
	public web: DatabaseWeb;

	constructor() {
		this.desktop = new DatabaseDesktop({ type: 'sqlite', name: 'main.db' });
		this.web = new DatabaseWeb();
	}

	/**
	 * Connect to the appropriate database depending on platform (Tauri or Web)
	 */
	async connect(): Promise<unknown> {
        return isTauri
            ? this.desktop.connect()
            : this.web.connect();
	}
}

// Export a singleton instance
export const db = new DB();