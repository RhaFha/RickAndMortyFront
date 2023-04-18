
export default class InfoDTO {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;

    constructor(
        _count: number = 0,
        _pages: number = 0,
        _next: string = null,
        _prev: string = null,
    ) {

        this.count = _count;
        this.pages = _pages;
        this.next = _next;
        this.prev = _prev;

    }

}