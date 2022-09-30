export namespace backend {
	
	export class Board {
	    columns: number;
	    rows: number;
	    cells: boolean[][];
	    generation: number;
	
	    static createFrom(source: any = {}) {
	        return new Board(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.columns = source["columns"];
	        this.rows = source["rows"];
	        this.cells = source["cells"];
	        this.generation = source["generation"];
	    }
	}

}

