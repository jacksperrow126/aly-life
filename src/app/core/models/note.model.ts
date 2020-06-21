import { Tag } from './tag.model';

export interface Note {
    id: string;
    title: string;
    content: string;
    date: string;
    tag?: Tag;
    remark: boolean;
    img: string;
}