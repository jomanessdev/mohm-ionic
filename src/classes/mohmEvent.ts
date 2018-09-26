
import { iEvent } from './iEvent';

export class MohmEvent extends iEvent{
    private rsvpRequired: boolean;
    private imgSource: string;
    private isGoing: boolean;
    private location: string;

    constructor(){
        super();
        this.isGoing = false;
    }

    /**
     * Getter $rsvpRequired
     * @return {boolean}
     */
	public get $rsvpRequired(): boolean {
		return this.rsvpRequired;
	}

    /**
     * Getter $imgSource
     * @return {string}
     */
	public get $imgSource(): string {
		return this.imgSource;
    }

     /**
     * Getter $isGoing
     * @return {boolean}
     */
	public get $isGoing(): boolean {
		return this.isGoing;
  }

  /**
     * Getter $location
     * @return {string}
     */
	public get $location(): string {
		return this.location;
	}

    /**
     * Setter $rsvpRequired
     * @param {boolean} value
     */
	public set $rsvpRequired(value: boolean) {
		this.rsvpRequired = value;
	}

    /**
     * Setter $imgSource
     * @param {string} value
     */
	public set $imgSource(value: string) {
		this.imgSource = value;
    }

    /**
     * Setter $isGoing
     * @param {boolean} value
     */
	public set $isGoing(value: boolean) {
		this.isGoing = value;
    }

    /**
     * Setter $location
     * @param {string} value
     */
	public set $location(value: string) {
		this.location = value;
    }
}
