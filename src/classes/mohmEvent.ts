
import { iEvent } from './iEvent';

export class MohmEvent extends iEvent{
    private rsvpRequired: boolean;
    private imgSource: string;
    
    constructor(){
        super();
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

}