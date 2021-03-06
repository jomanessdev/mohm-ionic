export abstract class iEvent{

    private id?: string;
    private title: string;
    private date: string;
    private description: string;

    constructor(){}

    /**
     * Getter $title
     * @return {string}
     */
	public get $title(): string {
		return this.title;
	}

    /**
     * Getter $date
     * @return {string}
     */
	public get $date(): string {
		return this.date;
	}

    /**
     * Getter $description
     * @return {string}
     */
	public get $description(): string {
		return this.description;
  }

  /**
     * Getter $id
     * @return {string}
     */
	public get $id(): string {
		return this.id;
	}

    /**
     * Setter $title
     * @param {string} value
     */
	public set $title(value: string) {
		this.title = value;
	}

    /**
     * Setter $date
     * @param {string} value
     */
	public set $date(value: string) {
		this.date = value;
	}

    /**
     * Setter $description
     * @param {string} value
     */
	public set $description(value: string) {
		this.description = value;
  }

  /**
     * Setter $id
     * @param {string} value
     */
	public set $id(value: string) {
		this.id = value;
	}

}
